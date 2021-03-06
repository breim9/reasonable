import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';

import PracticeButton from 'components/PracticeButton';
import { UpdateCurrentExerciseType } from '../redux/actions';
import { connect } from 'react-redux';

function PracticeScreen(props) {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Practice</Text>
        <PracticeButton
          titleMain={"Name the fallacy"}
          titleSub={"from the description"}
          exerciseType={"NameFallacyFromDescription"}
          navigationProp={props.navigation}
          UpdateCurrentExerciseType={() => props.UpdateCurrentExerciseType("NameFallacyFromDescription")}
        />
        <PracticeButton
          titleMain={"Name the fallacy"}
          titleSub={"from the example"}
          exerciseType={"NameFallacyFromExample"}
          navigationProp={props.navigation}
          UpdateCurrentExerciseType={() => props.UpdateCurrentExerciseType("NameFallacyFromExample")}
        />
        <PracticeButton
          titleMain={"Describe the fallacy"}
          titleSub={"from the name"}
          exerciseType={"DescribeFallacyFromName"}
          navigationProp={props.navigation}
          UpdateCurrentExerciseType={() => props.UpdateCurrentExerciseType("DescribeFallacyFromName")}
        />
      </ScrollView>
    </View>
  );
}

PracticeScreen.navigationOptions = {
  header: null,
};

const mapDispatchToProps = {
  UpdateCurrentExerciseType,
}

export default connect(null, mapDispatchToProps)(PracticeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2A2B3D',
  },
  title: {
    fontFamily: 'roboto-mono-medium',
    fontSize: 32,
    color: '#fff',
    marginTop: 100,
    marginBottom: 30,
  },
});
