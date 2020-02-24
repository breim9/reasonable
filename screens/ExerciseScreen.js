import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';
import { UpdateCurrentExerciseType, UpdateExerciseLibrary, AddOne, GenerateNewQuestion, UpdateQuestion, UpdateProgress, ResetProgress } from '../redux/actions';

import ButtonSecondary from '../components/ButtonSecondary';
import AnswerOption from '../components/AnswerOption';
import { listOfFallacies } from '../constants/listOfFallacies';
import { activeExerciseType } from '../redux/reducers/updateCurrentExerciseType';

class ExerciseScreen extends Component {


  generateNewQuestion(numOfAnswers) {
    let fallacyToLearn = this.props.exerciseLibrary[this.props.activeExerciseType].fallaciesStillToLearnById[0];
    if (!fallacyToLearn) return;
    let wrongAnswerList = [];
    let questionIdList = [];
    let questionList = [];
    let prompt = "";

    function generateUniqueAnswerId() {
      let foundNewId = false;
      let newId = undefined;
      let failsafeCounter = 0;
      while (!foundNewId) {
        if (failsafeCounter > 60) return
        failsafeCounter++;
        newId = 'f' + Math.floor(Math.random() * (25 - 1)).toString();
        if (!wrongAnswerList.includes(newId) && newId != fallacyToLearn) {
          foundNewId = true;
        }
      }
      return newId;
    }

    function generateWrongAnswerList() {
      for (var i = 0; i < numOfAnswers; i++) {
        let newI = generateUniqueAnswerId();
        wrongAnswerList.push(newI);
      }
    }

    function randomlyCombineRightWithWrongAnswers() {
      let correctAnswerPositionInAnswerList = Math.floor(Math.random() * (numOfAnswers + 1)).toString();
      questionIdList = [...wrongAnswerList];
      questionIdList.splice(correctAnswerPositionInAnswerList, 0, fallacyToLearn);
    }

    function getFallacyFromId(id) {
      return listOfFallacies.filter(fallacy => fallacy.id === id)[0];
    }

    function turnIdListIntoItemList() {
      questionList = questionIdList.map(id => {
        return getFallacyFromId(id)
      })
    }

    function addResultTypeToListItems() {
      questionList = questionList.map(fallacy => {
        fallacy.id === fallacyToLearn ? fallacy.result = 'correct' : fallacy.result = 'incorrect';
        return fallacy;
      })
    }

    function addVisualResultToListItems() {
      questionList = questionList.map(fallacy => {
        fallacy.visualResult = "default";
        return fallacy;
      })
    }

    generateWrongAnswerList();
    randomlyCombineRightWithWrongAnswers()
    turnIdListIntoItemList();
    addResultTypeToListItems();
    addVisualResultToListItems();

    let type = this.props.exerciseLibrary[this.props.activeExerciseType].promptType;
    prompt = getFallacyFromId(fallacyToLearn)[type];
    this.props.GenerateNewQuestion(questionList, prompt, fallacyToLearn);
  }

  answerHandler = (fallacyId, result, exerciseType) => {
    this.props.UpdateQuestion(fallacyId, result)
    if (result === "correct") {
      this.props.UpdateExerciseLibrary(exerciseType, fallacyId);
      this.props.UpdateProgress(exerciseType);
      setTimeout(() => {
        if (this.props.exerciseLibrary[this.props.activeExerciseType].fallaciesStillToLearnById[0]) {
          this.generateNewQuestion(4);
        }
      }, 1300);
    }
  }

  componentDidMount = () => {
    this.generateNewQuestion(4);
  }

  render() {

    let type = this.props.exerciseLibrary[this.props.activeExerciseType].answerType;

    let prompt = (<Text style={styles.prompt}>{this.props.question.prompt}</Text>);

    let answers = this.props.question.questionList.map((answer, key) => (
      <AnswerOption
        title={answer[type]}
        key={key}
        result={answer.result}
        id={answer.id}
        exerciseType={this.props.activeExerciseType}
        answerHandler={this.answerHandler}
        visualResult={answer.visualResult}
      />
    ));

    let successAlert = null;
    if (this.props.exerciseLibrary[this.props.activeExerciseType].progress === "100%") {
      successAlert = (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>COMPLETED</Text>
          <ButtonSecondary
            title={"Other Exercises"}
            navigateType={"popToTop"}
            action={""}
            navigationProp={this.props.navigation}

          />
          <ButtonSecondary
            title={"Redo Exercise"}
            navigateType={"customPress"}
            action={() => this.props.ResetProgress(this.props.activeExerciseType)}
            navigationProp={this.props.navigation}
          />
        </View>
      );
      prompt = null;
      answers = null;
    }

    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <Text style={styles.title}>{this.props.exerciseLibrary[this.props.activeExerciseType].name}</Text>
          <Text style={styles.progress}>{this.props.exerciseLibrary[this.props.activeExerciseType].progress}</Text>
          {prompt}
          {answers}
          {successAlert}
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  // const { todos } = state
  // return { todoList: todos.allIds }
  return state;
}

const mapDispatchToProps = {
  UpdateCurrentExerciseType,
  AddOne,
  GenerateNewQuestion,
  UpdateQuestion,
  UpdateExerciseLibrary,
  UpdateProgress,
  ResetProgress
}

ExerciseScreen.navigationOptions = {
  title: "Fallacy Exercise"
};

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseScreen);

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
  },
  successContainer: {
    padding: 10,
    marginTop: 30,
    alignItems: "center",
  },
  successText: {
    fontFamily: 'roboto-mono-medium',
    textAlign: "center",
    fontSize: 32,
    color: "#54AF64",
    marginBottom: 30,
  },
  successButton: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    color: '#ADA3FF',
  }
});
