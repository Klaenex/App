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
} from 'react-native';
import SelectMultiple from 'react-native-select-multiple';
//import ImagePicker from './imagePicker';

import {launchImageLibrary} from 'react-native-image-picker';
import {InstList, StyleList} from './list';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

//FONCTION UPDATE DE LA PREMMIERE CONNECTION

//const uid = auth().currentUser.uid;

const firstUpdate = (pseudo, desc, inst, style, uid) => {
  firestore()
    .collection('users')
    .doc(uid)
    .update({
      pseudo: pseudo,
      desc: desc,
      style: style,
      inst: inst,
    })
    .then(() => {
      auth().currentUser.updateProfile({displayName: pseudo});
      console.log(auth().currentUser.displayName);
      console.log(uid);
    });
};
function ImagePicker() {
  const [response, setResponse] = React.useState(null);
  return (
    <View>
      <Pressable>
        <Text>Ajoute une photo de profil</Text>
         {/* <Image source={response} />  */}
        <Button
          title="Ajoute une photo"
          onPress={() => {
            launchImageLibrary(
              {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 400,
                maxWidth: 400,
              },
              response => {
                setResponse(response.uri);
              },
            );
            console.log(response);
          }}
        />
      </Pressable>
    </View>
  );
}

export class UserInfoModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      desc: '',
      inst: [],
      style: [],
      modalVisible: true,
    };
  }
  setName(name) {
    this.setState({name});
  }
  setDesc(desc) {
    this.setState({desc});
  }

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
            this.setModalVisible(!modalVisible);
          }}>
          <Text>
            Ton compte est maintenant créer, Tu peux maintenant completer tes
            information
          </Text>
          <Text>Photo de profil</Text>
          <ImagePicker />

          <Text>Nom d'utilisateur</Text>
          <TextInput onChangeText={text => this.setName(text)} />
          <Text>A propos de toi</Text>
          <TextInput
            placeholder="Décris toi briévement"
            multiline={true}
            onChangeText={text => this.setDesc(text)}
          />
          <InstModalCheck />
          <StyleModalCheck />
          <Button
            title="C'est partit!"
            onPress={() => {
              const uID = auth().currentUser.uid;
              firstUpdate(
                this.state.name,
                this.state.desc,
                this.state.inst,
                this.state.style,
                uID,
              );
              this.setModalVisible(!modalVisible);
            }}
          />
        </Modal>
      );
    } else {
      return <View></View>;
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
  };
  getInst = async () => {
    const listDoc = await firestore().collection('list').doc('inst').get();
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
              onSelectionsChange={this.onSelectionsChange}
            />
          </View>
        </Modal>

        {this.state.selectedItems.map((inst, index) => (
          <Pressable
            key={index}
            onPress={() => {
              this.state.selectedItems.splice(index, 1);
              this.setState(this.state.selectedItems);
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
  };
  getStyle = async () => {
    const listDoc = await firestore().collection('list').doc('style').get();
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
              this.setState(this.state.selectedItems);
            }}>
            <Text>{style.label}</Text>
          </Pressable>
        ))}
      </View>
    );
  }
}
