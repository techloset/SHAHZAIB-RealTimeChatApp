import {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {AppDispatch} from '../../store/store';
import {LogOut} from '../../store/slices/authSlices/authSlice';
import {Image} from 'react-native';

interface UserData {
  userImageURL: string | null;
  handleLogout: () => void;
}

export default function useMessage(): UserData {
  const dispatch: AppDispatch = useDispatch();
  const [userImageURL, setUserImageURL] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserImage = async () => {
      try {
        const currentUser = auth().currentUser;

        if (currentUser) {
          const userDocument = await firestore()
            .collection('users')
            .doc(currentUser.uid)
            .get();

          if (userDocument.exists) {
            const imageURL = userDocument.data()?.photoUrl || null;
            setUserImageURL(imageURL);
          } else {
            console.log('User document does not exist');
          }
        } else {
          console.log('No current user found');
        }
      } catch (error) {
        console.error("Error fetching current user's image:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserImage();
  }, []);

  const handleLogout = async () => {
    try {
      await dispatch(LogOut());
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return {
    userImageURL,
    handleLogout,
  };
}
