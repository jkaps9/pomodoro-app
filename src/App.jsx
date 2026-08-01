import Header from "./components/Header";
import Footer from "./components/Footer";
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
      </main>
      <Footer></Footer>
    </>
  );
}
