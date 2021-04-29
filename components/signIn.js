import React from 'react';
import {TextInput, View} from 'react-native';
export default class Auth extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      email: 'admin@admin.com',
      mdp: 'admin',
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
      </View>
    );
  }
}
