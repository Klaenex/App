import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, Modal, Text, Pressable} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styles from '../styles/style';
import fonts from '../styles/font';
import style from '../styles/card'
//const usersCollection = firestore().collection('users');

const addUsers = (email, uid, pseudo) => {
  firestore()
    .collection('users')
    .doc(uid)
    .set({
      id: uid,
      pseudo: pseudo,
      email: email,
      desc: '',
      inst: [],
      style: [],
      band: false,
    })
    .then(() => {
      console.log('User added!');
      auth().currentUser.updateProfile({displayName: pseudo});
    });
};

const createAccount = (email, mdp,pseudo) =>
  auth()
    .createUserWithEmailAndPassword(email, mdp)
    .then(() => {
      let uId = auth().currentUser.uid;
      console.log(uId);
      addUsers(email, uId, pseudo);
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
      pseudo: 'pseudo',
      email: 'admin@admin.com',
      mdp: 'admin1',
    };
  }
  setPseudo(pseudo) {
    this.setState({pseudo});
  }
  setEmail(email) {
    this.setState({email});
  }

  setMdp(mdp) {
    this.setState({mdp});
  }
  render() {
    return (
      <View style={[style.card,{marginTop:64}]}>
        <TextInput
          style={styles.textInput}
          onChangeText={text => this.setPseudo(text)}
          underlineColorAndroid="transparent"
          value={this.state.pseudo}
        />
        <TextInput
          style={styles.textInput}
          textContentType="emailAddress"
          keyboardType="email-address"
          onChangeText={text => this.setEmail(text)}
          underlineColorAndroid="transparent"
          value={this.state.email}
        />
        <TextInput
          style={styles.textInput}
          secureTextEntry={true}
          textContentType="password"
          onChangeText={text => this.setMdp(text)}
          underlineColorAndroid="transparent"
          value={this.state.mdp}
        />
        <Pressable
          style={styles.submitButton}
          onPress={() => createAccount(this.state.email, this.state.mdp,this.state.pseudo)}>
          <Text style={fonts.textSubmitButton}>Crée un compte</Text>
        </Pressable>
      </View>
    );
  }
}
