
import { UPDATE_CURRENT_EXERCISE_TYPE } from '../actionTypes';


const updateCurrentExerciseType = (state = "", action) => {
    let newState = state; //since it's just a string (primitive), no spread operator. 
    switch (action.type) {
        case UPDATE_CURRENT_EXERCISE_TYPE:
            if (!action.payload.exerciseType) return state;
            if (action.payload.exerciseType === "NameFallacyFromDescription") {
                newState = "NameFallacyFromDescription";
            }
            else if (action.payload.exerciseType === "NameFallacyFromExample") {
                newState = "NameFallacyFromExample";
            }
            else if (action.payload.exerciseType === "DescribeFallacyFromName") {
                newState = "DescribeFallacyFromName";
            }
            else {
                newState = "";
            }
            return newState;
        default:
            return state;
    }
}

export { updateCurrentExerciseType as activeExerciseType };


