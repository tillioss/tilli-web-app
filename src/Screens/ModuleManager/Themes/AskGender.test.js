import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import AskGender from "./AskGender";

const mockStore = configureMockStore();

describe("AskGender component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      languageReducer: {
        commonGroupLanguageMappingData: {},
        commonGroupLanguageBaseData: {},
      },
    });
  });

  test("renders AskGender component", () => {
    render(
      <Provider store={store}>
        <Router>
          <AskGender data={{ content: {} }} />
        </Router>
      </Provider>
    );
  });
});
