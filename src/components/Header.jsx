import Logo from "/logo.svg";
import NavBar from "./NavBar";

export default function Header() {
  return (
    <>
      <header>
        <img src={Logo} alt="Pomodoro site logo" className="logo" />
        <NavBar></NavBar>
      </header>
    </>
  );
}
