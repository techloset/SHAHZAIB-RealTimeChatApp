import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import useForget from './useForget';
import {LoginScreenProps} from '../../../types/Types';
import Input from '../../[components]/Input';
import Button from '../../[components]/Button';

export default function SignupForget({navigation}: LoginScreenProps) {
  const {email, setEmail, handleForgotPassword} = useForget();
  return (
    <ScrollView>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.navigate('signup');
        }}>
        <Image
          style={styles.vectorimg}
          source={require('../../assets/Image/Vector190.png')}
        />
      </TouchableOpacity>

      <Text style={styles.headng1}>Forget Password</Text>
      <Text style={styles.heading2}>
        Welcome back! Sign in using your social account or email to continue us
      </Text>
      <View style={{marginTop: 50, marginLeft: 10}}>
        <Text style={styles.youremail}>Your email</Text>
        <Input
          placeholder="     Enter Your email"
          value={email}
          onChangeText={setEmail}
          secureTextEntry={false}
          keyboardType="email-address"
        />
        <View style={styles.linep2}>
          <View style={styles.line}></View>
        </View>
      </View>
      <View style={styles.buttonp}>
        <Button name='Forget Password' onPress={handleForgotPassword}/>
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
    textAlign: 'center',
    marginTop: 250,
    fontWeight: '700',
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    lineHeight: 18,
    color: 'rgba(61, 74, 122, 1)',
  },
  heading2: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    width: 293,
    height: 40,
    marginTop: 20,
    marginLeft: 50,
    fontWeight: '300',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
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
    marginTop: 250,
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
    marginTop: 15,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 16,
    fontFamily: 'Poppins-Regular',
  },
  youremail: {
    width: 77,
    height: 18,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0.1,
    color: 'rgba(61, 74, 122, 1)',
    marginLeft: 21,
  },
});
