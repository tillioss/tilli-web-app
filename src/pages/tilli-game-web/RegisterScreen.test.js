import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import RegisterScreen from "./RegisterScreen";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import * as Common from "../../config/Common";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

jest.mock("../../config/Common", () => ({
  doConnect: jest.fn(),
}));

const mockStore = configureStore([]);

const setup = (storeOverrides = {}) => {
  const store = mockStore({
    gameAuthReducer: {
      createEmailId: "",
      createPassword: "",
      ...storeOverrides,
    },
  });
  const history = createMemoryHistory();
  const path = "/game";

  render(
    <Provider store={store}>
      <Router history={history}>
        <RegisterScreen path={path} />
      </Router>
    </Provider>
  );

  return { store, history };
};

describe("RegisterScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders input fields", () => {
    setup();
    expect(screen.getByPlaceholderText("Enter Email Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Password")).toBeInTheDocument();
  });

  test("shows validation error for empty fields", async () => {
    setup();
    fireEvent.click(screen.getByText("Sign Up"));
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Please Enter Mail!", expect.anything());
    });
  });

  test("shows error for invalid email", async () => {
    setup({ createEmailId: "bademail", createPassword: "pass1234" });
    fireEvent.click(screen.getByText("Sign Up"));
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Please Enter Your Correct MailId!", expect.anything());
    });
  });

  test("shows error for missing password", async () => {
    setup({ createEmailId: "test@example.com", createPassword: "" });
    fireEvent.click(screen.getByText("Sign Up"));
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Please Enter Your Password!", expect.anything());
    });
  });

  test("shows error if email already exists", async () => {
    Common.doConnect.mockResolvedValue({ response: true });
    setup({ createEmailId: "test@example.com", createPassword: "pass1234" });
    fireEvent.click(screen.getByText("Sign Up"));
    await waitFor(() => {
      expect(Common.doConnect).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith("This email id already using!", expect.anything());
    });
  });

  test("navigates to /createprofile on success", async () => {
    Common.doConnect.mockResolvedValue({ response: false });
    const { history } = setup({ createEmailId: "new@example.com", createPassword: "pass1234" });

    fireEvent.click(screen.getByText("Sign Up"));

    await waitFor(() => {
      expect(history.location.pathname).toBe("/game/createprofile");
    });
  });

  test("toggles password visibility", () => {
    setup({ createPassword: "hidden123" });
    const toggle = screen.getByText("Show");
    fireEvent.click(toggle);
    expect(screen.getByDisplayValue("hidden123").type).toBe("text");
    fireEvent.click(screen.getByText("Hide"));
    expect(screen.getByDisplayValue("hidden123").type).toBe("password");
  });

  test("email and password input updates Redux store", () => {
    const { store } = setup();
    const emailInput = screen.getByPlaceholderText("Enter Email Address");
    const passwordInput = screen.getByPlaceholderText("Enter Password");

    fireEvent.change(emailInput, { target: { value: "change@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "mypassword" } });

    const actions = store.getActions();
    expect(actions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: "SET_MULTIPLE_GAME_AUTH",
          data: { createEmailId: "change@example.com" },
        }),
        expect.objectContaining({
          type: "SET_MULTIPLE_GAME_AUTH",
          data: { createPassword: "mypassword" },
        }),
      ])
    );
  });
});
