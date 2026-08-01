import Logo from "/logo.svg";

export default function Header() {
  return (
    <>
      <header>
        <div className="container">
          <img src={Logo} alt="Pomodoro site logo" />
        </div>
      </header>
    </>
  );
}
