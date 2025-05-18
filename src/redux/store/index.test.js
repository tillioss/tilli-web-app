// Mock redux and redux-persist BEFORE importing store
jest.mock('redux', () => ({
  ...jest.requireActual('redux'),
  createStore: jest.fn(),
  applyMiddleware: jest.fn(() => 'mockMiddleware'),
}));

jest.mock('redux-persist', () => ({
  persistStore: jest.fn(),
  persistReducer: jest.fn(),
}));

jest.mock('../reducers', () => jest.fn(() => 'mockRootReducer'));

import storage from 'redux-persist/lib/storage';

describe('Redux Store Setup', () => {
  it('should initialize persisted store with correct config and middleware', () => {
    // Setup mock returns
    const mockReducer = jest.fn();
    const mockStore = { dispatch: jest.fn(), getState: jest.fn() };
    const mockPersistor = { purge: jest.fn() };

    // Get mocks
    const persist = require('redux-persist');
    const redux = require('redux');

    persist.persistReducer.mockReturnValue(mockReducer);
    redux.createStore.mockReturnValue(mockStore);
    persist.persistStore.mockReturnValue(mockPersistor);

    // Import AFTER mocks
    const { store, persistor } = require('./index');

    // Assert persistReducer called with correct config
    expect(persist.persistReducer).toHaveBeenCalledWith(
      {
        key: 'root',
        storage: storage,
        whitelist: ['authReducer', 'languageReducer'],
        blacklist: [],
      },
      expect.any(Function)
    );

    // Assert applyMiddleware used with thunk
    expect(redux.applyMiddleware).toHaveBeenCalledWith(expect.any(Function));

    // Assert createStore used with wrapped reducer and middleware
    expect(redux.createStore).toHaveBeenCalledWith(mockReducer, 'mockMiddleware');

    // Assert persistStore called with store
    expect(persist.persistStore).toHaveBeenCalledWith(mockStore);

    // Final values
    expect(store).toBe(mockStore);
    expect(persistor).toBe(mockPersistor);
  });
});
