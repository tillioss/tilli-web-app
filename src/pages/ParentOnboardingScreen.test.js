import React from "react";
import { render } from "@testing-library/react";
import ParentOnboardingScreen from "./ParentOnboardingScreen";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({
  languageReducer: {
    outerGroupLanguageMappingData: [],
    outerGroupLanguageBaseData: [],
    innnerGroupLanguageBaseData: [],
    innerGroupLanguageMappingData: [],
    commonGroupLanguageMappingData: [],
    commonGroupLanguageBaseData: [],
  },
});

describe("ParentOnboardingScreen", () => {
  test("renders the content", () => {
    render(
      <Provider store={store}>
        <Router>
          <ParentOnboardingScreen />
        </Router>
      </Provider>
    );
  });
});
