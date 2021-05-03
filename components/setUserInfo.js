import React from 'react';
import {Text, TextInput, Pressable, View, Button} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from './imagePicker';
import {InstList,StyleList} from './list';

export default class SetUserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      desc: '',
      inst: [],
      style: [],
    };
  }
  setName(name) {
    this.setState({name});
  }
  setDesc(desc) {
    this.setState({desc});
  }
  render() {
    return (
      <View>
        <Text>
          Ton compte est maintenant créer, Tu peux maintenant completer tes
          information
        </Text>
        <Text>Photo de profil</Text>
        <ImagePicker />
        <Text>Nom d'utilisateur</Text>
        <TextInput onChangeText={text => this.setName(text)} />
        <Text>A propos de toi</Text>
        <TextInput
          placeholder="Décris toi briévement"
          multiline={true}
          onChangeText={text => this.setDesc(text)}
        />
         <InstList/>
         <StyleList/>
      </View>
    );
  }
}
