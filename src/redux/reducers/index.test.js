import rootReducer from './index';
import { SET_AUTH, RESET_AUTH, SET_GAME_AUTH, RESET_GAME_AUTH } from '../constants/actionTypes';

describe('rootReducer', () => {
  it('should return initial combined state', () => {
    const state = rootReducer(undefined, {});
    expect(state).toHaveProperty('authReducer');
    expect(state).toHaveProperty('signUpReducer');
    expect(state).toHaveProperty('loginReducer');
    expect(state).toHaveProperty('userInfoReducer');
    expect(state).toHaveProperty('languageReducer');
    expect(state).toHaveProperty('gameAuthReducer');
  });

  it('should update authReducer state on SET_AUTH action', () => {
    const action = {
      type: SET_AUTH,
      key: 'loggedUserId',
      value: 'user_001'
    };
    const state = rootReducer(undefined, action);
    expect(state.authReducer.loggedUserId).toBe('user_001');
  });

  it('should reset authReducer state on RESET_AUTH', () => {
    const action = { type: RESET_AUTH };
    const state = rootReducer(undefined, action);
    expect(state.authReducer.isLoggedIn).toBe('0');
    expect(state.authReducer.loggedUserId).toBe('');
  });

  it('should update gameAuthReducer state on SET_GAME_AUTH action', () => {
    const action = {
      type: SET_GAME_AUTH,
      key: 'childName',
      value: 'Alice'
    };
    const state = rootReducer(undefined, action);
    expect(state.gameAuthReducer.childName).toBe('Alice');
  });

  it('should reset gameAuthReducer state on RESET_GAME_AUTH', () => {
    const action = { type: RESET_GAME_AUTH };
    const state = rootReducer(undefined, action);
    expect(state.gameAuthReducer.childName).toBe('');
    expect(state.gameAuthReducer.gender).toBe('girl');
  });
});
