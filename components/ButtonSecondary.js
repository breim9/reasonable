import React from 'react';
import { Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function ButtonSecondary(props) {
  return (
      <TouchableOpacity style={styles.buttonSecondary}
        onPress={() => props.navigationProp.push(props.newPage)}
      >
          <Text style={styles.buttonSecondaryText}>
              {props.title}
          </Text>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    buttonSecondary : {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor : "#2A2B3D",
        width:240,
        height: 56,
        borderWidth: 1,
        borderStyle : 'solid',
        borderRadius: 50,
        borderColor : "#ADA3FF",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios: {
              shadowColor: '#3E31AA',
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
    buttonSecondaryText : {
        fontSize: 18,
        fontFamily: 'roboto-medium',
        color : "#ADA3FF",
    }
})