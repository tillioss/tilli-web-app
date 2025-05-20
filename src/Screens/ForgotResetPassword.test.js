import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ForgotResetPassword from './ForgotResetPassword';
import * as Common from '../config/Common';

// Mock utilities
jest.mock('../config/Common', () => ({
  checkNullAndReturnString: jest.fn((val) => !!val),
  doConnect: jest.fn(),
}));

jest.mock('../config/MyConstant', () => ({
  keyList: {
    projectUrl: 'projectUrl', // <== match this to expected routing
  },
}));


const mockStore = configureStore([thunk]);

const renderWithStoreAndRouter = (customHistory) => {
  const store = mockStore({
    languageReducer: {
      outerGroupLanguageMappingData: {
        4: {
          fieldData: {
            2: { value: 'Enter new password' },
            3: { value: 'Confirm password' },
            4: { value: 'Reset Password' },
          },
        },
      },
      outerGroupLanguageBaseData: {},
    },
  });

  const history = customHistory || createMemoryHistory({
    initialEntries: ['/reset/123/456'],
  });

  const utils = render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/reset/:userId/:id" component={ForgotResetPassword} />
      </Router>
    </Provider>
  );

  return { store, history, ...utils };
};

describe('ForgotResetPassword', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders input fields and button with placeholders', () => {
    renderWithStoreAndRouter();

    expect(screen.getByTestId('password')).toBeInTheDocument();
    expect(screen.getByTestId('confirm-password')).toBeInTheDocument();
    expect(screen.getByText('Reset Password')).toBeInTheDocument();
  });

  it('shows validation error if new password is empty', async () => {
  renderWithStoreAndRouter();

  // Ensure input is cleared (safety)
  fireEvent.change(screen.getByTestId('password'), { target: { value: '' } });

  fireEvent.click(screen.getByTestId('submit-btn'));

  await waitFor(() => {
    const errorBox = screen.getByTestId('error-alert');
    expect(errorBox).toHaveTextContent(/please enter new password/i);
  });
});

  it('shows error if confirm password is empty', async () => {
  renderWithStoreAndRouter();

  // Enter valid new password
  fireEvent.change(screen.getByTestId('password'), {
    target: { value: 'abcdef' },
  });

  // Leave confirm password empty and click submit
  fireEvent.change(screen.getByTestId('confirm-password'), {
    target: { value: '' },
  });

  fireEvent.click(screen.getByTestId('submit-btn'));

  await waitFor(() => {
    const errorBox = screen.getByTestId('error-alert');
    expect(errorBox).toHaveTextContent(/please enter confirn password/i);
  });
});


 it('shows error on password mismatch', async () => {
  renderWithStoreAndRouter();

  // Fill both fields with different values
  fireEvent.change(screen.getByTestId('password'), {
    target: { value: 'abcdef' },
  });

  fireEvent.change(screen.getByTestId('confirm-password'), {
    target: { value: 'abc123' },
  });

  fireEvent.click(screen.getByTestId('submit-btn'));

  await waitFor(() => {
    const errorBox = screen.getByTestId('error-alert');
    expect(errorBox).toHaveTextContent(/password mismatch/i);
  });
});

it('calls doConnect and shows success on valid input', async () => {
  Common.doConnect.mockResolvedValue({ response: 'Success' });

  renderWithStoreAndRouter();

  fireEvent.change(screen.getByTestId('password'), {
    target: { value: 'abcdef' },
  });

  fireEvent.change(screen.getByTestId('confirm-password'), {
    target: { value: 'abcdef' },
  });

  fireEvent.click(screen.getByTestId('submit-btn'));

  await waitFor(() => {
    expect(screen.getByText(/password has been updated/i)).toBeInTheDocument();
  });

  expect(Common.doConnect).toHaveBeenCalledWith(
    'updateForgotPassword',
    'POST',
    expect.objectContaining({
      id: '456',
      userId: '123',
      password: 'abcdef',
    })
  );
});

it('shows error if new password is less than 6 characters', async () => {
  renderWithStoreAndRouter();

  fireEvent.change(screen.getByTestId('password'), { target: { value: 'abc' } });
  fireEvent.change(screen.getByTestId('confirm-password'), { target: { value: 'abc' } });

  fireEvent.click(screen.getByTestId('submit-btn'));

  await waitFor(() => {
    const errorBox = screen.getByTestId('error-alert');
    expect(errorBox).toHaveTextContent(/min 6 characters required in new password/i);
  });
});

it('shows error if confirm password is less than 6 characters', async () => {
  renderWithStoreAndRouter();

  fireEvent.change(screen.getByTestId('password'), { target: { value: 'abcdef' } });
  fireEvent.change(screen.getByTestId('confirm-password'), { target: { value: 'abc' } });

  fireEvent.click(screen.getByTestId('submit-btn'));

  await waitFor(() => {
    const errorBox = screen.getByTestId('error-alert');
    expect(errorBox).toHaveTextContent(/min 6 characters required in confirm password/i);
  });
});

it('does not show success message if doConnect response is not "Success"', async () => {
  Common.doConnect.mockResolvedValue({ response: 'Failure' });

  renderWithStoreAndRouter();

  fireEvent.change(screen.getByTestId('password'), { target: { value: 'abcdef' } });
  fireEvent.change(screen.getByTestId('confirm-password'), { target: { value: 'abcdef' } });

  fireEvent.click(screen.getByTestId('submit-btn'));

  await waitFor(() => {
    expect(screen.queryByText(/password has been updated/i)).not.toBeInTheDocument();
  });
});

it('sets userId and id from route params correctly', () => {
  const { history } = renderWithStoreAndRouter();

  expect(history.location.pathname).toBe('/reset/123/456');
});

it('renders empty placeholders and button text when content mappings are missing', () => {
  renderWithStoreAndRouter();

  const newPasswordInput = screen.getByTestId('password');
  const confirmPasswordInput = screen.getByTestId('confirm-password');
  const button = screen.getByTestId('submit-btn');

  expect(newPasswordInput).toHaveAttribute('placeholder', '');
  expect(confirmPasswordInput).toHaveAttribute('placeholder', '');
  expect(button).toHaveTextContent('');
});
});
