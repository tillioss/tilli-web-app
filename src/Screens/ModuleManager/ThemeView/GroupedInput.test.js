import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import GroupedInput from "./GroupedInput";

const layer = {
  inputs: [
    {
      x: 10,
      y: 20,
      width: 200,
      height: 100,
      backgroundColor: "red",
      borderWidth: 2,
      borderColor: "blue",
      borderStyle: "solid",
      borderRadius: 5,
    },
  ],
};

describe("GroupedInput", () => {
  test("renders input elements", () => {
    render(<GroupedInput layer={layer} index={0} deviceHeight={600} />);

    const inputElements = screen.getAllByTestId("grouped-input");

    expect(inputElements.length).toBe(layer.inputs.length);
  });

  test("calls dynamicThemeAction on click", () => {
    const mockDynamicThemeAction = jest.fn();

    render(
      <GroupedInput
        layer={layer}
        index={0}
        deviceHeight={600}
        dynamicThemeAction={mockDynamicThemeAction}
      />
    );

    const inputElement = screen.getByTestId("grouped-input");

    fireEvent.click(inputElement);

    expect(mockDynamicThemeAction).toHaveBeenCalledTimes(1);
    expect(mockDynamicThemeAction).toHaveBeenCalledWith(layer.inputs[0], 0);
  });
});
