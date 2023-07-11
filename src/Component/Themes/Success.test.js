import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Success from "./Success";

describe("Success", () => {
  test("calls changeStage prop when Next is clicked", () => {
    const data = {
      content: {
        title: {
          value: "Success Title",
          bColor: "red",
          style: [],
        },
        message: {
          value: "Success Message",
          bColor: "blue",
          style: [],
        },
      },
    };
    const changeStageMock = jest.fn();

    render(
      <Success data={data} stage="success" changeStage={changeStageMock} />
    );

    const nextButton = screen.getByAltText("");
    fireEvent.click(nextButton);

    expect(changeStageMock).toHaveBeenCalledWith("Next", "success");
  });
});
