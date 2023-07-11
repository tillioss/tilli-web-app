import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

describe("NotFoundPage", () => {
  test("renders NotFoundPage component with correct content", () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByText("404 - Page Not Found.")).toBeInTheDocument();
    expect(
      screen.getByText(
        "The Page you are looking for might have been removed had its name changed or is temporarily unavailable."
      )
    ).toBeInTheDocument();
  });
});
