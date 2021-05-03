import React from 'react';
import {View, Text, Pressable} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {InstModalCheck,StyleModalCheck} from './modal';

export class InstList extends React.Component {
  render() {
    return (
      <View>
        <InstModalCheck />
      </View>
    );
  }
}
export class StyleList extends React.Component {
  render() {
    return (
      <View>
        <StyleModalCheck />
      </View>
    );
  }
}
