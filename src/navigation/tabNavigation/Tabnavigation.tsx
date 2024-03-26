import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Contacts from '../../screen/contacts/Contacts';
import Message from '../../screen/message/Message';
import Settings from '../../screen/settings/Settings';
import {Image} from 'react-native';

const Tab = createBottomTabNavigator();

export default function Tabnavigation() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="message"
        component={Message}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../../assets/Image/Message.png')}
              style={{width: 25, height: 25}}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="contacts"
        component={Contacts}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../../assets/Image/user.png')}
              style={{width: 25, height: 25}}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../../assets/Image/settings.png')}
              style={{width: 25, height: 25}}
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
