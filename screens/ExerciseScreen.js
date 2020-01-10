import React, { Component } from 'react';
import { 
  View,
  ScrollView, 
  StyleSheet,
  SafeAreaView,
  Text,
} from 'react-native';

import AnswerOption from '../components/AnswerOption';
import ListOfFallacies from '../components/listOfFallacies';


export default class ExerciseScreen extends Component {

generateAnswers = (selectedFallacyId) => {
    // will this not get the latest state though?
    // this depends on if the PracticeScreen / ExerciseScreen is re-rendered each time or not I think.
   
    let selectedId = selectedFallacyId.toString();
    let otherAnswersIds = [];
    let finalList = [];
    
    function generateSingleRandomId(){
        let foundNewId = false;
        let newId = "undefined";
        let failsafeCounter = 0; 
        while (!foundNewId){
            if (failsafeCounter > 30) return
            failsafeCounter++;
            newId = Math.floor(Math.random() * (25 - 1)).toString();
            if (!otherAnswersIds.includes(newId) && newId != selectedId) foundNewId = true; 
        }
        return newId;
    }

    function generateAnswerOptions(amount){
        for (var i=0; i<amount; i++){
            let newId = generateSingleRandomId();
            otherAnswersIds.push(newId);
        }
    }

    function combineSelectedAnswerWithOthers(selectedId, otherAnswersIds){
        let selectedAnswerPositionInAnswerList = Math.floor(Math.random() * (5)).toString();
        let newList = [...otherAnswersIds];
        newList.splice(selectedAnswerPositionInAnswerList, 0, selectedId);
        return newList;
    }

    //decide how many answers to generate (not including correct option)
    generateAnswerOptions(4);

    //change the order up so the correct answer isn't always first
    finalList = combineSelectedAnswerWithOthers(selectedId, otherAnswersIds);
    
    console.log("final list: ", finalList);
    return finalList;

    //somehow add a 'correct' vs 'incorrect' attribute on all these? 
    //or have a separate check answer function that does it based off title
}

getPromptTypeFromTypeId(typeOfExercise){
    if (typeOfExercise === 'NameFallacyFromDescription'){
        return 'definition';
    }
    else if (typeOfExercise === 'NameFallacyFromExample'){
        return 'example';
    }
    else if (typeOfExercise === 'DescribeFallacyFromName'){
        return 'name';
    }
    else {
        return 'definition';
    }
}

getAnswerTypeFromTypeId(typeOfExercise){
    if (typeOfExercise === 'NameFallacyFromDescription'){
        return 'name';
    }
    else if (typeOfExercise === 'NameFallacyFromExample'){
        return'name';
    }
    else if (typeOfExercise === 'DescribeFallacyFromName'){
        return 'definition';
    }
    else {
        return 'name';
    }
}


render(){

    /* TODO 
      - randomize order of provided answers
      - identify when a click is correct or incorrect 
      - if correct, move to fallaciesLearnedById in state
      - if incorrect, move to end of array 
    */

    let exerciseProps = this.props.navigation.getParam('exerciseProps', 'NA');
    let listOfAvailableFallacies = exerciseProps.fallaciesStillToLearnById;
    let typeOfExercise = exerciseProps.typeId;

    let promptType = this.getPromptTypeFromTypeId(typeOfExercise);
    let answerType = this.getAnswerTypeFromTypeId(typeOfExercise);

    if (listOfAvailableFallacies < 1){
        console.warn("Exercise complete!");
        //do something different here
    }
    
    let selectedFallacyId = listOfAvailableFallacies[0]; //grab next available fallacy
    let prompt = ListOfFallacies.list[selectedFallacyId][promptType];
    let answers = [];
    let answerOptions = this.generateAnswers(selectedFallacyId);

    answers = answerOptions.map( (item, key) => (
        <AnswerOption title={`${ListOfFallacies.list[item][answerType]}`} key={key}/>
    ));

    return (
      <View style={{flex:1}}>
        <ScrollView style={styles.container}>
          <Text style={styles.title}>{exerciseProps.name}</Text>
          <Text style={styles.progress}>0/15</Text>
          <Text style={styles.prompt}>{prompt}</Text>
          { answers }
        </ScrollView>
      </View>
    );
  }
}


ExerciseScreen.navigationOptions = {
    title : "Fallacy Exercise"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2A2B3D',
  },
  title:{
    fontFamily: 'roboto-mono-regular',
    fontSize : 16,
    color: '#ADA3FF',
    marginBottom: 30,
    textAlign: 'center',
  },
  progress:{
    fontFamily: 'roboto-mono-medium',
    textAlign: 'right',
    color:"#ADA3FF",
    fontSize : 18,
    marginTop: 5,
  },
  prompt : {
    fontFamily: 'roboto-medium',
    color:"#FFF",
    fontSize : 21,
    lineHeight: 28,
    marginTop: 15,
    marginBottom: 25,
  }
});
