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

generateQuestion = (exercise) => {
    // ! will this not get the latest state though?
    let listOfAvailableFallacies = exercise.fallaciesStillToLearnById;

    if (listOfAvailableFallacies.length < 1){
        console.log("Finished the whole list");
        return;
    }

    let selectedFallacyId = listOfAvailableFallacies[0];

    // !this would change based on type of exercise
    let prompt = ListOfFallacies.list[selectedFallacyId].definition;
    let positionInAnswerList = Math.floor(Math.random() * (5)).toString();
    let otherAnswersIds = [];

    // selectedFallacyId.toString()
    let idsAlreadySelected = [ '0' ];
    let failsafeCounter = 0; 
    
    function generateRandomId(){

        // ? So it correctly catches duplicates and generates a newId that is different
        // ? But the original id is what ends up getting logged.

        let foundNewId = false;
        let newId;

        while (!foundNewId){

            if (failsafeCounter > 30) return
            failsafeCounter++;

            newId = Math.floor(Math.random() * (25 - 1)).toString();
            if (idsAlreadySelected.includes(newId)){
                console.log("caught a duplicate : ", newId);
            } 
            else {
                foundNewId = true;
            } 
        }
        console.log("id being returned is : ", newId);
        return newId;
    }

    for (var i=0; i<4; i++){
        let num = generateRandomId();
        idsAlreadySelected.push(num);
        console.log("the list is now : ", idsAlreadySelected)
    }

    if (idsAlreadySelected.length != 5){
        console.warn("Soething's wrong with number of generate potential answers");
    }

    //change the order up so the correct answer isn't always first

    return idsAlreadySelected;

    //somehow add a 'correct' vs 'incorrect' attribute on all these? 
    //or have a separate check answer function that does it based off title
}

render(){

    console.log("---------------");

    let exercise = this.props.navigation.getParam('exerciseProps', 'NA');
    let answers = [];
    let randonames = ['dfads', 'adfdsf', 'dafsd', 'dfdsdsa', 'aasdf', 'adsfsd'];

    let answerOptions = this.generateQuestion(exercise);

    answers = answerOptions.map( (item, key) => (
        <AnswerOption title={`${item}`} key={key}/>
    ));




    return (
      <View style={{flex:1}}>
        <ScrollView style={styles.container}>
          <Text style={styles.title}>{exercise.name}</Text>
          <Text style={styles.progress}>0/15</Text>
          <Text style={styles.prompt}>Attacking your opponent's character or personal traits in an attempt to undermine their argument</Text>
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
