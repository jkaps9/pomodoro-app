import { useState, useEffect } from "react";
import Header from "./components/Header";
import Timer from "./components/Timer";
import SettingsButton from "./components/SettingsButton";
import SettingsModal from "./components/SettingsModal";

const DEFAULT_PREFERENCES = {
  pomodoroTime: 25,
  shortBreakTime: 5,
  longBreakTime: 15,
  font: "sans",
  color: "red",
};

export default function App() {
  const [timerDuration, setTimerDuration] = useState(20 * 60);
  const [preferences, setPreferences] = useState(() => {
    const savedPreferences = localStorage.getItem("preferences");
    return savedPreferences
      ? JSON.parse(savedPreferences)
      : DEFAULT_PREFERENCES;
  });

  useEffect(() => {
    localStorage.setItem("app-preferences", JSON.stringify(preferences));
  }, [preferences]);

  const handlePreferenceChange = (e) => {
    const { name, value } = e.target;
    setPreferences((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const durations = [20, 5, 15];

  function setDuration(newIndex) {
    setTimerDuration(durations[newIndex] * 60);
  }

  return (
    <>
      <Header onClick={setDuration}></Header>
      <main>
        <section>
          <Timer key={timerDuration} initialTime={timerDuration}></Timer>
        </section>
        <section>
          <SettingsButton></SettingsButton>
          <SettingsModal
            isVisible={true}
            preferences={preferences}
            onChange={handlePreferenceChange}
          ></SettingsModal>
        </section>
      </main>
    </>
  );
}
