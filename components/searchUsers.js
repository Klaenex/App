import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Modal,
  Image,
  Button,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import styles from '../styles/style';
import fonts from '../styles/font';
import ModalSearch from './modalSearch';
import style from '../styles/style';

export default class SearchUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      search: '',
      inst: [],
      style: [],
      modalVisible: false,
    };
    let uid=auth().currentUser.uid
    this.subscriber = firestore()
      .collection('users')
      .where('id', '!=', uid )
      .onSnapshot(docs => {
        let users = [];
        docs.forEach(doc => {
          users.push(doc.data());
        });
        this.setState({users});
      });
  }
  setSearch(search) {
    this.setState({search});
  }
  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };
  childStateCallbackInst = inst => {
    this.setState({inst});
  };
  childStateCallbackStyle = style => {
    this.setState({style});
  };

  render() {
    // const {navigate}=this.props.navigation

    const {modalVisible} = this.state;
    let userArray = this.state.users;
    let search = this.state.search;
    let filterInst = this.state.inst;
    let filterStyle = this.state.style;

    

    function userFiltered(userArray, props) {
      if (filterInst[0] || filterStyle[0]) {
        

        let users = [];
        userArray.map((filteredUser, index) => {
          let tableUser = Object.keys(filteredUser.inst).map(function (cle) {
            return [Number(cle), filteredUser.inst[cle]];
          });
          let tableInst = Object.keys(filterInst).map(function (cle) {
            return [Number(cle), filterInst[cle]];
          });
          let tableStyle = Object.keys(filterStyle).map(function (cle) {
            return [Number(cle), filterStyle[cle]];
          });

          for (let j = 0; j < tableInst.length; j++) {
            for (let i = 0; i < tableUser.length; i++) {
              if (tableInst[j][1].label == tableUser[i][1].label) {
                if (users.some(data => data.id==filteredUser.id) == false) {
                  users.push({
                    id: filteredUser.id,
                    pseudo: filteredUser.pseudo,
                  });
                }
              }
            }
          }

          for (let l = 0; l < tableStyle.length; l++) {
            for (let k = 0; k < tableUser.length; k++) {
              if (tableStyle[l][1].label == tableUser[k][1].label) {
                if (users.some(data => data.id==filteredUser.id) == false) {
                  users.push({
                    id: filteredUser.id,
                    pseudo: filteredUser.pseudo,
                  });

                }
              }
            }
          }
        });

        let user = users.map((filteredUser, index) => (
          <View key={index}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Pressable
                onPress={() => {
                  props.getParams.setParams({
                    userID: filteredUser.id,
                    name: filteredUser.pseudo,
                  });
                  props.getParams.navigate('UserView', {
                    userID: filteredUser.id,
                    name: filteredUser.pseudo,
                  });
                }}>
                <Text style={fonts.textDesc}>{filteredUser.pseudo}</Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  props.getParams.setParams({
                    userID: filteredUser.id,
                    name: filteredUser.pseudo,
                  });
                  props.getParams.navigate('Message', {
                    userID: filteredUser.id,
                    name: filteredUser.pseudo,
                  });
                }}>
                <Image source={require('../assets/message.png')} />
              </Pressable>
            </View>
            <View style={styles.separatorSearch} />
          </View>
        ));
        return user;
      } else {
        let user = userArray
          .filter(user => user.pseudo.includes(search))
          .map((filteredUser, index) => (
            <View key={index}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Pressable
                  onPress={() => {
                    props.getParams.setParams({
                      userID: filteredUser.id,
                      name: filteredUser.pseudo,
                    });
                    props.getParams.navigate('UserView', {
                      userID: filteredUser.id,
                      name: filteredUser.pseudo,
                    });
                  }}>
                  <Text style={fonts.textDesc}>{filteredUser.pseudo}</Text>
                </Pressable>

                <Pressable
                  onPress={() => {
                    props.getParams.setParams({
                      userID: filteredUser.id,
                      name: filteredUser.pseudo,
                    });
                    props.getParams.navigate('Message', {
                      userID: filteredUser.id,
                      name: filteredUser.pseudo,
                    });
                  }}>
                  <Image source={require('../assets/message.png')} />
                </Pressable>
              </View>
              <View style={styles.separatorSearch} />
            </View>
          ));
        return user;
      }
    }

    
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.setSearch(text)}
          />
          <View style={styles.separatorSearch}></View>
          {userFiltered(userArray, this.props)}
        </ScrollView>
        <Pressable
          style={styles.fixedButton}
          onPress={() => {
            this.setModalVisible(!modalVisible);
          }}>
          <Text style={fonts.textSubmitButton}>Filtrer</Text>
        </Pressable>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalCenter}>
            <View style={styles.modalView}>
              <Pressable
                style={{alignSelf: 'flex-end', padding: 8}}
                onPress={() => this.setModalVisible(!modalVisible)}>
                <Image source={require('../assets/cross.png')} />
              </Pressable>
              <ModalSearch
                getChildListInst={inst => {
                  this.childStateCallbackInst(inst);
                }}
                getChildListStyle={styleList => {
                  this.childStateCallbackStyle(styleList);
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'center',
                  marginTop: 16,
                }}>
                <Pressable
                  style={[styles.submitButton, {alignSelf: 'center'}]}
                  onPress={() => {this.setModalVisible(!modalVisible)}}>
                  <Text style={fonts.textSubmitButton}>Filtrer</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
