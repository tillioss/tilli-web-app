import { doConnect } from "../../config/Common";

export const setLanguageData = (key, value) => ({
    type: 'SET_LANGUAGE',
    key: key,
    value: value
});

export const FETCH_GET_LANGUAGE_MAPPING_BEGIN = 'FETCH_GET_LANGUAGE_MAPPING_BEGIN';
export const FETCH_GET_OUTER_GROUP_LANGUAGE_MAPPING_SUCCESS = 'FETCH_GET_OUTER_GROUP_LANGUAGE_MAPPING_SUCCESS';
export const FETCH_GET_INNER_GROUP_LANGUAGE_MAPPING_SUCCESS = 'FETCH_GET_INNER_GROUP_LANGUAGE_MAPPING_SUCCESS';
export const FETCH_GET_COMMON_GROUP_LANGUAGE_MAPPING_SUCCESS = 'FETCH_GET_COMMON_GROUP_LANGUAGE_MAPPING_SUCCESS';
export const FETCH_GET_LANGUAGE_MAPPING_FAILURE = 'FETCH_GET_LANGUAGE_MAPPING_FAILURE';

export const fetchGetLanguageMappingBegin = () => ({
    type: FETCH_GET_LANGUAGE_MAPPING_BEGIN
});

export const fetchGetOuterGroupLanguageMappingSuccess = response => ({
    type: FETCH_GET_OUTER_GROUP_LANGUAGE_MAPPING_SUCCESS,
    payload: {response}
});

export const fetchGetInnerGroupLanguageMappingSuccess = response => ({
    type: FETCH_GET_INNER_GROUP_LANGUAGE_MAPPING_SUCCESS,
    payload: {response}
});

export const fetchGetCommonGroupLanguageMappingSuccess = response => ({
    type: FETCH_GET_COMMON_GROUP_LANGUAGE_MAPPING_SUCCESS,
    payload: {response}
});



export const fetchGetLanguageMappingFailure = error => ({
    type: FETCH_GET_LANGUAGE_MAPPING_FAILURE,
    payload: {error}
});

export function fetchGetLanguageMapping(postJson) {
   
    return async (dispatch) => {
        let startTime = Date.now();
        dispatch(fetchGetLanguageMappingBegin());

        let responseData = await doConnect("getLanguageMappingDataWithBaseData", "POST", postJson);
        let json = responseData;
        if(postJson.grouptype=="innerPageGroup")
        {
            dispatch(fetchGetInnerGroupLanguageMappingSuccess(json));

        }
        else if(postJson.grouptype=="outerPageGroup")
        {
            dispatch(fetchGetOuterGroupLanguageMappingSuccess(json));

        }
        else if(postJson.grouptype=="commonPageGroup")
        {
            dispatch(fetchGetCommonGroupLanguageMappingSuccess(json));

        }
        
    };
}


export const FETCH_GET_LEVEL_NAME_LANGUAGE_MAPPING_BEGIN = 'FETCH_GET_LEVEL_NAME_LANGUAGE_MAPPING_BEGIN';
export const FETCH_GET_LEVEL_NAME_LANGUAGE_MAPPING_SUCCESS = 'FETCH_GET_LEVEL_NAME_LANGUAGE_MAPPING_SUCCESS';
export const FETCH_GET_LEVEL_NAME_LANGUAGE_MAPPING_FAILURE = 'FETCH_GET_LEVEL_NAME_LANGUAGE_MAPPING_FAILURE';

export const fetchGetLevelNameLanguageMappingBegin = () => ({
    type: FETCH_GET_LEVEL_NAME_LANGUAGE_MAPPING_BEGIN
});

export const fetchGetLevelNameLanguageMappingSuccess = response => ({
    type: FETCH_GET_LEVEL_NAME_LANGUAGE_MAPPING_SUCCESS,
    payload: {response}
});

export const fetchGetLevelNameLanguageMappingFailure = error => ({
    type: FETCH_GET_LEVEL_NAME_LANGUAGE_MAPPING_FAILURE,
    payload: {error}
});


export function fetchGetLevelNameLanguageMapping(postJson) {

    return async (dispatch) => {
        let startTime = Date.now();
        dispatch(fetchGetLevelNameLanguageMappingBegin());
        let json = await doConnect("getLevelsNameLanguageMapping", "POST", postJson);
        dispatch(fetchGetLevelNameLanguageMappingSuccess(json));
    };
}

