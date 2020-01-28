import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';

import AnswerOption from '../components/AnswerOption';
import ListOfFallacies from '../constants/listOfFallacies';


export default class ExerciseScreen extends Component {

  //TODO 
  /* 
    - render the result
    - if incorrect, move to end of array 
    - refactor : for state I should just bring in the listOfFallacies and add on new properties, instead of recreating. 
    ^ once I'm done that, then using promptType and answerType correctly. 

    refactor : render and componentDidMount have too much same code. DRY. 
  */

  constructor(props) {
    super(props);
    this.state = {
      answers: [
        { id: "", title: "", result: "incorrect", selected: false },
        { id: "", title: "", result: "incorrect", selected: false },
        { id: "", title: "", result: "incorrect", selected: false },
        { id: "", title: "", result: "incorrect", selected: false },
        { id: "", title: "", result: "incorrect", selected: false },
      ],
      correctAnswerId: '',
      exerciseProps: { name: '', typeId: '', progress: '', fallaciesLearnedById: [], fallaciesStillToLearnById: [] },
    }
  }

  generateAnswers = (answerFallacy) => {

    let numOfAnswers = 4; //not including the correct answer
    let answersList = [];
    let otherAnswersIds = [];

    function generateSingleRandomId() {
      let foundNewId = false;
      let newId = "undefined";
      let failsafeCounter = 0;
      while (!foundNewId) {
        if (failsafeCounter > 30) return
        failsafeCounter++;
        newId = Math.floor(Math.random() * (25 - 1)).toString();
        newId = 'f' + newId;
        if (!otherAnswersIds.includes(newId) && newId != answerFallacy.id) {
          foundNewId = true;
          otherAnswersIds.push(newId);
        }

      }
      return newId;
    }

    function getFallacyTitleFromId(id) {
      let title = '';
      ListOfFallacies.list.map(fallacy => {
        if (fallacy.id === id) {
          title = fallacy.name; //! this should depend on answerType
        }
      })
      return title;
    }

    function getResultFromId(id) {
      let result = '';
      if (id === answerFallacy.id) {
        result = "correct";
      }
      else {
        result = "incorrect";
      }
      return result;
    }

    function generateSingleAnswer() {
      let newAnswer = {};
      newAnswer.id = generateSingleRandomId();
      newAnswer.title = getFallacyTitleFromId(newAnswer.id);
      newAnswer.result = "incorrect"; //correct answer is generated separately
      newAnswer.selected = false;
      return newAnswer;
    }

    function generateAnswerOptions(amount) {
      for (var i = 0; i < amount; i++) {
        let answer = generateSingleAnswer();
        answersList.push(answer);
      }
    }

    function generateCorrectAnswerObj(answerFallacy) {
      let answerObj = {};
      answerObj.id = answerFallacy.id;
      answerObj.title = answerFallacy.name; //! this should depend on answerType
      answerObj.result = "correct";
      answerObj.selected = false;
      return answerObj;
    }

    function combineCorrectAnswerWithOthers() {
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

  getPromptTypeFromTypeId(typeOfExercise) {
    if (typeOfExercise === 'NameFallacyFromDescription') {
      return 'definition';
    }
    else if (typeOfExercise === 'NameFallacyFromExample') {
      return 'example';
    }
    else if (typeOfExercise === 'DescribeFallacyFromName') {
      return 'name';
    }
    else {
      return 'definition';
    }
  }

  getAnswerTypeFromTypeId(typeOfExercise) {
    if (typeOfExercise === 'NameFallacyFromDescription') {
      return 'name';
    }
    else if (typeOfExercise === 'NameFallacyFromExample') {
      return 'name';
    }
    else if (typeOfExercise === 'DescribeFallacyFromName') {
      return 'definition';
    }
    else {
      return 'name';
    }
  }

  getFallacyFromId(id) {
    return ListOfFallacies.list.filter(fallacy => fallacy.id === id)[0];
  }

  answerHandler(selectedAnswer, answerFallacyId, typeOfExercise) {


    //I need to re-render 

    let updateFallacyList = this.props.navigation.getParam('updateFallacyList', 'NA');

    if (selectedAnswer.id === answerFallacyId) {
      updateFallacyList(typeOfExercise, 'success', selectedAnswer.id);
    }
    else {
      //! move fallacy to end of still-to-learn array 
    }

    let currentAnswers = [...this.state.answers];
    let newAnswers = currentAnswers.map(answer => {
      if (answer.id === selectedAnswer.id) {
        answer.selected = true;
      }
      return answer;
    })
    this.setState({ answers: newAnswers });
    setTimeout(() => {
      this.loadExercise();
    }, 1000);
  }

  returnVisualResult(answer) {

    //check state
    if (answer.result === "correct" && answer.selected) {
      return "clickCorrect";
    }
    else if (answer.result === "incorrect" && answer.selected) {
      return "clickIncorrect";
    }
    else {
      return 'default';
    }


  }

  loadExercise() {
    let exerciseProps = { ...this.state.exerciseProps }
    let answerFallacyId = exerciseProps.fallaciesStillToLearnById[0];
    let answerFallacy = this.getFallacyFromId(answerFallacyId) || {};
    console.log("new fallacy is : ", answerFallacy.name);
    let newAnswers = this.generateAnswers(answerFallacy);
    this.setState({ answers: newAnswers });
  }

  componentDidMount() {
    //bring in exerciseProps through params just this once 
    let exerciseProps = this.props.navigation.getParam('exerciseProps', 'NA');
    this.setState({ exerciseProps: exerciseProps }, () => this.loadExercise())
  }

  render() {

    // the first render is with constructor empty defaults
    // rest of renders are from state... in theory. 

    let exerciseProps = { ...this.state.exerciseProps }
    let listOfAvailableFallacies = exerciseProps.fallaciesStillToLearnById;
    let typeOfExercise = exerciseProps.typeId;

    let promptType = this.getPromptTypeFromTypeId(typeOfExercise);
    let answerType = this.getAnswerTypeFromTypeId(typeOfExercise);

    let answerFallacyId = this.state.correctAnswerId; //! Inconsistent naming
    let answerFallacy = this.getFallacyFromId(answerFallacyId) || {};
    console.log("answerFallacy: ", answerFallacy);
    let prompt = answerFallacy[promptType] || 'loading error';

    let answers, answerOptions = [];
    //if answerOptions from state is empty, make the first set 

    answerOptions = [...this.state.answers];

    answers = answerOptions.map((answer, key) => (
      <AnswerOption
        title={answer.title}
        key={key}
        checkAnswer={() => this.answerHandler(answer, answerFallacyId, typeOfExercise)}
        visualResult={this.returnVisualResult(answer)}
      />
    ));

    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <Text style={styles.title}>{exerciseProps.name}</Text>
          <Text style={styles.progress}>0/15</Text>
          <Text style={styles.prompt}>{prompt}</Text>
          {answers}
        </ScrollView>
      </View>
    );
  }
}


ExerciseScreen.navigationOptions = {
  title: "Fallacy Exercise"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2A2B3D',
  },
  title: {
    fontFamily: 'roboto-mono-regular',
    fontSize: 16,
    color: '#ADA3FF',
    marginBottom: 30,
    textAlign: 'center',
  },
  progress: {
    fontFamily: 'roboto-mono-medium',
    textAlign: 'right',
    color: "#ADA3FF",
    fontSize: 18,
    marginTop: 5,
  },
  prompt: {
    fontFamily: 'roboto-medium',
    color: "#FFF",
    fontSize: 21,
    lineHeight: 28,
    marginTop: 15,
    marginBottom: 25,
  }
});
