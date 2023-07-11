import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LabelAnimation from "./LabelAnimation";

const layer = {
  y: 10,
  x: 20,
  width: 200,
  height: 100,
  backgroundColor: "red",
  borderWidth: 2,
  borderColor: "blue",
  borderStyle: "solid",
  borderRadius: 5,
  label: [
    {
      text: "Label 1",
      backgroundColor: "green",
      borderWidth: 1,
      borderColor: "black",
      borderStyle: "dashed",
      borderRadius: 3,
    },
  ],
};

describe("LabelAnimation", () => {
  test("renders label elements", () => {
    render(<LabelAnimation layer={layer} index={0} deviceHeight={600} />);

    const labelElements = screen.getAllByTestId("label-element");

    expect(labelElements.length).toBe(layer.label.length);
  });

  test("renders label elements with correct styles", () => {
    render(<LabelAnimation layer={layer} index={0} deviceHeight={600} />);

    const labelElements = screen.getAllByTestId("label-element");

    labelElements.forEach((element, index) => {
      const label = layer.label[index];

      expect(element).toHaveStyle(`
        background-color: ${label.backgroundColor};
        border-width: ${label.borderWidth}px;
        border-color: ${label.borderColor};
        border-style: ${label.borderStyle};
        border-radius: ${label.borderRadius}px;
      `);
    });
  });

  test("renders label elements with correct innerHTML", () => {
    render(<LabelAnimation layer={layer} index={0} deviceHeight={600} />);

    const labelElements = screen.getAllByTestId("label-element");

    labelElements.forEach((element, index) => {
      const label = layer.label[index];

      expect(element.innerHTML).toBe(label.text);
    });
  });
});
