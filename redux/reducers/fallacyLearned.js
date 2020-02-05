
import { FALLACY_LEARNED } from '../actionTypes';
import { State } from 'react-native-gesture-handler';

const initialState = {

}

function FallacyLearned(state = initialState, action) {
    let newState = { ...state };
    switch (action.type) {
        case FALLACY_LEARNED:
            if (action.payload.exerciseType === "NameFallacyFromDescription") {
                alert("learned : ", action.payload.fallacyId);
                alert("write rest of this code lol");
                //let newExerciseObj = { ...this.state[exercise] };
                //   newExerciseObj.fallaciesLearnedById.push(fallacyId);
                //   let newExerciseArr = newExerciseObj.fallaciesStillToLearnById.filter(id => id !== fallacyId);
                //   newExerciseObj.fallaciesStillToLearnById = newExerciseArr;
                //   this.setState({ [exercise]: newExerciseObj })
            }
            return newState;
        default:
            return State;
    }

}


export default FallacyLearned;