import {ToastAndroid} from 'react-native';
import {useAppDispatch} from '../../store/store';
import {googleSignin} from '../../store/slices/authSlices/authSlice';

export default function useOnBording() {
  const dispatch = useAppDispatch();

  const handleGoogleSignUp = async () => {
    try {
      await dispatch(googleSignin);
    } catch (error) {
      console.error('Google SignUp failed:', error);
      ToastAndroid.show('Google SignUp failed', ToastAndroid.SHORT);
    }
  };
  return {
    handleGoogleSignUp,
  };
}
