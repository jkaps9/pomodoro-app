import Logo from "/logo.svg";
import NavBar from "./NavBar";
import "../styles/Header.css";

export default function Header({ onClick }) {
  return (
    <header id="header">
      <img src={Logo} alt="Pomodoro App" className="logo" />
      <NavBar onClick={onClick}></NavBar>
    </header>
  );
}
