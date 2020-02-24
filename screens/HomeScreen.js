import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import DailyFallacy from '../components/DailyFallacy';
import ButtonPrimary from '../components/ButtonPrimary';
import ButtonSecondary from '../components/ButtonSecondary';


export default class HomeScreen extends Component {
  render() {
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
            <DailyFallacy />
            <View style={{ flex: 1 }}>
              <ButtonPrimary
                title={"Practice"}
                navigateType={"push"}
                action={"Practice"}
                navigationProp={this.props.navigation}
              />
              <ButtonSecondary
                title={"Fallacy List"}
                navigateType={"push"}
                action={"FallacyList"}
                navigationProp={this.props.navigation}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
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
    width: 70,
    height: 70,
    position: "relative",
    zIndex: 2,
    marginTop: 20,
  },
});
