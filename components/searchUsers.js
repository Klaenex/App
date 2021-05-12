import React from 'react';
import {View, Text, TextInput, ScrollView, Pressable} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import styles from '../styles/style';
import fonts from '../styles/font';
export default class SearchUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      search: '',
    };
    this.subscriber = firestore()
      .collection('users')
      .onSnapshot(docs => {
        let users = [];
        docs.forEach(doc => {
          users.push(doc.data());
        });
        this.setState({users});
        // console.log(users);
        console.log(typeof this.state.users);
        console.log(this.state.users);
      });
  }
  setSearch(search) {
    this.setState({search});
  }

  //.filter(name=>name.includes(this.state.search))
  render() {
    let userArray = this.state.users;
    let search = this.state.search;

    return (
      <View>
        <Pressable style={styles.fixedButton}>
          <Text style={fonts.textSubmitButton}>Filtrer</Text>
        </Pressable>
        <ScrollView>
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.setSearch(text)}
          />
          <View style={styles.separatorSearch}></View>
          {userArray
            .filter(user => user.pseudo.includes(search))
            .map((filteredUser, index) => (
              <View key={index}>
                <Pressable
                onPress={()=>{console.log(filteredUser.pseudo)}}>
                  <Text style={fonts.textDesc}>{filteredUser.pseudo}</Text>
                  <View style={styles.separatorSearch}></View>
                </Pressable>
              </View>
            ))}
        </ScrollView>
      </View>
    );
  }
}
