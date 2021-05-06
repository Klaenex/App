import React from 'react';
import {View, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';



export default class SearchUsers extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      users: [],
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
        console.log(this.state.users)
      });
  }

  render() {
    return (
      <View>
        
        {this.state.users.map((user, index) => (
          <View key={index}>
            <Text>{user.pseudo}</Text>
          </View>
        ))}
        
      </View>
    );
  }
}
