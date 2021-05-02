import React from 'react'
import {Text, TextInput, Pressable, View, Button} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';

export default function ImagePicker(){
    const [response, setResponse] = React.useState(null);

  return (
    <View>
      <Pressable>
        <Text>Ajoute une photo de profil</Text>
        <Button
          title="Ajoute une photo"
          onPress={() =>
            launchImageLibrary(
              {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 400,
                maxWidth: 400,
              },
              response => {
                setResponse(response);
              },
            )
          }
        />
      </Pressable>
    </View>
  );
}