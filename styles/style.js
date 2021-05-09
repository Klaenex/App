import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';

//const purple = '#D03060';
const purple = 'hsla(248, 53%, 50%, 1.0)';
const purpleA = 'hsla(248, 53%, 50%, 0.4)';
const dark = '#141414';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default StyleSheet.create({
  logo: {
    padding: 16,
    resizeMode: 'contain',
    width: 50,
  },
  background: {
    minHeight: '100%',
    backgroundColor: 'white',
    padding: 16,
    paddingBottom: 64,
  },
  button: {
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    backgroundColor: purple,
    marginBottom: 8,
    padding: 8,
    borderRadius: 6,
  },
  profilePhoto: {
    width: windowWidth,
    height: windowWidth,
  },
  tagContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: dark,
  },
  tagContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  tag: {
    alignSelf: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: purpleA,
    borderColor: purple,
    borderWidth: 2,
    borderRadius: 50,
    margin: 4,
    color: purple,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(0,0,0,.1)',
    marginVertical: 32,
  },
});
