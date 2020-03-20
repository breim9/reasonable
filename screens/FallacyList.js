import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native';

import { listOfFallacies } from '../constants/listOfFallacies.js';

export default class FallacyList extends Component {

    render() {
        /* 
            Import fallacy list, use that as data for FlatList
            render each, passing it's information as a param to FallacyItem page
        */
        let list = listOfFallacies;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Fallacies</Text>
                <FlatList
                    data={list}
                    renderItem={({ item }) =>
                        <TouchableOpacity
                            style={styles.item}
                            onPress={() => this.props.navigation.push('FallacyItem', { item })}
                        >
                            <Text style={styles.itemName}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>}
                    keyExtrator={item => item.id}
                >
                </FlatList>
            </View>
        )
    }


}

FallacyList.navigationOptions = {
    title: '',
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2A2B3D",
        padding: 20,
    },
    title: {
        fontFamily: 'roboto-mono-medium',
        fontSize: 32,
        color: '#fff',
        marginBottom: 30,
    },
    item: {
        marginBottom: 14,
        padding: 14,
        paddingLeft: 20,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "#5041CD"
    },
    itemName: {
        color: "#fff",
        fontFamily: 'roboto-mono-regular',
        fontSize: 16
    }
})