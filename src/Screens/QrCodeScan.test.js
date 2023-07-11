import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import QrCodeScan from "./QrCodeScan";

const mockStore = configureStore([]);

jest.mock("./__mocks__/react-qr-reader");

describe("QrCodeScan component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  it("displays QR code scanner and result", () => {
    render(
      <Provider store={store}>
        <QrCodeScan />
      </Provider>
    );

    const resultElement = screen.getByRole("link");
    expect(resultElement).toBeInTheDocument();
    expect(resultElement).toHaveTextContent("No result");

    expect(screen.getByText("Mock QR Reader")).toBeInTheDocument();
  });
});
