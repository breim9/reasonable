import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage
} from 'react-native';

import listOfFallacies from 'components/listOfFallacies'

export default class DailyFallacy extends Component {

  render(){

    return (
      <View style={styles.dailyFallacyContainer}>
        <Text style={styles.dailyFallacyTitle}>Fallacy of the Day</Text>
        <Text style={styles.fallacyItemTitle}>{listOfFallacies.list[0].name}</Text>
        <Text style={styles.fallacyItemDescription}>{listOfFallacies.list[0].definition}</Text>
        <View style={styles.divider}></View>
      </View>
    )
  }


}

const styles = StyleSheet.create({
    dailyFallacyContainer :{
        flex: 1,
        alignItems: 'flex-start',
        paddingLeft: 20,
        paddingRight: 20,
    },
    dailyFallacyTitle: {
        fontFamily: 'roboto-mono-medium',
        fontSize : 18,
        color: '#ADA3FF',
        marginTop: 60,
        marginBottom: 20,
    },
    fallacyItemTitle: {
        fontFamily: 'roboto-mono-medium',
        fontSize : 24,
        color: '#FFF',
        marginBottom: 15,
    },
    fallacyItemDescription : {
        fontFamily: 'roboto-regular',
        fontSize : 16,
        color: '#FFF',
        marginBottom: 30,
    },
    divider : {
        alignSelf: 'stretch',
        height: 1,
        backgroundColor: "#ADA3FF"
    },
})