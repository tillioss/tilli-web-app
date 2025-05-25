import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from 'redux';
import { userTrack } from "../config/Common";
import UserManage from "./UserManage";
import MyConstant from "../config/MyConstant";

// Mocks
jest.mock("../../src/images/logos.png", () => 'mock-logo.png');
jest.mock("../config/Common", () => ({
  userTrack: jest.fn(),
}));

// Create a mock Redux store for testing
const mockStore = (initialState = {}) => {
  return createStore(() => initialState);
};

describe("UserManage Component", () => {  
  test("should render the component and display the logo", () => {
    const history = {
      push: jest.fn(),
    };

    const store = mockStore({
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserManage history={history} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByAltText("")).toBeInTheDocument();
  });

  test("should set language to Sinhala and update localStorage", () => {
    const history = {
      push: jest.fn(),
    };

    const store = mockStore({
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserManage history={history} />
        </MemoryRouter>
      </Provider>
    );

    const sinhalaOption = screen.getByTestId("sinhala-language-option");
    fireEvent.click(sinhalaOption);

    expect(sinhalaOption).toHaveClass("active");
    expect(localStorage.getItem("preferredLanguage")).toBe("sinhala");
  });

  test("should set gender to male", () => {
    const history = {
      push: jest.fn(),
    };

    const store = mockStore({
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserManage history={history} />
        </MemoryRouter>
      </Provider>
    );

    const maleOption = screen.getByTestId("male-gender-option");
    fireEvent.click(maleOption);

    expect(maleOption).toHaveClass("active");
  });

  test("should set age to 6", () => {
    const history = {
      push: jest.fn(),
    };

    const store = mockStore({
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserManage history={history} />
        </MemoryRouter>
      </Provider>
    );

    const age6Option = screen.getByTestId("age-6-option");
    fireEvent.click(age6Option);

    expect(age6Option).toHaveClass("active");
  });

  test("should call userTrack when component is mounted", () => {
const history = {
      push: jest.fn(),
    };

    const store = mockStore({
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserManage history={history} />
        </MemoryRouter>
      </Provider>
    );

    expect(userTrack).toHaveBeenCalledWith(undefined, "Landing");
  });

  test("should handle 'Continue' button click for demo landing", () => {
    const demoLanding = { landingFrom: "demo" };
    const history = {
      push: jest.fn(),
    };

    const store = mockStore({
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserManage history={history} {...demoLanding}/>
        </MemoryRouter>
      </Provider>
    );
  
  // Get the "Continue" button by data-testid
  const continueButton = screen.getByTestId("continue-button");
  
  // Ensure the button exists and click it
  expect(continueButton).toBeInTheDocument();
  fireEvent.click(continueButton);

  expect(history.push).toHaveBeenCalledWith(`/${MyConstant.keyList.projectUrl}/redirect-demo`);
  expect(userTrack).toHaveBeenCalledWith("demo", "Clicked to Continue");
});

  test("should handle 'Continue' button click for non-demo landing", () => {
    const nonDemoLanding = { landingFrom: "other" };
    const history = {
      push: jest.fn(),
    };

    const store = mockStore({
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserManage history={history} {...nonDemoLanding} />
        </MemoryRouter>
      </Provider>
    );

    const continueButton = screen.getByText("Continue");
    fireEvent.click(continueButton);

    expect(history.push).toHaveBeenCalledWith(
      `/${MyConstant.keyList.projectUrl}/redirect-demo?gender=female&age=5&language=sinhala`
    );
    expect(userTrack).toHaveBeenCalledWith("other", "Clicked to Continue");
  });

  test("should store landingFrom in localStorage", () => {
    const nonDemoLanding = { landingFrom: "other" };
    render(
      <Provider store={mockStore()}>
        <MemoryRouter>
          <UserManage history={history} {...nonDemoLanding} />
        </MemoryRouter>
      </Provider>
    );

    expect(localStorage.getItem("landingFrom")).toBe("other");
  });

  test("should correctly display the active language option", () => {
    const history = {
      push: jest.fn(),
    };

    const store = mockStore({
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserManage history={history} />
        </MemoryRouter>
      </Provider>
    );

    const englishOption = screen.getByTestId("english-language-option");
    expect(englishOption).toHaveClass("box");
  });

  test("should display gender options correctly", () => {
    const history = {
      push: jest.fn(),
    };

    const store = mockStore({
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserManage history={history} />
        </MemoryRouter>
      </Provider>
    );

    const maleOption = screen.getByTestId("male-gender-option");
    const femaleOption = screen.getByTestId("female-gender-option");
    
    expect(maleOption).toBeInTheDocument();
    expect(femaleOption).toBeInTheDocument();
  });

  test("should handle language change when user selects a new language", () => {
    const history = {
      push: jest.fn(),
    };

    const store = mockStore({
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserManage history={history} />
        </MemoryRouter>
      </Provider>
    );

    const tamilOption = screen.getByTestId("tamil-language-option");
    fireEvent.click(tamilOption);
    
    expect(tamilOption).toHaveClass("active");
    expect(localStorage.getItem("preferredLanguage")).toBe("tamil");
  });

  test("should set and change age correctly", () => {
    const history = {
      push: jest.fn(),
    };

    const store = mockStore({
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserManage history={history} />
        </MemoryRouter>
      </Provider>
    );

    const age7Option = screen.getByTestId("age-7-option");
    fireEvent.click(age7Option);
    
    expect(age7Option).toHaveClass("active");
  });

  test("should handle all state updates and component behavior", () => {
  const history = {
    push: jest.fn(),
  };

  const store = mockStore({});

  render(
    <Provider store={store}>
      <MemoryRouter>
        <UserManage history={history} />
      </MemoryRouter>
    </Provider>
  );

  // Click female gender option using getByTestId
  const femaleGenderOption = screen.getByTestId("female-gender-option");
  fireEvent.click(femaleGenderOption);

  // Click age 6 option
  const age6Option = screen.getByTestId("age-6-option");
  fireEvent.click(age6Option);

  // Click language option (English)
  const englishLanguageOption = screen.getByTestId("english-language-option");
  fireEvent.click(englishLanguageOption);

  expect(screen.getByTestId("female-gender-option")).toHaveClass("active");
  expect(screen.getByTestId("age-6-option")).toHaveClass("active");
  expect(screen.getByTestId("english-language-option")).toHaveClass("active");
});

});
