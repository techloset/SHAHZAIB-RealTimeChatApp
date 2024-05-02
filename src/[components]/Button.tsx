import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface ButtonProps {
  name: string;
  onPress: () => void;
}
export default function Button({name,onPress} :ButtonProps) {
  return (
    <View style={styles.buttonp}>
      <TouchableOpacity style={styles.touch} onPress={onPress}>
        <Text style={styles.btntext}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  buttonp: {
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  touch: {
    width: 327,
    height: 48,
    backgroundColor: '#79809a',
    borderRadius: 20,
    marginBottom: 50,
  },
  btntext: {
    color: 'white',
    textAlign: 'center',
    marginTop: 15,
  },
});
