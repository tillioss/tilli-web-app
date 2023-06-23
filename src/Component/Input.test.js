import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Input from "./Input";

describe("Input", () => {
  test("renders without error", () => {
    render(<Input />);
  });

  test("calls handleInputChange on input change", () => {
    const handleInputChange = jest.fn();
    const { getByRole } = render(
      <Input handleInputChange={handleInputChange} />
    );
    const input = getByRole("textbox");

    fireEvent.change(input, { target: { value: "Test" } });

    expect(handleInputChange).toHaveBeenCalledTimes(1);
    expect(handleInputChange).toHaveBeenCalledWith(expect.any(Object));
    expect(handleInputChange.mock.calls[0][0].target.value).toBe("Test");
  });

  test("displays error message when error prop is provided", () => {
    const error = "Invalid input";
    const { getByText } = render(<Input error={error} />);

    expect(getByText(error)).toBeInTheDocument();
  });

  test("does not display error message when error prop is not provided", () => {
    const { queryByText } = render(<Input />);

    expect(queryByText("Invalid input")).toBeNull();
  });
});
