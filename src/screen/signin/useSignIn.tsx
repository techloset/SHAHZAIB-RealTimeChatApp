import {useState} from 'react';
import {ToastAndroid} from 'react-native';
import {RootState, useAppDispatch} from '../../store/store';
import {loginUser} from '../../store/slices/authSlices/authSlice';

export default function useSignIn() {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await dispatch(loginUser({email, password}));
    } catch (error) {
      console.error('Login failed:', error);
      ToastAndroid.show('Login failed', ToastAndroid.SHORT);
    }
  };
  //
  //
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     console.log('Google sign in success:', userInfo);
  //   } catch (error) {
  //     console.error('Google sign in failed:', error);
  //   }
  // };
  // export default function useSignIn() {
  //   const [email, setEmail] = useState('');
  //   const [password, setPassword] = useState('');

  //   const handleLogin = async () => {
  //     try {
  //       if (!email || !password) {
  //         Alert.alert('Email and password are required');
  //         return;
  //       }

  //       const userCredential = await auth().signInWithEmailAndPassword(
  //         email,
  //         password,
  //       );
  //       console.log('User logged in:', userCredential.user);
  //     } catch (error) {
  //       console.error('Login failed:', error);
  //       // Alert.alert('Login failed', error);
  //     }
  //   };
  //
  //
  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
  };
}
