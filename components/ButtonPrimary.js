import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
// import { connect } from 'react-redux';
// import { AddOne } from '../redux/actions';

function ButtonPrimary(props) {
  return (
    <TouchableOpacity style={styles.buttonPrimary}
      onPress={() => props.navigationProp.navigate(props.newPage)}
    // onPress={() => props.AddOne()}
    >
      <Text style={styles.buttonPrimaryText}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}

// const mapDispatchToProps = {
//   AddOne
// }

//export default connect(null, mapDispatchToProps)(withNavigation(ButtonPrimary));
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