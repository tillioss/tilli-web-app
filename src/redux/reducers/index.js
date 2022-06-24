import {combineReducers} from 'redux';

import authReducer from './authReducer';
import signUpReducer from './signUpReducer';
import loginReducer from './loginReducer';
import userInfoReducer from './userInfoReducer';
import languageReducer from './languageReducer';


const rootReducer = combineReducers({
  authReducer: authReducer,
  signUpReducer: signUpReducer,
  loginReducer: loginReducer,
  userInfoReducer: userInfoReducer,
  languageReducer: languageReducer,

});

export default rootReducer;
