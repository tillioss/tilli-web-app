import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import CreateProfile from "./CreateProfile";
import { BrowserRouter as Router } from "react-router-dom";

// Create a mock Redux store
const mockStore = configureStore([]);
const initialState = {
  gameAuthReducer: {
    childName: "",
    ageSelected: {},
    schoolSelected: {},
    classSelected: {},
    gender: "",
  },
};
const store = mockStore(initialState);

describe("CreateProfile", () => {
  it("renders the component", () => {
    render(
      <Provider store={store}>
        <Router>
          <CreateProfile />
        </Router>
      </Provider>
    );

    // Assert that the component is rendered
    expect(screen.getByText("Welcome!")).toBeInTheDocument();
    expect(
      screen.getByText("Create a Profile for your Child")
    ).toBeInTheDocument();
  });
});
