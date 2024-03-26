import {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

interface UserData {
  userImageURL: string | null;
  displayName: string | null;
  status: string | null;
}

export default function useMSetting(): UserData {
  const [userImageURL, setUserImageURL] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth().currentUser;

        if (currentUser) {
          const userDocument = await firestore()
            .collection('users')
            .doc(currentUser.uid)
            .get();

          if (userDocument.exists) {
            const userData = userDocument.data();
            const imageURL = userData?.photoUrl || null;
            const name = currentUser?.displayName || null;
            const userStatus = userData?.status || null;

            setUserImageURL(imageURL);
            setDisplayName(name);
            setStatus(userStatus);
          } else {
            console.log('User document does not exist');
          }
        } else {
          console.log('No current user found');
        }
      } catch (error) {
        console.error("Error fetching current user's data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return {
    userImageURL,
    displayName,
    status,
  };
}
