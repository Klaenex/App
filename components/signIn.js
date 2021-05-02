import React from 'react';
import {TextInput, View, Button} from 'react-native';
import auth from '@react-native-firebase/auth'
const logIn=(email,mdp)=>(
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
 })
);
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
        textContentType='emailAddress'
          keyboardType="email-address"
          onChangeText={text => this.setEmail(text)}
          underlineColorAndroid="transparent"
          value={this.state.email}
        />
        <TextInput
        secureTextEntry={true}
          textContentType='password'
          onChangeText={text => this.setMdp(text)}
          underlineColorAndroid="transparent"
          value={this.state.mdp}
        />
        <Button title="S'identifier" onPress={() => logIn(this.state.email,this.state.mdp)} />
      </View>
    );
  }
}
