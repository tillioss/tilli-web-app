import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import IntroducePersons from "./IntroducePersons";

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

describe("IntroducePersons", () => {
  test("renders the component with person data", () => {
    const data = {
      content: {
        persons: [
          {
            name: "John Doe",
            says: "Hello, world!",
            image: {
              fileName: "john-doe.jpg",
              fileType: "jpg",
            },
            imageBg: "#FFFFFF",
            bg: "#F0F0F0",
          },
        ],
      },
      title: "Introduce Persons",
    };

    render(
      <Provider store={store}>
        {" "}
        <Router>
          <IntroducePersons data={data} stage="stage" changeStage={() => {}} />
        </Router>
      </Provider>
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();

    expect(screen.getByText("Hello, world!")).toBeInTheDocument();
  });
});
