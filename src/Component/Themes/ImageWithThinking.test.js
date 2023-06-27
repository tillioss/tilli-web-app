import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ImageWithThinking from "./ImageWithThinking";

describe("ImageWithThinking", () => {
  test("renders the component with content", () => {
    const data = {
      title: "Image With Thinking",
      content: {
        text: "Some content text",
      },
    };

    render(
      <Router>
        <ImageWithThinking data={data} stage="stage" changeStage={() => {}} />
      </Router>
    );

    expect(screen.getByText("Image With Thinking")).toBeInTheDocument();

    expect(screen.getByText("Some content text")).toBeInTheDocument();
  });
});
