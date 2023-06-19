import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import UserManage from "./UserManage";

describe("UserManage component", () => {
  const initialState = {};
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <UserManage />
      </Provider>
    );
  });

  it("sets language state when language is selected", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <UserManage />
      </Provider>
    );

    const sinhalaLanguageOption = getByTestId("sinhala-language-option");
    const tamilLanguageOption = getByTestId("tamil-language-option");
    const englishLanguageOption = getByTestId("english-language-option");

    fireEvent.click(sinhalaLanguageOption);
    expect(sinhalaLanguageOption.classList.contains("active")).toBe(true);
    expect(tamilLanguageOption.classList.contains("active")).toBe(false);
    expect(englishLanguageOption.classList.contains("active")).toBe(false);

    fireEvent.click(tamilLanguageOption);
    expect(sinhalaLanguageOption.classList.contains("active")).toBe(false);
    expect(tamilLanguageOption.classList.contains("active")).toBe(true);
    expect(englishLanguageOption.classList.contains("active")).toBe(false);

    fireEvent.click(englishLanguageOption);
    expect(sinhalaLanguageOption.classList.contains("active")).toBe(false);
    expect(tamilLanguageOption.classList.contains("active")).toBe(false);
    expect(englishLanguageOption.classList.contains("active")).toBe(true);
  });

  it("sets gender state when gender is selected", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <UserManage />
      </Provider>
    );

    const maleGenderOption = getByTestId("male-gender-option");
    const femaleGenderOption = getByTestId("female-gender-option");

    fireEvent.click(maleGenderOption);
    expect(maleGenderOption.classList.contains("active")).toBe(true);
    expect(femaleGenderOption.classList.contains("active")).toBe(false);

    fireEvent.click(femaleGenderOption);
    expect(maleGenderOption.classList.contains("active")).toBe(false);
    expect(femaleGenderOption.classList.contains("active")).toBe(true);
  });

  it("sets age state when age is selected", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <UserManage />
      </Provider>
    );

    const age5Option = getByTestId("age-5-option");
    const age6Option = getByTestId("age-6-option");
    const age7Option = getByTestId("age-7-option");
    const age8Option = getByTestId("age-8-option");
    const age9Option = getByTestId("age-9-option");
    const age10Option = getByTestId("age-10-option");

    fireEvent.click(age5Option);
    expect(age5Option.classList.contains("active")).toBe(true);
    expect(age6Option.classList.contains("active")).toBe(false);
    expect(age7Option.classList.contains("active")).toBe(false);
    expect(age8Option.classList.contains("active")).toBe(false);
    expect(age9Option.classList.contains("active")).toBe(false);
    expect(age10Option.classList.contains("active")).toBe(false);
    fireEvent.click(age7Option);
    expect(age5Option.classList.contains("active")).toBe(false);
    expect(age6Option.classList.contains("active")).toBe(false);
    expect(age7Option.classList.contains("active")).toBe(true);
    expect(age8Option.classList.contains("active")).toBe(false);
    expect(age9Option.classList.contains("active")).toBe(false);
    expect(age10Option.classList.contains("active")).toBe(false);

    fireEvent.click(age10Option);
    expect(age5Option.classList.contains("active")).toBe(false);
    expect(age6Option.classList.contains("active")).toBe(false);
    expect(age7Option.classList.contains("active")).toBe(false);
    expect(age8Option.classList.contains("active")).toBe(false);
    expect(age9Option.classList.contains("active")).toBe(false);
    expect(age10Option.classList.contains("active")).toBe(true);
  });
});
