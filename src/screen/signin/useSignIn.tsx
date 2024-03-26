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
  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
  };
}
