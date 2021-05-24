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
  const [urlImg,setUrlImg]=React.useState(null)
  const UID = auth().currentUser.uid;
  const reference = storage().ref('users/' + UID + '/avatar');
    // console.log(UID)
    // console.log(urlImg)
  const onFileChange = async (e) => {

    setUrlImg( await storage().ref('users/' + UID+'/avatar').getDownloadURL())

  };
  
 

  const upload = async img => {
    const pathToFile = img;
    await reference.putFile(pathToFile);
  };

   //console.log(setUrlImg)

  let avatar = '';

  function image(response,image) {
    onFileChange()
    
    if (response != null) {
      //console.log('response:::');
      let getUri = response.uri;
      //console.log(getUri);
      upload(getUri);
      return (
        <Image
          style={{width: ' 100%', height: 400, borderRadius: 15}}
          source={{uri: getUri}}
        />
      );
    }
    if (image != null) {
      console.log('setUrl::::::')
      console.log(urlImg)
      return (
        <Image
          style={{width: ' 100%', height: 400, borderRadius: 15}}
          source={{uri: urlImg}}
        />
      );
    } else {
      console.log('noPHOTO:::');
      let photo = '../assets/photo.jpg';
      return <Image source={require(`${photo}`)} />;
    }
  }

  return (
    <View>
      {image(response,setUrlImg)}

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
              setResponse(response);
            },
          );
        }}>
        <Text>Ajoute une photo de profil</Text>
      </Pressable>
    </View>
  );
}
