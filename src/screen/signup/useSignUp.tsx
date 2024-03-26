import {ToastAndroid} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useState} from 'react';
import {AppDispatch} from '../../store/store';
import {SignUp} from '../../../types/Types';
import {Signup} from '../../store/slices/authSlices/authSlice';

export default function useSignUp() {
  const dispatch: AppDispatch = useDispatch();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    try {
      const signupData: SignUp = {
        displayName,
        email,
        password,
        confirmPassword,
      };
      await dispatch(Signup(signupData));
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };
  return {
    handleSignup,
    displayName,
    setDisplayName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
  };
}
