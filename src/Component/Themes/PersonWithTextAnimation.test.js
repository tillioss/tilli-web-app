import React from "react";
import { render, screen, act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import PersonWithTextAnimation from "./PersonWithTextAnimation";

describe("PersonWithTextAnimation", () => {
  test("renders the component with content", async () => {
    const data = {
      title: "Person With Text Animation",
      content: {
        image: {
          fileName: "imageFileName",
          fileType: "imageFileType",
        },
        text: [
          {
            style: {
              color: "red",
              fontSize: 16,
            },
            value: "Text content",
          },
        ],
      },
    };

    render(
      <Router>
        <PersonWithTextAnimation
          data={data}
          stage="stage"
          changeStage={() => {}}
        />
      </Router>
    );

    // Assert that the component title is rendered
    expect(screen.getByText("Person With Text Animation")).toBeInTheDocument();

    // Assert that the text content is rendered with the correct style
    const textElement = screen.getByText("Text content");
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveStyle("color: red");
    expect(textElement).toHaveStyle("font-size: 16px");

    // Simulate a timeout of 4 seconds
    await act(async () => {
      jest.useFakeTimers();
      jest.advanceTimersByTime(4000);
      jest.useRealTimers();
    });
  });
});
