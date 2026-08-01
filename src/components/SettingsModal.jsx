import "../styles/SettingsModal.css";

export default function SettingsModal({ isVisible, preferences }) {
  return (
    <div className={`settings-modal ${isVisible ? "active" : ""}`}>
      <form action="">
        <header>
          <h2>Settings</h2>
        </header>
        <section>
          <h3 className="section__title">Time (Minutes)</h3>
          <div className="input-group">
            <div>
              <label htmlFor="pomodoro-time">Pomodoro</label>
              <input
                type="number"
                id="pomodoro-time"
                name="pomodoro-time"
                value={preferences.times.pomodoro}
              />
            </div>
            <div>
              <label htmlFor="short-break-time">Short break</label>
              <input
                type="number"
                id="short-break-time"
                name="short-break-time"
                value={preferences.times.shortBreak}
              />
            </div>
            <div>
              <label htmlFor="long-break-time">Long break</label>
              <input
                type="number"
                id="long-break-time"
                name="long-break-time"
                value={preferences.times.longBreak}
              />
            </div>
          </div>
        </section>
        <section>
          <fieldset className="option-group">
            <legend className="section__title">Font</legend>
            <div className="option">
              <label htmlFor="font-sans"></label>
              <input
                type="radio"
                id="font-sans"
                name="theme-font"
                value="sans"
                checked={preferences.font === "sans"}
              />
            </div>
            <div className="option">
              <label htmlFor="font-serif"></label>
              <input
                type="radio"
                id="font-serif"
                name="theme-font"
                value="serif"
                checked={preferences.font === "serif"}
              />
            </div>
            <div className="option">
              <label htmlFor="font-mono"></label>
              <input
                type="radio"
                id="font-mono"
                name="theme-font"
                value="mono"
                checked={preferences.font === "mono"}
              />
            </div>
          </fieldset>
        </section>
        <button type="submit" className="btn">
          Apply
        </button>
      </form>
    </div>
  );
}
