import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Login from './Login';
import * as Common from '../config/Common';

jest.mock('../images/logos.png', () => 'logo');

const mockStore = configureStore([thunk]);

const mockMappingData = {
  1: {
    fieldData: {
      1: { value: 'Welcome' },
      2: { value: 'Username' },
      3: { value: 'Password' },
      4: { value: 'Login' },
      5: { value: 'New user?' },
      6: { value: 'Sign up' },
      7: { value: 'Select Language' },
      8: { value: 'Forgot Password?' },
    },
  },
};

describe('Login Component', () => {
  let store, history;

  beforeEach(() => {
    store = mockStore({
      languageReducer: {
        outerGroupLanguageMappingData: mockMappingData,
        outerGroupLanguageBaseData: {},
      },
    });

    history = createMemoryHistory();
    document.body.style.backgroundColor = '';

    jest.spyOn(Common, 'doConnect').mockImplementation(async (endpoint) => {
      if (endpoint === 'getLanguages') {
        return {
          response: JSON.stringify({
            en: 'English',
            hi: 'Hindi',
            ta: 'Tamil',
          }),
        };
      }

      if (endpoint === 'login') {
        return {
          response: 'Success',
          id: '123',
          nameOfChild: 'Sam',
        };
      }

      return { response: 'Failure' };
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const renderWithRouterAndStore = () =>
    render(
      <Provider store={store}>
        <Router history={history}>
          <Login history={history} />
        </Router>
      </Provider>
    );

  it('renders all elements correctly', async () => {
    renderWithRouterAndStore();
    await waitFor(() => {
      expect(screen.getByText('Welcome')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
      expect(screen.getByText('Login')).toBeInTheDocument();
      expect(screen.getByText('Forgot Password?')).toBeInTheDocument();
    });
  });

  it('updates input fields correctly', async () => {
    renderWithRouterAndStore();

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');

    fireEvent.change(usernameInput, { target: { value: 'user1' } });
    fireEvent.change(passwordInput, { target: { value: 'pass1' } });

    expect(usernameInput.value).toBe('user1');
    expect(passwordInput.value).toBe('pass1');
  });

  it('handles successful login', async () => {
    renderWithRouterAndStore();

    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'tilli' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'Tilli123!' },
    });
    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(localStorage.getItem('loggedUserId')).toBe('123');
      expect(localStorage.getItem('nameOfChild')).toBe('Sam');
      expect(history.location.pathname).toMatch(/\/home\/$/);
    });
  });

 it('handles login failure with error message', async () => {
  jest.spyOn(Common, 'doConnect').mockImplementation(async (endpoint) => {
    if (endpoint === 'getLanguages') {
      return {
        response: JSON.stringify({
          en: 'English',
          hi: 'Hindi',
        }),
      };
    }

    if (endpoint === 'login') {
      return { response: 'Failure' }; // Not JSON string
    }

    return { response: 'Failure' };
  });

  renderWithRouterAndStore();

  fireEvent.change(screen.getByPlaceholderText('Username'), {
    target: { value: 'wrong' },
  });
  fireEvent.change(screen.getByPlaceholderText('Password'), {
    target: { value: 'wrong' },
  });
  fireEvent.click(screen.getByText('Login'));

  await waitFor(() => {
    expect(screen.getByText('Invalid Login Credential!')).toBeInTheDocument();
  });
});


  it('navigates to sign up page on link click', async () => {
    renderWithRouterAndStore();

    fireEvent.click(screen.getByText('Sign up'));
    expect(history.location.pathname).toBe('/tilli-web/signup');
  });

  it('navigates to forgot password screen', async () => {
    renderWithRouterAndStore();

    fireEvent.click(screen.getByText('Forgot Password?'));
    expect(history.location.pathname).toMatch(/\/ForgotPassword$/);
  });

  it('falls back to base language data when mapping data is missing', async () => {
  store = mockStore({
    languageReducer: {
      outerGroupLanguageMappingData: {},
      outerGroupLanguageBaseData: mockMappingData,
    },
  });

  renderWithRouterAndStore();

  await waitFor(() => {
    expect(screen.getByText('Welcome')).toBeInTheDocument(); // From base data
  });
});

it('sets LanguageData to false when Hindi is selected', async () => {
  renderWithRouterAndStore();

  const languageSelectDiv = await screen.findByText('Hindi');
  fireEvent.click(languageSelectDiv);

  await waitFor(() => {
    expect(localStorage.getItem('currentLanguage')).toBe('hi');
  });
});

it('handles invalid JSON response in getLanguages gracefully', async () => {
  jest.spyOn(Common, 'doConnect').mockImplementation(async (endpoint) => {
    if (endpoint === 'getLanguages') {
      return { response: 'INVALID_JSON' };
    }
    return { response: 'Failure' };
  });

  // Still render login
  renderWithRouterAndStore();

  // Should not crash even with bad JSON
  expect(await screen.findByText('Welcome')).toBeInTheDocument();
});

it('handles empty language list', async () => {
  jest.spyOn(Common, 'doConnect').mockImplementation(async (endpoint) => {
    if (endpoint === 'getLanguages') {
      return { response: JSON.stringify({}) };
    }
    return { response: 'Success', id: '123', nameOfChild: 'Sam' };
  });

  renderWithRouterAndStore();

  await waitFor(() => {
    expect(screen.getByText('Welcome')).toBeInTheDocument();
  });
});

it('returns empty string when both mapping and base language data are missing', async () => {
  store = mockStore({
    languageReducer: {
      outerGroupLanguageMappingData: {},
      outerGroupLanguageBaseData: {},
    },
  });

  renderWithRouterAndStore();

  expect(screen.queryByText('Welcome')).not.toBeInTheDocument(); // Will be empty string
});

it('handles missing response in getLanguages gracefully', async () => {
  jest.spyOn(Common, 'doConnect').mockResolvedValue(undefined);

  renderWithRouterAndStore();

  // Ensure it doesn't crash and continues rendering
  expect(await screen.findByPlaceholderText('Username')).toBeInTheDocument();
});

it('dispatches all language data fetching actions when language is selected', async () => {
  const mockDispatch = jest.fn();
  store = mockStore({
    languageReducer: {
      outerGroupLanguageMappingData: mockMappingData,
      outerGroupLanguageBaseData: {},
    },
  });

  jest.spyOn(store, 'dispatch').mockImplementation(mockDispatch);

  renderWithRouterAndStore();

  const languageSelectDiv = await screen.findByText('English');
  fireEvent.click(languageSelectDiv);

  await waitFor(() => {
    expect(mockDispatch).toHaveBeenCalledTimes(4); // 3 mapping + 1 level name
  });
});


});
