import userInfoReducer from './userInfoReducer'; // Adjust path if needed
import { SET_USER_INFO } from '../constants/actionTypes';

describe('userInfoReducer', () => {
  const initialState = {
    progressingLevel: 0,
  };

  it('should return the initial state when state is undefined', () => {
    const newState = userInfoReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it('should handle SET_USER_INFO action correctly', () => {
    const action = {
      type: SET_USER_INFO,
      key: 'progressingLevel',
      value: 3,
    };
    const expectedState = {
      progressingLevel: 3,
    };
    const newState = userInfoReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should handle SET_USER_INFO with a new dynamic key', () => {
    const action = {
      type: SET_USER_INFO,
      key: 'username',
      value: 'JohnDoe',
    };
    const expectedState = {
      progressingLevel: 0,
      username: 'JohnDoe',
    };
    const newState = userInfoReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should return current state for unknown action types', () => {
    const action = {
      type: 'UNKNOWN_ACTION',
    };
    const currentState = {
      progressingLevel: 2,
    };
    const newState = userInfoReducer(currentState, action);
    expect(newState).toEqual(currentState);
  });
});
