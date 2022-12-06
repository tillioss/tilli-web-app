import { SET_GAME_AUTH, RESET_GAME_AUTH, SET_MULTIPLE_GAME_AUTH } from '../constants/actionTypes';

const initialState = {
    createEmailId: "",
    createPassword: "",
    gender: "girl",
    childName: "",
    ageSelected: {},
    schoolSelected: {},
    classSelected: {},
    createParentPassCode: "",
}

const gameAuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GAME_AUTH: {
            return {
                ...state,
                [action.key]: action.value,
            };
        }
        case SET_MULTIPLE_GAME_AUTH: {
            return {
                ...state,
                ...action.data,
            };
        }
        case RESET_GAME_AUTH: {
            return {
                ...state,
                createEmailId: "",
                createPassword: "",
                gender: "girl",
                childName: "",
                ageSelected: {},
                schoolSelected: {},
                classSelected: {},
                createParentPassCode: "",
            };
        }
        default: {
            return state;
        }
    }

};

export default gameAuthReducer;
