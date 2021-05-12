import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, Modal, Text,Pressable} from 'react-native';
import {UserInfoModal} from './modal';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styles from '../styles/style'
import fonts from '../styles/font'

//const usersCollection = firestore().collection('users');

const addUsers = (email,uid) => {
  firestore()
  .collection('users')
  .doc(uid)
  .set({
    id:uid,
    pseudo: '',
    email: email,
    desc:'',
    inst:[],
    style:[],
    band:false
  })
  .then(() => {
    console.log('User added!');
  });
};


const createAccount = (email, mdp) =>
  auth()
    .createUserWithEmailAndPassword(email, mdp)
    .then(() => {
     
      let uId=auth().currentUser.uid
      console.log(uId)
      addUsers(email,uId);
    })

    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
      console.error(error);
    });

export default class Log extends React.Component {
  
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
          textContentType="emailAddress"
          keyboardType="email-address"
          onChangeText={text => this.setEmail(text)}
          underlineColorAndroid="transparent"
          value={this.state.email}
        />
        <TextInput
          secureTextEntry={true}
          textContentType="password"
          onChangeText={text => this.setMdp(text)}
          underlineColorAndroid="transparent"
          value={this.state.mdp}
        />
        <Pressable
          style={styles.submitButton}
          onPress={() => createAccount(this.state.email, this.state.mdp)}>
          <Text style={fonts.textSubmitButton}>Crée un compte</Text>
        </Pressable>
      </View>
    );
  }
}
