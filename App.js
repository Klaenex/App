import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, StatusBar} from 'react-native';
import {UserInfoModal} from './components/modal'
import {
  SignIn,
  CreateAccount,
  Home,
  Search,
  User,
  Filter,
  Message,
} from './components/screen';
import auth from '@react-native-firebase/auth';

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
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  if (!user) {
    return (
      <NavigationContainer>
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
  } 
    return (
      <NavigationContainer>
        <UserInfoModal/>
        <Tabs.Navigator>
          <Tabs.Screen name="Home" component={HomeStackScreen} />
          <Tabs.Screen name="Search" component={SearchStackScreen} />
          <Tabs.Screen name="User" component={UserStackScreen} />
        </Tabs.Navigator>
      </NavigationContainer>
    );
};
