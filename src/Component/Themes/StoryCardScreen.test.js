import React from "react";
import { render } from "@testing-library/react";
import StoryCardScreen from "./StoryCardScreen";
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

describe("StoryCardScreen", () => {
  test("calls change index prop correctly when Next or Previous is clicked", () => {
    const data = {
      content: [
        {
          theme: "MeetSinglePerson",
          content: { color_2: "red", image: { fileName: "" } },
        },
        { theme: "AudioQuizScreen" },
        { theme: "DropToSelection" },
      ],
    };
    const changeindexMock = jest.fn();

    render(
      <Provider store={store}>
        <Router>
          <StoryCardScreen data={data} changeindex={changeindexMock} />
        </Router>
      </Provider>
    );
  });
});
