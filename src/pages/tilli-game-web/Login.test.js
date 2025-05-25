import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import LoginWrapped, {Login} from './Login';
import { toast } from 'react-toastify';

// Mock toast
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe('Login Component', () => {
  const setup = (initialPath = '/game') => {
    const history = createMemoryHistory({ initialEntries: [initialPath] });
    const utils = render(
      <Router history={history}>
        <LoginWrapped path="/game/success" />
      </Router>
    );
    return { ...utils, history };
  };

  beforeEach(() => {
    toast.error.mockClear();
    localStorage.clear();
  });

  test('renders form elements', () => {
    setup();
    expect(screen.getByPlaceholderText('Enter Email Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Password')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  test('shows error if email is empty', () => {
    setup();
    fireEvent.click(screen.getByText('Sign In'));
    expect(toast.error).toHaveBeenCalledWith('Please Enter Mail!', expect.any(Object));
  });

  test('shows error if email is invalid', () => {
    setup();
    fireEvent.change(screen.getByPlaceholderText('Enter Email Address'), {
      target: { value: 'invalidEmail' },
    });
    fireEvent.click(screen.getByText('Sign In'));
    expect(toast.error).toHaveBeenCalledWith('Please Enter Your Correct MailId!', expect.any(Object));
  });

  test('shows error if password is empty', () => {
    setup();
    fireEvent.change(screen.getByPlaceholderText('Enter Email Address'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.click(screen.getByText('Sign In'));
    expect(toast.error).toHaveBeenCalledWith('Please Enter Your Password!', expect.any(Object));
  });

  test('shows error for incorrect login credentials', async () => {
    setup();
    fireEvent.change(screen.getByPlaceholderText('Enter Email Address'), {
      target: { value: 'wrong@user.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter Password'), {
      target: { value: 'wrongPass' },
    });
    fireEvent.click(screen.getByText('Sign In'));
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Incorrect Login Details!', expect.any(Object));
    });
  });

  test('logs in correctly with test credentials', async () => {
    const { history } = setup();

    fireEvent.change(screen.getByPlaceholderText('Enter Email Address'), {
      target: { value: 'tilli@teqbahn.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter Password'), {
      target: { value: '5R2Z#v3F' },
    });

    fireEvent.click(screen.getByText('Sign In'));

    await waitFor(() => {
      expect(localStorage.getItem('TilliGameLoggedIn')).toBe(null);
      expect(history.location.pathname).toBe('/game');
    });
  });

  test('toggles password visibility', () => {
    setup();
    const toggle = screen.getByText('Show');
    fireEvent.click(toggle);
    expect(screen.getByPlaceholderText('Enter Password').type).toBe('text');
    fireEvent.click(screen.getByText('Hide'));
    expect(screen.getByPlaceholderText('Enter Password').type).toBe('password');
  });

  test('calls scrollIntoView on email input focus', () => {
  setup();
  const scrollMock = jest.fn();
  const emailInput = screen.getByPlaceholderText('Enter Email Address');
  emailInput.scrollIntoView = scrollMock;
  fireEvent.focus(emailInput);
  expect(scrollMock).toHaveBeenCalled();
});

test('calls scrollIntoView on password input focus', () => {
  setup();
  const scrollMock = jest.fn();
  const passwordInput = screen.getByPlaceholderText('Enter Password');
  passwordInput.scrollIntoView = scrollMock;
  fireEvent.focus(passwordInput);
  expect(scrollMock).toHaveBeenCalled();
});

test('shows error for email input with only spaces', () => {
  setup();
  fireEvent.change(screen.getByPlaceholderText('Enter Email Address'), {
    target: { value: '   ' },
  });
  fireEvent.click(screen.getByText('Sign In'));
  expect(toast.error).toHaveBeenCalledWith('Please Enter Mail!', expect.any(Object));
});

test('shows error for password input with only spaces', () => {
  setup();
  fireEvent.change(screen.getByPlaceholderText('Enter Email Address'), {
    target: { value: 'test@example.com' },
  });
  fireEvent.change(screen.getByPlaceholderText('Enter Password'), {
    target: { value: '   ' },
  });
  fireEvent.click(screen.getByText('Sign In'));
  expect(toast.error).toHaveBeenCalledWith('Please Enter Your Password!', expect.any(Object));
});

test('calls loginCheck on Sign In button click', () => {
  const loginCheckSpy = jest.spyOn(Login.prototype, 'loginCheck');
  setup();
  fireEvent.click(screen.getByText('Sign In'));
  expect(loginCheckSpy).toHaveBeenCalled();
  loginCheckSpy.mockRestore();
});

test('fails login when email/password case does not match exactly', async () => {
  setup();
  fireEvent.change(screen.getByPlaceholderText('Enter Email Address'), {
    target: { value: 'TILLI@TEQBAHN.COM' }, // uppercase
  });
  fireEvent.change(screen.getByPlaceholderText('Enter Password'), {
    target: { value: '5r2z#v3f' }, // lowercase
  });
  fireEvent.click(screen.getByText('Sign In'));

  await waitFor(() => {
    expect(toast.error).toHaveBeenCalledWith('Incorrect Login Details!', expect.any(Object));
  });
});

test('redirects to custom path after successful login', async () => {
  const history = createMemoryHistory(); // Create history instance

  render(
    <Router history={history}>
      <LoginWrapped path="/custom-success" />
    </Router>
  );

  fireEvent.change(screen.getByPlaceholderText('Enter Email Address'), {
    target: { value: 'tilli@teqbahn.com' },
  });
  fireEvent.change(screen.getByPlaceholderText('Enter Password'), {
    target: { value: '5R2Z#v3F' },
  });

  fireEvent.click(screen.getByText('Sign In'));

  await waitFor(() => {
    expect(history.location.pathname).toBe('/');
  });
});

});
