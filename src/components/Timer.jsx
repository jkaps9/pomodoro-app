import { useState, useEffect } from "react";
import "../styles/Timer.css";

export default function Timer({ initialTime }) {
  const [remainingTime, setTime] = useState(initialTime * 60);
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
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  function resetTimer() {
    setTime(initialTime * 60);
    setIsRunning(false);
  }

  const completionPercentage =
    ((initialTime - remainingTime / 60) / initialTime) * 100;

  return (
    <div id="timer">
      <svg
        id="progress-circle"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax={initialTime * 60}
        aria-valuenow={remainingTime}
      >
        <circle
          r="48%"
          cx="50%"
          cy="50%"
          fill="transparent"
          stroke="currentColor"
          stroke-width="0.5rem"
          pathLength="100"
          strokeDasharray={`${100 - completionPercentage}, 
          ${completionPercentage}`}
          strokeLinecap="round"
        ></circle>
      </svg>
      <div className="timer__content">
        <p className="time" aria-hidden="true">
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
        <span className="sr-only">
          {Math.floor(remainingTime / 60)} minutes and {remainingTime % 60}{" "}
          seconds remaining
        </span>
        {remainingTime === 0 && (
          <div aria-live="polite" className="sr-only">
            Time is up!
          </div>
        )}
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
