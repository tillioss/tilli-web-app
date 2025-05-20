import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import SignUp from './SignUp';
import * as Common from '../config/Common';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

jest.mock('../Component/Input', () => (props) => (
  <input
    data-testid={props.name}
    type={props.type}
    className={props.className}
    placeholder={props.placeholder}
    name={props.name}
    onChange={props.handleInputChange}
    onBlur={props.onBlur}
    value={props.value || ''}
  />
));

const mockStore = configureStore([thunk]);

const setup = (storeOverrides = {}) => {
  const store = mockStore({
    languageReducer: {
      outerGroupLanguageMappingData: {
        2: {
          fieldData: {
            1: { value: 'Sign Up' },
            2: { value: 'Email' },
            3: { value: 'Password' },
            4: { value: 'Verify Password' },
            5: { value: 'Name' },
            6: { value: 'Age of the Child' },
            7: { value: 'Name of the Child' },
            8: { value: 'Passcode' },
            9: { value: 'Create Account' },
            10: { value: 'Already have an account?' },
            11: { value: 'Login here' },
          }
        }
      },
      outerGroupLanguageBaseData: {},
      ...storeOverrides
    }
  });

  const history = createMemoryHistory();
  render(
    <Provider store={store}>
      <Router history={history}>
        <SignUp history={history} />
      </Router>
    </Provider>
  );
  return { store, history };
};

describe('SignUp Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(document.body.style, 'backgroundColor', 'set');
  });

  it('renders all form fields', () => {
    setup();
    const fields = [
      'email',
      'password',
      'verifyPassword',
      'name',
      'ageOfTheChild',
      'nameOfTheChild',
      'passcode'
    ];
    fields.forEach((field) => {
      expect(screen.getByTestId(field)).toBeInTheDocument();
    });
  });

  it('validates incorrect email format', () => {
    setup();
    fireEvent.change(screen.getByTestId('email'), {
      target: { name: 'email', value: 'invalidemail' },
    });
    fireEvent.blur(screen.getByTestId('email'));
    expect(screen.getByTestId('email').className).toContain('custom-invalid');
  });

  it('validates password mismatch', () => {
    setup();
    fireEvent.change(screen.getByTestId('password'), {
      target: { name: 'password', value: 'Tilli123' },
    });
    fireEvent.change(screen.getByTestId('verifyPassword'), {
      target: { name: 'verifyPassword', value: 'Mismatch' },
    });
    fireEvent.blur(screen.getByTestId('verifyPassword'));
    expect(screen.getByTestId('verifyPassword').className).toContain('custom-invalid');
  });

  it('triggers checkemail and sets error if email exists', async () => {
    jest.spyOn(Common, 'doConnect').mockResolvedValue({ response: true });
    setup();
    fireEvent.change(screen.getByTestId('email'), {
      target: { name: 'email', value: 'exists@example.com' },
    });
    fireEvent.blur(screen.getByTestId('email'));

    await waitFor(() => {
      expect(screen.getByTestId('email').className).toContain('custom-invalid');
    });
  });

 it('submits form and navigates on successful registration', async () => {
  jest.spyOn(Common, 'doConnect').mockResolvedValue({ response: 'Success' });

  const originalLocation = window.location;
  delete window.location;
  window.location = { ...originalLocation };

  Object.defineProperty(window, 'location', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: { ...originalLocation },
  });

  const assignMock = jest.fn();
  Object.defineProperty(window.location, 'assign', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: assignMock,
  });

  setup();

  fireEvent.change(screen.getByTestId('email'), {
    target: { name: 'email', value: 'john@example.com' },
  });
  fireEvent.change(screen.getByTestId('password'), {
    target: { name: 'password', value: 'Tilli123!' },
  });
  fireEvent.change(screen.getByTestId('verifyPassword'), {
    target: { name: 'verifyPassword', value: 'Tilli123!' },
  });
  fireEvent.change(screen.getByTestId('name'), {
    target: { name: 'name', value: 'John' },
  });
  fireEvent.change(screen.getByTestId('ageOfTheChild'), {
    target: { name: 'ageOfTheChild', value: '5' },
  });
  fireEvent.change(screen.getByTestId('nameOfTheChild'), {
    target: { name: 'nameOfTheChild', value: 'Tom' },
  });
  fireEvent.change(screen.getByTestId('passcode'), {
    target: { name: 'passcode', value: '1234' },
  });

  fireEvent.click(screen.getByText('Create Account'));

  await waitFor(() => {
    expect(assignMock).toHaveBeenCalled();
  });

  window.location = originalLocation;
});


  it('displays fallback text from base language if mapping is missing', () => {
    setup({
      outerGroupLanguageMappingData: {},
      outerGroupLanguageBaseData: {
        2: {
          fieldData: {
            1: { value: 'Fallback Sign Up' },
          }
        }
      }
    });
    expect(screen.getByText('Fallback Sign Up')).toBeInTheDocument();
  });

  it('navigates to login page on click', () => {
  const { history } = setup();
  const loginLink = screen.getByTestId('login-here-link');
  fireEvent.click(loginLink);
  expect(history.location.pathname).toBe('/tilli-web');
});

it('accepts valid email input', () => {
  setup();
  fireEvent.change(screen.getByTestId('email'), {
    target: { name: 'email', value: 'valid@email.com' },
  });
  fireEvent.blur(screen.getByTestId('email'));
  expect(screen.getByTestId('email').className).not.toContain('custom-invalid');
});

it('shows validation errors on empty fields during first submit', async () => {
  jest.spyOn(Common, 'doConnect').mockResolvedValue({ response: 'Success' });

  setup(); // no need for container now

  fireEvent.click(screen.getByText('Create Account'));

  await waitFor(() => {
    // Check each required field by test id and validate className
    expect(screen.getByTestId('email').className).toContain('custom-invalid');
    expect(screen.getByTestId('password').className).toContain('custom-invalid');
    expect(screen.getByTestId('verifyPassword').className).toContain('custom-invalid');
    expect(screen.getByTestId('name').className).toContain('custom-invalid');
    expect(screen.getByTestId('ageOfTheChild').className).toContain('custom-invalid');
    expect(screen.getByTestId('nameOfTheChild').className).toContain('custom-invalid');
    expect(screen.getByTestId('passcode').className).toContain('custom-invalid');
  });
});

it('returnContent returns empty string when no mapping or base data exists', () => {
  const storeOverrides = {
    outerGroupLanguageMappingData: {},
    outerGroupLanguageBaseData: {}
  };
  setup(storeOverrides);

  const heading = screen.getByTestId('heading-text');
  expect(heading.textContent).toBe(' ');
});

it('shows validation error on invalid age of child', () => {
  setup();
  fireEvent.change(screen.getByTestId('ageOfTheChild'), {
    target: { name: 'ageOfTheChild', value: 'abc' },
  });
  fireEvent.blur(screen.getByTestId('ageOfTheChild'));
  expect(screen.getByTestId('ageOfTheChild').className).toContain('custom-invalid');
});

it('shows validation error for short passcode', () => {
  setup();
  fireEvent.change(screen.getByTestId('passcode'), {
    target: { name: 'passcode', value: '12' },
  });
  fireEvent.blur(screen.getByTestId('passcode'));
  expect(screen.getByTestId('passcode').className).toContain('custom-invalid');
});

it('does not set email error when checkemail returns false', async () => {
  jest.spyOn(Common, 'doConnect').mockResolvedValue({ response: false });
  setup();

  const input = screen.getByTestId('email');
  fireEvent.change(input, {
    target: { name: 'email', value: 'unique@example.com' },
  });
  fireEvent.blur(input);

  await waitFor(() => {
    expect(input.className).not.toContain('custom-invalid');
  });
});

});
