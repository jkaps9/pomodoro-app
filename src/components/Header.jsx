import Logo from "../assets/icons/logo.svg";
import NavBar from "./NavBar";
import "./Header.css";

export default function Header({ currentTimer, onClick }) {
  return (
    <header id="header">
      <img src={Logo} alt="Pomodoro App" className="logo" />
      <NavBar currentTimer={currentTimer} onClick={onClick}></NavBar>
    </header>
  );
}
