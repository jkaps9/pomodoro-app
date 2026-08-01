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
  const [preferences, setPreferences] = useState(() => {
    const savedPreferences = localStorage.getItem("app-preferences");
    return savedPreferences
      ? JSON.parse(savedPreferences)
      : DEFAULT_PREFERENCES;
  });

  const [currentTimer, setCurrentTimer] = useState("pomodoroTime");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", preferences.color);
    document.documentElement.setAttribute("data-font", preferences.font);

    localStorage.setItem("app-preferences", JSON.stringify(preferences));
  }, [preferences]);

  const handleApplyPreferences = (newPreferences) => {
    setPreferences(newPreferences);
  };

  function setTimer(newIndex) {
    setCurrentTimer(newIndex);
  }

  return (
    <>
      <Header onClick={setTimer}></Header>
      <main>
        <section>
          <Timer
            key={preferences[currentTimer]}
            initialTime={preferences[currentTimer]}
          ></Timer>
        </section>
        <section>
          <SettingsButton></SettingsButton>
          <SettingsModal
            isVisible={true}
            currentPreferences={preferences}
            onApply={handleApplyPreferences}
          ></SettingsModal>
        </section>
      </main>
    </>
  );
}
