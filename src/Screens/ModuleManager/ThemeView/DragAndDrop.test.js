import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DragAndDrop from "./DragAndDrop";

const layer = {
  drag: {
    x: 0,
    y: 0,
    width: 50,
    height: 50,
    borderColor: "red",
    borderStyle: "solid",
    borderRadius: 5,
    image: "path/to/image.png",
  },
  drop: [
    {
      x: 10,
      y: 10,
      width: 100,
      height: 100,
      borderWidth: 2,
      borderColor: "blue",
      borderStyle: "dashed",
      borderRadius: 10,
      action: "Correct Answer",
    },
  ],
};

describe("DragAndDrop", () => {
  test("renders drag and drop elements", () => {
    render(<DragAndDrop layer={layer} index={0} deviceHeight={600} />);

    const dragElement = screen.getByAltText("");
    const dropElements = screen.getAllByTestId("drop-target");

    expect(dragElement).toBeInTheDocument();
    expect(dropElements.length).toBe(layer.drop.length);
  });

  test("moves drag element to correct drop target on drop event", () => {
    render(<DragAndDrop layer={layer} index={0} deviceHeight={600} />);

    const dragElement = screen.getByAltText("");
    const dropTarget = screen.getByTestId("drop-target");

    expect(dropTarget.childNodes.length).toBe(0);

    fireEvent.dragStart(dragElement);
    fireEvent.drop(dropTarget);

    expect(dropTarget.childNodes.length).toBe(1);
    expect(dropTarget.childNodes[0]).toBe(dragElement);
  });
});
