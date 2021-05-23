import React from 'react';
import {Text, TextInput, Pressable, View, Button, Image} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import styles from '../styles/style';
import fonts from '../styles/font';
import font from '../styles/font';
import style from '../styles/card';
import btn from '../styles/btn';
import firestore from '@react-native-firebase/firestore';
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

export default function ImagePicker() {
  const [response, setResponse] = React.useState(null);
  const UID = auth().currentUser.uid;
  const reference = storage().ref('users/' + UID + '/avatar');
  const url = async () => {
    await storage()
      .ref('users/' + UID + '/avatar')
      .getDownloadURL();
     
  };
  

  const upload = async img => {
    // path to existing file on filesystem
    const pathToFile = img;
    // uploads file
    await reference.putFile(pathToFile);
  };

  // console.log(img)

  let photo = '../assets/photo.jpg';
  let avatar = '';
  function image() {
    if(response != null){
      console.log('response')
      for (const key in response) {
        if (Object.hasOwnProperty.call(response, key)) {
          const el = response[key];
          
          const image = el.uri;
          console.log(image)
          upload(image);
  
          return <Image style={styles.profilePhoto} source={{uri:image}} />;
        }
      }
    }
    else{
       if (url != null) {
         console.log('url')
         return <Image style={styles.profilePhoto} source={{uri: url}} />;
       } else {
        console.log('notset')
        return <Image style={styles.profilePhoto} source={require(`${photo}`)} />;
      }
    }
    
  }

 function setImage(){
      
    
  }
  
  
  // const updateAvatar = async (avatar, uid) => {
  //   await firestore()
  //     .collection('users')
  //     .doc(uid)
  //     .update({
  //       avatar: avatar,
  //     })
  //     .then(() => {});
  // };

  return (
    <View>
      
      {image()}
      
      

      <Pressable
        onPress={() => {
          launchImageLibrary(
            {
              mediaType: 'photo',
              includeBase64: true,
              maxHeight: 400,
              maxWidth: 400,
            },
            response => {
              setResponse({img: response});
            },
          );
        }}>
        <Text>Ajoute une photo de profil</Text>
      </Pressable>
    </View>
  );
}
