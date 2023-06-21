import {
    FETCH_GET_COMMON_GROUP_LANGUAGE_MAPPING_SUCCESS,
    FETCH_GET_INNER_GROUP_LANGUAGE_MAPPING_SUCCESS,
    FETCH_GET_LANGUAGE_MAPPING_BEGIN,
    FETCH_GET_LANGUAGE_MAPPING_FAILURE,
    FETCH_GET_LEVEL_NAME_LANGUAGE_MAPPING_BEGIN,
    FETCH_GET_LEVEL_NAME_LANGUAGE_MAPPING_FAILURE,
    FETCH_GET_LEVEL_NAME_LANGUAGE_MAPPING_SUCCESS,
    FETCH_GET_OUTER_GROUP_LANGUAGE_MAPPING_SUCCESS,
} from '../actions/languageActions';

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

const languageReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LANGUAGE': {
            return {
                ...state,
                [action.key]: action.value,
            }
        }

        case FETCH_GET_LANGUAGE_MAPPING_BEGIN: {
            return {
                ...state,
                loading: true,
                error: null
            };
        }
        case FETCH_GET_OUTER_GROUP_LANGUAGE_MAPPING_SUCCESS: {
            let json = action.payload.response;
            let response1 = json.dataMap;
            if (response1) {
                return {
                    ...state,
                    loading: false,
                    outerGroupLanguageMappingData: JSON.parse(response1.mappingData),
                    outerGroupLanguageBaseData: JSON.parse(response1.baseData)
                };
            }
        }
            break;
        case FETCH_GET_INNER_GROUP_LANGUAGE_MAPPING_SUCCESS: {
            let json = action.payload.response;
            let response1 = json.dataMap;
            if (response1) {
                return {
                    ...state,
                    loading: false,
                    innerGroupLanguageMappingData: JSON.parse(response1.mappingData),
                    innnerGroupLanguageBaseData: JSON.parse(response1.baseData)
                };
            }
        }
            break;
        case FETCH_GET_COMMON_GROUP_LANGUAGE_MAPPING_SUCCESS: {
            let json = action.payload.response;
            let response1 = json.dataMap;
            if (response1) {
                return {
                    ...state,
                    loading: false,
                    commonGroupLanguageMappingData: JSON.parse(response1.mappingData),
                    commonGroupLanguageBaseData: JSON.parse(response1.baseData)
                };
            }
        }
            break;
        case FETCH_GET_LANGUAGE_MAPPING_FAILURE: {
            // console.log("Step 3" + JSON.stringify(action.payload))
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };
        }
        case FETCH_GET_LEVEL_NAME_LANGUAGE_MAPPING_BEGIN: {
            return {
                ...state,
                loading: true,
                error: null
            };
        }
        case FETCH_GET_LEVEL_NAME_LANGUAGE_MAPPING_SUCCESS: {
            let json = action.payload.response;
            return {
                ...state,
                loading: false,
                levelLanguageMappingData: json.response ? JSON.parse(json.response) : {},
            }

        }

        case FETCH_GET_LEVEL_NAME_LANGUAGE_MAPPING_FAILURE: {
            // console.log("Step 3" + JSON.stringify(action.payload))
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };
        }

        default: {
            return state;
        }
    }
};

export default languageReducer;
