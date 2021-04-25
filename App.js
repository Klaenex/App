import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import TabsBottom from './components/tabsBottom';
import style from './style';
export default class App extends React.Component {
  render() {
    return (
      <View style={style.container}>
        <TabsBottom />
        <StatusBar hidden={true}/>
      </View>
    );
  }
}
