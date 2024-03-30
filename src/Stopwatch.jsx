import { useRef, useEffect } from "react";
import { useState } from "react";

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRefId = useRef(null);
  const setCurrentTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalRefId.current = setInterval(() => {
        setElapsedTime(Date.now() - setCurrentTimeRef.current);
      }, 10);
    }

    return () => {
      clearInterval(intervalRefId.current);
    };
  }, [isRunning]);

  function start() {
    setIsRunning(true);
    setCurrentTimeRef.current = Date.now() - elapsedTime;
  }
  function stop() {
    setIsRunning(false);
  }
  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
  }

  function formatTime() {
    // const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const miliseconds = Math.floor((elapsedTime % 1000) / 10);
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}:${miliseconds < 10 ? "0" : ""}${miliseconds}`;
  }

  useEffect(() => {
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const miliseconds = Math.floor((elapsedTime % 1000) / 10);
    document.title = `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}:${miliseconds < 10 ? "0" : ""}${miliseconds}`;
  }, [elapsedTime]);

  return (
    <div className="stopwatch">
      <div className="display">{formatTime()}</div>
      <div className="btn-container">
        <button className="start-btn" onClick={start}>
          Start
        </button>
        <button className="stop-btn" onClick={stop}>
          Stop
        </button>
        <button className="reset-btn" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Stopwatch;
