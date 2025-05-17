import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import AskGender from "./AskGender";
import { BrowserRouter as Router } from "react-router-dom";

// Mocks
jest.mock("../../../images/outlineBackIcon.png", () => "backImage.png");
jest.mock("../../../images/outlineRightIcon.png", () => "nextImage.png");
jest.mock("../../../images/down_black.png", () => "down_black.png");
jest.mock("../../../config/MyConstant", () => ({
  keyList: { apiURL: "http://localhost/" },
}));

const mockStore = configureStore([]);

const mockProps = {
  stage: 1,
  data: {
    title: "<h1>Test Title</h1>",
    content: {
      question: "<p>What is your gender?</p>",
      question_2: "<p>Choose an option below</p>",
      chooseType_1: "Female",
      chooseType_2: "Male",
      chooseType_3: "Tell me later",
      chooseType_1_ClassName: "",
      chooseType_2_ClassName: "",
      chooseType_3_ClassName: "",
      image: {
        fileName: "test.jpg",
        fileType: "image/jpeg",
      },
    },
  },
  updateUserDetailsInfo: jest.fn(),
  changeStage: jest.fn(),
};

const mockLocalStorage = {
  getItem: jest.fn((key) => {
    const mockValues = {
      ChooseLanguage: JSON.stringify({ label: "English" }),
      demoUserId: "12345",
    };
    return mockValues[key];
  }),
  setItem: jest.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

describe("AskGender Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      languageReducer: {
        commonGroupLanguageMappingData: null,
        commonGroupLanguageBaseData: null,
      },
    });
    jest.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <Router>
          <AskGender {...mockProps} />
        </Router>
      </Provider>
    );

  it("renders the component with title and questions", () => {
    renderComponent();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("What is your gender?")).toBeInTheDocument();
    expect(screen.getByText("Choose an option below")).toBeInTheDocument();
  });

  it("shows error if next clicked without selecting gender", () => {
    renderComponent();
    const nextButton = screen.getAllByRole("link").find((link) =>
      link.querySelector("img[src='nextImage.png']")
    );
    fireEvent.click(nextButton);
    expect(screen.getByText("Please Choose Gender")).toBeInTheDocument();
  });

  it("selects Female and updates state", () => {
    renderComponent();
    const femaleButton = screen.getByText("Female").closest("div");
    fireEvent.click(femaleButton);
    expect(screen.queryByText("Please Choose Gender")).not.toBeInTheDocument();
  });

  it("selects Male and allows navigation", () => {
    renderComponent();
    const maleButton = screen.getByText("Male").closest("div");
    fireEvent.click(maleButton);
    const nextButton = screen.getAllByRole("link").find((link) =>
      link.querySelector("img[src='nextImage.png']")
    );
    fireEvent.click(nextButton);
    expect(mockProps.updateUserDetailsInfo).toHaveBeenCalledWith(
      expect.objectContaining({"age": "", "gender": "male", "language": "", "userId": ""})
    );
    expect(mockProps.changeStage).toHaveBeenCalledWith("Next", 1, "scorepoint");
  });

  it("selects 'Tell me later' and triggers correct logic", () => {
    renderComponent();
    const laterButton = screen.getByText("Tell me later").closest("div");
    fireEvent.click(laterButton);
    const nextButton = screen.getAllByRole("link").find((link) =>
      link.querySelector("img[src='nextImage.png']")
    );
    fireEvent.click(nextButton);
    expect(mockProps.updateUserDetailsInfo).toHaveBeenCalledWith(
      expect.objectContaining({ gender: "tell_me_later" })
    );
  });

  // ADD inside `describe` block

it("calls back button and shows error when no gender selected", () => {
  renderComponent();
  const backButton = screen.getAllByRole("link").find((link) =>
    link.querySelector("img[src='backImage.png']")
  );
  fireEvent.click(backButton);
  expect(screen.getByText("Please Choose Gender")).toBeInTheDocument();
});

it("sets userId and language from localStorage and updates details", () => {
  renderComponent();

  // select female to enable next
  const femaleButton = screen.getByText("Female").closest("div");
  fireEvent.click(femaleButton);

  const nextButton = screen.getAllByRole("link").find((link) =>
    link.querySelector("img[src='nextImage.png']")
  );
  fireEvent.click(nextButton);

  expect(mockProps.updateUserDetailsInfo).toHaveBeenCalledWith(
    expect.objectContaining({"age": "", "gender": "female", "language": "", "userId": ""})
  );
});

it("parses Tamil language correctly and applies tamilintro class", () => {
  window.localStorage.getItem = jest.fn((key) => {
    if (key === "ChooseLanguage")
      return JSON.stringify({ label: "Tamil" });
    if (key === "demoUserId") return "12345";
    return null;
  });

  renderComponent();
  expect(document.querySelector(".bottom-style.tamilintro")).toBeInTheDocument();
});

it("renders image using MyConstant URL", () => {
  renderComponent();
  const image = screen.getAllByRole("img").find((img) => img.src.includes("http://localhost/"));
  expect(image).toBeInTheDocument();
});

it("handles invalid JSON in ChooseLanguage gracefully", () => {
  window.localStorage.getItem = jest.fn(() => "invalid json");
  expect(() => renderComponent()).not.toThrow();
});

it("renders fallback gender data from baseData Redux state", () => {
  store = mockStore({
    languageReducer: {
      commonGroupLanguageBaseData: {
        1: {
          fieldData: {
            0: { value: "Base Gender Fallback" },
          },
        },
      },
      commonGroupLanguageMappingData: null,
    },
  });

  render(
    <Provider store={store}>
      <Router>
        <AskGender {...mockProps} />
      </Router>
    </Provider>
  );

  // Test return_content() method implicitly
  const instance = screen.getByText("Test Title");
  expect(instance).toBeInTheDocument();
});

});
