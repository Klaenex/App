import React from 'react';
import firebase from '@react-native-firebase/app';
import {
  View,
  Text,
  Image,
  Button,
  Pressable,
  ScrollView,
  TextInput,
  Keyboard,
} from 'react-native';
import {InstModalCheck, StyleModalCheck} from './modal';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styles from '../styles/style';
import fonts from '../styles/font';
import font from '../styles/font';
import style from '../styles/style';

const updateDesc = (desc, uid) => {
  firestore()
    .collection('users')
    .doc(uid)
    .update({
      desc: desc,
    })
    .then(() => {
      
    });
};
export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pseudo: '',
      desc: '',
      inst: [],
      style: [],
      editable: false,
    };
    this.getText();
    const uID = auth().currentUser.uid;
    this.userData = firestore()
      .collection('users')
      .doc(uID)
      .onSnapshot(doc => {
        this.setState({
          pseudo: doc.data().pseudo,
          desc: doc.data().desc,
          inst: doc.data().inst,
          style: doc.data().style,
        });
      });
  }
  setDesc(desc) {
    this.setState({desc});
  }
  setEdit = edit => {
    this.setState({editable: edit});
  };
  getText = async () => {
    const uID = auth().currentUser.uid;
    const fbData = await firestore().collection('users').doc(uID).get();
  };

  render() {
    
    const {editable} = this.state;
    const uID = auth().currentUser.uid;
    const desc = this.state.desc;
    return (
      <ScrollView>
        <Image
          style={styles.profilePhoto}
          source={require('../assets/photo.jpg')}
        />
        <Text style={fonts.textPseudo}>{this.state.pseudo}</Text>
        <Text style={fonts.textTitle}>Description</Text>
        <View style={styles.descWrapper}>
          <TextInput
            ref={input => {
              this.descInput = input;
            }}
            style={[fonts.textDesc, {color: editable ? 'black' : 'black',flex:.9}]}
            onChangeText={text => this.setDesc(text)}
            underlineColorAndroid="transparent"
            defaultValue={this.state.desc}
            multiline={true}
            onEndEditing={() => {
              updateDesc(desc, uID);
              this.setEdit(!editable);
            }}
            editable={this.state.editable}
          />
          <Pressable
          style={{position:'relative',top:7}}
            onPress={() => {
              this.setEdit(!editable);
              setTimeout(() => {
                this.descInput.focus();
              }, 100);
            }}>
            <Image source={require('../assets/edit.png')} />
            
          </Pressable>
        </View>

        <View style={styles.separator}></View>
        <Text style={fonts.textTitle}>Instrument</Text>
        <InstModalCheck />
        <View style={styles.separator}></View>
        <Text style={fonts.textTitle}>Style</Text>
        <StyleModalCheck
          toCallBack={style => {
            this.state.text.style;
          }}
        />
        <View style={styles.separator}></View>
        <Text style={fonts.textTitle}>Mon groupe</Text>
        <Pressable style={styles.button}>
          <Text style={fonts.textButton}>Ajoute un groupe</Text>
        </Pressable>
      </ScrollView>
    );
  }
}
