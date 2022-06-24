import {
  SET_LOGIN,
  RESET_LOGIN,
  RESET_LOGIN_ERRORS,
} from '../constants/actionTypes';

const initialState = {
  email: '',
  password: '',
  passwordVisible: true,
  errors_email: '',
  errors_password: '',
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN: {
      return {
        ...state,
        [action.key]: action.value,
      };
    }
    case RESET_LOGIN: {
      return {
        ...state,
        success: false,
        error: false,
        displayMessage: '',
        email: '',
        password: '',
        passwordVisible: true,
        errors_email: '',
        errors_password: '',
      };
    }
    case RESET_LOGIN_ERRORS: {
      return {
        ...state,
        success: false,
        error: false,
        displayMessage: '',
        errors_email: '',
        errors_password: '',
      };
    }
    default: {
      return state;
    }
  }
};

export default loginReducer;
