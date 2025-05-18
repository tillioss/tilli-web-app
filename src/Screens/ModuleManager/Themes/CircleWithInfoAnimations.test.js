
import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import CircleWithInfoAnimations from "./CircleWithInfoAnimations"
import { BrowserRouter as Router } from "react-router-dom";

const mockData = {
  title: "<h1>Circle Info</h1>",
  content: {
    text: [
      { value: "Text 1", style: {} },
      { value: "Text 2", style: {} }
    ],
    circles: [
      { color: "#ff0000", name: "Circle 1", nameClassName: "" },
      { color: "#00ff00", name: "Circle 2", nameClassName: "" },
      { color: "#0000ff", name: "Circle 3", nameClassName: "" }
    ],
    image: { fileName: "test.png", fileType: "img" },
    imageText: "Image description"
  }
};

const mockProps = {
  data: mockData,
  stage: 1,
  trustPointText: "Points",
  totalPoint: 50,
  PercentageTotal: 50,
  changeStage: jest.fn()
};

const renderComponent = () =>
  render(
    <Router>
      <CircleWithInfoAnimations {...mockProps} />
    </Router>
  );

describe("CircleWithInfoAnimations Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, "setTimeout");
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.restoreAllMocks();
  });

  test("renders title and text", () => {
    renderComponent();
    expect(screen.getByText("Circle Info")).toBeInTheDocument();
    expect(screen.getByText("Text 1")).toBeInTheDocument();
    expect(screen.getByText("Text 2")).toBeInTheDocument();
  });

  test("progress bar renders with correct width", () => {
    renderComponent();
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveStyle("width: 50%");
  });

  test("back button click triggers changeStage", () => {
    renderComponent();
    const backBtn = screen.getAllByRole("link")[0];
    fireEvent.click(backBtn);
    expect(mockProps.changeStage).toHaveBeenCalledWith("Previous", 1);
  });

  test("next button click after imageView sets imageView true", async () => {
  renderComponent();

  // Fast-forward timers to trigger index increment
  jest.runAllTimers();

  // Wait for re-render after state change
  await waitFor(() => {
    const nextImage = screen.getAllByRole("link").find(link =>
      link.querySelector("img")?.getAttribute("src")?.includes("outlineRightIcon")
    );
    expect(nextImage).toBeTruthy();
  });

  const nextBtn = screen.getAllByRole("link").find(link =>
    link.querySelector("img")?.getAttribute("src")?.includes("outlineRightIcon")
  );

  fireEvent.click(nextBtn);

  // First click only sets imageView to true; should NOT call changeStage yet
  expect(mockProps.changeStage).not.toHaveBeenCalled();
});

  test("component responds to resize", () => {
    renderComponent();
    global.innerHeight = 700;
    global.innerWidth = 500;
    fireEvent(window, new Event("resize"));
  });
});
