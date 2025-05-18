import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AudioQuizScreen from "./AudioQuizScreen";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";

jest.mock("react-speech-recognition", () => {
  const mockStartListening = jest.fn();
  const mockStopListening = jest.fn();
  return {
    useSpeechRecognition: () => ({
      transcript: "I feel okay",
      resetTranscript: jest.fn(),
    }),
    startListening: mockStartListening,
    stopListening: mockStopListening,
    browserSupportsSpeechRecognition: () => true, // ensures SupportedBrowser = true
  };
});

// Mocks for images
jest.mock("../../../images/fillIconOnly.png", () => "fillIconOnly.png");
// (add other image mocks as needed)

const store = configureStore()({
  languageReducer: {
    commonGroupLanguageMappingData: {
      1: {
        fieldData: {
          4: { value: "Fallback UI" },
        },
      },
    },
    commonGroupLanguageBaseData: {},
  },
});

const testData = {
  title: "<h2>Test Audio Quiz</h2>",
  content: {
    imageclassname: "test-class",
    changeColorBox: "#FFBD12",
    feelingsDataList: [
      {
        questions: "<strong>How are you feeling today?</strong>",
        results: "Some typed response",
      },
    ],
  },
};

describe("AudioQuizScreen with supported speech recognition", () => {
  it("renders textarea instead of speech UI", () => {
    render(
      <Provider store={store}>
        <Router>
          <AudioQuizScreen
            stage={1}
            data={testData}
            trustPointText="Trust Points"
            totalPoint={10}
            PercentageTotal={30}
            themeType="StoryCard"
            changeStage={jest.fn()}
            changeindex={jest.fn()}
          />
        </Router>
      </Provider>
    );
  });
});
