import { useState } from "react";
import Header from "./components/Header";
import Timer from "./components/Timer";
import SettingsButton from "./components/SettingsButton";
import SettingsModal from "./components/SettingsModal";

export default function App() {
  const [timerDuration, setTimerDuration] = useState(20 * 60);

  const durations = [20, 5, 15];
  const preferences = {
    times: {
      pomodoro: durations[0],
      shortBreak: durations[1],
      longBreak: durations[2],
    },
    font: "sans",
    color: "red",
  };

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
          ></SettingsModal>
        </section>
      </main>
    </>
  );
}
