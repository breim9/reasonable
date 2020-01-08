import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

export default class FallacyItem extends Component {

  render(){

    let fallacyItem = this.props.navigation.getParam('item', 'Fallacy Item');

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{fallacyItem.name}</Text>
        </View>
        <Text style={styles.definition}>{fallacyItem.definition}</Text>
        <Text style={styles.example}>{fallacyItem.example}</Text>
      </View>
    )
  }


}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#2A2B3D",
      padding: 20,
  },
  header : {
      backgroundColor: "#2A2B3D",
  },
  title: {
      fontFamily: 'roboto-mono-medium',
      fontSize : 24,
      color: '#fff',
      marginTop: 20,
      marginBottom: 30,
  },
  definition: {
      color:"#fff",
      marginBottom: 12,
      fontSize: 18,
      lineHeight: 26,
  },
  example: {
      color:"#ADA3FF",
      fontSize: 16,
      lineHeight: 20,
  }
})