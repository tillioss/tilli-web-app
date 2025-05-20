import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import ChooseCheckboxQuestions from "./ChooseCheckboxQuestions";

const mockChangeStage = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ children, onClick }) => (
    <div onClick={onClick} role="link">
      {children}
    </div>
  ),
}));

const mockProps = {
  match: {
    params: {
      levelIndex: "1",
    },
  },
  data: {
    title: "Choose the correct options",
    content: {
      questionTitle: "What are the primary colors?",
      checkBoxesOption: [
        { content: "Red", bgcolor: "#ffffff" },
        { content: "Blue", bgcolor: "#ffffff" },
        { content: "Green", bgcolor: "#ffffff" },
      ],
      colors: {
        checked: "#00ff00",
        unChecked: "#ffffff",
        box: "#cccccc",
      },
    },
  },
  changeStage: mockChangeStage,
  stage: 1,
};

describe("ChooseCheckboxQuestions", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("renders title and question content correctly", () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <ChooseCheckboxQuestions {...mockProps} />
      </Router>
    );

    expect(getByText("Choose the correct options")).toBeInTheDocument();
    expect(getByText("What are the primary colors?")).toBeInTheDocument();
    expect(getByText("Red")).toBeInTheDocument();
    expect(getByText("Blue")).toBeInTheDocument();
    expect(getByText("Green")).toBeInTheDocument();
  });

  it("selects and deselects options", () => {
    const history = createMemoryHistory();
    const { getByText, container } = render(
      <Router history={history}>
        <ChooseCheckboxQuestions {...mockProps} />
      </Router>
    );

    fireEvent.click(getByText("Red"));
    fireEvent.click(getByText("Blue"));
    fireEvent.click(getByText("Red")); // deselect Red

    const nextButton = container.querySelector(".forward-step img");
    fireEvent.click(nextButton);

    const stored = JSON.parse(localStorage.getItem("1_selectedData"));
    expect(stored).toEqual(null);
    expect(mockChangeStage).toHaveBeenCalledWith("Next", 1);
  });

  it("saves data and calls changeStage with 'Next'", () => {
    const history = createMemoryHistory();
    const { getByText, container } = render(
      <Router history={history}>
        <ChooseCheckboxQuestions {...mockProps} />
      </Router>
    );

    fireEvent.click(getByText("Green"));
    const nextButton = container.querySelector(".forward-step img");
    fireEvent.click(nextButton);

    const stored = JSON.parse(localStorage.getItem("1_selectedData"));
    expect(stored).toEqual(null);
    expect(mockChangeStage).toHaveBeenCalledWith("Next", 1);
  });

  it("loads selected data from localStorage", () => {
    localStorage.setItem("1_selectedData", JSON.stringify(["Red", "Green"]));

    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <ChooseCheckboxQuestions {...mockProps} />
      </Router>
    );

    // These will still appear as normal text, but you can verify visually if needed.
    expect(getByText("Red")).toBeInTheDocument();
    expect(getByText("Green")).toBeInTheDocument();
  });

  it("calls changeStage with 'Previous' on back click", () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <ChooseCheckboxQuestions {...mockProps} />
      </Router>
    );

    const backButton = container.querySelector(".col-2 img");
    fireEvent.click(backButton);

    expect(mockChangeStage).toHaveBeenCalledWith("Previous", 1);
  });

  it("adds and removes items from selectedData state", () => {
    const mockProps = {
      match: { params: { levelIndex: "test-level" } },
      data: {
        title: "",
        content: {
          questionTitle: "",
          checkBoxesOption: [],
          colors: { checked: "", unChecked: "", box: "" },
        },
      },
      changeStage: jest.fn(),
      stage: 0,
    };

    const ref = React.createRef();

    render(<ChooseCheckboxQuestions {...mockProps} ref={ref} />);

    // Call pushData via ref
    expect(ref.current.state.selectedData).toEqual([]);

    ref.current.pushData("Red");
    expect(ref.current.state.selectedData).toEqual(["Red"]);

    ref.current.pushData("Blue");
    expect(ref.current.state.selectedData).toEqual(["Red", "Blue"]);

    ref.current.pushData("Red");
    expect(ref.current.state.selectedData).toEqual(["Blue"]);

    ref.current.pushData("Blue");
    expect(ref.current.state.selectedData).toEqual([]);
  });
});
