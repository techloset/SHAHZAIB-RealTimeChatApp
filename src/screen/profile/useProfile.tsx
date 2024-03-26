import React, {useState, useEffect} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker, {Image} from 'react-native-image-crop-picker'; // Import Image type
import {setLoading} from '../../store/slices/authSlices/authSlice';
import {ToastAndroid} from 'react-native';

interface UserProfileProps {}

export default function UserProfile(props: UserProfileProps) {
  const currentUser: FirebaseAuthTypes.User | null = auth().currentUser;
  const [helloUserImageURL, setHelloUserImageURL] = useState<string | null>(
    null,
  );

  const [displayName, setDisplayName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

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
            setHelloUserImageURL(imageURL);
          } else {
            ToastAndroid.showWithGravity(
              'User document does not exist',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          }
        } else {
          ToastAndroid.showWithGravity(
            'No current user found',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }
      } catch (error) {
        console.error("Error fetching current user's image:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserImage();
  }, []);

  const imagepickerhandler = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      setSelectedImage(image);
    });
  };

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      setDisplayName(currentUser.displayName || '');
      setEmail(currentUser.email || '');

      const userId = currentUser.uid;
      const userRef = firestore().collection('users').doc(userId);

      userRef
        .get()
        .then(doc => {
          if (doc.exists) {
            const userData = doc.data();
            setStatus(userData?.status || '');
          } else {
            console.log('No such document!');
          }
        })
        .catch(error => {
          console.log('Error getting document:', error);
        });
    }
  }, []);

  const handleUpdateProfile = async () => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      try {
        await currentUser.updateProfile({
          displayName: displayName,
        });
        console.log('Display name updated successfully');

        await currentUser.updateEmail(email);
        console.log('Email updated successfully');
        if (selectedImage) {
          const userId = currentUser.uid;
          const imageFileName = `${userId}.jpg`;
          const storageRef = storage().ref(`profile_images/${imageFileName}`);

          await storageRef.putFile(selectedImage.path);

          const downloadURL = await storageRef.getDownloadURL();

          const userRef = firestore().collection('users').doc(userId);
          await userRef.update({
            photoUrl: downloadURL,
          });

          console.log('PhotoUrl updated successfully');
        }

        const userRef = firestore().collection('users').doc(currentUser.uid);
        await userRef.update({
          status: status,
        });
        console.log('Status successfully updated!');
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };

  return {
    displayName,
    setDisplayName,
    email,
    setEmail,
    status,
    setStatus,
    handleUpdateProfile,
    imagepickerhandler,
    currentUser,
    helloUserImageURL,
  };
}
