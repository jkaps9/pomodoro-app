import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import NavBar from "./NavBar";

describe("NavBar Component", () => {
  it("renders all three navigation tabs", () => {
    render(<NavBar onClick={() => {}} />);

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

  it("sets the 'pomodoro' tab as active by default", () => {
    render(<NavBar onClick={() => {}} />);

    const pomodoroButton = screen.getByRole("button", { name: /pomodoro/i });
    const shortBreakButton = screen.getByRole("button", {
      name: /short break/i,
    });

    expect(pomodoroButton).toHaveAttribute("aria-current", "true");
    expect(shortBreakButton).not.toHaveAttribute("aria-current");
  });

  it("updates the active state when a new tab is clicked", async () => {
    const user = userEvent.setup();
    render(<NavBar onClick={() => {}} />);

    const pomodoroButton = screen.getByRole("button", { name: /pomodoro/i });
    const shortBreakButton = screen.getByRole("button", {
      name: /short break/i,
    });

    await user.click(shortBreakButton);

    expect(shortBreakButton).toHaveAttribute("aria-current", "true");
    expect(pomodoroButton).not.toHaveAttribute("aria-current");
  });

  it("calls the onClick prop with the correct tab ID when clicked", async () => {
    const user = userEvent.setup();
    const mockOnClick = vi.fn();

    render(<NavBar onClick={mockOnClick} />);

    const longBreakButton = screen.getByRole("button", { name: /long break/i });

    await user.click(longBreakButton);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith("longBreakTime");
  });
});
