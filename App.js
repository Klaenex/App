import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, StatusBar} from 'react-native';
import {
  SignIn,
  CreateAccount,
  Home,
  Search,
  User,
  Filter,
  Message,
} from './components/screen';

const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const UserStack = createStackNavigator();
const SearchStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} />
  </HomeStack.Navigator>
);
const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name="Search" component={Search} />
    <SearchStack.Screen
      name="Message"
      component={Message}
      options={({route}) => ({
        title: route.params.name,
      })}
    />
  </SearchStack.Navigator>
);
const UserStackScreen = () => (
  <UserStack.Navigator>
    <UserStack.Screen name="User" component={User} />
  </UserStack.Navigator>
);

export default () => {
  return (
    <NavigationContainer>
      {/*   <Tabs.Navigator>
         <Tabs.Screen name="Home" component={HomeStackScreen} />
         <Tabs.Screen name="Search" component={SearchStackScreen} />
        <Tabs.Screen name="User" component={UserStackScreen} />
       </Tabs.Navigator> */}

      <AuthStack.Navigator>
        <AuthStack.Screen
          name="SignIn"
          component={SignIn}
          options={{title: 'Se connecter'}}
        />
        <AuthStack.Screen
          name="CreateAccount"
          component={CreateAccount}
          options={{title: 'Créer un compte'}}
        />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};
