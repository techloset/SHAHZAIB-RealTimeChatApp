import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import useOnBording from './useOnBording';
import {LoginScreenProps} from '../../../types/Types';

const OnBording = ({navigation}: LoginScreenProps) => {
  const {handleGoogleSignUp} = useOnBording();
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Connect friends easily & quickly</Text>
      <Text style={styles.heading2}>
        Our chat app is the perfect way to stay connected with friends and
        family.
      </Text>
      <View style={styles.imagep}>
        <TouchableOpacity onPress={handleGoogleSignUp}>
          <View style={styles.google}>
            <Image
              style={styles.image}
              source={require('../../assets/Image/Group438.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.linep}>
        <View style={styles.line} />
        <View>
          <Text style={styles.text}>OR</Text>
        </View>
        <View style={styles.line} />
      </View>
      <View style={styles.buttonp}>
        <TouchableOpacity
          style={styles.touch}
          onPress={() => {
            navigation.navigate('signup');
          }}>
          <Text style={styles.btntext}>Sign up with mail</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lasttextp}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            navigation.navigate('signin');
          }}>
          <Text style={styles.lasttext}>Existing account? Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#271b51',
    display: 'flex',
  },
  heading: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 68,
    fontFamily: 'Poppins-Regular',
    width: 338,
    fontWeight: '400',
    lineHeight: 78,

    marginTop: 85,
    marginLeft: 26,
  },

  heading2: {
    marginTop: 40,
    width: 327,
    height: 52,
    marginLeft: 26,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    color: 'rgba(255, 255, 255, 0.5)',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 26,
  },
  imagep: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
    height: 36,
  },
  google: {
    height: 46,
    width: 48,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 30,
    height: 30,
  },
  linep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 50,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'white',
    marginHorizontal: 15,
  },
  text: {
    width: 21,
    height: 14,
    textAlign: 'center',
    color: 'white',
    fontWeight: '900',
    fontFamily: 'Poppins-Regular',

    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0.1,
  },
  buttonp: {
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  touch: {
    width: 327,
    height: 48,
    backgroundColor: '#79809a',
    borderRadius: 20,
    marginBottom: 50,
  },
  btntext: {
    color: 'white',
    textAlign: 'center',
    marginTop: 15,
    fontFamily: 'Poppins-Regular',
    height: 20,
    fontWeight: '500',
  },
  lasttextp: {
    alignItems: 'center',
    marginBottom: 100,
  },
  lasttext: {
    color: 'white',
    width: 190,
    height: 25,
    fontFamily: 'Poppins-Regular',
  },
});

export default OnBording;
