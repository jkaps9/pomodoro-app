import { render, screen } from "@testing-library/react";
import SettingsButton from "./SettingsButton";
import { describe, it, expect } from "vitest"; // If globals are not enabled

describe("SettingsButton Component", () => {
  it("renders the button with the correct attributes and icon", () => {
    render(<SettingsButton />);

    const button = screen.getByRole("button", { name: /open settings/i });
    expect(button).toBeInTheDocument();
  });

  it("applies the correct custom command attributes", () => {
    render(<SettingsButton />);

    const button = screen.getByRole("button", { name: /open settings/i });

    expect(button).toHaveAttribute("command", "show-modal");
    expect(button).toHaveAttribute("commandfor", "settings-modal");
  });

  it("renders the settings icon inside the button", () => {
    const { container } = render(<SettingsButton />);

    const button = screen.getByRole("button", { name: /open settings/i });

    const icon = container.querySelector("img");

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("src");
    expect(button).toContainElement(icon);
  });
});
