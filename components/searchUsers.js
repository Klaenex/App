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
    this.subscriber = firestore()
      .collection('users')
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
  
   console.log(this.props.params)
    const {modalVisible} = this.state;
    let userArray = this.state.users;
    let search = this.state.search;
    let filterInst = this.state.inst;
    let filterStyle = this.state.inst;
    
    function userFiltered(userArray,props) {
      if (filterInst[0] == null || filterInst[0] == null) {
        let user = userArray
          .filter(user => user.pseudo.includes(search))
          .map((filteredUser, index) => (
            <View key={index}>
              <Pressable
                onPress={()=>{
                  props.userView.setParams({userID:filteredUser.id})
                  props.userView.navigate('UserView',{userID:filteredUser.id})}}>
                
                <Text style={fonts.textDesc}>{filteredUser.pseudo}</Text>
                <View style={styles.separatorSearch}></View>
              </Pressable>
            </View>
          ));
        return user;
      } else {
        //   let instFilter=[]
        //   let userFilter=[]
        //   filterInst.forEach(el => {
        //     instFilter.push(el['value'])
        //   });
        //   console.log(userArray)
      }
    }
    //userFiltered(userArray)
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.setSearch(text)}
          />
          <View style={styles.separatorSearch}></View>
          {userFiltered(userArray,this.props)}
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
                  onPress={() => {}}>
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
