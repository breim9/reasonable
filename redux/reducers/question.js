
import { GENERATE_NEW_QUESTION, UPDATE_QUESTION } from '../actionTypes';

const initialState = {
    questionList: [],
    prompt: "",
    fallacyToLearnId: ""
}

const question = (state = initialState, action) => {
    var newState = { ...state };
    switch (action.type) {
        case GENERATE_NEW_QUESTION:
            newState.questionList = action.payload.questionList;
            newState.prompt = action.payload.prompt;
            newState.fallacyToLearnId = action.payload.fallacyToLearnId;
            return newState;
        case UPDATE_QUESTION:
            let newQuestionList = newState.questionList.map(fallacy => {
                if (fallacy.id === action.payload.fallacyId) {
                    fallacy.visualResult = action.payload.result;
                }
                return fallacy;
            })
            newState.questionList = newQuestionList;
            return newState;
        default:
            return state;
    }
}

export default question; 
