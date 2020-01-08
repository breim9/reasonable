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
      fallaciesStillToLearnById : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    },
    NameFallacyFromExample : {
      name : "Name the fallacy from the example",
      typeId : 'NameFallacyFromExample',
      progress: "0%",
      fallaciesLearnedById: [],
      fallaciesStillToLearnById : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    },
    DescribeFallacyFromName : {
      name : "Describe the fallacy from the name",
      typeId : 'DescribeFallacyFromName',
      progress: "0%",
      fallaciesLearnedById: [],
      fallaciesStillToLearnById : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    },
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
            navigationProp={this.props.navigation} />
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
