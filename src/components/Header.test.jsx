import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Header from "./Header";

describe("Header Component", () => {
  // Test 1: Logo Rendering
  it("renders the logo with the correct alt text", () => {
    // Provide the required props
    render(<Header currentTimer="pomodoroTime" onClick={() => {}} />);

    // Query by the updated, accessible alt text
    const logo = screen.getByAltText("Pomodoro App");
    expect(logo).toBeInTheDocument();

    // Verify the src attribute exists, accommodating Vite's asset transformation
    expect(logo).toHaveAttribute("src");
  });

  // Test 2: NavBar Integration & Props
  it("renders the NavBar and passes down the currentTimer prop", () => {
    // Pass shortBreakTime to verify the prop trickles down properly
    render(<Header currentTimer="shortBreakTime" onClick={() => {}} />);

    // If the Header passed the prop correctly, the short break button will be active
    const shortBreakButton = screen.getByRole("button", {
      name: /short break/i,
    });
    expect(shortBreakButton).toHaveAttribute("aria-current", "true");
  });

  // Test 3: Click Handler Delegation
  it("passes the onClick handler down to the NavBar", async () => {
    const user = userEvent.setup();
    const mockOnClick = vi.fn();

    render(<Header currentTimer="pomodoroTime" onClick={mockOnClick} />);

    const longBreakButton = screen.getByRole("button", { name: /long break/i });

    // Simulate a user clicking the button inside the NavBar
    await user.click(longBreakButton);

    // Verify the Header's mockOnClick was triggered with the correct payload
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith("longBreakTime");
  });
});
