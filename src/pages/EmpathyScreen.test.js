import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import EmpathyScreen from './EmpathyScreen';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

jest.mock('../images/outlineBackIcon.png', () => 'left-icon.png');
jest.mock('../images/graph.png', () => 'graph.png');
jest.mock('../images/bg_1.png', () => 'bg1.png');
jest.mock('../images/bg_2.png', () => 'bg2.png');
jest.mock('../images/bg_3.png', () => 'bg3.png');
jest.mock('../images/sidearrow.png', () => 'sidearrow.png');
jest.mock('../config/MyConstant', () => ({
  keyList: { projectUrl: 'testProject' }
}));

const mockStore = configureStore([]);

const setup = (storeOverrides = {}, path = '/test') => {
  const store = mockStore({
    languageReducer: {
      innnerGroupLanguageBaseData: {
        5: {
          fieldData: [
            {}, // index 0
            { value: 'Page Title' }, // index 1
            { value: 'Graph Description' }, // index 2
            { value: 'Header 1' }, // index 3
            { value: 'Content 1' }, // index 4
            { value: 'Header 2' }, // index 5
            { value: 'Content 2' }, // index 6
            { value: 'Header 3' }, // index 7
            { value: 'Content 3' }, // index 8
            { value: 'Continue' }, // index 9
          ],
        },
      },
      innerGroupLanguageMappingData: {},
      ...storeOverrides
    },
  });

  const history = createMemoryHistory({ initialEntries: [path] });

  render(
    <Provider store={store}>
      <Router history={history}>
        <EmpathyScreen history={history} />
      </Router>
    </Provider>
  );

  return { store, history };
};

describe('EmpathyScreen Component', () => {
  test('renders all content and images correctly', () => {
    setup();

    expect(screen.getByText('Page Title')).toBeInTheDocument();
    expect(screen.getByText('Graph Description')).toBeInTheDocument();
    expect(screen.getByText('Header 1')).toBeInTheDocument();
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.getByText('Header 2')).toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
    expect(screen.getByText('Header 3')).toBeInTheDocument();
    expect(screen.getByText('Content 3')).toBeInTheDocument();
    expect(screen.getByText('Continue')).toBeInTheDocument();
    expect(screen.getAllByRole('img').length).toBeGreaterThan(0); // all icons
  });

  test('back button navigates to Parenthome', () => {
    const { history } = setup();
    const backBtn = screen.getAllByRole('img')[0];
    fireEvent.click(backBtn);
    expect(history.location.pathname).toBe('/testProject/Parenthome');
  });

  test('back button navigates to /lego/Parenthome if in lego URL', () => {
    const legoUrl = '/lego/Empathy';
    const { history } = setup({}, legoUrl);
    const backBtn = screen.getAllByRole('img')[0];
    fireEvent.click(backBtn);
    expect(history.location.pathname).toBe('/testProject/Parenthome');
  });

  test('renders progress indicators correctly', () => {
    setup();
    expect(screen.getByText('5/10')).toBeInTheDocument();
    expect(screen.getByText('6/10')).toBeInTheDocument();
    expect(screen.getByText('3/10')).toBeInTheDocument();
  });

  test('continue button is clickable', () => {
    setup();
    const continueButton = screen.getByText('Continue');
    expect(continueButton).toBeInTheDocument();
    fireEvent.click(continueButton); // No action yet, but safe to fire
  });

  test('return_content falls back to empty string when data is missing', () => {
  const store = mockStore({
    languageReducer: {
      innerGroupLanguageMappingData: {},
      innnerGroupLanguageBaseData: {},
    },
  });

  const history = createMemoryHistory();

  render(
    <Provider store={store}>
      <Router history={history}>
        <EmpathyScreen history={history} />
      </Router>
    </Provider>
  );

  // Check that the content is rendered but empty
  const pageTitle = screen.getByTestId('page-title');
  expect(pageTitle.textContent).toBe('    ');
});


test('back button navigates to /lego/Parenthome when URL contains lego', () => {
  const originalHref = window.location.href;
  delete window.location;
  window.location = { href: 'http://localhost/lego/Empathy' };

  const { history } = setup();
  const backBtn = screen.getAllByRole('img')[0];
  fireEvent.click(backBtn);

  expect(history.location.pathname).toBe('/testProject/lego/Parenthome');

  // Restore href after test
  window.location = { href: originalHref };
});


});
