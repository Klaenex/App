import React from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  Button,
  Alert,
  Image,
  StyleSheet,
} from 'react-native';
import SelectMultiple from 'react-native-select-multiple';

//import ImagePicker from './imagePicker';

import {launchImageLibrary} from 'react-native-image-picker';
import styles from '../styles/style';
import fonts from '../styles/font';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


const updateInst = (inst, uid) => {
  firestore()
    .collection('users')
    .doc(uid)
    .update({
      inst: inst,
    })
    .then(() => {
      
    });
};

export class InstModalCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableInst:[],
      modalVisible: false,
      selectedInst: [],
      inst: {
        inst: [],
      },
    };
    this.getInst();
    const uID = auth().currentUser.uid;
    this.userInst = firestore()
      .collection('users')
      .doc(uID)
      .onSnapshot(doc => {
        this.setState({selectedInst: doc.data().inst});
        
      });
    this.instrument = firestore()
      .collection('list')
      .doc('inst')
      .onSnapshot(doc => {
        this.setState({
          inst: {
            inst: doc.data().inst,
          },
        });
      });
  }

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  onSelectionsChange = selectedInst => {
     
    this.setState({selectedInst});
  };

  getInst = async () => {
    let uID = auth().currentUser.uid;
    const listDoc = await firestore().collection('list').doc('inst').get();
    const inst = await firestore().collection('users').doc(uID).get();
  };

  render() {
    const {modalVisible} = this.state;
    const list = this.state.inst.inst;
    const selectedInst = this.state.selectedInst;
    const uID = auth().currentUser.uid;
    return (
      <View>
        <Pressable
          style={styles.button}
          onPress={() => this.setModalVisible(true)}>
          <Text style={fonts.textButton}>Ajoute un instrument</Text>
          <Image source={require('../assets/chevron.png')} />
        </Pressable>

        <Modal
          animationType="fade"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}>
          <Button
            title="close"
            onPress={() => {
              this.setModalVisible(!modalVisible);
              updateInst(selectedInst, uID);
            }}
          />
          <View>
            <SelectMultiple
              items={list}
              selectedItems={this.state.selectedInst}
              onSelectionsChange={this.onSelectionsChange}
            />
          </View>
        </Modal>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {this.state.selectedInst.map((inst, index) => (
            <Pressable
              style={styles.tag}
              key={index}
              onPress={() => {
                this.state.selectedInst.splice(index, 1);
                this.setState(this.state.selectedInst);
                updateInst(selectedInst, uID);
              }}>
              <Text style={fonts.textTag}>{inst.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    );
  }
}

function updateStyle(uid, style) {
  firestore().collection('users').doc(uid).update({
    style: style,
  });
}
export class StyleModalCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      selectedStyle: [],
      style: {
        style: [],
      },
    };
    this.getStyle();
    const uID = auth().currentUser.uid;
    this.userStyle = firestore()
      .collection('users')
      .doc(uID)
      .onSnapshot(doc => {
        this.setState({selectedStyle: doc.data().style});
        
      });
    this.style = firestore()
      .collection('list')
      .doc('style')
      .onSnapshot(doc => {
        this.setState({
          style: {
            style: doc.data().style,
          },
        });
      });
  }

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  onSelectionsChange = selectedStyle => {
    this.setState({selectedStyle});

    const uID = auth().currentUser.uid;
    updateStyle(uID, this.state.selectedStyle);
    //this.props.toCallBack(selectedStyle);
  };
  getStyle = async () => {
    const uID = auth().currentUser.uid;
    const listDoc = await firestore().collection('list').doc('style').get();
    const styleDoc = await firestore().collection('users').doc(uID).get();
  };

  render() {
    const {modalVisible} = this.state;
    const list = this.state.style.style;
    const selectedStyle = this.state.selectedStyle;
    const uID = auth().currentUser.uid;
    return (
      <View>
        <Pressable
          style={styles.button}
          onPress={() => this.setModalVisible(true)}>
          <Text style={fonts.textButton}>Ajoute un style</Text>
          <Image source={require('../assets/chevron.png')} />
        </Pressable>

        <Modal
          animationType="fade"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}>
          <Button
            title="close"
            onPress={() => {
              this.setModalVisible(!modalVisible);
              updateStyle(uID, selectedStyle);
            }}
          />
          <View>
            <SelectMultiple
              items={list}
              selectedItems={this.state.selectedStyle}
              onSelectionsChange={this.onSelectionsChange}></SelectMultiple>
          </View>
        </Modal>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {this.state.selectedStyle.map((style, index) => (
            <Pressable
              key={index}
              style={styles.tag}
              onPress={() => {
                this.state.selectedStyle.splice(index, 1);
                this.setState(this.state.selectedStyle);
                const uID = auth().currentUser.uid;
                updateStyle(uID, selectedStyle);
              }}>
              <Text style={fonts.textTag}>{style.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    );
  }
}
