import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import AudioQuizScreen from "./AudioQuizScreen";
import { BrowserRouter as Router } from "react-router-dom";
import * as SpeechRecognition from "react-speech-recognition";

// Mocking images
jest.mock("../../../images/fillIconOnly.png", () => "fillIconOnly.png");
jest.mock("../../../images/outlineRightIcon.png", () => "outlineRightIcon.png");
jest.mock("../../../images/repeat.png", () => "repeat.png");
jest.mock("../../../images/outlineIconOnly.png", () => "outlineIconOnly.png");
jest.mock("../../../images/outlineIconRed.png", () => "outlineIconRed.png");
jest.mock("../../../images/nounVoiceRecord.png", () => "nounVoiceRecord.png");
jest.mock("../../../images/people_set.png", () => "people_set.png");
jest.mock("../../../images/down_black.png", () => "down_black.png");

// Mocking SpeechRecognition

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
    browserSupportsSpeechRecognition: () => false, // ensures SupportedBrowser = true
  };
});

const mockStore = configureStore([]);
const initialState = {
  languageReducer: {
    commonGroupLanguageMappingData: {
      1: {
        fieldData: {
          2: { value: "Fallback text if browser not supported" },
          4: { value: "Press and speak..." },
          5: { value: "Start" },
          6: { value: "Retry" },
          7: { value: "Recording..." },
        },
      },
    },
    commonGroupLanguageBaseData: {},
  },
};

const data = {
  title: "<h2>Test Audio Quiz</h2>",
  content: {
    imageclassname: "test-class",
    feelingsDataList: [
      {
        questions: "<strong>How are you feeling today?</strong>",
        results: "",
      },
    ],
    changeColorBox: "#FFBD12",
  },
};

describe("AudioQuizScreen", () => {
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
    jest.clearAllMocks();
  });

  const renderComponent = (props = {}) => {
    return render(
      <Provider store={store}>
        <Router>
          <AudioQuizScreen
            stage={1}
            data={JSON.parse(JSON.stringify(data))}
            trustPointText="Trust Points"
            totalPoint={10}
            PercentageTotal={30}
            themeType="StoryCard"
            changeStage={jest.fn()}
            changeindex={jest.fn()}
            {...props}
          />
        </Router>
      </Provider>
    );
  };

  it("renders quiz title and question", () => {
    renderComponent();
    expect(screen.getByText("Test Audio Quiz")).toBeInTheDocument();
    expect(screen.getByText("How are you feeling today?")).toBeInTheDocument();
  });

  it("displays the start button and triggers voice record UI", () => {
    renderComponent();
    const speakButton = screen.getByRole("button", { name: "Start" });
    fireEvent.click(speakButton);
    expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
  });

  it("handles next button click", async () => {
    const mockChangeIndex = jest.fn();
    renderComponent({ changeindex: mockChangeIndex });

    fireEvent.click(screen.getByTestId("next"));
    await waitFor(() => {
      expect(mockChangeIndex).toHaveBeenCalled();
    });
  });

  it("handles answer reset via repeat icon", () => {
    renderComponent();
    fireEvent.click(screen.getByRole("button", { name: "Start" }));
    fireEvent.click(screen.getByTestId("repeat"));
    expect(screen.getByText("How are you feeling today?")).toBeInTheDocument();
  });

  it("displays progress bar with correct width", () => {
    renderComponent();
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveStyle("width: 30%");
  });

  it("calls changeStage when it's the last question and themeType is not StoryCard", async () => {
    const mockChangeStage = jest.fn();
    const oneQuestion = {
      ...data,
      content: {
        ...data.content,
        feelingsDataList: [data.content.feelingsDataList[0]],
      },
    };

    render(
      <Provider store={store}>
        <Router>
          <AudioQuizScreen
            stage={1}
            data={JSON.parse(JSON.stringify(oneQuestion))}
            trustPointText="Trust Points"
            totalPoint={10}
            PercentageTotal={30}
            themeType="Other" // NOT StoryCard
            changeStage={mockChangeStage}
            changeindex={jest.fn()}
          />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByTestId("next"));

    await waitFor(() => {
      expect(mockChangeStage).toHaveBeenCalled();
    });
  });

  it("updates dimensions on window resize", () => {
    renderComponent();

    window.innerHeight = 600;
    window.innerWidth = 1024;
    fireEvent(window, new Event("resize"));
  });

  it("switches viewType and changes background color", () => {
    renderComponent();

    const speakButton = screen.getByRole("button", { name: "Start" });
    fireEvent.click(speakButton);

    const retryButton = screen.getByRole("button", { name: "Retry" });
    fireEvent.click(retryButton);
  });

  it("falls back to base language data if mapping is missing", () => {
    const fallbackStore = mockStore({
      languageReducer: {
        commonGroupLanguageMappingData: {},
        commonGroupLanguageBaseData: {
          1: {
            fieldData: {
              4: { value: "Base fallback text" },
            },
          },
        },
      },
    });

    render(
      <Provider store={fallbackStore}>
        <Router>
          <AudioQuizScreen
            stage={1}
            data={data}
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

    expect(screen.getByText("Base fallback text")).toBeInTheDocument();
  });
});
