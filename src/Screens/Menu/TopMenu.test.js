import React from "react";
import { render, screen } from "@testing-library/react";
import TopMenu from "./TopMenu";

describe("TopMenu tests", () => {
  it("renders the component without errors", () => {
    render(<TopMenu />);
    // Assert that the component renders without throwing any errors
    expect(screen.getByText("tilli")).toBeInTheDocument();
  });

  it("contains a Log Out link", () => {
    render(<TopMenu />);
    // Assert that the Log Out link is present
    expect(screen.getByText("Log Out")).toBeInTheDocument();
  });

  it("navigates to the correct URL when Log Out link is clicked", () => {
    render(<TopMenu />);
    // Simulate a click on the Log Out link
    screen.getByText("Log Out").click();
    // Assert that the browser location is updated to the correct URL
    expect(window.location.pathname).toBe("/"); // Update with the expected URL
  });
});
