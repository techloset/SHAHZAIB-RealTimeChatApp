import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  TextInput,
  Image,
} from 'react-native';
import {Bubble, GiftedChat, InputToolbar, Send} from 'react-native-gifted-chat';
import {launchCamera, ImagePickerResponse} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useSelector} from 'react-redux';
import {ChatScreenProps, LoginScreenProps} from '../../../types/Types';
import {RootState} from '../../store/store';

import imgback from '../../assets/Image/Vector190.png';
import pinimg from '../../assets/Image/Group.png';
import filesimg from '../../assets/Image/group(2).png';
import cameraimg from '../../assets/Image/camera01.png';

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
            const createdAt =
              data.createdAt && data.createdAt.toDate
                ? data.createdAt.toDate()
                : new Date();
            return {
              _id: doc.id,
              text: data.text || '',
              createdAt,
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
        createAt: new Date().toLocaleTimeString(),
      });

    setImageUrl('');
  };

  const generateChatId = (userId1: string, userId2: string) => {
    const sortedIds = [userId1, userId2].sort();
    return sortedIds.join('_');
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.mnav}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.back}>
            <Image source={imgback} style={styles.imageback} />
          </View>
        </TouchableOpacity>
        {user?.photoUrl && (
          <Image source={{uri: user.photoUrl}} style={styles.pro} />
        )}
        <View>
          <Text style={styles.name}>{user?.displayName}</Text>
          <Text style={styles.status}>{user?.status}</Text>
        </View>
      </View>

      <GiftedChat
        renderActions={props => (
          <TouchableOpacity>
            <Image source={pinimg} style={styles.pin} />
          </TouchableOpacity>
        )}
        renderSend={props => (
          <View
            style={{flexDirection: 'row', alignItems: 'center', height: 50}}>
            <TouchableOpacity>
              <Image source={filesimg} style={styles.file} />
            </TouchableOpacity>

            <View style={{flex: 1}}>
              <TextInput
                style={{flex: 1}}
                placeholder="write your message"
                multiline={true}
              />
            </View>

            <TouchableOpacity>
              <Image source={cameraimg} style={styles.camera} />
            </TouchableOpacity>

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
        renderInputToolbar={props => (
          <InputToolbar
            {...props}
            containerStyle={{
              backgroundColor: 'rgba(243, 246, 246, 1)',
              borderRadius: 12,
            }}
          />
        )}
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
    height: 44,
    width: 44,
    marginTop: 10,
    marginLeft: 10,
    borderRadius: 31,
  },
  name: {
    height: 20,
    marginTop: 13,
    marginLeft: 7,
    fontFamily: 'Poppins-Regular',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    color: '#000E08',
  },
  status: {
    height: 22,
    marginLeft: 7,
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 15,
    color: '#000E08',
  },
  pin: {
    height: 25,
    width: 25,
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 10,
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
