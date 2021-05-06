import React from 'react';
import firebase from '@react-native-firebase/app';
import {View, Text, Image, Button} from 'react-native';
import {InstModalCheck, StyleModalCheck} from './modal';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

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
      <View>
        <Text>{this.state.text.pseudo}</Text> 
        <Image />
        <Text>Description</Text>
         <Text>{this.state.text.desc}</Text> 
        <Button
          title="test"
          onPress={async () => {
            const uID = auth().currentUser.uid;
            console.log(await firestore().collection('users').doc(uID).get());
          }}
        />
        <InstModalCheck />
        <StyleModalCheck />
        <Text>Mon groupe</Text>
      </View>
    );
  }
}
