import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';

function ButtonPrimary(props) {
  return (
    <TouchableOpacity style={styles.buttonPrimary}
      onPress={() => {
        if (props.navigateType === "customPress") {

        }
        else if (props.navigateType === "push") {
          props.navigationProp.push(props.action);
        }
        else if (props.navigateType === "popToTop") {
          props.navigationProp.popToTop();
        }
      }}
    >
      <Text style={styles.buttonPrimaryText}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}

export default withNavigation(ButtonPrimary);

const styles = StyleSheet.create({
  buttonPrimary: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#5041CD",
    width: 240,
    height: 56,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 50,
    borderColor: "#5041CD",
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
  buttonPrimaryText: {
    fontSize: 18,
    fontFamily: 'roboto-medium',
    color: "#FFFFFF",
  }
})