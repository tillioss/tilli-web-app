import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import NoMatch from "./NoMatch";
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

describe("NoMatch", () => {
  it("renders the component", () => {
    render(
      <Provider store={store}>
        <Router>
          <NoMatch />
        </Router>
      </Provider>
    );
  });
});
