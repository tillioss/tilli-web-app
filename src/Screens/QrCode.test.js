import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import QrCode from "./QrCode";

const mockStore = configureStore([]);

describe("QrCode component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  it("displays QR code and instructions", () => {
    render(
      <Provider store={store}>
        <QrCode />
      </Provider>
    );

    const qrCodeElement = screen.getByRole("img");
    expect(qrCodeElement).toBeInTheDocument();

    expect(
      screen.getByText(/1.Open QR Code Scanner on your phone/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/2.Point your phone to this screen to capture the code/)
    ).toBeInTheDocument();
  });
});
