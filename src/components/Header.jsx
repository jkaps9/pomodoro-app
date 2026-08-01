import Logo from "/logo.svg";
import NavBar from "./NavBar";
import "../styles/Header.css";

export default function Header({ timerDuration, onClick }) {
  return (
    <>
      <header>
        <img src={Logo} alt="Pomodoro site logo" className="logo" />
        <NavBar timerDuration={timerDuration} onClick={onClick}></NavBar>
      </header>
    </>
  );
}
