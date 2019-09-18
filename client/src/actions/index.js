import axios from 'axios';
import types from './types';

export const getExerciseList = () => async dispatch => {
    try {
        const resp = await axios.get('/api/exercises');

        console.log('Exercise List Resp:', resp);
    } catch(err) {
        console.log('Error:', err);
    }
}
