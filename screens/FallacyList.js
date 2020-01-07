import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import ListOfFallacies from 'components/listOfFallacies.js';

export default class App extends Component {

  render(){

    /* 
        Import fallacy list, use that as data for FlatList
        render each, passing it's information as a param to FallacyItem page
    */

    return (
      <SafeAreaView style={{flex:1}}>
          <Text>{ ListOfFallacies[0]}</Text>
          <FlatList>

          </FlatList>
      </SafeAreaView>
    )
  }


}

const styles = StyleSheet.create({
  
})