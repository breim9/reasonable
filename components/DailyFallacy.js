import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { listOfFallacies } from '../constants/listOfFallacies'

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
        <Text style={styles.fallacyItemTitle}>{listOfFallacies[todaysFallacyNumber].name}</Text>
        <Text style={styles.fallacyItemDescription}>{listOfFallacies[todaysFallacyNumber].definition}</Text>
        <View style={styles.divider}></View>
      </View>
    )
  }


}

const styles = StyleSheet.create({
  dailyFallacyContainer: {
    alignItems: 'flex-start',
    paddingLeft: 20,
    paddingRight: 20,
  },
  dailyFallacyTitle: {
    fontFamily: 'roboto-mono-medium',
    fontSize: wp(5),
    color: '#ADA3FF',
    marginTop: hp(5),
    marginBottom: 20,
  },
  fallacyItemTitle: {
    fontFamily: 'roboto-mono-medium',
    fontSize: wp(7),
    color: '#FFF',
    marginBottom: 15,
  },
  fallacyItemDescription: {
    fontFamily: 'roboto-regular',
    fontSize: wp(5),
    color: '#FFF',
    marginBottom: 30,
    lineHeight: wp(7),
  },
  divider: {
    alignSelf: 'stretch',
    height: 1,
    backgroundColor: "#ADA3FF",
    marginBottom: hp(8)
  },
})