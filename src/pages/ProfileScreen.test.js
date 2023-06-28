import React from "react";
import { render } from "@testing-library/react";
import ProfileScreen from "./ProfileScreen";
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

describe("ProfileScreen", () => {
  test("renders the content", () => {
    render(
      <Provider store={store}>
        <Router>
          <ProfileScreen />
        </Router>
      </Provider>
    );
  });
});
