import {useState} from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';

const useChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New password and confirm password do not match');
      return;
    }

    const user = auth().currentUser;
    if (user) {
      const credential = auth.EmailAuthProvider.credential(
        user.email || '',
        currentPassword,
      );

      user
        .reauthenticateWithCredential(credential)
        .then(() => {
          user
            .updatePassword(newPassword)
            .then(() => {
              Alert.alert('Success', 'Password updated successfully');
              setCurrentPassword('');
              setNewPassword('');
              setConfirmPassword('');
            })
            .catch(error => {
              Alert.alert('Error', error.message);
            });
        })
        .catch(error => {
          Alert.alert('Error', error.message);
        });
    }
  };

  return {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleChangePassword,
  };
};

export default useChangePassword;
