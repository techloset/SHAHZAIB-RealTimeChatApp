// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   FlatList,
// } from 'react-native';
// import useMessage from './useMessage';
// import {LoginScreenProps} from '../../../types/Types';
// import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';
// import {Swipeable} from 'react-native-gesture-handler';
// import alert from '../../assets/Image/notification(2).png';
// import delte from '../../assets/Image/trash.png';

// interface User {
//   uid: string;
//   name: string;
//   photoURL: string;
// }

// // interface Props {
// //   item: User;
// //   onPress: (uid: string) => void;
// // }

// export default function Message({navigation}: LoginScreenProps) {
//   const {userImageURL, handleLogout}: any = useMessage();

//   // const [chatRooms, setChatRooms] = useState([]);
//   // useEffect(() => {
//   //   const chatsData = async () => {
//   //     const chatsDta = await firestore()
//   //       .collection('chats')
//   //       .where('senderId', '==', auth().currentUser?.uid)
//   //       .get();

//   //     const receiverIds = new Set();
//   //     chatsDta.docs.forEach(doc => {
//   //       const data = doc.data();
//   //       receiverIds.add(data.receiverId);
//   //     });

//   //     setChatRooms(Array.from(receiverIds) as any);
//   //   };

//   //   chatsData();
//   // }, []);
//   // console.log('chatRooms', chatRooms);
//   // console.log('chatRooms', chatRooms);
//   // console.log('chatRooms => ', chatRooms);

//   const [chatRooms, setChatRooms] = useState<User[]>([]);

//   useEffect(() => {
//     const chatsData = async () => {
//       const chatsDataQuery = await firestore()
//         .collection('chats')
//         .where('senderId', '==', auth().currentUser?.uid)
//         .get();

//       const receiverIds = new Set<string>();
//       const promises: Promise<any>[] = [];

//       chatsDataQuery.docs.forEach(doc => {
//         const data = doc.data();
//         receiverIds.add(data.receiverId);

//         const promise = firestore()
//           .collection('users')
//           .doc(data.receiverId)
//           .get();
//         promises.push(promise);
//       });

//       const userDataSnapshots = await Promise.all(promises);

//       const users: User[] = [];
//       userDataSnapshots.forEach(snapshot => {
//         const userData = snapshot.data();
//         if (userData) {
//           const user: User = {
//             uid: snapshot.id,
//             name: userData.displayName || '',
//             photoURL: userData.photoUrl || '',
//           };
//           users.push(user);
//         }
//       });

//       setChatRooms(users);
//     };

//     chatsData();
//   }, []);

//   const handleUserPress = (uid: string) => {
//     navigation.navigate('chat', {userId: uid} as any);
//   };

//   const handleDeleteUser = async (uid: string) => {
//     try {
//       await firestore().collection('chats').doc(uid).delete();
//       setChatRooms(prevChatRooms =>
//         prevChatRooms.filter(user => user.uid !== uid),
//       );
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     }
//   };

//   const renderRightActions = (uid: string) => (
//     <View style={styles.leftActions}>
//       <TouchableOpacity onPress={() => console.log('Action 1')}>
//         <View
//           style={{
//             backgroundColor: 'black',
//             width: 36,
//             height: 36,
//             borderRadius: 50,
//             justifyContent: 'center',
//             alignItems: 'center',
//             marginRight: 20,
//           }}>
//           <Image
//             source={alert}
//             style={{
//               width: 22,
//               height: 22,
//             }}
//           />
//         </View>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => handleDeleteUser(uid)}>
//         <View
//           style={{
//             backgroundColor: 'red',
//             width: 36,
//             height: 36,
//             borderRadius: 50,
//             justifyContent: 'center',
//             alignItems: 'center',
//             marginRight: 20,
//           }}>
//           <Image
//             source={delte}
//             style={{
//               width: 22,
//               height: 22,
//             }}
//           />
//         </View>
//       </TouchableOpacity>
//     </View>
//   );
//   const renderItem = ({item}: {item: User}) => (
//     <Swipeable
//       renderRightActions={renderRightActions}
//       onSwipeableLeftOpen={() => console.log('Left action activated')}>
//       <TouchableOpacity onPress={() => handleUserPress(item.uid)}>
//         <View style={styles.userContainer}>
//           <Image source={{uri: item.photoURL}} style={styles.profileImage} />
//           <Text style={styles.displayName}>{item.name}</Text>
//         </View>
//       </TouchableOpacity>
//     </Swipeable>
//   );

//   return (
//     <View style={styles.main}>
//       <View style={styles.top}>
//         <TouchableOpacity
//           onPress={() => {
//             navigation.navigate('search');
//           }}>
//           <View style={styles.img}>
//             <Image source={require('../../assets/Image/Search.png')} />
//           </View>
//         </TouchableOpacity>
//         <Text style={styles.txt}>Home</Text>

//         <TouchableOpacity onPress={handleLogout}>
//           <View style={styles.img2}>
//             {userImageURL && (
//               <Image source={{uri: userImageURL}} style={styles.profileImage} />
//             )}
//           </View>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.chat}>
//         <View>
//           <FlatList
//             data={chatRooms}
//             renderItem={renderItem}
//             keyExtractor={(item, index) => item.uid + index.toString()}
//           />
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   main: {
//     backgroundColor: '#050d30',
//   },
//   img: {
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     height: 44,
//     width: 44,
//     borderRadius: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: 20,
//   },
//   txt: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginLeft: 20,
//   },
//   img2: {
//     borderRadius: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 20,
//     height: 50,
//     width: 50,
//   },
//   top: {
//     marginTop: 30,
//     marginBottom: 30,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   chat: {
//     backgroundColor: 'white',
//     height: 706,
//     marginTop: 10,
//     borderTopLeftRadius: 50,
//     borderTopRightRadius: 50,
//   },
//   userItem: {
//     marginTop: 50,
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#CCCCCC',
//   },
//   userContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     marginLeft: 20,
//     marginTop: 20,
//   },
//   profileImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 10,
//   },
//   displayName: {
//     fontSize: 15,
//     fontWeight: 'bold',
//     marginLeft: 3,
//     color: '#050d30',
//   },
//   leftActions: {
//     flexDirection: 'row',
//     backgroundColor: 'gray',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 20,
//   },
// });
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import useMessage from './useMessage';
import {LoginScreenProps} from '../../../types/Types';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Swipeable} from 'react-native-gesture-handler';
import alert from '../../assets/Image/notification(2).png';
import delte from '../../assets/Image/trash.png';

interface User {
  uid: string;
  name: string;
  photoURL: string;
}

export default function Message({navigation}: LoginScreenProps) {
  const {userImageURL, handleLogout}: any = useMessage();

  const [chatRooms, setChatRooms] = useState<User[]>([]);

  useEffect(() => {
    const chatsData = async () => {
      const chatsDataQuery = await firestore()
        .collection('chats')
        .where('senderId', '==', auth().currentUser?.uid)
        .get();

      const receiverIds = new Set<string>();
      const promises: Promise<any>[] = [];

      chatsDataQuery.docs.forEach(doc => {
        const data = doc.data();
        receiverIds.add(data.receiverId);

        const promise = firestore()
          .collection('users')
          .doc(data.receiverId)
          .get();
        promises.push(promise);
      });

      const userDataSnapshots = await Promise.all(promises);

      const users: User[] = [];
      userDataSnapshots.forEach(snapshot => {
        const userData = snapshot.data();
        if (userData) {
          const user: User = {
            uid: snapshot.id,
            name: userData.displayName || '',
            photoURL: userData.photoUrl || '',
          };
          users.push(user);
        }
      });

      setChatRooms(users);
    };

    chatsData();
  }, []);

  const handleUserPress = (uid: string) => {
    navigation.navigate('chat', {userId: uid} as any);
  };

  const handleDeleteUser = async (uid: string) => {
    try {
      await firestore().collection('chats').doc(uid).delete();
      setChatRooms(prevChatRooms =>
        prevChatRooms.filter(user => user.uid !== uid),
      );
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const renderRightActions = (uid: string) => (
    <View style={styles.leftActions}>
      <TouchableOpacity onPress={() => console.log('Action 1')}>
        <View
          style={{
            backgroundColor: 'black',
            width: 36,
            height: 36,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 20,
          }}>
          <Image
            source={alert}
            style={{
              width: 22,
              height: 22,
            }}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteUser(uid)}>
        <View
          style={{
            backgroundColor: 'red',
            width: 36,
            height: 36,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 20,
          }}>
          <Image
            source={delte}
            style={{
              width: 22,
              height: 22,
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );

  // const handleDeleteUser = async (uid: string) => {
  //   console.log('uid', uid);
  //   try {
  //     await firestore().collection('chats').doc(uid).delete();
  //     setChatRooms(prevChatRooms =>
  //       prevChatRooms.filter(user => user.uid !== uid),
  //     );
  //     console.log('User deleted successfully');
  //   } catch (error) {
  //     console.error('Error deleting user:', error);
  //   }
  // };

  const renderItem = ({item}: {item: User}) => (
    <Swipeable
      renderRightActions={() => renderRightActions(item.uid)}
      onSwipeableLeftOpen={() => console.log('Left action activated')}>
      <TouchableOpacity onPress={() => handleUserPress(item.uid)}>
        <View style={styles.userContainer}>
          <Image source={{uri: item.photoURL}} style={styles.profileImage} />
          <Text style={styles.displayName}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );

  return (
    <View style={styles.main}>
      <View style={styles.top}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('search');
          }}>
          <View style={styles.img}>
            <Image source={require('../../assets/Image/Search.png')} />
          </View>
        </TouchableOpacity>
        <Text style={styles.txt}>Home</Text>

        <TouchableOpacity onPress={handleLogout}>
          <View style={styles.img2}>
            {userImageURL && (
              <Image source={{uri: userImageURL}} style={styles.profileImage} />
            )}
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.chat}>
        <FlatList
          data={chatRooms}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.uid + index.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#050d30',
    flex: 1,
  },
  img: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    height: 44,
    width: 44,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  txt: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  img2: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    height: 50,
    width: 50,
  },
  top: {
    marginTop: 30,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chat: {
    backgroundColor: 'white',
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 10,
  },
  userItem: {
    marginTop: 50,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginLeft: 20,
    marginTop: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  displayName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#050d30',
  },
  leftActions: {
    flexDirection: 'row',
    // backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
});
