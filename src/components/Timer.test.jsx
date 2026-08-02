import { render, screen, act, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Timer from "./Timer";

describe("Timer Component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  // Test 1: Initial Render & Accessibility Basics
  it("renders the accessible time, progress bar, and START button", () => {
    render(<Timer initialTime={25} />);

    expect(screen.getByText(/25.*min.*0.*sec/i)).toBeInTheDocument();

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute("aria-valuenow", "1500");
    expect(progressBar).toHaveAttribute("aria-valuemax", "1500");

    expect(screen.getByRole("button", { name: /start/i })).toBeInTheDocument();
  });

  // Test 2: Start and Pause Interaction
  it("toggles the button text between START and PAUSE", () => {
    render(<Timer initialTime={25} />);
    const button = screen.getByRole("button", { name: /start/i });

    // Use fireEvent to bypass the frozen clock synchronously
    fireEvent.click(button);
    expect(screen.getByRole("button", { name: /pause/i })).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByRole("button", { name: /start/i })).toBeInTheDocument();
  });

  // Test 3: Countdown Logic
  it("counts down correctly and updates accessible attributes when started", () => {
    render(<Timer initialTime={25} />);

    const button = screen.getByRole("button", { name: /start/i });
    fireEvent.click(button);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByText(/24.*min.*59.*sec/i)).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "1499",
    );
  });

  // Test 4: Reset Functionality & Live Announcements
  it("announces when time is up, displays RESTART, and resets correctly", () => {
    render(<Timer initialTime={1} />);
    const button = screen.getByRole("button", { name: /start/i });

    fireEvent.click(button);

    act(() => {
      vi.advanceTimersByTime(60000);
    });

    expect(screen.getByText("Time is up!")).toBeInTheDocument();

    const restartButton = screen.getByRole("button", { name: /restart/i });
    expect(restartButton).toBeInTheDocument();

    fireEvent.click(restartButton);

    expect(screen.getByText(/1.*min.*0.*sec/i)).toBeInTheDocument();
    expect(screen.queryByText("Time is up!")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /start/i })).toBeInTheDocument();
  });
});
