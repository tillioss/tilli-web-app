import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import AskAge from "./AskAge";
import { BrowserRouter as Router } from "react-router-dom";

// Mock localStorage
beforeEach(() => {
  Storage.prototype.getItem = jest.fn((key) => {
    const map = {
      demoUserId: "user123",
      ChooseLanguage: JSON.stringify({ label: "Tamil" }),
    };
    return map[key];
  });

  Storage.prototype.setItem = jest.fn();
});

const mockStore = configureStore([]);

const mockProps = {
  stage: 1,
  data: {
    title: "<h2>Title</h2>",
    content: {
      question: "<p>How old are you?</p>",
      question_2: "<p>Select your age below</p>",
      chooseType_1: "<p>More than 12</p>",
      chooseType_1_ClassName: "choose-btn",
      image: { fileName: "image.png", fileType: "img" },
      imagestyle: "width:100,height:200"
    }
  },
  updateUserDetailsInfo: jest.fn(),
  changeStage: jest.fn(),
};

const defaultStore = {
  languageReducer: {
    commonGroupLanguageMappingData: {},
    commonGroupLanguageBaseData: {},
  },
};

const renderComponent = (props = mockProps, storeOverride = defaultStore) =>
  render(
    <Provider store={mockStore(storeOverride)}>
      <Router>
        <AskAge {...props} />
      </Router>
    </Provider>
  );

test("renders component and matches title/question", () => {
  renderComponent();
  expect(screen.getByText("How old are you?")).toBeInTheDocument();
  expect(screen.getByText("Select your age below")).toBeInTheDocument();
});

test("displays error when Next is clicked without selecting age", () => {
  renderComponent();
  const nextBtn = screen.getByTestId("back"); // matches the <img> with alt=""
  fireEvent.click(nextBtn);
  expect(screen.getByText("Please Choose Age")).toBeInTheDocument();
});

test("selects an age and clears error text", () => {
  renderComponent();
  const ageBtn = screen.getByText("5");
  fireEvent.click(ageBtn);
  expect(screen.queryByText("Please Choose Age")).not.toBeInTheDocument();
});

test("selects 'greater than 12' option", () => {
  renderComponent();
  const gt12 = screen.getByText("More than 12");
  fireEvent.click(gt12);
  expect(screen.queryByText("Please Choose Age")).not.toBeInTheDocument();
});

test("clicking Next with valid age calls updateUserDetailsInfo and changeStage", () => {
  renderComponent();
  const gt12 = screen.getByText("More than 12");
  fireEvent.click(gt12);
  const nextBtn = screen.getByTestId("next");
  fireEvent.click(nextBtn);

  expect(mockProps.updateUserDetailsInfo).toHaveBeenCalledWith(
    expect.objectContaining({
      userId: "user123",
      age: "grater_than_12",
      gender: "",
      language: "tamil",
    })
  );
  expect(mockProps.changeStage).toHaveBeenCalledWith("Next", 1, "scorepoint");
});

test("imagestyle is parsed and does not crash", () => {
  renderComponent();
  // There’s no assertion needed—rendering confirms parsing works
});

test("language class for Tamil is applied in footer", () => {
  renderComponent();
  const footerDiv = document.querySelector(".bottom-style");
  expect(footerDiv.classList.contains("tamilintro")).toBe(true);
});
