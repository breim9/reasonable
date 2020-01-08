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
      <View style={{flex:1}}>
        <Text>{fallacyItem.name}</Text>
        <Text>{fallacyItem.definition}</Text>
        <Text>{fallacyItem.example}</Text>
      </View>
    )
  }


}

const styles = StyleSheet.create({
  
})