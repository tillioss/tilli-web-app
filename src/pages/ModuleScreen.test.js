import React from "react";
import { render } from "@testing-library/react";
import ModuleScreen from "./ModuleScreen";
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

describe("ModuleScreen", () => {
  test("renders without errors", () => {
    render(
      <Provider store={store}>
        <Router>
          <ModuleScreen match={{ params: { id: 23 } }} />
        </Router>
      </Provider>
    );
  });
});
