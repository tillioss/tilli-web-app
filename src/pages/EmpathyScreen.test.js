import React from "react";
import { render } from "@testing-library/react";
import EmpathyScreen from "./EmpathyScreen";
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

describe("HomeScreen", () => {
  test("renders without errors", () => {
    render(
      <Provider store={store}>
        <EmpathyScreen />
      </Provider>
    );
  });
});
