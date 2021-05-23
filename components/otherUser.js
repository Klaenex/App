import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import styles from '../styles/style';
import fonts from '../styles/font';
export default class OtherUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pseudo: '',
      desc: '',
      inst: [],
      style: [],
    };
    this.getText();
    this.userData = firestore()
      .collection('users')
      .doc(this.props.getUserID)
      .onSnapshot(doc => {
        this.setState({
          pseudo: doc.data().pseudo,
          desc: doc.data().desc,
          inst: doc.data().inst,
          style: doc.data().style,
        });
      });
  }
  getText = async () => {
    const user = firestore()
      .collection('users')
      .doc(this.props.getUserID)
      .get();
  };
  render() {
    console.log(this.getText());
    console.log(this.props);
    let listInst = this.state.inst;
    let listStyle = this.state.style;
    return (
      <ScrollView>
        <Image
          style={styles.profilePhoto}
          source={require('../assets/photo.jpg')}
        />
        <Text style={fonts.textPseudo}>{this.state.pseudo}</Text>
        <Text style={fonts.textDesc}>{this.state.desc}</Text>
        <View style={styles.separator} />
        <Text style={fonts.textTitle}>Instrument</Text>
        <View style={{flexDirection:'row', flexWrap:'wrap'}}>
        {listInst.map((inst, index) => (
          <View key={index} style={styles.tag}>
            <Text style={fonts.textTag}>{inst.value}</Text>
          </View>
        ))}
        </View>
        <View style={styles.separator} />
        <Text style={fonts.textTitle}>Style</Text>
        <View style={{flexDirection:'row', flexWrap:'wrap'}}>
        {listStyle.map((style, index) => (
         
            
          
          <View key={index} style={styles.tag}>
            <Text style={fonts.textTag}>{style.value}</Text>
          </View>
        ))}
        </View>
      </ScrollView>
    );
  }
}
