import React from 'react';
import {StyleSheet} from 'react-native';

const purple = 'hsla(248, 53%, 50%, 1.0)';
const purplefaded = 'hsla(248, 53%, 50%, 0.3)';
const width_proportion = '80%';
export default StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  messageView: {
    flexDirection:'column-reverse',
    marginRight:32
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    borderWidth: 2,
    borderColor: purple,
    borderRadius: 50,
    width: '90%',
    height: 48,
    marginTop: 8,
    paddingHorizontal: 16,
    fontFamily: 'Quicksand-regular',
    fontSize: 16,
  },
  sendButton: {marginTop: 8},
  message:{
    backgroundColor:purplefaded,
    paddingVertical: 8,
    paddingHorizontal: 24,
    fontFamily:'Quicksand-regular',
    fontSize: 16,
    margin:8,
    borderRadius:35
  },
  myMessage:{
    alignItems:'flex-end',

  }
  
});
