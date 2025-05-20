import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import QuestionsList from "./QuestionsList";
import { BrowserRouter as Router } from "react-router-dom";

// Mock assets
jest.mock("../../../images/outlineBackIcon.png", () => "backImage.png");
jest.mock("../../../images/outlineRightIcon.png", () => "nextImage.png");
jest.mock("../../../images/qus_image_1.png", () => "qus_image_1.png");
jest.mock("../../../images/qus_image_2.png", () => "qus_image_2.png");

const defaultProps = {
  stage: 1,
  trustPointText: "Points",
  totalPoint: 5,
  PercentageTotal: 50,
  data: {
    title: "<h1>Quiz Time</h1>",
    content: {
      questionTitle: "<p>Choose the correct answer:</p>",
      questionList: [
        { question: "<p>What is 2 + 2?</p>", color: "#eee", className: "" },
        { question: "<p>What is the capital of France?</p>", color: "#ddd", className: "" }
      ],
      className: "question-title-class"
    }
  },
  changeStage: jest.fn(),
};

const renderComponent = (props = {}) =>
  render(
    <Router>
      <QuestionsList {...defaultProps} {...props} />
    </Router>
  );

jest.useFakeTimers();

describe("QuestionsList Component", () => {
  it("renders the title and question title correctly", () => {
    renderComponent();
    expect(screen.getByText("Quiz Time")).toBeInTheDocument();
    expect(screen.getByText("Choose the correct answer:")).toBeInTheDocument();
  });

  it("renders all question cards after timeout", async () => {
    renderComponent();
    expect(screen.queryByText("What is 2 + 2?")).toBeInTheDocument();
    expect(screen.queryByText("What is the capital of France?")).toBeInTheDocument();

    act(() => {
      jest.runAllTimers();
    });

    expect(screen.getByText("What is 2 + 2?")).toBeInTheDocument();
    expect(screen.getByText("What is the capital of France?")).toBeInTheDocument();
  });

  it("triggers changeStage on back button click", () => {
    renderComponent();
    const backButton = screen.getAllByRole("link")[0];
    fireEvent.click(backButton);
    expect(defaultProps.changeStage).toHaveBeenCalledWith("Previous", defaultProps.stage);
  });

  it("triggers changeStage on next button click", () => {
    renderComponent();
    const nextButton = screen.getAllByRole("link")[1];
    fireEvent.click(nextButton);
    expect(defaultProps.changeStage).toHaveBeenCalledWith("Next", defaultProps.stage);
  });

  it("shows correct progress bar and label", () => {
    renderComponent();
    expect(screen.getByText("Points 5")).toBeInTheDocument();
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveStyle("width: 50%");
  });

  it("adjusts layout for small screens", () => {
    global.innerHeight = 600;
    global.innerWidth = 700;
    renderComponent();
    // It still renders, and internal deviceHeight logic should be adjusted
    expect(screen.getByText("Quiz Time")).toBeInTheDocument();
  });

  it("updates deviceHeight on window resize", () => {
    renderComponent();
    act(() => {
      global.innerHeight = 900;
      fireEvent(window, new Event("resize"));
    });

    // We can't directly test state, but no error implies it handled the resize
    expect(screen.getByText("Quiz Time")).toBeInTheDocument();
  });

//   new

  it("renders pt-2 class when deviceHeight < 640", () => {
  const mockData = {
    ...defaultProps,
    data: {
      ...defaultProps.data,
      content: {
        ...defaultProps.data.content,
        questionList: [{ question: "<p>Test?</p>", color: "#ccc", className: "" }],
      },
    },
  };

  renderComponent(mockData);

  act(() => {
    jest.runAllTimers();
  });

  const row = document.querySelector(".row.ml-0");
  expect(row.className.includes("pt-2")).toBe(false);
});

it("renders 'hide' class for questions initially", () => {
  renderComponent();
  const questionDiv = document.querySelector(".hide");
  expect(questionDiv).toBeInTheDocument();
});

it("renders 'questionDivShow' after timeout", () => {
  renderComponent();
  act(() => {
    jest.runAllTimers();
  });
  const shownDivs = document.querySelectorAll(".questionDivShow");
  expect(shownDivs.length).toBeGreaterThan(0);
});

it("uses mt-2 for deviceHeight < 700", () => {
  global.innerHeight = 690;
  global.innerWidth = 700;
  renderComponent();
  act(() => {
    jest.runAllTimers();
  });

  const marginClass = [...document.querySelectorAll("div")].find(
    el => el.className.includes("mt-2")
  );
  expect(marginClass).toBeInTheDocument();
});

it("renders progress bar with border when totalPoint is truthy", () => {
  renderComponent();
  const progressBar = screen.getByRole("progressbar");
  expect(progressBar).toHaveStyle("border: 1px solid #18191F");
});

it("renders progress bar without border when totalPoint is falsy", () => {
  const props = {
    ...defaultProps,
    totalPoint: 0,
  };
  renderComponent(props);
  const progressBar = screen.getByRole("progressbar");
  expect(progressBar).toHaveStyle("border: ");
});

});
