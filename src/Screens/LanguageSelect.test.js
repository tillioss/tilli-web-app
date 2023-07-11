import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import LanguageSelect from "./LanguageSelect";

const mockStore = configureStore([]);

describe("LanguageSelect", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      languageReducer: {
        outerGroupLanguageMappingData: [],
        outerGroupLanguageBaseData: [],
        innnerGroupLanguageBaseData: [],
        innerGroupLanguageMappingData: [],
        commonGroupLanguageMappingData: [],
        commonGroupLanguageBaseData: [],
      },
    });

    store.dispatch = jest.fn();
  });

  test("renders LanguageSelect component with correct content", () => {
    render(
      <Provider store={store}>
        <LanguageSelect />
      </Provider>
    );
  });
});
