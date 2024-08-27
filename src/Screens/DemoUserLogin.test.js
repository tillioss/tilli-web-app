import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import DemoUserLogin from "./DemoUserLogin";

jest.mock("../config/Common", () => ({
  doConnect: jest.fn(),
  doFileConnect: jest.fn(),
}));

describe("Demo User Login component", () => {
  const initialState = {};
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it.skip("renders without crashing", () => {
    render(
      <Provider store={store}>
        <DemoUserLogin />
      </Provider>
    );
  });
});
