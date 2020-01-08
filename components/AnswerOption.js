import React from 'react';
import { Text, TouchableOpacity, StyleSheet} from 'react-native';

function AnswerOption(props) {
  return (
      <TouchableOpacity style={styles.button}  
    //   onPress={() => props.navigationProp.navigate('Exercise', {'exerciseProps': props.exerciseProps})}
      >
          <Text style={styles.title}> {props.title}</Text>
      </TouchableOpacity>
  );
}

export default AnswerOption;

const styles = StyleSheet.create({
    button : {
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 1,
        padding: 10,
        borderStyle : 'solid',
        borderRadius: 3,
        borderColor : "#5041CD",
        display: 'flex',
        justifyContent: 'center',
    },
    title : {
        fontSize: 16,
        fontFamily: 'roboto-mono-medium',
        color : "#FFFFFF",
    }
})