import React, { Component } from 'react';
import { 
  View,
  ScrollView, 
  StyleSheet,
  SafeAreaView,
  Text,
} from 'react-native';

import PracticeButton from 'components/PracticeButton';

export default class PracticeScreen extends Component {

  // fallaciesByName: ["adHominem", "appealToEmotion", "strawman", "slipperlySlope", "falseCause", "tuQuoque", "personalIncredulity", "theFallacyFallacy", "specialPleading", "loadedQuestion", "burdenOfProof", "ambiguity", "theGamblersFallacy", "bandwagon", "appealToAuthority", "compositionDivision", "noTrueScotsman", "genetic", "blackOrWhite", "beggingTheQuestion", "appealToNature", "anecdotal", "theTexasSharpshooter", "middleGround"],

  state = {
    NameFallacyFromDescription : {
      name : "Name the fallacy from the description",
      typeId : 'NameFallacyFromDescription',
      progress: "0%",
      fallaciesLearnedById: [],
      fallaciesStillToLearnById : ["f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10", "f11", "f12", "f13", "f14", "f15", "f16", "f17", "f18", "f19", "f20", "f21", "f22", "f23"]
    },
    NameFallacyFromExample : {
      name : "Name the fallacy from the example",
      typeId : 'NameFallacyFromExample',
      progress: "0%",
      fallaciesLearnedById: [],
      fallaciesStillToLearnById : ["f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10", "f11", "f12", "f13", "f14", "f15", "f16", "f17", "f18", "f19", "f20", "f21", "f22", "f23"]
    },
    DescribeFallacyFromName : {
      name : "Describe the fallacy from the name",
      // DescribeFallacyFromName
      typeId : 'DescribeFallacyFromName',
      progress: "0%",
      fallaciesLearnedById: [],
      fallaciesStillToLearnById : ["f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10", "f11", "f12", "f13", "f14", "f15", "f16", "f17", "f18", "f19", "f20", "f21", "f22", "f23"]
    },
    b : {}
  }

  updateFallacyList = (exercise, updateType, fallacyId) => {
    //exercise = NameFallacyFromDescription, NameFallacyFromExample, DescribeFallacyFromName
    //updateType = success, failure 
    //fallacyId = f0, f1, f2, etc. 

    if (updateType === "success"){
      let newExerciseObj = { ...this.state[exercise]};
      newExerciseObj.fallaciesLearnedById.push(fallacyId);
      let newExerciseArr = newExerciseObj.fallaciesStillToLearnById.filter( id => id !== fallacyId);
      newExerciseObj.fallaciesStillToLearnById = newExerciseArr;
      this.setState({ [ exercise ] : newExerciseObj })
    }

    //If failure.... for the moment, do nothing

  }

  render(){

    return (
      <View style={{flex:1}}>
        <ScrollView style={styles.container}>
          <Text style={styles.title}>Practice</Text>
          <PracticeButton 
            titleMain={"Name the fallacy"} 
            titleSub={"from the description"} 
            exerciseProps={this.state.NameFallacyFromDescription} 
            navigationProp={this.props.navigation} 
            updateFallacyList={this.updateFallacyList}
            //PropDrilling? updateFallacy goes PracticeScreen > PracticeButton > ExerciseScreen > AnswerOption > ExerciseScreen
          />
        </ScrollView>
      </View>
    );
  }
}

PracticeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2A2B3D',
  },
  title:{
    fontFamily: 'roboto-mono-medium',
    fontSize : 32,
    color: '#fff',
    marginTop: 100,
    marginBottom: 30,
},
});
