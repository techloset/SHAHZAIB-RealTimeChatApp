import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import useSignUp from './useSignUp';
import {LoginScreenProps} from '../../../types/Types';

export default function SignUp({navigation}: LoginScreenProps) {
  const {
    handleSignup,
    displayName,
    setDisplayName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
  } = useSignUp();

  return (
    <ScrollView>
      <View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            navigation.navigate('auth');
          }}>
          <Image
            style={styles.vectorimg}
            source={require('../../assets/Image/Vector190.png')}
          />
        </TouchableOpacity>

        <Text style={styles.headng1}>Sign up with Email</Text>
        <Text style={styles.heading2}>
          Get chatting with friends and family today by signing up for our chat
          app!
        </Text>
        <View style={{marginLeft: 15, marginTop: 70}}>
          <Text style={styles.txt}>Your name</Text>
          <TextInput
            placeholder="     Enter Your Name"
            value={displayName}
            onChangeText={txt => setDisplayName(txt)}
          />
          <View style={styles.linep2}>
            <View style={styles.line}></View>
          </View>

          <View style={{marginTop: 30}}>
            <Text style={styles.txt}>Your email</Text>
            <TextInput
              placeholder="     Enter Your email"
              value={email}
              onChangeText={txt => setEmail(txt)}
            />
            <View style={styles.linep2}>
              <View style={styles.line}></View>
            </View>
          </View>

          <View style={{marginTop: 10}}>
            <Text style={styles.txt}>Passward</Text>
            <TextInput
              placeholder="     Enter Passward"
              secureTextEntry={true}
              value={password}
              onChangeText={txt => setPassword(txt)}
            />
            <View style={styles.linep2}>
              <View style={styles.line}></View>
            </View>

            <View style={{marginTop: 30}}>
              <Text style={styles.txt}> Confirm Passward</Text>
              <TextInput
                placeholder="     Enter Confirm Passward"
                value={confirmPassword}
                onChangeText={txt => setConfirmPassword(txt)}
                secureTextEntry={true}
              />
              <View style={styles.linep2}>
                <View style={styles.line}></View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.buttonp}>
          <TouchableOpacity style={styles.touch} onPress={handleSignup}>
            <Text style={styles.btntext}>Create an account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  vectorimg: {
    marginTop: 20,
    marginLeft: 30,
  },
  headng1: {
    height: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 130,
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    lineHeight: 18,
    color: 'rgba(61, 74, 122, 1)',
  },
  heading2: {
    fontWeight: '300',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',

    width: 293,
    height: 40,
    marginTop: 20,
    marginLeft: 50,
    color: 'rgba(121, 124, 123, 1)',
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
  buttonp: {
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 130,
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
    marginLeft: 80,
    marginTop: 15,
    width: 154,
    fontFamily: 'Poppins-Regular',
    height: 16,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 16,
  },
  txt: {
    height: 14,
    marginLeft: 19,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0.1,
    color: 'rgba(61, 74, 122, 1)',
  },
});
