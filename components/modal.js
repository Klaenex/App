import React from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  Button,
  Alert,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import SetUserInfo from './setUserInfo';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {InstList} from './list';

export class UserInfoModal extends React.Component {
  state = {
    modalVisible: true,
  };
  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  render() {
    const {modalVisible} = this.state;
    const currentUser = auth().currentUser;
    if (currentUser.displayName == null) {
      return (
        <Modal
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            this.setModalVisible(!modalVisible);
          }}>
          <SetUserInfo />
          <Button
            title="close"
            onPress={() => this.setModalVisible(!modalVisible)}
          />
        </Modal>
      );
    }
  }
}

export class InstModalCheck extends React.Component {
  state = {
    modalVisible: false,
    inst: {
      inst: [],
    },
  };

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };
  constructor(props) {
    super(props);
    this.getInst();
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
  getInst = async () => {
    const listDoc = await firestore().collection('list').doc('inst').get();
    console.log(listDoc.data().inst);
  };
  render() {
    const {modalVisible} = this.state;
    return (
      <View>
        <Pressable
          style={{margin: 15, backgroundColor: 'blue'}}
          onPress={() => this.setModalVisible(true)}>
          <Text style={{margin: 8, color: 'white'}}>Ajoute un instrument</Text>
        </Pressable>
        <Modal
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}>
          <Button
            title="close"
            onPress={() => this.setModalVisible(!modalVisible)}
          />
          {this.state.inst.inst.map((name, index) => (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
              key={index}>
              <Text>{name}</Text>
              
            </View>
          ))}
        </Modal>
      </View>
    );
  }
}
