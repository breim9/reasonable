import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import DailyFallacy from '../components/DailyFallacy';
import ButtonPrimary from '../components/ButtonPrimary';
import ButtonSecondary from '../components/ButtonSecondary';

export default function HomeScreen(props) {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.homeContainer}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
          />
          <DailyFallacy style={{ flex: 2 }} />
          <View style={{ flex: 2 }}>
            <ButtonPrimary
              title={"Practice"}
              navigateType={"push"}
              action={"Practice"}
              navigationProp={props.navigation}
            />
            <ButtonSecondary
              title={"Fallacy List"}
              navigateType={"push"}
              action={"FallacyList"}
              navigationProp={props.navigation}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2A2B3D"
  },
  contentContainer: {
    paddingTop: 30,
    flex: 1,
  },
  homeContainer: {
    flex: 1,
    alignItems: 'center',
  },
  bg: {
    flex: 1,
    position: "absolute",
    zIndex: -1,
    resizeMode: 'contain',
  },
  logo: {
    width: wp(20),
    height: wp(20),
    position: "relative",
    zIndex: 2,
    marginTop: hp(2),
  },
});
