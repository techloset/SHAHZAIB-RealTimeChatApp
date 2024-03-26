import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import useContect from './useContect';
import {LoginScreenProps} from '../../../types/Types';
import {FlatList} from 'react-native-gesture-handler';

export default function Contacts({navigation}: LoginScreenProps) {
  const {users, handleUserPress}: any = useContect();

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
        <Text style={styles.txt}>Contacts</Text>
        <TouchableOpacity>
          <View style={styles.img2}>
            <Image source={require('../../assets/Image/user-add.png')} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.chat}>
        <FlatList
          style={styles.profile}
          data={users}
          keyExtractor={item => item.uid}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleUserPress(item.uid)}>
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
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#050d30',
  },
  img: {
    backgroundColor: ' rgba(255, 255, 255, 0.2)',
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
    backgroundColor: ' rgba(255, 255, 255, 0.2)',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    height: 44,
    width: 44,
  },
  top: {
    marginTop: 30,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chat: {
    backgroundColor: 'white',
    height: 706,
    marginTop: 10,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
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
  profile: {
    backgroundColor: 'white',
    height: 706,
    marginTop: 30,
    marginLeft: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
});
