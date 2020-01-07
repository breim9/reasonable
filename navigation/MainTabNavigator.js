import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import PracticeScreen from '../screens/PracticeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import FallacyList from '../screens/FallacyList';
import FallacyItem from '../screens/FallacyItem';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    // FallacyList : FallacyList,
    // FallacyItem : FallacyItem
  },
  config
  // {
  //   initialRouteName : "Home"
  // }
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
  },
  config
);

PracticeStack.navigationOptions = {
  tabBarLabel: 'Practice',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-ribbon' : 'md-ribbon'} />
  ),
};

PracticeStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator(
{
  HomeStack,
  PracticeStack,
  SettingsStack,
},
{
  tabBarOptions: {
    activeTintColor: '#fff',
    labelStyle: {
      fontSize: 12,
    },
    style: {
      backgroundColor: '#2A2B3D',
    },
}
}
);

tabNavigator.path = '';

export default tabNavigator;
