import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import DoubleBoxOverlapWithImage from "./DoubleBoxOverlapWithImage";

describe("DoubleBoxOverlapWithImage", () => {
  test("renders the component with content", () => {
    const data = {
      title: "Double Box Overlap",
      content: {
        text: "Some content text",
        image: {
          fileName: "image1.png",
          fileType: "png",
        },
      },
    };

    render(
      <Router>
        <DoubleBoxOverlapWithImage
          data={data}
          stage="stage"
          changeStage={() => {}}
        />
      </Router>
    );

    expect(screen.getByText("Double Box Overlap")).toBeInTheDocument();
    expect(screen.getByText("Some content text")).toBeInTheDocument();
  });
});
