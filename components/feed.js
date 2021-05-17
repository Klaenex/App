import React, {Component} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import style from '../styles/card';
import img from '../styles/img';

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      
        <View>
          <View style={[style.card,{marginVertical:0}]}>
            <Image
              style={img.imgFeed}
              source={require('../assets/feed1.png')}
            />
          </View>
          <View style={[style.card,{}]}>
            <Image
              style={img.imgFeed}
              source={require('../assets/feed2.png')}
            />
          </View>
        </View>
      
    );
  }
}
