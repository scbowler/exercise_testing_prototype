import types from '../actions/types';

const DEFAULT_STATE = {
    title: null,
    questions: null
};

export default (state = DEFAULT_STATE, {type, ...action}) => {
    switch(type){
        case types.ADMIN_ADD_QUESTION_TO_EXERCISE:
            return { ...state, questions: [ ...state.questions, action.question ]};
        case types.ADMIN_GET_EXERCISE_QUESTIONS:
            return { ...state, ...action.exercise};
        default:
            return state;
    }
}
