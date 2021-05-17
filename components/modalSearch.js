import React from 'react';
import {Modal, Pressable, Text, View, Button, Image} from 'react-native';
import styles from '../styles/style';
import fonts from '../styles/font';
import SelectMultiple from 'react-native-select-multiple';
import firestore from '@react-native-firebase/firestore';
import style from '../styles/style';
import card from '../styles/card';

export default class ModalSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inst: [],
      style: [],
      selectedInst: [],
      selectedStyle: [],
      modalVisibleInst: false,
      modalVisibleStyle: false,
    };
    this.getList();

    this.instList = firestore()
      .collection('list')
      .doc('inst')
      .onSnapshot(doc => {
        this.setState({inst: doc.data().inst});
      });
    this.styleList = firestore()
      .collection('list')
      .doc('style')
      .onSnapshot(doc => {
        this.setState({style: doc.data().style});
      });
  }
  setModalVisibleInst = visible => {
    this.setState({modalVisibleInst: visible});
  };
  setModalVisibleStyle = visible => {
    this.setState({modalVisibleStyle: visible});
  };
  getList = async () => {
    const inst = await firestore().collection('list').doc('inst').get();
    const Style = await firestore().collection('list').doc('style').get();
  };

  onSelectionsChangeInst = selectedInst => {
    this.setState({selectedInst});
    this.props.getChildListInst(selectedInst);
  };
  onSelectionsChangeStyle = selectedStyle => {
    this.setState({selectedStyle});
    this.props.getChildListStyle(selectedStyle);
  };
  render() {
    const listInst = this.state.inst;

    const listStyle = this.state.style;
    const {modalVisibleInst} = this.state;
    const {modalVisibleStyle} = this.state;
    return (
      <View>
        {/* <Text style={[fonts.textTitle,{alignSelf:'flex-start'}]}>Instrument</Text> */}
        <View>
          <Pressable
            style={styles.button}
            onPress={() => this.setModalVisibleInst(!modalVisibleInst)}>
            <Text style={fonts.textButton}>Par instrument</Text>
            <Image source={require('../assets/chevron.png')} />
          </Pressable>
          <Modal
            animationType="fade"
            transparent={false}
            visible={modalVisibleInst}
            onRequestClose={() => {
              this.setModalVisibleInst(!modalVisibleInst);
            }}>
            <Button
              title="close"
              onPress={() => {
                this.setModalVisibleInst(!modalVisibleInst);
              }}
            />
            <View>
              <SelectMultiple
                items={listInst}
                selectedItems={this.state.selectedInst}
                onSelectionsChange={this.onSelectionsChangeInst}
              />
            </View>
          </Modal>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {this.state.selectedInst.map((style, index) => (
              <Pressable
                key={index}
                style={styles.tag}
                onPress={() => {
                  this.state.selectedInst.splice(index, 1);
                  this.setState(this.state.selectedInst);
                }}>
                <Text style={fonts.textTag}>{style.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* <Text style={[fonts.textTitle,{alignSelf:'flex-start'}]}>Style</Text> */}
<View >
        <Pressable
          style={[styles.button, {alignSelf: 'flex-start'}]}
          onPress={() => this.setModalVisibleStyle(!modalVisibleStyle)}>
          <Text style={fonts.textButton}>Par styles</Text>
          <Image source={require('../assets/chevron.png')} />
        </Pressable>
        <Modal
          animationType="fade"
          transparent={false}
          visible={modalVisibleStyle}
          onRequestClose={() => {
            this.setModalVisibleStyle(!modalVisibleStyle);
          }}>
          <Button
            title="close"
            onPress={() => {
              this.setModalVisibleStyle(!modalVisibleStyle);
            }}
          />
          <View>
            <SelectMultiple
              items={listStyle}
              selectedItems={this.state.selectedStyle}
              onSelectionsChange={this.onSelectionsChangeStyle}
            />
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
      </View>

    );
  }
}
