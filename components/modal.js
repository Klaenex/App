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
import SelectMultiple from 'react-native-select-multiple';
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
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      selectedItems: [],
      inst: {
        inst: [],
      },
    };
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


  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };
  onSelectionsChange = selectedItems => {
    // selecteditem is array of { label, value }
    this.setState({selectedItems});
    console.log(selectedItems);
  };
  getInst = async () => {
    const listDoc = await firestore().collection('list').doc('inst').get();
    console.log(listDoc.data().inst);
  };

  render() {
    const {modalVisible} = this.state;

    const list = this.state.inst.inst;
    return (
      <View>
        <Pressable
          style={{margin: 15, backgroundColor: 'blue'}}
          onPress={() => this.setModalVisible(true)}>
          <Text style={{margin: 8, color: 'white'}}>Ajoute un instrument</Text>
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
            onPress={() => this.setModalVisible(!modalVisible)}
          />
          <View>
            <SelectMultiple
              items={list}
              selectedItems={this.state.selectedItems}
              onSelectionsChange={this.onSelectionsChange}></SelectMultiple>
          </View>
        </Modal>
         

          {this.state.selectedItems.map((inst, index) => (
          <Pressable
            key={index}
            onPress={() => {
              this.state.selectedItems.splice(index, 1);
             this.setState(this.state.selectedItems)
              console.log(this.state.selectedItems);
              
            }}>
            <Text>{inst.label}</Text>
          </Pressable>
        ))}  
      </View>
    );
  }
}



export class StyleModalCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      selectedItems: [],
      style: {
        style: [],
      },
    };
    this.getStyle();
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
  onSelectionsChange = selectedItems => {
    // selecteditem is array of { label, value }
    this.setState({selectedItems});
    console.log(selectedItems);
  };
  getStyle = async () => {
    const listDoc = await firestore().collection('list').doc('style').get();
    console.log(listDoc.data().style);
  };

  render() {
    const {modalVisible} = this.state;

    const list = this.state.style.style;
    return (
      <View>
        <Pressable
          style={{margin: 15, backgroundColor: 'blue'}}
          onPress={() => this.setModalVisible(true)}>
          <Text style={{margin: 8, color: 'white'}}>Ajoute un style</Text>
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
            onPress={() => this.setModalVisible(!modalVisible)}
          />
          <View>
            <SelectMultiple
              items={list}
              selectedItems={this.state.selectedItems}
              onSelectionsChange={this.onSelectionsChange}></SelectMultiple>
          </View>
        </Modal>
         

          {this.state.selectedItems.map((style, index) => (
          <Pressable
            key={index}
            onPress={() => {
              this.state.selectedItems.splice(index, 1);
             this.setState(this.state.selectedItems)
              console.log(this.state.selectedItems);
              
            }}>
            <Text>{style.label}</Text>
          </Pressable>
        ))}  
      </View>
    );
  }
}
