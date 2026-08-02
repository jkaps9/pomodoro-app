import "./Nav.css";

export default function NavBar({ currentTimer, onClick }) {
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
              onClick={() => onClick(tab.id)}
              className="btn"
              aria-current={tab.id === currentTimer ? "true" : undefined}
            >
              {tab.displayName}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
