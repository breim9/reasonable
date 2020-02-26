import { UPDATE_CURRENT_EXERCISE_TYPE, GENERATE_NEW_QUESTION, UPDATE_QUESTION, UPDATE_EXERCISE_LIBRARY, UPDATE_PROGRESS, RESET_PROGRESS } from './actionTypes';

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

export function UpdateExerciseLibrary(exerciseType, fallacyId) {
    return {
        type: UPDATE_EXERCISE_LIBRARY,
        payload: {
            exerciseType,
            fallacyId
        }
    }
}

export function UpdateProgress(exerciseType, fallacyId) {
    return {
        type: UPDATE_PROGRESS,
        payload: {
            exerciseType
        }
    }
}

export function ResetProgress(exerciseType) {
    return {
        type: RESET_PROGRESS,
        payload: {
            exerciseType
        }
    }
}



