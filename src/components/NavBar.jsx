import { useState } from "react";
import "../styles/Nav.css";

export default function NavBar({ onClick }) {
  const [activeIndex, setActiveIndex] = useState(0);

  function setIndex(newIndex) {
    onClick(newIndex);
    setActiveIndex(newIndex);
  }

  const tabs = ["pomodoro", "short break", "long break"];
  return (
    <div className="nav-bar">
      <ul className="tab-list">
        {tabs.map((tab, index) => (
          <li>
            <button
              key={index}
              onClick={() => setIndex(index)}
              className={`btn ${index === activeIndex ? "active" : ""}`}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
