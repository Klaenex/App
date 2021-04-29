import React from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import Auth from './signIn';
import Log from './log';
import auth from '@react-native-firebase/auth';
const ScreenContainer = ({children}) => <View>{children}</View>;

export const SignIn = ({navigation}) => {
  return (
    <ScreenContainer>
      <Auth />
      <Button title="S'identifier" onPress={() => alert('todo')} />
      <Button
        title="Créer un compte"
        onPress={() => navigation.push('CreateAccount')}
      />
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
      <Text>Search</Text>
      <Button
        title="Message"
        onPress={() => navigation.push('Message', {name: 'Message'})}
      />
    </ScreenContainer>
  );
};

export const User = () => {
  return (
    <ScreenContainer>
      <Text>User</Text>
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
