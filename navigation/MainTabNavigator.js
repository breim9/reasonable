import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import PracticeScreen from '../screens/PracticeScreen';
import AboutScreen from '../screens/AboutScreen';
import FallacyList from '../screens/FallacyList';
import FallacyItem from '../screens/FallacyItem';
import ExerciseScreen from '../screens/ExerciseScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    FallacyList: FallacyList,
    FallacyItem: FallacyItem
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#2A2B3D',
        borderBottomWidth: 0,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-home'
          : 'md-home'
      }
    />
  ),
};

HomeStack.path = '';

const PracticeStack = createStackNavigator(
  {
    Practice: PracticeScreen,
    Exercise: ExerciseScreen,
  },
  {
    initialRouteName: "Practice",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#2A2B3D',
        borderBottomWidth: 0,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }
);

PracticeStack.navigationOptions = {
  tabBarLabel: 'Practice',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-ribbon' : 'md-ribbon'} />
  ),
};

PracticeStack.path = '';

const AboutStack = createStackNavigator(
  {
    About: AboutScreen,
  },
  {
    initialRouteName: "About",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#2A2B3D',
        borderBottomWidth: 0,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }
);

AboutStack.navigationOptions = {
  tabBarLabel: 'About',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

AboutStack.path = '';

const tabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    PracticeStack,
    AboutStack,
  },
  {
    tabBarOptions: {
      activeTintColor: '#fff',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: '#2A2B3D',
        borderTopWidth: 0,
      },
    }
  }
);

tabNavigator.path = '';

export default tabNavigator;
