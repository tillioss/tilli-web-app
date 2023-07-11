import React from "react";
import { render } from "@testing-library/react";
import RegisterScreen from "./RegisterScreen";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({
  gameAuthReducer: { createEmailId: "", createPassword: "" },
});

describe("RegisterScreen", () => {
  test("renders without errors", () => {
    render(
      <Provider store={store}>
        <Router>
          <RegisterScreen />
        </Router>
      </Provider>
    );
  });
});
