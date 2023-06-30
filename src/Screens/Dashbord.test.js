import React from "react";
import { render } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import Dashbord from "./Dashbord";

describe("Dashboard", () => {
  const mockStore = configureStore([]);
  let store;

  beforeEach(() => {
    store = mockStore({
      languageReducer: {
        outerGroupLanguageMappingData: [],
        outerGroupLanguageBaseData: [],
      },
    });
  });

  test("renders Dashboard component", () => {
    render(
      <Provider store={store}>
        <Dashbord />
      </Provider>
    );
  });
});
