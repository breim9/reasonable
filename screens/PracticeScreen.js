import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  SafeAreaView 
} from 'react-native';

export default function PracticeScreen() {
  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView style={styles.container}>
        
      </ScrollView>
    </SafeAreaView>
  );
}

PracticeScreen.navigationOptions = {
  title: 'Practice',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
