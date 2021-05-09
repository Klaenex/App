import React from 'react';
import {StyleSheet} from 'react-native';

const white = 'white';
const dark= '#252525' 
const size = [16, 22.62, 31.99, 45.23];
const weight = ['400', '600', '800'];
const fontMono=['SpaceMono-Regular','SpaceMono-Bold']
const fontQuick=['Quicksand-Regular','Quicksand-Medium']

export default StyleSheet.create({
  textButton: {
    fontSize: size[0],
    color: white,
    textAlign: 'center',
    includeFontPadding: false,
    fontFamily:fontQuick[0]
  },
  textTitle: {
    fontSize: size[1],
    fontFamily:fontMono[0]
  },
  textPseudo:{
    fontFamily:fontMono[1],
    fontSize:size[1]
  },
  textDesc: {
    fontSize: size[0],
    fontFamily:fontQuick[0]
  },
  textTag: {
    color: dark,
    fontSize: size[0],
    marginHorizontal: 16,
    marginVertical: 4,
    fontFamily:fontQuick[0]
  },
});
