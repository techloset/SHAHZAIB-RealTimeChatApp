import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {UserData, CounterState} from '../../../../types/Types';

const initialState: CounterState = {
  users: [],
  loading: false,
  error: null,
};

export const getUsers = createAsyncThunk<
  UserData[],
  void,
  {rejectValue: string}
>('users/getUsers', async (_, {rejectWithValue}) => {
  try {
    const usersSnapshot = await firestore().collection('users').get();
    const users = usersSnapshot.docs.map(doc => doc.data() as UserData);
    const filteredUsers = users.filter(
      user => user.uid !== auth().currentUser?.uid,
    );
    return filteredUsers;
  } catch (error) {
    console.error('Error fetching users:', error);
    return rejectWithValue('Failed to fetch users');
  }
});

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload : 'An error occurred';
        state.users = [];
      });
  },
});

export default userSlice.reducer;
