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

const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SIGNUP': {
      return {
        ...state,
        [action.key]: action.value,
      };
    }

    case 'RESET_SIGNUP': {
      return {
        ...state,
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
    }
    default: {
      return state;
    }
  }
};

export default signUpReducer;
