import { useState } from "react";
import "../styles/SettingsModal.css";

export default function SettingsModal({
  isVisible,
  currentPreferences,
  onApply,
}) {
  const [draftPreferences, setDraftPreferences] = useState(currentPreferences);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const parsedValue = type === "number" ? Number(value) : value;

    setDraftPreferences((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onApply(draftPreferences);
  };

  return (
    <div className={`settings-modal ${isVisible ? "active" : ""}`}>
      <form onSubmit={handleSubmit}>
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
                name="pomodoroTime"
                value={draftPreferences.pomodoroTime}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="short-break-time">Short break</label>
              <input
                type="number"
                id="short-break-time"
                name="shortBreakTime"
                value={draftPreferences.shortBreakTime}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="long-break-time">Long break</label>
              <input
                type="number"
                id="long-break-time"
                name="longBreakTime"
                value={draftPreferences.longBreakTime}
                onChange={handleChange}
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
                  checked={draftPreferences.font === "sans"}
                  onChange={handleChange}
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
                  checked={draftPreferences.font === "serif"}
                  onChange={handleChange}
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
                  checked={draftPreferences.font === "mono"}
                  onChange={handleChange}
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
                  checked={draftPreferences.color === "red"}
                  onChange={handleChange}
                />
                <label htmlFor="color-red" className="bg-red"></label>
              </div>
              <div className="option">
                <input
                  type="radio"
                  id="color-cyan"
                  name="color"
                  value="cyan"
                  checked={draftPreferences.color === "cyan"}
                  onChange={handleChange}
                />
                <label htmlFor="color-cyan" className="bg-cyan"></label>
              </div>
              <div className="option">
                <input
                  type="radio"
                  id="color-purple"
                  name="color"
                  value="purple"
                  checked={draftPreferences.color === "purple"}
                  onChange={handleChange}
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
