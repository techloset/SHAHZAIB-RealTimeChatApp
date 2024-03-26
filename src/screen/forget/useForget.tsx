import {Alert, ToastAndroid} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useState} from 'react';
import {UseDispatch, useSelector} from 'react-redux';
import {forgotPassword} from '../../store/slices/authSlices/authSlice';
import {RootState, useAppDispatch} from '../../store/store';
export default function useForget() {
  const dispatch = useAppDispatch();
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const error = useSelector((state: RootState) => state.auth.error);
  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    try {
      await dispatch(forgotPassword(email));
    } catch (error) {
      console.error('Forgot Password failed:', error);
      ToastAndroid.show('Forgot Password failed', ToastAndroid.SHORT);
    }
  };
  return {
    email,
    setEmail,
    handleForgotPassword,
  };
}
