import React from "react";
import { render } from "@testing-library/react";
import AskAge from "./AskAge";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";

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

describe("AskAge Component", () => {
  test("renders component correctly", () => {
    render(
      <Provider store={store}>
        <Router>
          <AskAge
            data={{
              content: { image: { fileName: "myfile", fileType: "jpeg" } },
            }}
          />
        </Router>
      </Provider>
    );
  });
});
