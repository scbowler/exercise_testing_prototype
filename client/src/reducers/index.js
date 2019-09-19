import { combineReducers } from 'redux';
import adminExercise from './admin_exercise_reducer';
import exercise from './exercise_reducer';

export default combineReducers({ adminExercise, exercise });
