import loginReducer from './loginReducer';
import {
  SET_LOGIN,
  RESET_LOGIN,
  RESET_LOGIN_ERRORS,
} from '../constants/actionTypes';

describe('loginReducer', () => {
  const initialState = {
    email: '',
    password: '',
    passwordVisible: true,
    errors_email: '',
    errors_password: '',
  };

  it('should return the initial state when no action is passed', () => {
    expect(loginReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_LOGIN for email field', () => {
    const action = {
      type: SET_LOGIN,
      key: 'email',
      value: 'test@example.com',
    };
    const expectedState = {
      ...initialState,
      email: 'test@example.com',
    };
    expect(loginReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_LOGIN for passwordVisible field', () => {
    const action = {
      type: SET_LOGIN,
      key: 'passwordVisible',
      value: false,
    };
    const expectedState = {
      ...initialState,
      passwordVisible: false,
    };
    expect(loginReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle RESET_LOGIN', () => {
    const currentState = {
      ...initialState,
      email: 'user@mail.com',
      password: 'pass123',
      passwordVisible: false,
      errors_email: 'Invalid',
      errors_password: 'Too short',
    };
    const action = { type: RESET_LOGIN };
    const expectedState = {
      ...initialState,
      success: false,
      error: false,
      displayMessage: '',
    };
    expect(loginReducer(currentState, action)).toEqual(expectedState);
  });

  it('should handle RESET_LOGIN_ERRORS', () => {
    const currentState = {
      ...initialState,
      email: 'user@mail.com',
      password: 'pass123',
      errors_email: 'Required',
      errors_password: 'Required',
    };
    const action = { type: RESET_LOGIN_ERRORS };
    const expectedState = {
      ...currentState,
      success: false,
      error: false,
      displayMessage: '',
      errors_email: '',
      errors_password: '',
    };
    expect(loginReducer(currentState, action)).toEqual(expectedState);
  });

  it('should return current state for unknown action types', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    expect(loginReducer(initialState, action)).toEqual(initialState);
  });
});
