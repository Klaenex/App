import React from 'react';
import {TextInput, View, Button, Pressable, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import styles from '../styles/style';
import fonts from '../styles/font';
const logIn = (email, mdp) =>
  auth()
    .signInWithEmailAndPassword(email, mdp)
    .then(() => {
      console.log('Login!');
    })
    .catch(error => {
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
      console.error(error);
    });
export default class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'admin@admin.com',
      mdp: 'admin1',
    };
  }
  setEmail(email) {
    this.setState({email});
  }
  setMdp(mdp) {
    this.setState({mdp});
  }
  render() {
    return (
      <View>
        <TextInput
          style={styles.textInput}
          autoComplete="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          onChangeText={text => this.setEmail(text)}
          underlineColorAndroid="transparent"
          value={this.state.email}
        />
        <TextInput
          style={styles.textInput}
          autoComplete="password"
          secureTextEntry={true}
          textContentType="password"
          onChangeText={text => this.setMdp(text)}
          underlineColorAndroid="transparent"
          value={this.state.mdp}
        />
        <Pressable
          style={styles.submitButton}
          onPress={() => logIn(this.state.email, this.state.mdp)}>
          <Text style={fonts.textSubmitButton}>S'identifier</Text>
        </Pressable>
        
      </View>
    );
  }
}
