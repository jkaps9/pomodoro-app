import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import NavBar from "./NavBar";

describe("NavBar Component", () => {
  it("renders all three navigation tabs", () => {
    // Provide the required currentTimer prop
    render(<NavBar currentTimer="pomodoroTime" onClick={() => {}} />);

    expect(
      screen.getByRole("button", { name: /pomodoro/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /short break/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /long break/i }),
    ).toBeInTheDocument();
  });

  it("sets the correct tab as active based on the currentTimer prop", () => {
    // Pass in shortBreakTime to verify it strictly respects the prop
    render(<NavBar currentTimer="shortBreakTime" onClick={() => {}} />);

    const pomodoroButton = screen.getByRole("button", { name: /pomodoro/i });
    const shortBreakButton = screen.getByRole("button", {
      name: /short break/i,
    });

    expect(shortBreakButton).toHaveAttribute("aria-current", "true");
    expect(pomodoroButton).not.toHaveAttribute("aria-current");
  });

  it("calls the onClick prop with the correct tab ID when clicked", async () => {
    const user = userEvent.setup();
    const mockOnClick = vi.fn();

    render(<NavBar currentTimer="pomodoroTime" onClick={mockOnClick} />);

    const longBreakButton = screen.getByRole("button", { name: /long break/i });

    await user.click(longBreakButton);

    // Verify it notifies the parent to handle the state change
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith("longBreakTime");
  });
});
