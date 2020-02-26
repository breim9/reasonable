import { combineReducers } from 'redux';
import { activeExerciseType } from './updateCurrentExerciseType';
import question from './question';
import { exerciseLibrary } from './updateExerciseLibrary';


const rootReducer = combineReducers({
    activeExerciseType,
    question,
    exerciseLibrary
})

export default rootReducer;