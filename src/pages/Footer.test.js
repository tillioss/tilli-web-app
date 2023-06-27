import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import Footer from "./Footer";

const mockStore = configureStore([]);

describe("Footer", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      languageReducer: {
        innnerGroupLanguageBaseData: {},
        innerGroupLanguageMappingData: {},
      },
    });
  });

  it("renders correctly", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Footer />
        </Provider>
      </BrowserRouter>
    );
  });
});
