import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {LoginScreenProps} from '../../../types/Types';
import useSignIn from './useSignIn';
import Input from '../../[components]/Input';

const SignIn = ({navigation}: LoginScreenProps) => {
  const {email, setEmail, password, setPassword, handleLogin} = useSignIn();
  return (
    <ScrollView>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('auth');
          }}>
          <Image
            style={styles.vectorimg}
            source={require('../../assets/Image/Vector190.png')}
          />
        </TouchableOpacity>

        <Text style={styles.headng1}>Log in to Chatbox</Text>
        <Text style={styles.heading2}>
          Welcome back! Sign in using your social account or email to continue
          us
        </Text>
        <View style={styles.logop}>
          <TouchableOpacity>
            <View style={styles.google}>
              <Image
                style={styles.logo}
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
        <View style={{marginLeft: 15}}>
          <Text style={styles.youremail}>Your email</Text>
          {/* <TextInput
            placeholder="     Email"
            value={email}
            onChangeText={text => setEmail(text)}
            keyboardType="email-address"
          /> */}
          <Input
            placeholder="     Email"
            value={email}
            onChangeText={setEmail}
            secureTextEntry={false}
            keyboardType="email-address"
          />
          <View style={styles.linep2}>
            <View style={styles.line}></View>
          </View>
          <View style={{marginTop: 30}}>
            <Text style={styles.passward}>Passward</Text>
            {/* <TextInput
              placeholder="     Password"
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
            /> */}
            <Input
              placeholder="     Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}/>
            <View style={styles.linep2}>
              <View style={styles.line}></View>
            </View>
          </View>
        </View>
        <View style={styles.buttonp}>
          <TouchableOpacity style={styles.touch} onPress={handleLogin}>
            <Text style={styles.btntext}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            navigation.navigate('signupforget');
          }}>
          <Text style={styles.forget}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  vectorimg: {
    marginTop: 20,
    marginLeft: 30,
  },
  headng1: {
    textAlign: 'center',
    fontWeight: '700',
    marginTop: 130,
    fontSize: 18,
    lineHeight: 18,
    color: 'rgba(61, 74, 122, 1)',
  },
  heading2: {
    textAlign: 'center',
    fontWeight: '300',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
    width: 293,
    height: 40,
    marginTop: 20,
    marginLeft: 50,
  },
  logop: {
    alignItems: 'center',
    marginTop: 30,
  },
  google: {
    width: 48,
    height: 38,
    marginLeft: 35,
    color: '#FFFFFF',
    borderRadius: 50,
  },
  logo: {
    width: 22,
    height: 23,
  },
  linep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 50,
  },
  linep2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
    marginHorizontal: 15,
  },
  text: {
    width: 21,
    height: 14,
    fontWeight: '900',
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0.1,
    color: 'rgba(121, 124, 123, 1)',
    textAlign: 'center',
  },
  buttonp: {
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 150,
  },
  touch: {
    width: 327,
    height: 48,
    backgroundColor: '#303f7b',
    borderRadius: 20,
    marginBottom: 25,
  },
  btntext: {
    color: 'white',
    textAlign: 'center',
    marginLeft: 143,
    marginTop: 15,
    height: 18,
    width: 48,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 16,
  },
  youremail: {
    marginLeft: 20,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0.1,
    color: 'rgba(61, 74, 122, 1)',
  },
  passward: {
    marginLeft: 20,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0.1,
    color: 'rgba(61, 74, 122, 1)',
  },
  forget: {
    color: '#303f7b',
    width: 128,
    height: 16,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0.1,
  },
});

export default SignIn;
