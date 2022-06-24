import {SET_AUTH, RESET_AUTH} from '../constants/actionTypes';

const initialState = {
  isLoggedIn: '0',
  loggedUserId: '',
  loggedUserName: '',
  loggedUserProfile: '',
  loggedSession: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH: {
      return {
        ...state,
        [action.key]: action.value,
      };
    }
    case RESET_AUTH: {
      return {
        ...state,
        isLoggedIn: '0',
        loggedUserId: '',
        loggedUserName: '',
        loggedUserProfile: '',
        loggedSession: '',
      };
    }
    default: {
      return state;
    }
  }
};

export default authReducer;
