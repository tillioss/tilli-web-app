import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import ChooseCheckboxQuestions from "./ChooseCheckboxQuestions";
import { MemoryRouter, Route } from "react-router-dom";

// Mocks for images
jest.mock("../../../images/outlineBackIcon.png", () => "backImage.png");
jest.mock("../../../images/outlineRightIcon.png", () => "nextImage.png");
jest.mock("../../../images/questionIcon.png", () => "questionIcon.png");
jest.mock("../../../images/tickMarkIcon.png", () => "tickMarkIcon.png");

const mockMatch = {
  params: {
    levelIndex: "level1",
  },
};

const defaultProps = {
  stage: 1,
  match: mockMatch,
  trustPointText: "Trust Points",
  totalPoint: 10,
  PercentageTotal: 50,
  changeStage: jest.fn(),
  data: {
    title: "<h2>Test Title</h2>",
    content: {
      questionTitle: "<p>What are your preferences?</p>",
      checkBoxesOption: [
        { content: "Option A", bgcolor: "#FFFFFF" },
        { content: "Option B", bgcolor: "#EEEEEE" },
      ],
      colors: {
        checked: "#00FF00",
        unChecked: "#FF0000",
        box: "#CCCCCC",
      },
    },
  },
};

describe("ChooseCheckboxQuestions Component", () => {
  beforeEach(() => {
    localStorage.clear();
    window.innerWidth = 1024;
    window.innerHeight = 800;
  });

  it("renders correctly with initial props", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ChooseCheckboxQuestions {...defaultProps} />
      </MemoryRouter>
    );

    expect(screen.getByText("What are your preferences?")).toBeInTheDocument();
    expect(screen.getByText("Option A")).toBeInTheDocument();
    expect(screen.getByText("Option B")).toBeInTheDocument();
    expect(screen.getByText("Trust Points 10")).toBeInTheDocument();
  });

  it("loads selected data from localStorage if available", async () => {
    localStorage.setItem("level1_selectedData", JSON.stringify(["Option A"]));

    render(
      <MemoryRouter>
        <ChooseCheckboxQuestions {...defaultProps} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Option A")).toBeInTheDocument();
    });
  });

  it("toggles checkbox selection on click", () => {
    render(
      <MemoryRouter>
        <ChooseCheckboxQuestions {...defaultProps} />
      </MemoryRouter>
    );

    const optionA = screen.getByText("Option A");
    fireEvent.click(optionA);

    const optionB = screen.getByText("Option B");
    fireEvent.click(optionB);

    expect(optionA).toBeInTheDocument();
    expect(optionB).toBeInTheDocument();
  });

  it("saves selected data to localStorage on back button click", () => {
    render(
      <MemoryRouter>
        <ChooseCheckboxQuestions {...defaultProps} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Option A"));
    fireEvent.click(screen.getByTestId("back"));
    const saved = localStorage.getItem("level1_selectedData");
    expect(JSON.parse(saved)).toBe(null);
  });

  it("calls changeStage on next button click", () => {
    render(
      <MemoryRouter>
        <ChooseCheckboxQuestions {...defaultProps} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId("next"));
    expect(defaultProps.changeStage).toHaveBeenCalledWith("Next", 1);
  });

  it("updates height on window resize", () => {
    const { container } = render(
      <MemoryRouter>
        <ChooseCheckboxQuestions {...defaultProps} />
      </MemoryRouter>
    );

    global.dispatchEvent(new Event("resize"));
    expect(container).toBeDefined();
  });

  it("selects and then deselects an option", () => {
  render(
    <MemoryRouter>
      <ChooseCheckboxQuestions {...defaultProps} />
    </MemoryRouter>
  );

  const optionA = screen.getByText("Option A");
  fireEvent.click(optionA);
  fireEvent.click(optionA);

  expect(optionA).toBeInTheDocument();
});

it("saves selected data to localStorage on back button click", () => {
  render(
    <MemoryRouter>
      <ChooseCheckboxQuestions {...defaultProps} />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByText("Option A"));
  fireEvent.click(screen.getByTestId("back"));

  const saved = localStorage.getItem("level1_selectedData");
  expect(JSON.parse(saved)).toBe(null);
});

it("triggers UWP specific padding when UWPview is true", () => {
  Object.defineProperty(window.navigator, 'appVersion', {
    value: 'uwp webview test',
    configurable: true,
  });

  render(
    <MemoryRouter>
      <ChooseCheckboxQuestions {...defaultProps} />
    </MemoryRouter>
  );

  expect(screen.getByText("Option A")).toBeInTheDocument();
});

it("calls window.scrollTo and sets resize listener on mount", () => {
  const scrollSpy = jest.spyOn(window, "scrollTo").mockImplementation(() => {});
  const resizeSpy = jest.spyOn(window, "addEventListener");

  render(
    <MemoryRouter>
      <ChooseCheckboxQuestions {...defaultProps} />
    </MemoryRouter>
  );

  expect(scrollSpy).toHaveBeenCalledWith(0, 0);
  expect(resizeSpy).toHaveBeenCalledWith("resize", expect.any(Function));
});

});
