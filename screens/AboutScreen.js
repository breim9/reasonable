import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text
} from 'react-native';

import { Linking } from 'expo';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function AboutScreen(props) {

  let handleLink = (url) => {
    Linking.openURL(url);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About</Text>
      <Text style={styles.text}>App built by Ben Reimer</Text>
      <Text> </Text>
      <Text style={styles.text}>Read the making of : </Text>
      <TouchableOpacity
        onPress={() => handleLink('https://benreimer.design/reasonable.html')}
      >
        <Text style={styles.link}>Reasonable - The Process</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Fallacy definitions and examples from: </Text>
      <TouchableOpacity
        onPress={() => handleLink('https://yourlogicalfallacyis.com/')}
      >
        <Text style={styles.link}>YourLogicalFallacyIs</Text>
      </TouchableOpacity>
    </View>
  )
}

AboutScreen.navigationOptions = {

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2A2B3D',
  },
  title: {
    fontFamily: 'roboto-mono-regular',
    fontSize: 32,
    color: '#ADA3FF',
    marginBottom: 30,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  link: {
    fontSize: 16,
    color: '#ADA3FF',
    marginBottom: 16,
  }
});
