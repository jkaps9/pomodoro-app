import "../styles/SettingsModal.css";

export default function SettingsModal({ isVisible, preferences }) {
  return (
    <div className={`settings-modal ${isVisible ? "active" : ""}`}>
      <form action="">
        <header>
          <h2>Settings</h2>
        </header>
        <main>
          <section>
            <h3>Time (Minutes)</h3>
            <div className="form-row">
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

          <button type="submit" className="btn">
            Apply
          </button>
        </main>
      </form>
    </div>
  );
}
