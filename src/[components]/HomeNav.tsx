import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

export default function HomeNav() {
  return (
    <>
      <View style={styles.top}>
        <TouchableOpacity>
          <View style={styles.img}>
            <Image source={require('../assets/Image/Search.png')} />
          </View>
        </TouchableOpacity>
        <Text style={styles.txt}>Contacts</Text>
        <TouchableOpacity>
          <View style={styles.img2}>
            <Image source={require('../assets/Image/user-add.png')} />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  img: {
    backgroundColor: ' rgba(255, 255, 255, 0.2)',
    height: 44,
    width: 44,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  txt: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  img2: {
    backgroundColor: ' rgba(255, 255, 255, 0.2)',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    height: 44,
    width: 44,
  },
  top: {
    marginTop: 30,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chat: {
    backgroundColor: 'white',
    height: 706,
    marginTop: 10,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
});
