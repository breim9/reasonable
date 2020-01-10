import React from 'react';
import { Text, TouchableOpacity, StyleSheet} from 'react-native';
import { withNavigation } from 'react-navigation';

function PracticeButton(props) {
  return (
      <TouchableOpacity style={styles.buttonPractice}  
      onPress={() => props.navigationProp.navigate('Exercise', {'exerciseProps': props.exerciseProps, 'updateFallacyList': props.updateFallacyList})}
      >
          <Text style={styles.titleMain}> {props.titleMain}</Text>
          <Text style={styles.titleSub}> {props.titleSub}</Text>
          <Text style={styles.percent}>{props.exerciseProps.progress}</Text>
      </TouchableOpacity>
  );
}

export default withNavigation(PracticeButton);

const styles = StyleSheet.create({
    buttonPractice : {
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 1,
        padding: 10,
        borderStyle : 'solid',
        borderRadius: 3,
        borderColor : "#5041CD",
        display: 'flex',
        justifyContent: 'center',
        ...Platform.select({
            ios: {
              shadowColor: '#5041CD',
              shadowOffset: {
                width: 0,
                height: 8,
                },
              shadowOpacity: 0.44,
              shadowRadius: 10.32,
            },
            android: {
              elevation: 16,
            },
          }),
    },
    titleMain : {
        fontSize: 16,
        fontFamily: 'roboto-mono-medium',
        color : "#FFFFFF",
    },
    titleSub:{
        fontSize: 16,
        fontFamily: 'roboto-mono-medium',
        color : "#ADA3FF",
    },
    percent:{
        fontSize: 16,
        color:"#FFFFFF",
        fontFamily: 'roboto-mono-medium',
        position:"absolute",
        right:10,
    }
})