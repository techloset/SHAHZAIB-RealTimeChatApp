import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function Button() {
  return (
    <View style={styles.buttonp}>
      <TouchableOpacity style={styles.touch}>
        <Text style={styles.btntext}>Sign up with mail</Text>
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
