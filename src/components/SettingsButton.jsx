import SettingsIcon from "/icon-settings.svg";
import "../styles/SettingsButton.css";

export default function SettingsButton({ onClick }) {
  return (
    <div>
      <button aria-label="open settings" onClick={onClick}>
        <img src={SettingsIcon} alt="settings icon" />
      </button>
    </div>
  );
}
