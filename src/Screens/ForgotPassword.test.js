import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ForgotPassword from "./ForgotPassword";

const mockStore = configureStore([]);

describe("ForgotPassword component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      languageReducer: {
        outerGroupLanguageMappingData: [
          {},
          {},
          {},
          { fieldData: [{}, { value: "Email" }, { value: "Submit" }] },
        ],
        outerGroupLanguageBaseData: [
          {},
          {},
          {},
          { fieldData: [{}, { value: "Email" }, { value: "Submit" }] },
        ],
      },
    });
  });

  it("displays the form and handles submit", () => {
    const mockSubmit = jest.fn();

    render(
      <Provider store={store}>
        <ForgotPassword onSubmit={mockSubmit} />
      </Provider>
    );

    const headerElement = screen.getByRole("heading", {
      name: "Forgot Password",
    });
    expect(headerElement).toBeInTheDocument();

    const emailInput = screen.getByPlaceholderText("Email");
    expect(emailInput).toBeInTheDocument();

    const submitButton = screen.getByRole("button", { name: "Submit" });
    expect(submitButton).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    fireEvent.click(submitButton);
  });

  it("displays error message for invalid email", () => {
    render(
      <Provider store={store}>
        <ForgotPassword />
      </Provider>
    );

    // Simulate user input with an invalid email
    const emailInput = screen.getByPlaceholderText("Email");
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });

    // Simulate form submission
    const submitButton = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(submitButton);

    // Assertions for error message
    const errorMessage = screen.getByText("Invalid email address");
    expect(errorMessage).toBeInTheDocument();
  });
});
