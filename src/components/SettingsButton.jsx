import SettingsIcon from "/icon-settings.svg";
import "../styles/SettingsButton.css";

export default function Footer() {
  return (
    <div>
      <button aria-label="open settings">
        <img src={SettingsIcon} alt="settings icon" />
      </button>
    </div>
  );
}
