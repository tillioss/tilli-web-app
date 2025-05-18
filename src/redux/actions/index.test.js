import {
  setAuthData,
  reSetAuthData,
  setSignUpData,
  reSetSignUData,
  setLoginData,
  reSetLoginData,
  setUserInfo,
  setGameAuthData,
  setGameMultipleAuthData,
  reSetGameAuthData,
} from './index';

import {
  SET_AUTH,
  RESET_AUTH,
  SET_SIGNUP,
  RESET_SIGNUP,
  SET_LOGIN,
  RESET_LOGIN,
  SET_USER_INFO,
  SET_GAME_AUTH,
  SET_MULTIPLE_GAME_AUTH,
  RESET_GAME_AUTH,
} from '../constants/actionTypes';

describe('Auth Actions', () => {
  it('should create an action to set auth data', () => {
    const action = setAuthData('isLoggedIn', '1');
    expect(action).toEqual({
      type: SET_AUTH,
      key: 'isLoggedIn',
      value: '1',
    });
  });

  it('should create an action to reset auth data', () => {
    expect(reSetAuthData()).toEqual({ type: RESET_AUTH });
  });

  it('should create an action to set signup data', () => {
    const action = setSignUpData('email', 'test@example.com');
    expect(action).toEqual({
      type: SET_SIGNUP,
      key: 'email',
      value: 'test@example.com',
    });
  });

  it('should create an action to reset signup data', () => {
    expect(reSetSignUData()).toEqual({ type: RESET_SIGNUP });
  });

  it('should create an action to set login data', () => {
    const action = setLoginData('password', '123456');
    expect(action).toEqual({
      type: SET_LOGIN,
      key: 'password',
      value: '123456',
    });
  });

  it('should create an action to reset login data', () => {
    expect(reSetLoginData()).toEqual({ type: RESET_LOGIN });
  });

  it('should create an action to set user info', () => {
    const action = setUserInfo('progressingLevel', 2);
    expect(action).toEqual({
      type: SET_USER_INFO,
      key: 'progressingLevel',
      value: 2,
    });
  });

  it('should create an action to set game auth data', () => {
    const action = setGameAuthData('childName', 'John');
    expect(action).toEqual({
      type: SET_GAME_AUTH,
      key: 'childName',
      value: 'John',
    });
  });

  it('should create an action to set multiple game auth data', () => {
    const payload = {
      createEmailId: 'parent@example.com',
      createPassword: 'abc123',
    };
    const action = setGameMultipleAuthData(payload);
    expect(action).toEqual({
      type: SET_MULTIPLE_GAME_AUTH,
      data: payload,
    });
  });

  it('should create an action to reset game auth data', () => {
    expect(reSetGameAuthData()).toEqual({ type: RESET_GAME_AUTH });
  });
});
