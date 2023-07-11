import React from "react";
import { render, screen } from "@testing-library/react";
import AudioQuizScreen from "./AudioQuizScreen";
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

describe("AudioQuizScreen", () => {
  test("renders AudioRecognize1 component", () => {
    render(
      <Provider store={store}>
        <Router>
          <AudioQuizScreen
            data={{
              title: "This is a title",
              content: { feelingsDataList: [{ results: 5 }] },
            }}
          />
        </Router>
      </Provider>
    );
    expect(screen.getByText("Next")).toBeInTheDocument();
  });
});
