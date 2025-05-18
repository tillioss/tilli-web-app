import authReducer from './authReducer';
import { SET_AUTH, RESET_AUTH } from '../constants/actionTypes';

describe('authReducer', () => {
  const initialState = {
    isLoggedIn: '0',
    loggedUserId: '',
    loggedUserName: '',
    loggedUserProfile: '',
    loggedSession: '',
  };

  it('should return the initial state when no action is provided', () => {
    const result = authReducer(undefined, {});
    expect(result).toEqual(initialState);
  });

  it('should handle SET_AUTH and update isLoggedIn', () => {
    const action = {
      type: SET_AUTH,
      key: 'isLoggedIn',
      value: '1',
    };
    const result = authReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      isLoggedIn: '1',
    });
  });

  it('should handle SET_AUTH and update loggedUserId', () => {
    const action = {
      type: SET_AUTH,
      key: 'loggedUserId',
      value: 'user123',
    };
    const result = authReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      loggedUserId: 'user123',
    });
  });

  it('should handle SET_AUTH and update loggedUserName', () => {
    const action = {
      type: SET_AUTH,
      key: 'loggedUserName',
      value: 'John Doe',
    };
    const result = authReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      loggedUserName: 'John Doe',
    });
  });

  it('should handle RESET_AUTH and reset all values to initial', () => {
    const modifiedState = {
      isLoggedIn: '1',
      loggedUserId: 'abc',
      loggedUserName: 'Jane',
      loggedUserProfile: 'admin',
      loggedSession: 'xyz',
    };

    const result = authReducer(modifiedState, { type: RESET_AUTH });
    expect(result).toEqual(initialState);
  });

  it('should return current state for unknown action types', () => {
    const action = {
      type: 'UNKNOWN_ACTION',
    };
    const result = authReducer(initialState, action);
    expect(result).toEqual(initialState);
  });
});
