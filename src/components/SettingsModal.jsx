import "../styles/SettingsModal.css";

export default function SettingsModal({ isVisible, preferences, onChange }) {
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
                value={preferences.pomodoroTime}
              />
            </div>
            <div>
              <label htmlFor="short-break-time">Short break</label>
              <input
                type="number"
                id="short-break-time"
                name="short-break-time"
                value={preferences.shortBreakTime}
              />
            </div>
            <div>
              <label htmlFor="long-break-time">Long break</label>
              <input
                type="number"
                id="long-break-time"
                name="long-break-time"
                value={preferences.longBreakTime}
              />
            </div>
          </div>
        </section>
        <section>
          <fieldset className="option-group">
            <legend className="section__title">Font</legend>
            <div className="options">
              <div className="option">
                <input
                  type="radio"
                  id="font-sans"
                  name="font"
                  value="sans"
                  checked={preferences.font === "sans"}
                  onChange={onChange}
                />
                <label htmlFor="font-sans" className="font-sans">
                  Aa
                </label>
              </div>
              <div className="option">
                <input
                  type="radio"
                  id="font-serif"
                  name="font"
                  value="serif"
                  checked={preferences.font === "serif"}
                  onChange={onChange}
                />
                <label htmlFor="font-serif" className="font-serif">
                  Aa
                </label>
              </div>
              <div className="option">
                <input
                  type="radio"
                  id="font-mono"
                  name="font"
                  value="mono"
                  checked={preferences.font === "mono"}
                  onChange={onChange}
                />
                <label htmlFor="font-mono" className="font-mono">
                  Aa
                </label>
              </div>
            </div>
          </fieldset>
        </section>
        <section>
          <fieldset className="option-group">
            <legend className="section__title">Color</legend>
            <div className="options">
              <div className="option">
                <input
                  type="radio"
                  id="color-red"
                  name="color"
                  value="red"
                  checked={preferences.color === "red"}
                  onChange={onChange}
                />
                <label htmlFor="color-red" className="bg-red"></label>
              </div>
              <div className="option">
                <input
                  type="radio"
                  id="color-cyan"
                  name="color"
                  value="cyan"
                  checked={preferences.color === "cyan"}
                  onChange={onChange}
                />
                <label htmlFor="color-cyan" className="bg-cyan"></label>
              </div>
              <div className="option">
                <input
                  type="radio"
                  id="color-purple"
                  name="color"
                  value="purple"
                  checked={preferences.color === "purple"}
                  onChange={onChange}
                />
                <label htmlFor="color-purple" className="bg-purple"></label>
              </div>
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
