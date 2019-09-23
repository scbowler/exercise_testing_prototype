import axios from 'axios';
import types from './types';

export const adminAddQuestion = (id, q) => async dispatch => {
    try {
        const { data: { question } } = await axios.post(`/api/admin/exercises/${id}/questions`, q);

        dispatch({
            type: types.ADMIN_ADD_QUESTION_TO_EXERCISE,
            question
        });
    } catch(err) {
        console.log('Add question error:', err);
    }
}

export const adminCheckTest = (id, q) => async dispatch => {
    try {
        const { data } = await axios.post(`/api/admin/exercises/${id}/questions/test`, q);

        console.log('Add Response:', data);
    } catch (err) {
        console.log('Error checking test:', err);
    }
}

export const adminCreateExercise = title => async dispatch => {
    try {
        const { data, data: { id } } = await axios.post('/api/admin/exercises', {title});

        console.log('Creat Exercise Resp:', data);
        return id;
    } catch (err) {
        console.log('Error creating new exercise:', err);
    }
}

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
        const { data: {qid, ...result} } = await axios.post(`/api/exercises/questions/test/${questionId}`, { solution });

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
