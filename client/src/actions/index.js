import axios from 'axios';
import types from './types';

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

export const checkAnswer = (qid, solution) => async dispatch => {
    try {
        const { data } = await axios.post(`/api/exercises/test/${qid}`, { solution });

        console.log('Check Answer Resp:', data);

    } catch(err) {
        console.log('Error:', err);
    }
}
