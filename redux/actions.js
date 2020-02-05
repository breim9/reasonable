import { ADD_ONE, FALLACY_LEARNED, UPDATE_CURRENT_EXERCISE_TYPE, GENERATE_NEW_QUESTION, UPDATE_QUESTION, UPDATE_EXERCISE_LIBRARY } from './actionTypes';


export const AddOne = () => {
    return {
        type: ADD_ONE,
        payload: {}
    }
}

export function FallacyLearned(fallacyId, exerciseType) {
    return {
        type: FALLACY_LEARNED,
        payload: {
            fallacyId,
            exerciseType
        }
    }
}

export function UpdateCurrentExerciseType(exerciseType) {
    return {
        type: UPDATE_CURRENT_EXERCISE_TYPE,
        payload: {
            exerciseType
        }
    }
}

export function GenerateNewQuestion(questionList, prompt, fallacyToLearnId) {
    return {
        type: GENERATE_NEW_QUESTION,
        payload: {
            questionList,
            prompt,
            fallacyToLearnId
        }
    }
}

export function UpdateQuestion(fallacyId, result) {
    return {
        type: UPDATE_QUESTION,
        payload: {
            fallacyId,
            result
        }
    }
}

export function UpdateExerciseLibrary() {
    return {
        type: UPDATE_EXERCISE_LIBRARY,
        payload: {

        }
    }
}

