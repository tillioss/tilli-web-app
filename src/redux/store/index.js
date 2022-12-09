//import AsyncStorage from '@react-native-community/async-storage';
import storage from 'redux-persist/lib/storage'
import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['authReducer',"languageReducer"],
  blacklist: [
    // 'counterReducer',
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));

const persistor = persistStore(store);

export {store, persistor};
