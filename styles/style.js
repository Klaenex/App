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
    marginTop: 32,
    marginBottom: 16,
  },
  separatorSearch: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(0,0,0,.1)',
    marginVertical: 16,
  },
  textInput: {
    borderRadius: 30,
    borderWidth: 2,
    borderColor: purple,
    marginVertical: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Quicksand-regular',
  },
  submitButton: {
    alignSelf: 'center',
    backgroundColor: purple,
    borderRadius: 25,
    width: 165,
    marginVertical: 8,
  },
  fixedButton: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    backgroundColor: purple,
    borderRadius: 25,
    width: 165,
    marginVertical: 8,
    zIndex: 1
  },
  modalCenter: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 64,
    backgroundColor: 'rgba(0,0,0,.7)',
  },
  modalView: {
    backgroundColor:'white',
    borderRadius: 20,
    padding: 8,
    marginHorizontal: 8,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  descWrapper: {
    flexDirection: 'row',
  },
});
