import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';

import DailyFallacy from '../components/DailyFallacy';
import ButtonPrimary from '../components/ButtonPrimary';
import ButtonSecondary from '../components/ButtonSecondary';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* <ImageBackground source={require('../assets/images/background.png')} style={{width: '100%', height: '100%'}}> */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.homeContainer}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
          />
          <DailyFallacy />
          <View style={{flex:1}}>
            <ButtonPrimary text={"Practice"}/>
            <ButtonSecondary text={"Fallacy List"}/>
          </View>
        </View>
      </ScrollView>
      {/* </ImageBackground> */}
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
    flex:1,
  },
  homeContainer: {
    flex:1,
    alignItems: 'center',
  },
  bg : {
    flex: 1,
    position:"absolute",
    zIndex: -1,
    resizeMode: 'contain',
  },
  logo : {
    width: 70,
    height: 70,
    position:"relative",
    zIndex: 2,
    marginTop: 20,
  },
  // title : {
  //   fontFamily: 'roboto-mono-medium',
  //   fontSize : 32,
  //   color: '#fff',
  //   marginTop: 60,
  // },
  // subtitle : {
  //   fontFamily: 'roboto-regular',
  //   fontSize : 16,
  //   color: '#ADA3FF',
  //   marginTop: 20,
  //   marginBottom: 60,
  // }
});
