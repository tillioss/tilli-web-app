import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import PersonWithTextAnimation from "./PersonWithTextAnimation";

jest.mock("../../../images/outlineBackIcon.png", () => "backImage.png");
jest.mock("../../../images/outlineRightIcon.png", () => "nextImage.png");
jest.mock("../../../config/MyConstant", () => ({
  keyList: {
    apiURL: "http://localhost/",
  },
}));

describe("PersonWithTextAnimation Component", () => {
  const mockChangeStage = jest.fn();
  const props = {
    stage: 1,
    changeStage: mockChangeStage,
    data: {
      title: "Test Title",
      content: {
        image: {
          fileName: "test-img",
          fileType: "png",
        },
        text: [
          {
            value: "This is a test paragraph.",
            style: {
              color: "#000000",
              fontSize: "20px",
            },
          },
        ],
      },
    },
  };

  beforeEach(() => {
    jest.useFakeTimers();
    mockChangeStage.mockClear();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("renders title, image, and text properly", () => {
    render(<PersonWithTextAnimation {...props} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("This is a test paragraph.")).toBeInTheDocument();

    const image = screen.getByTestId("image");
    expect(image.src).toContain("http://localhost/vp?action=module&key=test-img&id=png");
  });

  it("should not show 'Next' button initially", () => {
    render(<PersonWithTextAnimation {...props} />);
    expect(screen.queryByAltText("next")).not.toBeInTheDocument();
  });

  it("should show 'Next' button after 4 seconds", () => {
    render(<PersonWithTextAnimation {...props} />);
    act(() => {
      jest.advanceTimersByTime(4000);
    });
    const nextButton = screen.getByTestId("next");
    expect(nextButton).toBeInTheDocument();
  });

  it("calls changeStage with 'Previous' when back button is clicked", () => {
    render(<PersonWithTextAnimation {...props} />);
    const backBtn = screen.getAllByRole("img")[0];
    fireEvent.click(backBtn);
    expect(mockChangeStage).toHaveBeenCalledWith("Previous", 1);
  });

  it("calls changeStage with 'Next' when next button is clicked after timeout", () => {
    render(<PersonWithTextAnimation {...props} />);
    act(() => {
      jest.advanceTimersByTime(4000);
    });
    const nextBtn = screen.getByTestId("next")
    fireEvent.click(nextBtn);
    expect(mockChangeStage).toHaveBeenCalledWith("Next", 1);
  });
});
