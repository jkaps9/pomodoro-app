import { useState, useEffect } from "react";
import "../styles/Timer.css";

export default function Timer({ initialTime }) {
  const [remainingTime, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setTime((prev) => {
        if (prev === 0) {
          setIsRunning(false);
          return prev;
        }
        return prev - 1;
      });
    }, 10);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  function resetTimer() {
    setTime(initialTime);
    setIsRunning(false);
  }

  return (
    <div id="timer">
      <div className="timer__content">
        <p className="time">
          <span id="minutes">
            {Math.floor(remainingTime / 60)
              .toString()
              .padStart(2, "0")}
          </span>
          :
          <span id="seconds">
            {(remainingTime % 60).toString().padStart(2, "0")}
          </span>
        </p>
        <button
          onClick={() => {
            if (remainingTime === 0 && !isRunning) resetTimer();
            else setIsRunning((prev) => !prev);
          }}
        >
          {remainingTime === 0 ? "RESTART" : isRunning ? "PAUSE" : "START"}
        </button>
      </div>
    </div>
  );
}
