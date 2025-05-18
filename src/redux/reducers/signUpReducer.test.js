import signUpReducer from '../reducers/signUpReducer';

describe('signUpReducer', () => {
  const initialState = {
    success: false,
    name: '',
    email: '',
    password: '',
    verifyPassword: '',
    ageOfTheChild: '',
    nameOfTheChild: '',
    passcode: '',
    errors_name: '',
    errors_email: '',
    errors_password: '',
    errors_verifyPassword: '',
    errors_ageOfTheChild: '',
    errors_nameOfTheChild: '',
    hidden: '0',
    hidden1: '0',
  };

  it('should return the initial state when no action is passed', () => {
    expect(signUpReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_SIGNUP for name', () => {
    const action = {
      type: 'SET_SIGNUP',
      key: 'name',
      value: 'John Doe',
    };
    const expectedState = {
      ...initialState,
      name: 'John Doe',
    };
    expect(signUpReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_SIGNUP for email', () => {
    const action = {
      type: 'SET_SIGNUP',
      key: 'email',
      value: 'john@example.com',
    };
    const expectedState = {
      ...initialState,
      email: 'john@example.com',
    };
    expect(signUpReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_SIGNUP for errors_name', () => {
    const action = {
      type: 'SET_SIGNUP',
      key: 'errors_name',
      value: 'Name is required',
    };
    const expectedState = {
      ...initialState,
      errors_name: 'Name is required',
    };
    expect(signUpReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle RESET_SIGNUP', () => {
    const modifiedState = {
      ...initialState,
      name: 'Test User',
      email: 'test@example.com',
      password: 'abc123',
      success: true,
    };
    const action = { type: 'RESET_SIGNUP' };
    expect(signUpReducer(modifiedState, action)).toEqual(initialState);
  });

  it('should return current state for unknown action type', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const currentState = {
      ...initialState,
      name: 'Existing Name',
    };
    expect(signUpReducer(currentState, action)).toEqual(currentState);
  });
});
