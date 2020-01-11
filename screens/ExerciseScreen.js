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

constructor(props){
  super(props);
  this.state = {
    answers : [
      {id:"", title: "", result:"incorrect", selected:false},
      {id:"", title: "", result:"incorrect", selected:false},
      {id:"", title: "", result:"incorrect", selected:false},
      {id:"", title: "", result:"incorrect", selected:false},
      {id:"", title: "", result:"incorrect", selected:false},
    ],
    correctAnswerId : '',
  }
}

generateAnswers = (answerFallacy) => {

    //bring in the correct fallacy from full fallacy list.
    //build an array of fallacy objects 
    let numOfAnswers = 4; //not including the correct answer
    let answersList = [];
    let otherAnswersIds = [];

    function generateSingleRandomId(){
      let foundNewId = false;
      let newId = "undefined";
      let failsafeCounter = 0; 
      while (!foundNewId){
          if (failsafeCounter > 30) return
          failsafeCounter++;
          newId = Math.floor(Math.random() * (25 - 1)).toString();
          newId = 'f' + newId; 
          if (!otherAnswersIds.includes(newId) && newId != answerFallacy.id){
            foundNewId = true; 
            otherAnswersIds.push(newId);
          } 
          
      }
      return newId;
    }

    function getFallacyTitleFromId(id){
      let title = '';
      ListOfFallacies.list.map( fallacy => {
        if (fallacy.id === id){
          title = fallacy.name; //! this should depend on answerType
        }
      })
      return title;
    }

    function getResultFromId(id){
      let result = '';
      if (id === answerFallacy.id){
        result = "correct";
      }
      else {
        result = "incorrect";
      }
      return result;
    }

    function generateSingleAnswer(){
      let newAnswer = {};
      newAnswer.id = generateSingleRandomId();
      newAnswer.title = getFallacyTitleFromId(newAnswer.id);
      newAnswer.result = "incorrect"; //correct answer is generated separately
      newAnswer.selected = false;
      return newAnswer; 
    }

    function generateAnswerOptions(amount){
      for (var i=0; i<amount; i++){
          let answer = generateSingleAnswer();
          answersList.push(answer);
      }
    }

    function generateCorrectAnswerObj(answerFallacy){
      let answerObj = {};
      answerObj.id = answerFallacy.id;
      answerObj.title = answerFallacy.name; //! this should depend on answerType
      answerObj.result = "correct";
      answerObj.selected = false; 
      return answerObj;
    }
    
    function combineCorrectAnswerWithOthers(){
      let correctAnswer = generateCorrectAnswerObj(answerFallacy);
      let correctAnswerPositionInAnswerList = Math.floor(Math.random() * (numOfAnswers + 1)).toString();
      let answersListCombined = [...answersList];
      answersListCombined.splice(correctAnswerPositionInAnswerList, 0, correctAnswer);
      return answersListCombined;
    }

    generateAnswerOptions(numOfAnswers);
    answersList = combineCorrectAnswerWithOthers();
    return answersList;

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

answerHandler(selectedAnswer, answerFallacyId, typeOfExercise){

  let updateFallacyList = this.props.navigation.getParam('updateFallacyList', 'NA');
  
  if (selectedAnswer.id === answerFallacyId){
    updateFallacyList(typeOfExercise, 'success', selectedAnswer.id);
  }
  else {
    //! move fallacy to end of still-to-learn array 
  }

  let currentAnswers = [...this.state.answers];
  let newAnswers = currentAnswers.map( answer => {
    if (answer.id === selectedAnswer.id){
      answer.selected = true;
    }
    return answer;
  })
  this.setState({answers : newAnswers})
}

returnVisualResult(answer){

  //check state
  if (answer.result === "correct" && answer.selected){
    return "clickCorrect";
  }
  else if (answer.result === "incorrect" && answer.selected){
    return "clickIncorrect";
  }
  else {
    return 'default';
  }

  
}

componentDidMount(){

  let exerciseProps = this.props.navigation.getParam('exerciseProps', 'NA');
  let listOfAvailableFallacies = exerciseProps.fallaciesStillToLearnById;
  let newCorrectFallacyId = listOfAvailableFallacies[0]; //next available fallacy;
  console.log("newCorrectFallacy ", newCorrectFallacyId);
  this.setState({ correctAnswerId : newCorrectFallacyId});

  let answerFallacyId = newCorrectFallacyId;
  let answerFallacy = this.getFallacyFromId(answerFallacyId) || {};
  let newAnswers = this.generateAnswers(answerFallacy);
  this.setState( { answers : newAnswers });
}



render(){

    /* TODO 
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
        //! do something here
    }
    
    let answerFallacyId = this.state.correctAnswerId;
    let answerFallacy = this.getFallacyFromId(answerFallacyId) || {};
    console.log("running render. Answer Id : ", answerFallacyId);
    let prompt = answerFallacy[promptType] || 'loading error';

    let answers, answerOptions = [];
    //if answerOptions from state is empty, make the first set 
    
    answerOptions = [...this.state.answers]; 

    answers = answerOptions.map( (answer, key) => (
      <AnswerOption 
        title={answer.title} 
        key={key}
        checkAnswer = {() => this.answerHandler(answer, answerFallacyId, typeOfExercise)} 
        visualResult={ this.returnVisualResult(answer) }
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
