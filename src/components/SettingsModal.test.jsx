import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeAll } from "vitest";
import SettingsModal from "./SettingsModal";

// Mock the native dialog methods that JSDOM doesn't support
beforeAll(() => {
  HTMLDialogElement.prototype.close = vi.fn();
});

const defaultPreferences = {
  pomodoroTime: 25,
  shortBreakTime: 5,
  longBreakTime: 15,
  font: "sans",
  color: "red",
};

describe("SettingsModal Component", () => {
  // Test 1: Rendering & Default State
  it("populates inputs and radios with the current preferences", () => {
    render(
      <SettingsModal
        currentPreferences={defaultPreferences}
        onApply={() => {}}
      />,
    );

    // Verify number inputs
    expect(screen.getByLabelText(/pomodoro/i)).toHaveValue(25);
    expect(screen.getByLabelText(/short break/i)).toHaveValue(5);
    expect(screen.getByLabelText(/long break/i)).toHaveValue(15);

    // Verify radio buttons
    expect(screen.getByLabelText(/sans-serif font/i)).toBeChecked();
    expect(screen.getByLabelText(/red theme/i)).toBeChecked();

    // Verify an unselected radio is NOT checked
    expect(screen.getByLabelText(/cyan theme/i)).not.toBeChecked();
  });

  // Test 2: Validation Logic
  it("displays error messages for invalid inputs and prevents submission", async () => {
    const user = userEvent.setup();
    const mockOnApply = vi.fn();

    render(
      <SettingsModal
        currentPreferences={defaultPreferences}
        onApply={mockOnApply}
      />,
    );

    document.getElementById("settings-modal").setAttribute("open", "true");

    const pomodoroInput = screen.getByLabelText(/pomodoro/i);
    const shortBreakInput = screen.getByLabelText(/short break/i);

    // Clear the Pomodoro input completely
    await user.clear(pomodoroInput);

    // Set Short Break to an invalid number (0)
    await user.clear(shortBreakInput);
    await user.type(shortBreakInput, "0");

    // Attempt to submit
    const applyButton = screen.getByRole("button", { name: /apply/i });
    await user.click(applyButton);

    // Verify validation errors appear on the screen
    expect(screen.getByText("Time cannot be blank")).toBeInTheDocument();
    expect(screen.getByText("Value must be from 1 to 99")).toBeInTheDocument();

    // Verify the form did NOT submit
    expect(mockOnApply).not.toHaveBeenCalled();
  });

  // Test 3: Successful Submission
  it("calls onApply with updated preferences and closes the dialog on successful submit", async () => {
    const user = userEvent.setup();
    const mockOnApply = vi.fn();

    render(
      <SettingsModal
        currentPreferences={defaultPreferences}
        onApply={mockOnApply}
      />,
    );

    document.getElementById("settings-modal").setAttribute("open", "true");

    const pomodoroInput = screen.getByLabelText(/pomodoro/i);
    const cyanRadio = screen.getByLabelText(/cyan theme/i);
    const monoRadio = screen.getByLabelText(/monospace font/i);

    // Update the preferences
    await user.clear(pomodoroInput);
    await user.type(pomodoroInput, "30");
    await user.click(cyanRadio);
    await user.click(monoRadio);

    // Submit the form
    const applyButton = screen.getByRole("button", { name: /apply/i });
    await user.click(applyButton);

    // Verify onApply was called with the exact new state object
    expect(mockOnApply).toHaveBeenCalledTimes(1);
    expect(mockOnApply).toHaveBeenCalledWith({
      pomodoroTime: 30,
      shortBreakTime: 5, // Left unchanged
      longBreakTime: 15, // Left unchanged
      font: "mono", // Updated
      color: "cyan", // Updated
    });

    // Verify the native dialog close method was called
    expect(HTMLDialogElement.prototype.close).toHaveBeenCalledTimes(1);
  });
});
