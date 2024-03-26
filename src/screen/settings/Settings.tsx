import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

import {RootStackparams} from '../../navigation/stackNavigation/Stacknavigation';
import {StackNavigationProp} from '@react-navigation/stack';
import useSettings from './useSettings';

interface LoginScreenProps {
  navigation: StackNavigationProp<RootStackparams, 'signup'>;
}

export default function Settings({navigation}: LoginScreenProps) {
  const {userImageURL, displayName, status} = useSettings();
  return (
    <ScrollView style={styles.main}>
      <View style={styles.top}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.img}>
            <Image source={require('../../assets/Image/Vector.png')} />
          </View>
        </TouchableOpacity>
        <Text style={styles.txt}>Settings</Text>
      </View>
      <View style={styles.chat}>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('profile');
            }}>
            <View style={styles.profilep}>
              {userImageURL && (
                <Image source={{uri: userImageURL}} style={styles.profile} />
              )}

              <View style={styles.headingp}>
                <Text style={styles.heading}>{displayName}</Text>
                <Text>{status}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.br}></View>

        <TouchableOpacity style={styles.notifi}>
          <Image
            source={require('../../assets/Image/Notification.png')}
            style={styles.notifimg}
          />
          <View style={styles.imgtxt}>
            <Text style={styles.heading2}>Notifications</Text>
            <Text>Messages, group and others</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.notifi}>
          <Image
            source={require('../../assets/Image/Help.png')}
            style={styles.notifimg}
          />
          <View style={styles.imgtxt}>
            <Text style={styles.heading2}>Help</Text>
            <Text>Help center, contact us, privacy policy</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.notifi}
          onPress={() => {
            navigation.navigate('changepassword');
          }}>
          <Image
            source={require('../../assets/Image/Users.png')}
            style={styles.notifimg}
          />
          <View style={styles.imgtxt}>
            <Text style={styles.heading2}>Change Password</Text>
            <Text>Change Account Password</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.notifi}>
          <Image
            source={require('../../assets/Image/Users.png')}
            style={styles.notifimg}
          />
          <View style={styles.imgtxt}>
            <Text style={styles.heading2}>Invite a friend</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#050d30',
  },
  img: {
    justifyContent: 'center',
    height: 50,
    width: 50,
    alignItems: 'center',
    marginLeft: 20,
    borderRadius: 50,
  },
  // img1: {
  //   height: 40,
  //   width: 40,
  // },
  txt: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    // alignItems: 'center',
    alignSelf: 'center',
    marginLeft: 100,
  },
  top: {
    marginTop: 30,
    marginBottom: 30,
    flexDirection: 'row',
  },
  chat: {
    backgroundColor: 'white',
    height: 706,
    marginTop: 10,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  profile: {
    borderRadius: 50,
    height: 60,
    width: 60,
  },
  profilep: {
    marginTop: 30,
    marginLeft: 15,
    flexDirection: 'row',
  },
  headingp: {
    marginLeft: 10,
  },
  heading: {
    fontSize: 20,
    marginTop: 15,
    height: 20,
    width: '100%',
    fontFamily: 'Poppins-Regular',
    lineHeight: 20,
    fontWeight: '700',
    color: '#050d30',
  },
  br: {
    marginTop: 25,
    backgroundColor: '#0f0d00',
    height: 1,
  },
  notifimg: {
    backgroundColor: ' rgba(222, 235, 255, 1)',
    borderRadius: 50,
    height: 50,
    width: 50,
  },
  notifi: {
    flexDirection: 'row',
    // alignSelf: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginLeft: 15,
  },
  imgtxt: {
    marginLeft: 8,
  },
  heading2: {
    height: 18,
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 16,
    color: 'rgba(0, 14, 8, 1)',
  },
});
