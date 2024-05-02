import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import useProfile from './useProfile';
import aditbtn from '../../assets/Image/Frame49.png';
import {LoginScreenProps} from '../../../types/Types';
import Input from '../../[components]/Input';

interface User {
  displayName?: string;
  status?: string;
  photoUrl?: string;
}

export default function Profile({navigation}: LoginScreenProps) {
  const {
    displayName,
    setDisplayName,
    email,
    setEmail,
    status,
    setStatus,
    handleUpdateProfile,
    imagepickerhandler,
    currentUser,
    helloUserImageURL,
  } = useProfile();

  return (
    <ScrollView style={styles.main}>
      <View style={styles.top}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.img}>
            <Image source={require('../../assets/Image/Vector.png')} />
          </View>
        </TouchableOpacity>
        <Text style={styles.txt}>Profile</Text>
      </View>
      <View style={styles.chat}>
        {helloUserImageURL && (
          <Image source={{uri: helloUserImageURL}} style={styles.profile} />
        )}

        <TouchableOpacity onPress={imagepickerhandler}>
          <Image source={aditbtn} style={styles.adit} />
        </TouchableOpacity>
        <View style={styles.name}>
          <Text>Your name</Text>
          {/* <TextInput
            placeholder={currentUser?.displayName || 'Enter your name'}
            value={displayName}
            onChangeText={setDisplayName}
          /> */}
          <Input
            placeholder={currentUser?.displayName || 'Enter your name'}
            value={displayName}
            onChangeText={setDisplayName}
            secureTextEntry={false}
          />
        </View>
        <View style={styles.line}></View>

        <View style={styles.email}>
          <Text>Your email</Text>
          {/* <TextInput
            placeholder={currentUser?.email || 'Enter your email'}
            value={email}
            onChangeText={setEmail}
          /> */}
          <Input
            placeholder={currentUser?.email || 'Enter your email'}
            value={email}
            onChangeText={setEmail}
            secureTextEntry={false}/>
        </View>
        <View style={styles.line}></View>

        <View style={styles.status}>
          <Text>Your status</Text>
          {/* <TextInput
            placeholder={(currentUser as User)?.status || 'Never give up 💪'}
            value={status}
            onChangeText={setStatus}
          /> */}
          <Input
            placeholder={(currentUser as User)?.status || 'Never give up 💪'}
            value={status}
            onChangeText={setStatus}
            secureTextEntry={false}/>
        </View>
        <View style={styles.line}></View>

        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.8}
          onPress={handleUpdateProfile}>
          <Text style={styles.btnt}>Update Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  adit: {
    height: 16,
    width: 16,
    marginLeft: '58%',
    marginTop: -25,
  },
  top: {
    marginTop: 30,
    marginBottom: 30,
    flexDirection: 'row',
  },
  main: {
    backgroundColor: '#050d30',
  },
  img: {
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  txt: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 100,
  },
  chat: {
    backgroundColor: 'white',
    height: 755,
    marginTop: 10,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  profile: {
    borderRadius: 70,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    height: 120,
    width: 120,
    marginTop: 30,
  },
  name: {
    marginLeft: 25,
    marginTop: 30,
  },
  line: {
    height: 1,
    backgroundColor: 'black',
    marginHorizontal: 25,
  },
  email: {
    marginLeft: 25,
    marginTop: 30,
  },
  status: {
    marginLeft: 25,
    marginTop: 30,
  },
  btn: {
    marginTop: 60,
    alignSelf: 'center',
    height: 48,
    width: 327,
    backgroundColor: '#3d4a7a',
    borderRadius: 20,
  },
  btnt: {
    color: 'white',
    textAlign: 'center',
    marginTop: 15,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 16,
  },
});
