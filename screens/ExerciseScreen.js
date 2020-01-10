import React, { Component } from 'react';
import { 
  View,
  ScrollView, 
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity
} from 'react-native';

import AnswerOption from '../components/AnswerOption';
import ListOfFallacies from '../components/listOfFallacies';


export default class ExerciseScreen extends Component {

generateAnswers = (answerFallacyId) => {
    // will this not get the latest state though?
    // this depends on if the PracticeScreen / ExerciseScreen is re-rendered each time or not I think.
   
    let answerId = answerFallacyId;
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
            newId = 'f' + newId; 
            if (!otherAnswersIds.includes(newId) && newId != answerId) foundNewId = true; 
        }
        return newId;
    }

    function generateAnswerOptions(amount){
        for (var i=0; i<amount; i++){
            let newId = generateSingleRandomId();
            otherAnswersIds.push(newId);
        }
    }

    function combineSelectedAnswerWithOthers(answerId, otherAnswersIds){
        let selectedAnswerPositionInAnswerList = Math.floor(Math.random() * (5)).toString();
        let newList = [...otherAnswersIds];
        newList.splice(selectedAnswerPositionInAnswerList, 0, answerId);
        return newList;
    }

    function convertIdsToObjs(finalList){
      return finalList.map( fallacyId => {
        return ListOfFallacies.list.filter( fallacy => fallacy.id === fallacyId)[0]
      })
    }

    //argument decides how many answers to generate (not including correct option)
    generateAnswerOptions(4);

    //change the order up so the correct answer isn't always first
    finalList = combineSelectedAnswerWithOthers(answerId, otherAnswersIds);

    //convert ids to their corrosponding full objects 
    finalList = convertIdsToObjs(finalList);

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

getFallacyFromId(id){
  return ListOfFallacies.list.filter( fallacy => fallacy.id === id)[0];
}

answerHandler(selectedFallacyId, answerFallacyId, typeOfExercise){

  let updateFallacyList = this.props.navigation.getParam('updateFallacyList', 'NA');
  
  if (selectedFallacyId === answerFallacyId){
    // updated state to be from still to learn to learned
    //correct animation
    updateFallacyList(typeOfExercise, 'success', answerFallacyId);
  }
  else {
    //move fallacy to end of still-to-learn array 
    //incorrect animation
  }
}




render(){

    /* TODO 
      - identify when a click is correct or incorrect 
      - if correct, move to fallaciesLearnedById in state
      - if incorrect, move to end of array 
    */

    

    let exerciseProps = this.props.navigation.getParam('exerciseProps', 'NA');
    let listOfAvailableFallacies = exerciseProps.fallaciesStillToLearnById;
    let typeOfExercise = exerciseProps.typeId;

    console.log("listOfAvailableFallacies : ", listOfAvailableFallacies)

    let promptType = this.getPromptTypeFromTypeId(typeOfExercise);
    let answerType = this.getAnswerTypeFromTypeId(typeOfExercise);

    if (listOfAvailableFallacies < 1){
        console.warn("Exercise complete!");
        //! do something here
    }
    
    let answerFallacyId = listOfAvailableFallacies[0]; //grab next available fallacy
    let answerFallacy = this.getFallacyFromId(answerFallacyId);
    let prompt = answerFallacy.definition; //! UPDATE based on promptype 

    let answers = [];
    let answerOptions = this.generateAnswers(answerFallacyId);

    answers = answerOptions.map( (fallacy, key) => (
        <AnswerOption 
          title={fallacy.name} 
          key={key}
          checkAnswer = {() => this.answerHandler(fallacy.id, answerFallacyId, typeOfExercise)} //
        />
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
