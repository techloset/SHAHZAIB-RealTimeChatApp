import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Stacknavigation from './stackNavigation/Stacknavigation';

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stacknavigation />
    </NavigationContainer>
  );
}
