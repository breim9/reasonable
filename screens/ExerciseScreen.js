import React, { Component } from 'react';
import { 
  View,
  ScrollView, 
  StyleSheet,
  SafeAreaView,
  Text,
} from 'react-native';

export default class ExerciseScreen extends Component {
  render(){
    return (
      <View style={{flex:1}}>
        <ScrollView style={styles.container}>
          <Text style={styles.title}>Exercise</Text>
        </ScrollView>
      </View>
    );
  }
}

ExerciseScreen.navigationOptions = {

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
    marginTop: 10,
    marginBottom: 30,
},
});
