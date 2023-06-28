import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import LevelScreen from "./LevelScreen";
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

describe("LevelScreen", () => {
  test("renders without errors", () => {
    render(
      <Provider store={store}>
        <Router>
          <LevelScreen />
        </Router>
      </Provider>
    );
  });

  test("displays the correct content", () => {
    render(
      <Provider store={store}>
        <Router>
          <LevelScreen />
        </Router>
      </Provider>
    );

    expect(screen.getByText("LevelScreen")).toBeInTheDocument();
  });
});
