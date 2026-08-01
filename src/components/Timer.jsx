import { useState, useEffect } from "react";

export default function Timer() {
  const [remainingTime, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    const intervalId = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  return (
    <div>
      <p className="time">
        <span id="minutes">{Math.floor(remainingTime / 60)}</span>:
        <span id="seconds">{remainingTime % 60}</span>
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
