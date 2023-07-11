import React from "react";
import { render } from "@testing-library/react";
import DropDown from "./DropDown";

describe("DropDown", () => {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  it("renders without errors", () => {
    render(<DropDown options={options} />);
  });
});
