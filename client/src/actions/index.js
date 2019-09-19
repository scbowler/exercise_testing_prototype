import axios from 'axios';
import types from './types';

export const adminGetExercise = id => async dispatch => {
    try {
        const { data } = await axios.get(`/api/admin/exercises/${id}`);

        dispatch({
            exercise: data,
            type: types.ADMIN_GET_EXERCISE_QUESTIONS
        });
    } catch (err) {
        console.log('Error:', err);
    }
}

export const getExerciseList = () => async dispatch => {
    try {
        const { data: { exercises } } = await axios.get('/api/exercises');

        dispatch({
            exercises,
            type: types.GET_EXERCISE_LIST
        });
    } catch(err) {
        console.log('Error:', err);
    }
}

export const getExercise = id => async dispatch => {
    try {
        const { data } = await axios.get(`/api/exercises/${id}`);

        dispatch({
            exercise: data,
            type: types.GET_EXERCISE_QUESTIONS
        });
    } catch(err) {
        console.log('Error:', err);
    }
}

export const checkAnswer = (questionId, solution) => async dispatch => {
    try {
        const { data: {qid, ...result} } = await axios.post(`/api/exercises/test/${questionId}`, { solution });

        dispatch({
            result: {
                [qid]: result
            },
            type: types.CHECK_ANSWER
        });
    } catch(err) {
        console.log('Error:', err);
    }
}
