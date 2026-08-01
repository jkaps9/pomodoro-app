import { useState } from "react";
import Header from "./components/Header";
import SettingsButton from "./components/SettingsButton";
import Timer from "./components/Timer";

export default function App() {
  const [timerDuration, setTimerDuration] = useState(20 * 60);

  function setDuration(newIndex) {
    const durations = [20, 5, 15];
    setTimerDuration(durations[newIndex] * 60);
  }

  return (
    <>
      <Header timerDuration={timerDuration} onClick={setDuration}></Header>
      <main>
        <section>
          <Timer key={timerDuration} initialTime={timerDuration}></Timer>
        </section>
        <section>
          <SettingsButton></SettingsButton>
        </section>
      </main>
    </>
  );
}
