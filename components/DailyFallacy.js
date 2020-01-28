import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import listOfFallacies from '../constants/listOfFallacies'

export default class DailyFallacy extends Component {

  render() {

    /* 
    I have 24 fallacies and max 31 days in a month
    so for days 1-24, use the corrosponding fallacy
    for days 25-31, use (x - 24) * 3 
    */

    let date = new Date();
    let todaysDate = date.getDate();
    let todaysFallacyNumber = 1;

    if (todaysDate < 24) {
      todaysFallacyNumber = todaysDate - 1;
    }
    else {
      todaysFallacyNumber = (todaysDate - 24) * 3;
    }

    if (todaysFallacyNumber > 24) todaysFallacyNumber = 0;

    return (
      <View style={styles.dailyFallacyContainer}>
        <Text style={styles.dailyFallacyTitle}>Fallacy of the Day</Text>
        <Text style={styles.fallacyItemTitle}>{listOfFallacies.list[todaysFallacyNumber].name}</Text>
        <Text style={styles.fallacyItemDescription}>{listOfFallacies.list[todaysFallacyNumber].definition}</Text>
        <View style={styles.divider}></View>
      </View>
    )
  }


}

const styles = StyleSheet.create({
  dailyFallacyContainer: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 20,
    paddingRight: 20,
  },
  dailyFallacyTitle: {
    fontFamily: 'roboto-mono-medium',
    fontSize: 18,
    color: '#ADA3FF',
    marginTop: 60,
    marginBottom: 20,
  },
  fallacyItemTitle: {
    fontFamily: 'roboto-mono-medium',
    fontSize: 24,
    color: '#FFF',
    marginBottom: 15,
  },
  fallacyItemDescription: {
    fontFamily: 'roboto-regular',
    fontSize: 16,
    color: '#FFF',
    marginBottom: 30,
  },
  divider: {
    alignSelf: 'stretch',
    height: 1,
    backgroundColor: "#ADA3FF"
  },
})