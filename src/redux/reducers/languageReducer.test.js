import languageReducer from './languageReducer';
import {
  FETCH_GET_COMMON_GROUP_LANGUAGE_MAPPING_SUCCESS,
  FETCH_GET_INNER_GROUP_LANGUAGE_MAPPING_SUCCESS,
  FETCH_GET_LANGUAGE_MAPPING_BEGIN,
  FETCH_GET_LANGUAGE_MAPPING_FAILURE,
  FETCH_GET_LEVEL_NAME_LANGUAGE_MAPPING_BEGIN,
  FETCH_GET_LEVEL_NAME_LANGUAGE_MAPPING_FAILURE,
  FETCH_GET_LEVEL_NAME_LANGUAGE_MAPPING_SUCCESS,
  FETCH_GET_OUTER_GROUP_LANGUAGE_MAPPING_SUCCESS
} from '../actions/languageActions';

describe('languageReducer', () => {
  const initialState = {
    levelLanguageMappingData: {},
    currentLanguage: "",
    outerGroupLanguageMappingData: {},
    outerGroupLanguageBaseData: {},
    innerGroupLanguageMappingData: {},
    innnerGroupLanguageBaseData: {},
    commonGroupLanguageMappingData: {},
    commonGroupLanguageBaseData: {},
  };

  it('should return the initial state', () => {
    expect(languageReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_LANGUAGE', () => {
    const action = {
      type: 'SET_LANGUAGE',
      key: 'currentLanguage',
      value: 'en',
    };
    const result = languageReducer(initialState, action);
    expect(result.currentLanguage).toBe('en');
  });

  it('should handle FETCH_GET_LANGUAGE_MAPPING_BEGIN', () => {
    const action = { type: FETCH_GET_LANGUAGE_MAPPING_BEGIN };
    const result = languageReducer(initialState, action);
    expect(result.loading).toBe(true);
    expect(result.error).toBeNull();
  });

  it('should handle FETCH_GET_LANGUAGE_MAPPING_FAILURE', () => {
    const action = { type: FETCH_GET_LANGUAGE_MAPPING_FAILURE, payload: { error: 'Error occurred' } };
    const result = languageReducer({ ...initialState, loading: true }, action);
    expect(result.loading).toBe(false);
    expect(result.error).toBe('Error occurred');
  });

  it('should handle FETCH_GET_LEVEL_NAME_LANGUAGE_MAPPING_BEGIN', () => {
    const action = { type: FETCH_GET_LEVEL_NAME_LANGUAGE_MAPPING_BEGIN };
    const result = languageReducer(initialState, action);
    expect(result.loading).toBe(true);
    expect(result.error).toBeNull();
  });

  it('should handle FETCH_GET_LEVEL_NAME_LANGUAGE_MAPPING_SUCCESS with valid response', () => {
    const action = {
      type: FETCH_GET_LEVEL_NAME_LANGUAGE_MAPPING_SUCCESS,
      payload: { response: { response: JSON.stringify({ test: 'value' }) } },
    };
    const result = languageReducer({ ...initialState, loading: true }, action);
    expect(result.loading).toBe(false);
    expect(result.levelLanguageMappingData).toEqual({ test: 'value' });
  });

  it('should handle FETCH_GET_LEVEL_NAME_LANGUAGE_MAPPING_SUCCESS with empty response', () => {
    const action = {
      type: FETCH_GET_LEVEL_NAME_LANGUAGE_MAPPING_SUCCESS,
      payload: { response: {} },
    };
    const result = languageReducer({ ...initialState, loading: true }, action);
    expect(result.levelLanguageMappingData).toEqual({});
  });

  it('should handle FETCH_GET_LEVEL_NAME_LANGUAGE_MAPPING_FAILURE', () => {
    const action = { type: FETCH_GET_LEVEL_NAME_LANGUAGE_MAPPING_FAILURE, payload: { error: 'fail' } };
    const result = languageReducer({ ...initialState, loading: true }, action);
    expect(result.loading).toBe(false);
    expect(result.error).toBe('fail');
  });

  it('should handle FETCH_GET_OUTER_GROUP_LANGUAGE_MAPPING_SUCCESS', () => {
    const mappingData = { key: 'value' };
    const baseData = { base: 'info' };
    const action = {
      type: FETCH_GET_OUTER_GROUP_LANGUAGE_MAPPING_SUCCESS,
      payload: {
        response: {
          dataMap: {
            mappingData: JSON.stringify(mappingData),
            baseData: JSON.stringify(baseData),
          },
        },
      },
    };
    const result = languageReducer({ ...initialState, loading: true }, action);
    expect(result.outerGroupLanguageMappingData).toEqual(mappingData);
    expect(result.outerGroupLanguageBaseData).toEqual(baseData);
  });

  it('should not modify state if FETCH_GET_OUTER_GROUP_LANGUAGE_MAPPING_SUCCESS has no dataMap', () => {
    const action = {
      type: FETCH_GET_OUTER_GROUP_LANGUAGE_MAPPING_SUCCESS,
      payload: { response: {} },
    };
    const result = languageReducer(initialState, action);
    expect(result).toEqual(undefined);
  });

  it('should handle FETCH_GET_INNER_GROUP_LANGUAGE_MAPPING_SUCCESS', () => {
    const mappingData = { key: 'inner' };
    const baseData = { base: 'innerBase' };
    const action = {
      type: FETCH_GET_INNER_GROUP_LANGUAGE_MAPPING_SUCCESS,
      payload: {
        response: {
          dataMap: {
            mappingData: JSON.stringify(mappingData),
            baseData: JSON.stringify(baseData),
          },
        },
      },
    };
    const result = languageReducer(initialState, action);
    expect(result.innerGroupLanguageMappingData).toEqual(mappingData);
    expect(result.innnerGroupLanguageBaseData).toEqual(baseData);
  });

  it('should handle FETCH_GET_COMMON_GROUP_LANGUAGE_MAPPING_SUCCESS', () => {
    const mappingData = { key: 'common' };
    const baseData = { base: 'commonBase' };
    const action = {
      type: FETCH_GET_COMMON_GROUP_LANGUAGE_MAPPING_SUCCESS,
      payload: {
        response: {
          dataMap: {
            mappingData: JSON.stringify(mappingData),
            baseData: JSON.stringify(baseData),
          },
        },
      },
    };
    const result = languageReducer(initialState, action);
    expect(result.commonGroupLanguageMappingData).toEqual(mappingData);
    expect(result.commonGroupLanguageBaseData).toEqual(baseData);
  });
});
