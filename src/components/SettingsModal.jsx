import { useState } from "react";
import "../styles/SettingsModal.css";
import iconClose from "/icon-close.svg";

export default function SettingsModal({
  isVisible,
  currentPreferences,
  onApply,
  onCloseClick,
}) {
  const [draftPreferences, setDraftPreferences] = useState(currentPreferences);
  const [errors, setErrors] = useState({
    pomodoroTime: "",
    shortBreakTime: "",
    longBreakTime: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const parsedValue =
      type === "number" ? (value === "" ? "" : Number(value)) : value;

    setDraftPreferences((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      pomodoroTime: "",
      shortBreakTime: "",
      longBreakTime: "",
    };

    if (draftPreferences.pomodoroTime === "") {
      newErrors.pomodoroTime = "Time cannot be blank";
      isValid = false;
    }

    if (draftPreferences.shortBreakTime === "") {
      newErrors.shortBreakTime = "Time cannot be blank";
      isValid = false;
    }

    if (draftPreferences.longBreakTime === "") {
      newErrors.longBreakTime = "Time cannot be blank";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) onApply(draftPreferences);
  };

  return (
    <div className={`settings-modal ${isVisible ? "active" : ""}`}>
      <form onSubmit={handleSubmit}>
        <header>
          <h2>Settings</h2>
          <button>
            <img src={iconClose} alt="" />
          </button>
        </header>
        <main>
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
                {errors.pomodoroTime && (
                  <p className="error-message">{errors.pomodoroTime}</p>
                )}
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
                {errors.shortBreakTime && (
                  <p className="error-message">{errors.shortBreakTime}</p>
                )}
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
                {errors.longBreakTime && (
                  <p className="error-message">{errors.longBreakTime}</p>
                )}
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
          <button type="submit" className="btn" onClick={onCloseClick}>
            Apply
          </button>
        </main>
      </form>
    </div>
  );
}
