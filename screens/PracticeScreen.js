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
  render(){
    return (
      <View style={{flex:1}}>
        <ScrollView style={styles.container}>
          <Text style={styles.title}>Practice</Text>
          <PracticeButton 
            titleMain={"Name the fallacy"} 
            titleSub={"from the description"} 
            progress={"80%"}
            newPage={"Exercise"} navigationProp={this.props.navigation} />
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
