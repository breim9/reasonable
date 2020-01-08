import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import ListOfFallacies from 'components/listOfFallacies.js';

export default class FallacyList extends Component {

  render(){

    /* 
        Import fallacy list, use that as data for FlatList
        render each, passing it's information as a param to FallacyItem page
    */
    let list = ListOfFallacies.list;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Full List</Text>
            <Text>List of Fallacies</Text>
            <FlatList
                data={list}
                renderItem={ ({ item }) => <Text>{item.name}</Text>}
                keyExtrator={ item => item.id }
            >

            </FlatList>
        </View>
    )
  }


}

FallacyList.navigationOptions = {
    title: 'Fallacy List',
}
    

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2A2B3D",
        padding: 20,
    },
    title:{
        fontFamily: 'roboto-mono-medium',
        fontSize : 32,
        color: '#fff',
        marginTop: 60,
    },
})