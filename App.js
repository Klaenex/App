import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, StatusBar, Image} from 'react-native';
import styles from './styles/style';
import {
  SignIn,
  CreateAccount,
  Home,
  Search,
  User,
  Filter,
  Message,
  UserView,
} from './components/screen';
import auth from '@react-native-firebase/auth';

const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const UserStack = createStackNavigator();
const SearchStack = createStackNavigator();

function Logo() {
  return <Image style={styles.logo} source={require('./assets/logo.png')} />;
}

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Home"
      component={Home}
      options={{headerTitle: props => <Logo />}}
    />
  </HomeStack.Navigator>
);
const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen
      name="Search"
      component={Search}
      options={{headerTitle: props => <Logo />}}
    />
    <SearchStack.Screen
      name="Message"
      component={Message}
      options={({route}) => ({
        title: route.params.name,
      })}
    />
    <SearchStack.Screen
      name="UserView"
      component={UserView}
        // options={({route}) => ({
        // userID: route.params.name,
        // })}
    />
  </SearchStack.Navigator>
);
const UserStackScreen = () => (
  <UserStack.Navigator>
    <UserStack.Screen
      name="User"
      component={User}
      options={{headerTitle: props => <Logo />}}
    />
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
      <Tabs.Navigator>
        <Tabs.Screen name="Home" component={HomeStackScreen} />
        <Tabs.Screen name="Search" component={SearchStackScreen} />
        <Tabs.Screen name="User" component={UserStackScreen} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};
