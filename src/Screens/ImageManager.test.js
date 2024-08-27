import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ImageManager from "./ImageManager";
import { doConnect, doFileConnect } from "../config/Common";

jest.mock("../config/Common", () => ({
  doConnect: jest.fn(),
  doFileConnect: jest.fn(),
}));

describe("ImageManager component", () => {
  const initialState = {};
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it.skip("renders without crashing", () => {
    render(
      <Provider store={store}>
        <ImageManager />
      </Provider>
    );
  });

  it.skip("adds a new file successfully", async () => {
    const { getByPlaceholderText, getByText, findByText } = render(
      <Provider store={store}>
        <ImageManager />
      </Provider>
    );

    // Fill out the form fields
    fireEvent.change(getByPlaceholderText("Enter Title"), {
      target: { value: "Test Image" },
    });
    fireEvent.change(getByText("Level"), { target: { value: "image" } });

    // Simulate a file upload
    const fileInput =
      getByText("Image").parentElement.querySelector('input[type="file"]');
    fireEvent.change(fileInput, {
      target: {
        files: [new File(["Hello, World!"], "test.png", { type: "image/png" })],
      },
    });

    // Click the submit button
    fireEvent.click(getByText("Submit"));

    // Wait for the successful toast notification
    await findByText("Added data !");

    // Expect the doConnect and doFileConnect functions to have been called
    expect(doConnect).toHaveBeenCalledWith("addGameFile", "POST", {
      title: "Test Image",
      fileName: expect.any(String),
      fileType: "image",
      sessionId: "1223",
    });
    expect(doFileConnect).toHaveBeenCalledWith(
      expect.objectContaining({
        file: expect.any(File),
        fileName: expect.any(String),
        fileType: "image",
      })
    );
  });
});
