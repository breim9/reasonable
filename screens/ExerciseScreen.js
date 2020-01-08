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
    // ! will this not get the latest state though?
   
    let positionInAnswerList = Math.floor(Math.random() * (5)).toString();
    let otherAnswersIds = [];

    // selectedFallacyId.toString()
    let selectedId = selectedFallacyId.toString();
    let idsAlreadySelected = [ selectedId ];
    
    function generateSingleRandomId(){
        let foundNewId = false;
        let newId = "undefined";
        let failsafeCounter = 0; 
        while (!foundNewId){
            if (failsafeCounter > 30) return
            failsafeCounter++;
            newId = Math.floor(Math.random() * (25 - 1)).toString();
            if (!idsAlreadySelected.includes(newId)) foundNewId = true; 
        }
        return newId;
    }

    function generateAnswerOptions(amount){
        for (var i=0; i<amount; i++){
            let newId = generateSingleRandomId();
            idsAlreadySelected.push(newId);
        }
    }

    generateAnswerOptions(4);


    //change the order up so the correct answer isn't always first

    return idsAlreadySelected;

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

    let exerciseProps = this.props.navigation.getParam('exerciseProps', 'NA');
    let listOfAvailableFallacies = exerciseProps.fallaciesStillToLearnById;
    let typeOfExercise = exerciseProps.typeId;

    let promptType = this.getPromptTypeFromTypeId(typeOfExercise);
    let answerType = this.getAnswerTypeFromTypeId(typeOfExercise);

    if (listOfAvailableFallacies < 1){
        console.warn("Exercise complete!");
        //do something different here
    }
    
    let selectedFallacyId = listOfAvailableFallacies[0];
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
