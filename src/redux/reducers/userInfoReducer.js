import {SET_USER_INFO} from '../constants/actionTypes';

const initialState = {
  progressingLevel: 0,
};

const userInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO: {
      return {
        ...state,
        [action.key]: action.value,
      };
    }
    default: {
      return state;
    }
  }
};

export default userInfoReducer;
