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
// function ImagePicker() {
//   const [response, setResponse] = React.useState(null);
//   return (
//     <View>
//       <Pressable>
//         <Text>Ajoute une photo de profil</Text>
//          <Image source={{require(response)}} />
//         <Button
//           title="Ajoute une photo"
//           onPress={() => {
//             launchImageLibrary(
//               {
//                 mediaType: 'photo',
//                 includeBase64: false,
//                 maxHeight: 400,
//                 maxWidth: 400,
//               },
//               response => {
//                 setResponse(response.uri);
//               },
//             );
//             console.log(response);
//           }}
//         />
//       </Pressable>
//     </View>
//   );
// }

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
  childStateCallback = inst => {
    console.log("childStateCallback::::");
    console.log(inst);
    this.setState({inst});
  };
  render() {
    const {modalVisible} = this.state;
    const currentUser = auth().currentUser;
    if (currentUser.displayName == null) {
      return (
        <Modal
          style={styles.modal}
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
          {/* <ImagePicker /> */}

          <Text>Nom d'utilisateur</Text>
          <TextInput onChangeText={text => this.setName(text)} />
          <Text>A propos de toi</Text>
          <TextInput
            placeholder="Décris toi briévement"
            multiline={true}
            onChangeText={text => this.setDesc(text)}
          />
          <InstModalCheck
             toCallBack={inst => {
               console.log("test");
               console.log(inst);
               this.childStateCallback(inst)}
             }
          />
          <StyleModalCheck />
          <Button
            title="C'est partit!"
            onPress={() => {
              console.log(this.state.inst)
              // const uID = auth().currentUser.uid;
              // firstUpdate(
              //   this.state.name,
              //   this.state.desc,
              //   this.state.inst,
              //   this.state.style,
              //   uID,
              // );
              //this.setModalVisible(!modalVisible);
            }}
          />
        </Modal>
      );
    } else {
      return null;
    }
  }
}

export class InstModalCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      selectedInst: [],
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

  onSelectionsChange = selectedInst => {
    // selecteditem is array of { label, value }
    // console.log("onSelectionsChange::::");
    // console.log(selectedInst);
    this.setState({selectedInst});
    this.props.toCallBack(selectedInst);

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
              console.log(this.state.selectedInst);
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
                this.setState(this.props.selectedInst);
                
              }}>
              <Text style={fonts.textTag}>{inst.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    );
  }
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
    // selecteditem is array of { label, value }
    this.setState({selectedStyle});
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
              }}>
              <Text style={fonts.textTag}>{style.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    );
  }
}



