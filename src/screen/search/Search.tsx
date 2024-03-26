import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {getUsers} from '../../store/slices/userSlice/userSlice';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Chat: {user: any};
};

type SearchScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Chat'
>;

interface Props {
  navigation: SearchScreenNavigationProp;
}

const SearchComponent: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation(); // Correct usage of useNavigation
  const users = useSelector((state: RootState) => state.users.users);
  const loading = useSelector((state: RootState) => state.users.loading);
  const error = useSelector((state: RootState) => state.users.error);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      user =>
        user &&
        user.displayName &&
        searchQuery &&
        user.displayName.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  const renderItem = ({item}: {item: any}) => (
    <TouchableOpacity onPress={() => handleUserPress(item)}>
      <View style={styles.userContainer}>
        <Image
          source={{uri: item.photoUrl?.toString()}}
          style={styles.userPhoto}
        />
        <View style={styles.userInfo}>
          <Text style={styles.name}> {item.displayName}</Text>
          <Text>{item.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleUserPress = (user: any) => {
    navigation.navigate('chat', {userId: user.uid});
  };

  return (
    <View>
      <View style={styles.place}>
        <Image
          source={require('../../assets/Image/Search1(2).png')}
          style={styles.img}
        />
        <TextInput
          placeholder=" find new people"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.placeholder}
        />
      </View>

      {loading && <Text style={styles.load}>Loading...</Text>}
      {error && <Text style={styles.load}>Error: {error}</Text>}
      <FlatList
        data={filteredUsers}
        renderItem={renderItem}
        keyExtractor={item => item.uid}
      />
    </View>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
  load: {
    marginTop: 25,
    fontSize: 18,
    lineHeight: 18,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 40,
    marginTop: 15,
  },
  userPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#050d30',
  },
  place: {
    backgroundColor: 'rgba(235, 240, 240, 1)',
    flexDirection: 'row',
    width: 327,
    height: 44,
    marginTop: 61,
    marginLeft: 24,
    borderRadius: 12,
  },
  img: {
    marginTop: 13,
    marginLeft: 36,
    height: 24,
    width: 24,
  },
  placeholder: {
    color: '#050d30',
    fontSize: 16,
    marginLeft: 10,
  },
});

// import React, {useEffect, useState} from 'react';
// import {
//   FlatList,
//   Image,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
// import {RootState} from '../../store/store';
// import {getUsers} from '../../store/slices/userSlice/userSlice';
// import {StackNavigationProp} from '@react-navigation/stack';
// import {RouteProp} from '@react-navigation/native';

// export type RootStackParamList = {
//   Home: undefined;
//   Chat: {user: any};
// };

// type SearchScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   'Chat'
// >;

// interface Props {
//   navigation: SearchScreenNavigationProp;
// }

// const SearchComponent: React.FC<Props> = ({navigation}) => {
//   const dispatch = useDispatch();
//   const users = useSelector((state: RootState) => state.users.users);
//   const loading = useSelector((state: RootState) => state.users.loading);
//   const error = useSelector((state: RootState) => state.users.error);

//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredUsers, setFilteredUsers] = useState<any[]>([]);

//   useEffect(() => {
//     dispatch(getUsers());
//   }, []);

//   useEffect(() => {
//     const filtered = users.filter(
//       user =>
//         user &&
//         user.displayName &&
//         searchQuery &&
//         user.displayName.toLowerCase().includes(searchQuery.toLowerCase()),
//     );

//     setFilteredUsers(filtered);
//   }, [searchQuery, users]);

//   const renderItem = ({item}: {item: any}) => (
//     <TouchableOpacity onPress={() => handleUserPress(item)}>
//       <View style={styles.userContainer}>
//         <Image
//           source={{uri: item.photoUrl?.toString()}}
//           style={styles.userPhoto}
//         />
//         <View style={styles.userInfo}>
//           <Text style={styles.name}> {item.displayName}</Text>
//           <Text>{item.status}</Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   const handleUserPress = (user: any) => {
//     // Navigate to Chat screen and pass user data
//     navigation.navigate('Chat', {user});
//   };

//   return (
//     <View>
//       <View style={styles.place}>
//         <Image source={search} style={styles.img} />
//         <TextInput
//           placeholder=" Search for people"
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//           style={styles.placeholder}
//         />
//       </View>

//       {loading && <Text style={styles.load}>Loading...</Text>}
//       {error && <Text style={styles.load}>Error: {error}</Text>}
//       <FlatList
//         data={filteredUsers}
//         renderItem={renderItem}
//         keyExtractor={item => item.uid}
//       />
//     </View>
//   );
// };

// export default SearchComponent;

// const styles = StyleSheet.create({
//   load: {
//     marginTop: 25,
//     fontSize: 18,
//     lineHeight: 18,
//     textAlign: 'center',
//     color: 'black',
//     fontFamily: 'Poppins-Bold',
//     fontWeight: 'bold',
//   },
//   userContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     backgroundColor: 'white',
//     borderRadius: 40,
//     marginTop: 15,
//   },
//   userPhoto: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 10,
//   },
//   userInfo: {
//     flex: 1,
//   },
//   name: {
//     fontSize: 15,
//     fontWeight: 'bold',
//     marginLeft: 10,
//     color: '#050d30',
//   },
//   place: {
//     backgroundColor: 'rgba(235, 240, 240, 1)',
//     flexDirection: 'row',
//     width: 327,
//     height: 44,
//     marginTop: 61,
//     marginLeft: 24,
//     borderRadius: 12,
//   },
//   img: {
//     marginTop: 13,
//     marginLeft: 36,
//     height: 24,
//     width: 24,
//   },
//   placeholder: {
//     color: '#050d30',
//     fontSize: 16,
//     marginLeft: 10,
//   },
// });

// import React, {useEffect, useState} from 'react';
// import search from '../../assets/Image/Search1(2).png';
// import {
//   FlatList,
//   Image,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
// import {RootState} from '../../store/store';
// import {getUsers} from '../../store/slices/userSlice/userSlice';

// const SearchComponent: React.FC = () => {
//   const dispatch = useDispatch();
//   const users = useSelector((state: RootState) => state.users.users);
//   const loading = useSelector((state: RootState) => state.users.loading);
//   const error = useSelector((state: RootState) => state.users.error);

//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredUsers, setFilteredUsers] = useState<any[]>([]);

//   useEffect(() => {
//     dispatch(getUsers());
//   }, []);

//   useEffect(() => {
//     const filtered = users.filter(
//       user =>
//         user &&
//         user.displayName &&
//         searchQuery &&
//         user.displayName.toLowerCase().includes(searchQuery.toLowerCase()),
//     );

//     setFilteredUsers(filtered);
//   }, [searchQuery, users]);

//   const renderItem = ({item}: {item: any}) => (
//     <TouchableOpacity>
//       <View style={styles.userContainer}>
//         <Image
//           source={{uri: item.photoUrl?.toString()}}
//           style={styles.userPhoto}
//         />
//         <View style={styles.userInfo}>
//           <Text style={styles.name}> {item.displayName}</Text>
//           <Text>{item.status}</Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View>
//       <View style={styles.place}>
//         <Image source={search} style={styles.img} />
//         <TextInput
//           placeholder=" Search for people"
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//           style={styles.placeholder}
//         />
//       </View>

//       {loading && <Text style={styles.load}>Loading...</Text>}
//       {error && <Text style={styles.load}>Error: {error}</Text>}
//       <FlatList
//         data={filteredUsers}
//         renderItem={renderItem}
//         keyExtractor={item => item.uid}
//       />
//     </View>
//   );
// };

// export default SearchComponent;

// const styles = StyleSheet.create({
//   load: {
//     marginTop: 25,
//     fontSize: 18,
//     lineHeight: 18,
//     textAlign: 'center',
//     color: 'black',
//     fontFamily: 'Poppins-Bold',
//     fontWeight: 'bold',
//   },
//   userContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     backgroundColor: 'white',
//     borderRadius: 40,
//     marginTop: 15,
//   },
//   userPhoto: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 10,
//   },
//   userInfo: {
//     flex: 1,
//   },
//   name: {
//     fontSize: 15,
//     fontWeight: 'bold',
//     marginLeft: 10,
//     color: '#050d30',
//   },
//   place: {
//     backgroundColor: 'rgba(235, 240, 240, 1)',
//     flexDirection: 'row',
//     width: 327,
//     height: 44,
//     marginTop: 61,
//     marginLeft: 24,
//     borderRadius: 12,
//   },
//   img: {
//     marginTop: 13,
//     marginLeft: 36,
//     height: 24,
//     width: 24,
//   },
//   placeholder: {
//     color: '#050d30',
//     fontSize: 16,
//     marginLeft: 10,
//   },
// });
