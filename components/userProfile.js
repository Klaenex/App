import React from 'react';
import firebase from '@react-native-firebase/app';
import {View, Text, Image, Button,Pressable,ScrollView} from 'react-native';
import {InstModalCheck, StyleModalCheck} from './modal';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styles from '../styles/style'
import fonts from '../styles/font'
import font from '../styles/font';
import style from '../styles/style';

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: {
        pseudo: '',
        desc: '',
      },
    };
    this.getText();
    const uID = auth().currentUser.uid;
    this.userData = firestore()
      .collection('users')
      .doc(uID)
      .onSnapshot(doc => {
        this.setState({
          text: {
            pseudo: doc.data().pseudo,
            desc: doc.data().desc,
          },
        });
      });
  }
  getText = async () => {
    const uID = auth().currentUser.uid;
    const fbData = await firestore().collection('users').doc(uID).get();
  };
  render() {
    return (
      <ScrollView>
        <Image style={styles.profilePhoto} source={require('../assets/photo.jpg')}/>
        <Text style={fonts.textPseudo} >{this.state.text.pseudo}</Text>
        <Text style={fonts.textTitle}>Description</Text>
        <Text style={fonts.textDesc}>{this.state.text.desc}</Text>
        <View style={styles.separator}></View>
        <Text style={fonts.textTitle}>Instrument</Text>
        <InstModalCheck />
        <View style={styles.separator}></View>
        <Text style={fonts.textTitle}>Style</Text>
        <StyleModalCheck />
        <View style={styles.separator}></View>
        <Text style={fonts.textTitle}>Mon groupe</Text>
        <Pressable style={styles.button}>
          <Text style={fonts.textButton}>Ajoute un groupe</Text>
        </Pressable>
      </ScrollView>
    );
  }
}
