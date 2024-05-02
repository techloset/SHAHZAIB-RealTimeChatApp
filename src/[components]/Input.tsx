import {View, StyleSheet, TextInput, KeyboardTypeOptions} from 'react-native';
import React from 'react';

interface InputProps {
  secureTextEntry?: boolean;
  placeholder: string;
  onChangeText?: (text: string) => void;
  value: string;
  keyboardType?: KeyboardTypeOptions;
}

export default function Input({
  placeholder,
  onChangeText,
  secureTextEntry = false,
  value,
}: InputProps) {
  return (
    <View>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        value={value}
        keyboardType="default"
        onChangeText={onChangeText}></TextInput>
    </View>
  );
}
const styles = StyleSheet.create({
  
});
