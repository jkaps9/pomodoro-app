import SettingsIcon from "/icon-settings.svg";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer>
      <button aria-label="open settings">
        <img src={SettingsIcon} alt="settings icon" />
      </button>
    </footer>
  );
}
