import SettingsIcon from "/icon-settings.svg";
import "../styles/SettingsButton.css";

export default function SettingsButton({ onClick }) {
  return (
    <div>
      <button
        aria-label="open settings"
        command="show-modal"
        commandfor="settings-modal"
      >
        <img src={SettingsIcon} alt="settings icon" />
      </button>
    </div>
  );
}
