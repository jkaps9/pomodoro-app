import { useState } from "react";
import "../styles/Nav.css";

export default function NavBar({ onClick }) {
  const [activeIndex, setActiveIndex] = useState("pomodoroTime");

  function setIndex(newIndex) {
    onClick(newIndex);
    setActiveIndex(newIndex);
  }

  const tabs = [
    { id: "pomodoroTime", displayName: "pomodoro" },
    { id: "shortBreakTime", displayName: "short break" },
    { id: "longBreakTime", displayName: "long break" },
  ];
  return (
    <nav aria-label="Timer modes" className="nav-bar">
      <ul className="tab-list">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <button
              onClick={() => setIndex(tab.id)}
              aria-current={tab.id === activeIndex ? "true" : undefined}
            >
              {tab.displayName}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
