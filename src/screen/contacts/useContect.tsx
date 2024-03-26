import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getUsers} from '../../store/slices/userSlice/userSlice';
import {RootState} from '../../store/store';
import {useNavigation} from '@react-navigation/native';

export default function useContect() {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);
  const loading = useSelector((state: RootState) => state.users.loading);
  const error = useSelector((state: RootState) => state.users.error);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getUsers() as any);
  }, [dispatch]);

  const handleUserPress = (uid: string) => {
    navigation.navigate('chat', {userId: uid});
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return {
    users,
    handleUserPress,
  };
}
