import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

AnswerOption = (props) => {
    return (
        <TouchableOpacity style={[styles.button, styles[props.visualResult]]}
            onPress={() => props.answerHandler(props.id, props.result, props.exerciseType)}
        >
            <Text style={styles.title}> {props.title}</Text>
        </TouchableOpacity>
    );
}

export default AnswerOption;

const styles = StyleSheet.create({
    button: {
        marginTop: hp(1),
        marginBottom: hp(1),
        borderWidth: 1,
        padding: 10,
        borderStyle: 'solid',
        borderRadius: 3,
        borderColor: "#5041CD",
        display: 'flex',
        justifyContent: 'center',
    },
    title: {
        fontSize: wp(4),
        fontFamily: 'roboto-mono-medium',
        color: "#FFFFFF",
    },
    default: {
        borderColor: "#5041CD",
    },
    correct: {
        borderColor: "#54AF64",
    },
    incorrect: {
        borderColor: "#AF5554",
    }
})