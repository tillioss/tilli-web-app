import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Login from "./Login";
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

describe("Login", () => {
  it("renders the component", () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );
  });
});
