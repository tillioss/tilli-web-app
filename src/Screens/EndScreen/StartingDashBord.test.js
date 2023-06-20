import React from "react";
import { render } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import StartingDashBord from "./StartingDashBord";

describe("StartingDashBord component", () => {
  const initialState = {
    languageReducer: {
      innnerGroupLanguageBaseData: {},
      innerGroupLanguageMappingData: {},
    },
  };
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <StartingDashBord />
      </Provider>
    );
  });
});
