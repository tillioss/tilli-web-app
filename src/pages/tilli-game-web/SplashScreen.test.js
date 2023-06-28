import React from "react";
import { render } from "@testing-library/react";
import SplashScreen from "./SplashScreen";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({
  gameAuthReducer: { createEmailId: "", createPassword: "" },
});

describe("SplashScreen", () => {
  test("renders without errors", () => {
    render(
      <Provider store={store}>
        <Router>
          <SplashScreen />
        </Router>
      </Provider>
    );
  });
});
