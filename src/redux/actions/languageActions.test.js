import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './languageActions';
import * as Common from '../../config/Common';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../../config/Common', () => ({
  doConnect: jest.fn()
}));

describe('Language Actions', () => {
  it('should create setLanguageData action', () => {
    const expectedAction = {
      type: 'SET_LANGUAGE',
      key: 'language',
      value: 'en'
    };
    expect(actions.setLanguageData('language', 'en')).toEqual(expectedAction);
  });

  it('should create fetch begin action for language mapping', () => {
    expect(actions.fetchGetLanguageMappingBegin()).toEqual({ type: actions.FETCH_GET_LANGUAGE_MAPPING_BEGIN });
  });

  it('should create success actions for different group types', () => {
    const response = { data: 'test' };
    expect(actions.fetchGetOuterGroupLanguageMappingSuccess(response)).toEqual({
      type: actions.FETCH_GET_OUTER_GROUP_LANGUAGE_MAPPING_SUCCESS,
      payload: { response }
    });

    expect(actions.fetchGetInnerGroupLanguageMappingSuccess(response)).toEqual({
      type: actions.FETCH_GET_INNER_GROUP_LANGUAGE_MAPPING_SUCCESS,
      payload: { response }
    });

    expect(actions.fetchGetCommonGroupLanguageMappingSuccess(response)).toEqual({
      type: actions.FETCH_GET_COMMON_GROUP_LANGUAGE_MAPPING_SUCCESS,
      payload: { response }
    });
  });

  it('should create failure action', () => {
    const error = new Error('Error');
    expect(actions.fetchGetLanguageMappingFailure(error)).toEqual({
      type: actions.FETCH_GET_LANGUAGE_MAPPING_FAILURE,
      payload: { error }
    });
  });

  it('should create fetch begin/success/failure for level name mapping', () => {
    const begin = actions.fetchGetLevelNameLanguageMappingBegin();
    expect(begin).toEqual({ type: actions.FETCH_GET_LEVEL_NAME_LANGUAGE_MAPPING_BEGIN });

    const response = { levels: ['one', 'two'] };
    expect(actions.fetchGetLevelNameLanguageMappingSuccess(response)).toEqual({
      type: actions.FETCH_GET_LEVEL_NAME_LANGUAGE_MAPPING_SUCCESS,
      payload: { response }
    });

    const error = new Error('fail');
    expect(actions.fetchGetLevelNameLanguageMappingFailure(error)).toEqual({
      type: actions.FETCH_GET_LEVEL_NAME_LANGUAGE_MAPPING_FAILURE,
      payload: { error }
    });
  });
});

describe('Async Language Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    jest.clearAllMocks();
  });

  it('dispatches correct actions for innerPageGroup', async () => {
    Common.doConnect.mockResolvedValue({ result: 'inner' });

    const expectedActions = [
      { type: actions.FETCH_GET_LANGUAGE_MAPPING_BEGIN },
      {
        type: actions.FETCH_GET_INNER_GROUP_LANGUAGE_MAPPING_SUCCESS,
        payload: { response: { result: 'inner' } }
      }
    ];

    await store.dispatch(actions.fetchGetLanguageMapping({ grouptype: 'innerPageGroup' }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatches correct actions for outerPageGroup', async () => {
    Common.doConnect.mockResolvedValue({ result: 'outer' });

    const expectedActions = [
      { type: actions.FETCH_GET_LANGUAGE_MAPPING_BEGIN },
      {
        type: actions.FETCH_GET_OUTER_GROUP_LANGUAGE_MAPPING_SUCCESS,
        payload: { response: { result: 'outer' } }
      }
    ];

    await store.dispatch(actions.fetchGetLanguageMapping({ grouptype: 'outerPageGroup' }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatches correct actions for commonPageGroup', async () => {
    Common.doConnect.mockResolvedValue({ result: 'common' });

    const expectedActions = [
      { type: actions.FETCH_GET_LANGUAGE_MAPPING_BEGIN },
      {
        type: actions.FETCH_GET_COMMON_GROUP_LANGUAGE_MAPPING_SUCCESS,
        payload: { response: { result: 'common' } }
      }
    ];

    await store.dispatch(actions.fetchGetLanguageMapping({ grouptype: 'commonPageGroup' }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatches actions for fetchGetLevelNameLanguageMapping', async () => {
    Common.doConnect.mockResolvedValue({ levelData: ['a', 'b'] });

    const expectedActions = [
      { type: actions.FETCH_GET_LEVEL_NAME_LANGUAGE_MAPPING_BEGIN },
      {
        type: actions.FETCH_GET_LEVEL_NAME_LANGUAGE_MAPPING_SUCCESS,
        payload: { response: { levelData: ['a', 'b'] } }
      }
    ];

    await store.dispatch(actions.fetchGetLevelNameLanguageMapping({ some: 'data' }));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
