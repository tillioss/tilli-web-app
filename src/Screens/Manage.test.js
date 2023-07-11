import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Manage from "./Manage";

const mockStore = configureStore([]);

describe("Manage", () => {
  test("renders Manage component with language selection", () => {
    render(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <Manage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Sinhala")).toBeInTheDocument();
    expect(screen.getByText("Tamil")).toBeInTheDocument();
    expect(screen.getByText("English")).toBeInTheDocument();
  });

  test("updates language selection on click", () => {
    render(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <Manage />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText("Tamil"));

    expect(screen.getByText("Tamil")).toHaveClass("active");
  });

  test("navigates to module page on continue button click", () => {
    const mockHistoryPush = jest.fn();

    render(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <Manage history={{ push: mockHistoryPush }} />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText("Continue"));

    expect(mockHistoryPush).toHaveBeenCalledWith(
      "/tilli-web/demo?gender=female&age=7&language=tamil"
    );
  });
});
