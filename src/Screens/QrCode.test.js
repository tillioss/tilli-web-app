import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import QrCode from "./QrCode";

jest.mock("../config/Common", () => ({
  doConnect: jest.fn(),
  doFileConnect: jest.fn(),
}));

describe("QR Code component", () => {
  const initialState = {};
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it.skip("renders without crashing", () => {
    render(
      <Provider store={store}>
        <QrCode />
      </Provider>
    );
  });
});
