import types from '../actions/types';

const DEFAULT_STATE = {
    current: null,
    list: null,
    results: null
};

export default (state = DEFAULT_STATE, {type, ...action}) => {
    switch(type){
        case types.GET_EXERCISE_LIST:
            return { ...state, list: action.exercises };
        case types.GET_EXERCISE_QUESTIONS:
            return { ...state, current: action.exercise };
        default:
            return state;
    }
}
