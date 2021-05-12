import React from 'react';
import {View, Text, Button, TextInput,Image,Pressable} from 'react-native';
import Auth from './signIn';
import Log from './log';
import UserProfile from './userProfile'
import SearchUsers from './searchUsers.js'
import auth from '@react-native-firebase/auth';
import styles from '../styles/style';
import fonts from '../styles/font'


const ScreenContainer = ({children}) => <View style={styles.background}>{children}</View>;

export const SignIn = ({navigation}) => {
  return (
    <ScreenContainer>
      <Auth />
      <Pressable
          style={styles.submitButton}
          onPress={() => navigation.push('CreateAccount')}>
          <Text style={fonts.textSubmitButton}>Crée un compte</Text>
        </Pressable>
    </ScreenContainer>
  );
};

export const CreateAccount = () => {
  return (
    <ScreenContainer>
      <Log />
    </ScreenContainer>
  );
};

const SignOut = () =>
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
    
export const Home = () => {
  return (
    <ScreenContainer>
      <Text>Home</Text>
      <Button title="disconect" onPress={() => SignOut()} />
    </ScreenContainer>
  );
};
export const Search = ({navigation}) => {
  return (
    <ScreenContainer>
      <SearchUsers/>
      {/* <Button
        title="Message"
        onPress={() => navigation.push('Message', {name: 'Message'})}
      /> */}
    </ScreenContainer>
  );
};

export const User = () => {
  return (
    <ScreenContainer>
      <UserProfile />
    </ScreenContainer>
  );
};

export const Filter = () => {
  return (
    <ScreenContainer>
      <Text>Filter</Text>
    </ScreenContainer>
  );
};

export const Message = ({route}) => {
  return (
    <ScreenContainer>
      <Text>Messages</Text>
    </ScreenContainer>
  );
};
