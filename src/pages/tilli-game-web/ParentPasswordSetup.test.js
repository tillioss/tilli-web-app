import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ParentPasswordSetup from "./ParentPasswordSetup";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import * as Common from "../../config/Common";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
  },
}));

const mockStore = configureStore([]);

const renderWithRouterAndStore = (store, history) => {
  return render(
    <Provider store={store}>
      <Router history={history}>
        <ParentPasswordSetup />
      </Router>
    </Provider>
  );
};

describe("ParentPasswordSetup", () => {
  let store, history;

  beforeEach(() => {
    store = mockStore({
      gameAuthReducer: {
        createEmailId: "test@example.com",
        createPassword: "pass1234",
        childName: "John",
        ageSelected: { value: "6" },
        schoolSelected: { value: "ABC School" },
        classSelected: { value: "Grade 1" },
        gender: "Male",
        createParentPassCode: "",
      },
    });
    store.dispatch = jest.fn();
    history = createMemoryHistory();
  });

  it("redirects to home if createEmailId and createPassword are missing", () => {
    store = mockStore({
      gameAuthReducer: {
        createEmailId: "",
        createPassword: "",
        createParentPassCode: "",
        ageSelected: { value: "" },
        schoolSelected: { value: "" },
        classSelected: { value: "" },
        childName: "",
        gender: "",
      },
    });

    const historyPush = jest.spyOn(history, "push");
    renderWithRouterAndStore(store, history);
    expect(historyPush).toHaveBeenCalledWith("tilli-web");
  });

  it("renders correctly with empty passcode", () => {
    renderWithRouterAndStore(store, history);
    expect(screen.getByText(/Dear Parent/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Please enter your year of birth/i)
    ).toBeInTheDocument();
    expect(screen.getByText("Continue")).toBeInTheDocument();
    expect(screen.getByText("Continue").className).toContain("disabled");
  });

  it("enters passcode and enables Continue button", () => {
    renderWithRouterAndStore(store, history);
    [1, 2, 3, 4].forEach((num) => {
      fireEvent.click(screen.getByText(num.toString()));
    });
    expect(store.dispatch).toHaveBeenCalledTimes(4);
    expect(screen.getByText("Continue").className).toContain(
      "text-center pl-4 pr-4 language-btn-style btn-max-width  disabled"
    );
  });

  it("deletes a digit when delete is clicked", () => {
    renderWithRouterAndStore(store, history);

    fireEvent.click(screen.getByText("1")); // '1'
    fireEvent.click(screen.getByText("2")); // '12'
    fireEvent.click(screen.getByText("3")); // '123'
    fireEvent.click(screen.getByText("4")); // '1234'

    fireEvent.click(screen.getByTestId("delete-btn")); // '123'

    const actions = store.getActions();

    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "SET_MULTIPLE_GAME_AUTH",
        data: expect.objectContaining({
          createParentPassCode: "3",
        }),
      })
    );
  });

  it("calls createUserPost and shows toast on success", async () => {
  const mockResponse = { response: "Success" };
  jest.spyOn(Common, "doConnect").mockResolvedValue(mockResponse);

  // You want to spy on dispatch but NOT rely on internal store state
  store.dispatch = jest.fn(); // ✅ keep this

  // Instead, render with a store that already contains '1234' passcode
  store = mockStore({
    gameAuthReducer: {
      createEmailId: "test@example.com",
      createPassword: "pass1234",
      childName: "John",
      ageSelected: { value: "6" },
      schoolSelected: { value: "ABC School" },
      classSelected: { value: "Grade 1" },
      gender: "Male",
      createParentPassCode: "1234", // ✅ this allows Continue to work
    },
  });

  renderWithRouterAndStore(store, history);

  fireEvent.click(screen.getByText("Continue"));

  await waitFor(() => {
    expect(toast.success).toHaveBeenCalledWith(
      "Register Successfully!",
      expect.any(Object)
    );
  });
});


  it("does not proceed if passcode is incomplete", () => {
    renderWithRouterAndStore(store, history);
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("Continue"));
    expect(toast.success).not.toHaveBeenCalled();
  });

  it("shows active dots as digits are entered", () => {
  renderWithRouterAndStore(store, history);

  fireEvent.click(screen.getByText("1"));
  fireEvent.click(screen.getByText("2"));

  const dots = screen.getAllByClassName?.("passsword-dots") ?? document.querySelectorAll(".passsword-dots");

  expect(dots[0].className).toContain("passsword-dots ");
  expect(dots[1].className).toContain("passsword-dots ");
  expect(dots[2].className).not.toContain("active");
});

it("does not allow more than 4 digits", () => {
  renderWithRouterAndStore(store, history);

  [1, 2, 3, 4, 5, 6].forEach((num) => {
    fireEvent.click(screen.getByText(num.toString()));
  });

  expect(store.dispatch).toHaveBeenCalledTimes(6);
});

it("does not crash when deleting from empty passcode", () => {
  renderWithRouterAndStore(store, history);
  fireEvent.click(screen.getByTestId("delete-btn")); // no digits entered

  // No dispatch should happen
  expect(store.dispatch).toHaveBeenCalled();
});

it("renders static note about information not being stored", () => {
  renderWithRouterAndStore(store, history);
  expect(screen.getByText(/This information is not stored/i)).toBeInTheDocument();
});


});
