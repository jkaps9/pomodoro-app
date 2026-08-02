import { useState, useEffect, useRef } from "react";
import "../styles/SettingsModal.css";
import iconClose from "/icon-close.svg";

export default function SettingsModal({ currentPreferences, onApply }) {
  const dialogRef = useRef(null);
  const [draftPreferences, setDraftPreferences] = useState(currentPreferences);
  const [errors, setErrors] = useState({
    pomodoroTime: "",
    shortBreakTime: "",
    longBreakTime: "",
  });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      setDraftPreferences(currentPreferences);
      setErrors({
        pomodoroTime: "",
        shortBreakTime: "",
        longBreakTime: "",
      });
    };

    dialog.addEventListener("close", handleClose);

    return () => dialog.removeEventListener("close", handleClose);
  }, [currentPreferences]);

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
    } else if (
      draftPreferences.pomodoroTime < 1 ||
      draftPreferences.pomodoroTime > 99
    ) {
      newErrors.pomodoroTime = "Value must be from 1 to 99";
      isValid = false;
    }

    if (draftPreferences.shortBreakTime === "") {
      newErrors.shortBreakTime = "Time cannot be blank";
      isValid = false;
    } else if (
      draftPreferences.shortBreakTime < 1 ||
      draftPreferences.shortBreakTime > 99
    ) {
      newErrors.shortBreakTime = "Value must be from 1 to 99";
      isValid = false;
    }

    if (draftPreferences.longBreakTime === "") {
      newErrors.longBreakTime = "Time cannot be blank";
      isValid = false;
    } else if (
      draftPreferences.longBreakTime < 1 ||
      draftPreferences.longBreakTime > 99
    ) {
      newErrors.longBreakTime = "Value must be from 1 to 99";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onApply(draftPreferences);
      if (dialogRef.current) {
        dialogRef.current.close();
      }
    }
  };

  return (
    <dialog ref={dialogRef} id="settings-modal" className={`settings-modal`}>
      <form onSubmit={handleSubmit}>
        <header>
          <h2>Settings</h2>
          <button
            commandfor="settings-modal"
            command="close"
            type="button"
            aria-label="close settings"
          >
            <img src={iconClose} alt="" aria-hidden="true" />
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
                  min={1}
                  max={99}
                  value={draftPreferences.pomodoroTime}
                  onChange={handleChange}
                  autoFocus
                  aria-invalid={errors.pomodoroTime ? "true" : "false"}
                  aria-describedby={
                    errors.pomodoroTime ? "pomodoro-error" : undefined
                  }
                />
                {errors.pomodoroTime && (
                  <p id="pomodoro-error" className="error-message">
                    {errors.pomodoroTime}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="short-break-time">Short break</label>
                <input
                  type="number"
                  id="short-break-time"
                  name="shortBreakTime"
                  min={1}
                  max={99}
                  value={draftPreferences.shortBreakTime}
                  onChange={handleChange}
                  aria-invalid={errors.shortBreakTime ? "true" : "false"}
                  aria-describedby={
                    errors.shortBreakTime ? "pomodoro-error" : undefined
                  }
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
                  min={1}
                  max={99}
                  value={draftPreferences.longBreakTime}
                  onChange={handleChange}
                  aria-invalid={errors.longBreakTime ? "true" : "false"}
                  aria-describedby={
                    errors.longBreakTime ? "pomodoro-error" : undefined
                  }
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
                    className="sr-only"
                  />
                  <label htmlFor="font-sans" className="font-sans">
                    <span aria-hidden="true">Aa</span>
                    <span className="sr-only">Sans-serif font</span>
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
                    className="sr-only"
                  />
                  <label htmlFor="font-serif" className="font-serif">
                    <span aria-hidden="true">Aa</span>
                    <span className="sr-only">Serif font</span>
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
                    className="sr-only"
                  />
                  <label htmlFor="font-mono" className="font-mono">
                    <span aria-hidden="true">Aa</span>
                    <span className="sr-only">Monospace font</span>
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
                    className="sr-only"
                  />
                  <label htmlFor="color-red" className="bg-red">
                    <span className="sr-only">Red theme</span>
                  </label>
                </div>
                <div className="option">
                  <input
                    type="radio"
                    id="color-cyan"
                    name="color"
                    value="cyan"
                    checked={draftPreferences.color === "cyan"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <label htmlFor="color-cyan" className="bg-cyan">
                    <span className="sr-only">Cyan theme</span>
                  </label>
                </div>
                <div className="option">
                  <input
                    type="radio"
                    id="color-purple"
                    name="color"
                    value="purple"
                    checked={draftPreferences.color === "purple"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <label htmlFor="color-purple" className="bg-purple">
                    <span className="sr-only">Purple theme</span>
                  </label>
                </div>
              </div>
            </fieldset>
          </section>
          <button type="submit" className="btn">
            Apply
          </button>
        </main>
      </form>
    </dialog>
  );
}
