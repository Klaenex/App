import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  Pressable,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styles from '../styles/styleChat';

const roomID = (currentUID, toUID) => {
  if (currentUID < toUID) {
    return currentUID + toUID;
  } else {
    return toUID + currentUID;
  }
};

const sendMessage = (roomID, currentUID, toUID, message) => {
  firestore()
    .collection('chats')
    .doc(roomID)
    .collection('message')
    .doc()
    .set({
      sender: currentUID,
      receiver: toUID,
      message: message,
      times: firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {});
};

export default class MessageView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageSend: '',
      getMessages: [],
      users: [],
    };
    let toUID = this.props.getParams;
    let currentUID = auth().currentUser.uid;
    this.getMessage = firestore()
      .collection('chats')
      .doc(roomID(currentUID, toUID))
      .collection('message')
      .orderBy('times', 'asc')
      .onSnapshot(docs => {
        let getMessages = [];
        docs.forEach(doc => {
          getMessages.push(doc.data().message);
        });
        this.setState({getMessages});
      });
  }
  setMessage(messageSend) {
    this.setState({messageSend});
  }

  render() {
    let currentUID = auth().currentUser.uid;
    let toUID = this.props.getParams;
    let messageSend = this.state.messageSend;
    let messageArray = this.state.getMessages;
    console.log(this.state.getMessages);
    return (
      <View style={styles.wrapper}>
        <ScrollView style={styles.messageView}>
          {messageArray.map((chat, index) => (
            <View key={index}>
              <Text key={index}> {chat}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            onChangeText={text => this.setMessage(text)}
            underlineColorAndroid="transparent"
            multiline={true}
          />
          <Pressable
            style={styles.sendButton}
            onPress={() => {
              sendMessage(
                roomID(currentUID, toUID),
                currentUID,
                toUID,
                messageSend,
              );
            }}>
            <Image source={require('../assets/sendMessage.png')} />
          </Pressable>
        </View>
      </View>
    );
  }
}
