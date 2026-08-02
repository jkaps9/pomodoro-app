import { render, screen, fireEvent } from "@testing-library/react";

import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  beforeAll,
} from "vitest";
import App from "./App";

// Mock the native dialog method for the SettingsModal
beforeAll(() => {
  HTMLDialogElement.prototype.close = vi.fn();
});

describe("App Integration", () => {
  beforeEach(() => {
    // Clear localStorage and DOM attributes before every test
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
    document.documentElement.removeAttribute("data-font");

    // Use fake timers because the App renders the Timer component
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("initializes with default preferences and sets document attributes", () => {
    render(<App />);

    // Verify CSS variables are injected into the HTML tag
    expect(document.documentElement.getAttribute("data-theme")).toBe("red");
    expect(document.documentElement.getAttribute("data-font")).toBe("sans");

    // Verify Timer renders the default Pomodoro time (25:00)
    expect(
      screen.getByText(/25 minutes and 0 seconds remaining/i),
    ).toBeInTheDocument();
  });

  it("loads saved preferences from localStorage on mount", () => {
    // Seed localStorage with a custom configuration before rendering
    const customPrefs = {
      pomodoroTime: 50,
      shortBreakTime: 10,
      longBreakTime: 30,
      font: "mono",
      color: "cyan",
    };
    localStorage.setItem("app-preferences", JSON.stringify(customPrefs));

    render(<App />);

    expect(document.documentElement.getAttribute("data-theme")).toBe("cyan");
    expect(document.documentElement.getAttribute("data-font")).toBe("mono");

    // Verify Timer respects the localStorage time
    expect(
      screen.getByText(/50 minutes and 0 seconds remaining/i),
    ).toBeInTheDocument();
  });

  it("switches timers when navigation tabs are clicked", () => {
    render(<App />);

    const shortBreakTab = screen.getByRole("button", { name: /short break/i });
    fireEvent.click(shortBreakTab);

    // Verify the Timer component re-rendered with the Short Break time (5:00)
    expect(
      screen.getByText(/5 minutes and 0 seconds remaining/i),
    ).toBeInTheDocument();
  });

  it("updates preferences, localStorage, and document attributes when Settings are applied", () => {
    render(<App />);

    // Force the settings dialog open (bypassing JSDOM Invokers API limitation)
    document.getElementById("settings-modal").setAttribute("open", "true");

    const pomodoroInput = screen.getByLabelText(/pomodoro/i);
    const purpleRadio = screen.getByLabelText(/purple theme/i);

    // Update settings: 45 minute Pomodoro and Purple theme
    fireEvent.change(pomodoroInput, { target: { value: "45" } });
    fireEvent.click(purpleRadio);

    // Apply settings
    const applyButton = screen.getByRole("button", { name: /apply/i });
    fireEvent.click(applyButton);

    // Verify Timer updated to 45 minutes
    expect(
      screen.getByText(/45 minutes and 0 seconds remaining/i),
    ).toBeInTheDocument();

    // Verify Document theme updated
    expect(document.documentElement.getAttribute("data-theme")).toBe("purple");

    // Verify localStorage updated
    const savedData = JSON.parse(localStorage.getItem("app-preferences"));
    expect(savedData.pomodoroTime).toBe(45);
    expect(savedData.color).toBe("purple");
  });
});
