import types from '../actions/types';

const DEFAULT_STATE = {
    current: null,
    list: null,
    results: {}
};

export default (state = DEFAULT_STATE, {type, ...action}) => {
    switch(type){
        case types.GET_EXERCISE_LIST:
            return { ...state, list: action.exercises };
        case types.GET_EXERCISE_QUESTIONS:
            return { ...state, current: action.exercise };
        case types.CHECK_ANSWER:
            return { ...state, results: {...state.results, ...action.result} };
        default:
            return state;
    }
}
