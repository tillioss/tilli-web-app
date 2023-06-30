import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import MeetSinglePerson from "./MeetSinglePerson";

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

describe("MeetSinglePerson", () => {
  test("renders the component with person data", () => {
    const data = {
      title: "Meet Single Person",
      content: {
        color_2: "#FFFFFF",
        image: {
          fileName: "person.jpg",
          fileType: "jpg",
        },
        personName: "John Doe",
        body: "Lorem ipsum dolor sit amet.",
        question: "What is your favorite color?",
        bottomText: "Click the button to continue.",
      },
    };

    render(
      <Provider store={store}>
        <Router>
          <MeetSinglePerson data={data} stage="stage" changeStage={() => {}} />
        </Router>
      </Provider>
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();

    expect(screen.getByText("Lorem ipsum dolor sit amet.")).toBeInTheDocument();

    expect(
      screen.getByText("What is your favorite color?")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Click the button to continue.")
    ).toBeInTheDocument();
  });
});
