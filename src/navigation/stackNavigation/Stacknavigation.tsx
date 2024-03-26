import {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import onBording from '../../screen/onbording/OnBording';
import SignupForget from '../../screen/forget/Forget';
import auth from '@react-native-firebase/auth';
// import Home from '../../screen/home/Home';
import Tabnavigation from '../tabNavigation/Tabnavigation';
import Profile from '../../screen/profile/Profile';
import ChangePassward from '../../screen/changePassward/ChangePassward';
import Search from '../../screen/search/Search';
import Chat from '../../screen/chat/Chat';
import SignUp from '../../screen/signup/SignUp';
import SignIn from '../../screen/signin/Signin';
import Message from '../../screen/message/Message';

export type RootStackparams = {
  auth: undefined;
  signin: undefined;
  signup: undefined;
  signupforget: undefined;
  home: undefined;
  profile: undefined;
  changepassword: undefined;
  search: undefined;
  tabNavigation: undefined;
  chat: undefined;
  message: undefined;
};

const Stack = createNativeStackNavigator<RootStackparams>();
export default function Stacknavigation() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <>
        <Stack.Navigator>
          <Stack.Group screenOptions={{headerShown: false}}>
            <Stack.Screen name="auth" component={onBording} />
            <Stack.Screen name="signin" component={SignIn} />
            <Stack.Screen name="signup" component={SignUp} />
            <Stack.Screen name="signupforget" component={SignupForget} />
          </Stack.Group>
        </Stack.Navigator>
      </>
    );
  }

  return (
    <>
      <Stack.Navigator>
        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen name="tabNavigation" component={Tabnavigation} />
        </Stack.Group>
        <Stack.Group screenOptions={{headerShown: false}}>
          {/* <Stack.Screen name="home" component={Home} /> */}
          <Stack.Screen name="chat" component={Chat} />
          <Stack.Screen name="profile" component={Profile} />
          <Stack.Screen name="changepassword" component={ChangePassward} />
          <Stack.Screen name="search" component={Search} />
          <Stack.Screen name="message" component={Message} />
        </Stack.Group>
      </Stack.Navigator>
    </>
  );
}
