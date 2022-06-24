import {
  SET_LOGIN,
  SET_SIGNUP,
  RESET_LOGIN,
  RESET_SIGNUP,
  SET_AUTH,
  RESET_AUTH,
  SET_USER_INFO,
} from '../constants/actionTypes';

export const setAuthData = (key, value) => ({
  type: SET_AUTH,
  key: key,
  value: value,
});

export const reSetAuthData = () => ({
  type: RESET_AUTH,
});

export const setSignUpData = (key, value) => ({
  type: SET_SIGNUP,
  key: key,
  value: value,
});

export const reSetSignUData = () => ({
  type: RESET_SIGNUP,
});

export const setLoginData = (key, value) => ({
  type: SET_LOGIN,
  key: key,
  value: value,
});

export const reSetLoginData = () => ({
  type: RESET_LOGIN,
});

export const setUserInfo = (key, value) => ({
  type: SET_USER_INFO,
  key: key,
  value: value,
});
