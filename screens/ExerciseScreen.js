import React, { Component } from 'react';
import { 
  View,
  ScrollView, 
  StyleSheet,
  SafeAreaView,
  Text,
} from 'react-native';

import AnswerOption from '../components/AnswerOption';

export default class ExerciseScreen extends Component {
  render(){

    let exercise = this.props.navigation.getParam('exerciseProps', 'NA');


    return (
      <View style={{flex:1}}>
        <ScrollView style={styles.container}>
          <Text style={styles.title}>{exercise.name}</Text>
          <Text style={styles.progress}>0/15</Text>
          <Text style={styles.prompt}>Attacking your opponenet's character or personal traits in an attempt to undermine their argument</Text>
          <AnswerOption title={'Ad Hominem'}/>
          <AnswerOption title={'The Fallacy Fallacy'}/>
          <AnswerOption title={'Stawman'}/>
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
