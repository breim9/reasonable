import { UPDATE_EXERCISE_LIBRARY, UPDATE_PROGRESS, RESET_PROGRESS } from '../actionTypes';

const initialState = {
    NameFallacyFromDescription: {
        name: "Name the fallacy from the description",
        typeId: 'NameFallacyFromDescription',
        progress: "0%",
        promptType: "definition",
        answerType: "name",
        fallaciesLearnedById: [],
        fallaciesStillToLearnById: ["f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10", "f11", "f12", "f13", "f14", "f15", "f16", "f17", "f18", "f19", "f20", "f21", "f22", "f23"]
    },
    NameFallacyFromExample: {
        name: "Name the fallacy from the example",
        typeId: 'NameFallacyFromExample',
        progress: "0%",
        promptType: "example",
        answerType: "name",
        fallaciesLearnedById: [],
        fallaciesStillToLearnById: ["f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10", "f11", "f12", "f13", "f14", "f15", "f16", "f17", "f18", "f19", "f20", "f21", "f22", "f23"]
    },
    DescribeFallacyFromName: {
        name: "Describe the fallacy from the name",
        typeId: 'DescribeFallacyFromName',
        progress: "0%",
        promptType: "name",
        answerType: "definition",
        fallaciesLearnedById: [],
        fallaciesStillToLearnById: ["f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10", "f11", "f12", "f13", "f14", "f15", "f16", "f17", "f18", "f19", "f20", "f21", "f22", "f23"]
    },
}

const updateExerciseLibray = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case UPDATE_EXERCISE_LIBRARY:
            let learnedList = newState[action.payload.exerciseType].fallaciesLearnedById;
            let toLearnList = newState[action.payload.exerciseType].fallaciesStillToLearnById;
            //The fallacy being moved is always the first in the 'toLearn' list 
            //Note in the future if that changes a more dynamic way will be required
            learnedList.push(toLearnList[0]);
            toLearnList.shift();
            newState[action.payload.exerciseType].fallaciesStillToLearnById = toLearnList;
            newState[action.payload.exerciseType].fallaciesLearnedById = learnedList;
            return newState;
        case UPDATE_PROGRESS:
            let completed = newState[action.payload.exerciseType].fallaciesLearnedById.length;
            let total = newState[action.payload.exerciseType].fallaciesStillToLearnById.length + newState[action.payload.exerciseType].fallaciesLearnedById.length;
            if (total == 0) return;
            let newProgress = Math.round((completed / total) * 100) + "%";
            newState[action.payload.exerciseType].progress = newProgress;
            return newState;
        case RESET_PROGRESS:
            newState[action.payload.exerciseType].fallaciesStillToLearnById = newState[action.payload.exerciseType].fallaciesLearnedById;
            newState[action.payload.exerciseType].fallaciesLearnedById = [];
            newState[action.payload.exerciseType].progress = "0%";
            return newState;
        default:
            return state;
    }
}

export { updateExerciseLibray as exerciseLibrary };