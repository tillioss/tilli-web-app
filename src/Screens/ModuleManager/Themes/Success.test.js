import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Success from "./Success";

// Mock assets
jest.mock('../../../images/next.png', () => 'next.png');

describe("Success Component", () => {
  const mockChangeStage = jest.fn();
  const mockProps = {
    stage: 2,
    changeStage: mockChangeStage,
    data: {
      content: {
        title: {
          value: "Success Title",
          style: [{ color: "blue", fontSize: "24px" }],
          bColor: "#EFEFEF"
        },
        message: {
          value: "Congratulations! You've completed the quiz.",
          style: [{ color: "green", fontWeight: "bold" }],
          bColor: "#DDFFDD"
        }
      }
    }
  };

  it("renders the title and message with correct styles", () => {
    const { getByText } = render(<Success {...mockProps} />);

    const titleEl = getByText("Success Title");
    const messageEl = getByText("Congratulations! You've completed the quiz.");

    expect(titleEl).toBeInTheDocument();
    expect(titleEl).toHaveStyle("color: blue");
    expect(titleEl).toHaveStyle("font-size: 24px");

    expect(messageEl).toBeInTheDocument();
    expect(messageEl).toHaveStyle("color: green");
    expect(messageEl).toHaveStyle("font-weight: bold");
  });

  it("calls changeStage with 'Next' and current stage on image click", () => {
    const { container } = render(<Success {...mockProps} />);
    const imageRow = container.querySelector(".row.ml-0:last-child");

    fireEvent.click(imageRow);

    expect(mockChangeStage).toHaveBeenCalledWith("Next", 2);
  });

  it("renders the image with correct src", () => {
    const { container } = render(<Success {...mockProps} />);
    const image = container.querySelector("img");
    expect(image).toHaveAttribute("src", "next.png");
  });
});
