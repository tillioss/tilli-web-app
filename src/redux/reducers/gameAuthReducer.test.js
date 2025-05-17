import gameAuthReducer from './gameAuthReducer';
import {
  SET_GAME_AUTH,
  SET_MULTIPLE_GAME_AUTH,
  RESET_GAME_AUTH,
} from '../constants/actionTypes';

describe('gameAuthReducer', () => {
  const initialState = {
    createEmailId: '',
    createPassword: '',
    gender: 'girl',
    childName: '',
    ageSelected: {},
    schoolSelected: {},
    classSelected: {},
    createParentPassCode: '',
  };

  it('should return the initial state when passed an unknown action', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const state = gameAuthReducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  it('should handle SET_GAME_AUTH by updating a single key', () => {
    const action = {
      type: SET_GAME_AUTH,
      key: 'createEmailId',
      value: 'test@example.com',
    };
    const state = gameAuthReducer(initialState, action);
    expect(state.createEmailId).toBe('test@example.com');
    expect(state.gender).toBe('girl'); // untouched
  });

  it('should handle SET_MULTIPLE_GAME_AUTH by updating multiple keys', () => {
    const action = {
      type: SET_MULTIPLE_GAME_AUTH,
      data: {
        childName: 'Lily',
        ageSelected: { id: 1, label: '5 years' },
        schoolSelected: { id: 10, name: 'ABC School' },
      },
    };
    const state = gameAuthReducer(initialState, action);
    expect(state.childName).toBe('Lily');
    expect(state.ageSelected).toEqual({ id: 1, label: '5 years' });
    expect(state.schoolSelected).toEqual({ id: 10, name: 'ABC School' });
  });

  it('should handle RESET_GAME_AUTH by resetting to initial state', () => {
    const modifiedState = {
      createEmailId: 'a@b.com',
      createPassword: '1234',
      gender: 'boy',
      childName: 'Tommy',
      ageSelected: { id: 2 },
      schoolSelected: { id: 1 },
      classSelected: { id: 3 },
      createParentPassCode: '9999',
    };
    const action = { type: RESET_GAME_AUTH };
    const state = gameAuthReducer(modifiedState, action);
    expect(state).toEqual(initialState);
  });
});
