import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {Bubble, GiftedChat, InputToolbar, Send} from 'react-native-gifted-chat';
import {launchCamera, ImagePickerResponse} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import {useSelector} from 'react-redux';
import {ChatScreenProps, LoginScreenProps} from '../../../types/Types';
import {RootState} from '../../store/store';
import {Image} from 'react-native';
import imgback from '../../assets/Image/Vector190.png';
import pinimg from '../../assets/Image/Group.png';
import filesimg from '../../assets/Image/group(2).png';
import cameraimg from '../../assets/Image/camera01.png';
import ImageCropPicker from 'react-native-image-crop-picker';
import {TextInput} from 'react-native-gesture-handler';

interface IMessage {
  senderId: string | undefined;
  receiverId: string | undefined;
  _id: string;
  text: string;
  createdAt: Date;
  user: {
    _id: number;
    name: string;
    avatar: string;
  };
  image?: string;
}

const randomId = Math.random().toString(36).substring(1, 15);

const Chat: React.FC<ChatScreenProps & LoginScreenProps> = ({
  route,
  navigation,
}) => {
  const [imageData, setImageData] = useState<ImagePickerResponse | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const {userId} = route.params;
  const user = useSelector((state: RootState) =>
    state.users.users.find(user => user.uid === userId),
  );

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!currentUser || !user) return;

    const chatId = generateChatId(currentUser.uid, user.uid);

    const unsubscribe = firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('createdAt', 'asc')
      .onSnapshot(snapshot => {
        if (snapshot) {
          const allMessages: IMessage[] = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
              _id: doc.id,
              text: data.text || '',
              createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
              user: {
                _id: data.user._id,
                name: data.user.name,
                avatar: data.user.avatar,
              },
              image: imageUrl,
              senderId: data.senderId,
              receiverId: data.receiverId,
            };
          });
          setMessages(allMessages.reverse());
        }
      });

    return () => unsubscribe();
  }, [currentUser, user]);

  const onSend = async (newMessages: IMessage[]) => {
    const message = newMessages[0];
    const chatId = generateChatId(currentUser.uid, user?.uid || '');

    const myMsg: IMessage = {
      ...message,
      senderId: currentUser.uid,
      receiverId: user?.uid,
      image: imageUrl,
    };

    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, [myMsg]),
    );
    firestore().collection('chats').doc(randomId).set({
      senderId: auth().currentUser?.uid,
      receiverId: user?.uid,
      chatRoomId: randomId,
    });
    firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .add({
        ...myMsg,
        // createdAt: firestore.FieldValue.serverTimestamp(),
        createAt: new Date().toLocaleTimeString(),
      });

    setImageUrl('');
    setImageData(null);
  };

  const generateChatId = (userId1: string, userId2: string) => {
    const sortedIds = [userId1, userId2].sort();
    return sortedIds.join('_');
  };

  // const imagePicker = () => {
  //   ImagePicker.openPicker({
  //     width: 300,
  //     height: 400,
  //     cropping: true,
  //   }).then((image: {path: string}) => {
  //     console.log(image);
  //   });
  // };

  // const openCamera = async () =>{
  //   const result = await launchCamera({mediaType: 'photo'});
  //   console.log( result);
  //   if (result.didCancel && result.didCancel == true){
  //   } else {
  //     setImageData(result);
  //     upLaodImage(result);
  //   }
  // };

  // const upLaodImage = async imageDataa =>{
  //   const reference = storage().ref(imageDataa.assets[0].fileName);
  //   const pathToFile = imageData.assets[0].url;
  //   await reference.putFile(pathToFile);
  //   const url = await storage()
  //   .ref(imageData.assets[0].fileName)
  //   .getDownLoadURL();
  //   console.log('url',url);
  //   setImageUrl(url);
  // };

  // ImageCropPicker.openCamera({
  //   width: 300,
  //   height: 400,
  //   cropping: true,
  // }).then(image => {
  //   console.log(image);
  // });
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.mnav}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <View style={styles.back}>
            <Image source={imgback} style={styles.imageback} />
          </View>
        </TouchableOpacity>
        {user?.photoUrl && (
          <Image source={{uri: user.photoUrl}} style={styles.pro} />
        )}
        <Text style={styles.name}>{user?.displayName}</Text>
      </View>
      <GiftedChat
        renderSend={props => (
          <View
            style={{flexDirection: 'row', alignItems: 'center', height: 50}}>
            {/* First image: pinimg */}
            <TouchableOpacity
              onPress={() => {
                ToastAndroid.showWithGravityAndOffset(
                  'Attach pin !',
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM,
                  25,
                  50,
                );
              }}>
              <Image source={pinimg} style={styles.pin} />
            </TouchableOpacity>

            {/* Second image: filesimg */}
            <TouchableOpacity
              onPress={() => {
                ToastAndroid.showWithGravityAndOffset(
                  'Attach files !',
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM,
                  25,
                  50,
                );
              }}>
              <Image source={filesimg} style={styles.file} />
            </TouchableOpacity>

            <View style={{flex: 1}}>
              {/* Text input */}
              <TextInput
                style={{flex: 1}}
                placeholder="Type your message..."
                multiline={true}
              />
            </View>

            {/* Third image: cameraimg */}
            <TouchableOpacity
              onPress={() => {
                ToastAndroid.showWithGravityAndOffset(
                  'Attach camera !',
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM,
                  25,
                  50,
                );
              }}>
              <Image source={cameraimg} style={styles.camera} />
            </TouchableOpacity>

            {/* Send button */}
            <Send
              {...props}
              containerStyle={{
                justifyContent: 'center',
                height: 40,
                width: 70,
                backgroundColor: 'gray',
                borderRadius: 20,
                alignItems: 'center',
                marginRight: 10,
                marginLeft: 10,
              }}
            />
          </View>
        )}
        messages={messages}
        onSend={onSend}
        user={{_id: currentUser?.uid ?? -1}}
        renderInputToolbar={props => {
          return (
            <InputToolbar
              {...props}
              containerStyle={{
                backgroundColor: 'rgba(243, 246, 246, 1)',
                borderRadius: 25,
                width: 400,
              }}
            />
          );
        }}
        renderBubble={props => (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {backgroundColor: 'rgba(61, 74, 122, 1)'},
            }}
          />
        )}
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  mnav: {
    flexDirection: 'row',
    backgroundColor: 'rgba(252, 252, 252, 1)',
    height: 65,
  },
  back: {
    height: 25,
    width: 25,
    marginTop: 20,
    marginLeft: 24,
  },
  imageback: {
    height: 15,
    width: 20,
  },
  pro: {
    height: 55,
    width: 55,
    marginTop: 2,
    marginLeft: 10,
    borderRadius: 27.5,
  },
  name: {
    fontWeight: 'bold',
    color: 'black',
    marginTop: 4,
    marginLeft: 10,
    fontSize: 17,
  },
  pin: {
    height: 25,
    width: 25,
    alignItems: 'center',
    // marginLeft: 24,
  },
  file: {
    height: 25,
    width: 25,
    alignItems: 'center',
    marginLeft: 24,
  },
  camera: {
    height: 25,
    width: 25,
    marginLeft: 24,
    marginRight: 24,
    alignItems: 'center',
  },
});