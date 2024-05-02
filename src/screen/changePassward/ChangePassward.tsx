import React from 'react';
import {View, TextInput, StyleSheet, Text, Image} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import useChangePassword from './useChangePassward';
import {LoginScreenProps} from '../../../types/Types';
import Input from '../../[components]/Input';
import Button from '../../[components]/Button';

const ChangePassword = ({navigation}: LoginScreenProps) => {
  const {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleChangePassword,
  } = useChangePassword();

  return (
    <ScrollView style={styles.main}>
      <View style={styles.top}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <View style={styles.img}>
            <Image source={require('../../assets/Image/Vector.png')} />
          </View>
        </TouchableOpacity>
        <Text style={styles.txt}>Change Password</Text>
      </View>
      <View style={styles.chat}>
        <View style={styles.card}>
          <View style={styles.name}>
            <Text style={styles.heading}>Current Password</Text>
              <Input 
              secureTextEntry={true}
              value={currentPassword}
              onChangeText={text => setCurrentPassword(text)}
              placeholder='   Enter Your Password'
              />
          </View>
          <View style={styles.line}></View>

          <View style={styles.email}>
            <Text style={styles.heading}>New Password</Text>
              <Input 
              secureTextEntry={true}
              value={newPassword}
              onChangeText={text => setNewPassword(text)}
              placeholder='   Enter Your New Password'/>
          </View>
          <View style={styles.line}></View>

          <View style={styles.status}>
            <Text style={styles.heading}>Confirm New Password</Text>
              <Input 
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
              placeholder='   Enter Your Confirm Password'/>
          </View>
          <View style={styles.line}></View>
          <Button name='Change Password' onPress={handleChangePassword}/>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#050d30',
  },
  top: {
    marginTop: 30,
    marginBottom: 30,
    flexDirection: 'row',
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
    marginLeft: 65,
  },
  chat: {
    backgroundColor: 'white',
    height: 755,
    marginTop: 30,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  card: {
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
    marginTop: 200,
    alignSelf: 'center',
    height: 48,
    width: 327,
    backgroundColor: '#3d4a7a',
    borderRadius: 20,
  },
  btnt: {
    color: 'white',
    textAlign: 'center',
    marginTop: 18,
    marginLeft: 100,
    fontFamily: 'Poopins-Regular',
    width: 115,
    height: 16,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 16,
  },
  heading: {
    height: 14,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 14,
    fontFamily: 'Poppin-Regular',
    letterSpacing: 0.1,
    color: 'rgba(61, 74, 122, 1)',
  },
});

export default ChangePassword;
