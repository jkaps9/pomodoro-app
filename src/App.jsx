import Header from "./components/Header";
import SettingsButton from "./components/SettingsButton";
import Timer from "./components/Timer";
import "./App.css";

export default function App() {
  return (
    <>
      <Header></Header>
      <main>
        <section>
          <Timer initialTime={20 * 60}></Timer>
        </section>
        <section>
          <SettingsButton></SettingsButton>
        </section>
      </main>
    </>
  );
}
