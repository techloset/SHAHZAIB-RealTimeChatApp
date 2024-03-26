import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackparams} from '../src/navigation/stackNavigation/Stacknavigation';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  // createdAt: Date;
}
export interface SignUp {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignIn {
  email: string;
  password: string;
}
export interface UserProfile {
  password: string;
  displayName: string;
  email: string;
}
export interface AuthState {
  user: FirebaseAuthTypes.User | null;
  isLoading: boolean;
  error: string | null;
}

export interface User {
  displayName: string;
  email: string;
}
export interface AuthState {
  user: FirebaseAuthTypes.User | null;
  isLoading: boolean;
  error: string | null;
}
export interface SignIn {
  email: string;
  password: string;
}
export interface SignUp {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface ChatScreenProps {
  route: {
    params: {
      userId: string;
    };
  };
}

export interface UserData {
  email: string;
  password: string;
  status: string | null;
  uid: string;
  displayName: string;
  photoUrl: string | null;
  confirmPassword: string | null;
}
export interface CounterState {
  users: UserData[];
  loading: boolean;
  error: string | null;
}
export interface UserData {
  uid: string;
  name: string;
}
export interface RootState {
  users: CounterState;
}
export interface CounterState {
  users: UserData[];
  loading: boolean;
  error: string | null;
}
export interface LoginScreenProps {
  navigation: StackNavigationProp<RootStackparams, 'signup'>;
  route: {
    params: {
      userId: string;
    };
  };
}
