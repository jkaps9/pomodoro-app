import SettingsIcon from "../assets/icons/icon-settings.svg";
import "../styles/SettingsButton.css";

export default function SettingsButton() {
  return (
    <div>
      <button
        aria-label="open settings"
        command="show-modal"
        commandfor="settings-modal"
      >
        <img src={SettingsIcon} alt="" aria-hidden="true" />
      </button>
    </div>
  );
}
