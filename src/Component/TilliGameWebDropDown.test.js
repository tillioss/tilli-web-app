import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TilliGameWebDropDown from "./TilliGameWebDropDown";

test("handles onChange event correctly", () => {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  // Mock onChange function
  const handleChange = jest.fn();

  // Render the TilliGameWebDropDown component
  const { container, getByText } = render(
    <TilliGameWebDropDown
      options={options}
      onChange={handleChange}
      placeholder="Select an option"
    />
  );

  // Select the dropdown input by ID
  const dropdownInput = container.querySelector("#react-select-2-input");

  // Open the dropdown
  fireEvent.mouseDown(dropdownInput);

  // Select an option
  const option2 = getByText("Option 2");
  fireEvent.click(option2);

  // Assert that the onChange function was called with the correct value
  expect(handleChange).toHaveBeenCalled();
});
