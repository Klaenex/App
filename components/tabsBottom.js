import 'react-native-gesture-handler';
import React from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {enableScreens} from 'react-native-screens';
import Feeds from './feeds';
import Search from './search';
import User from './user';

const Tab = createBottomTabNavigator();
export default class TabsBottom extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Feeds" component={Feeds} />
          <Tab.Screen name="Search" component={Search} />
          <Tab.Screen name="User" component={User} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
