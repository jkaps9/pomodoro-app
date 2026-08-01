import { useState, useEffect } from "react";

export default function Timer() {
  const [remainingTime, setTime] = useState(120);
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

  return (
    <div>
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
        className="btn--pause"
        onClick={() => setIsRunning((prev) => !prev)}
      >
        Pause
      </button>
    </div>
  );
}
