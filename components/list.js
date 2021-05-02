import React from 'react';
import {View, Text, Pressable} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {InstModalCheck} from './modal'

export class InstList extends React.Component {
  render() {
    return (
      <View>
        
        <InstModalCheck/>
      </View>
    );
  }
}
