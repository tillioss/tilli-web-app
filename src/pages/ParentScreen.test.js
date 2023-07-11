import React from "react";
import { render } from "@testing-library/react";
import ParentScreen from "./ParentScreen";
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

describe("ParentScreen", () => {
  test("renders without errors", () => {
    render(
      <Provider store={store}>
        <Router>
          <ParentScreen />
        </Router>
      </Provider>
    );
  });
});
