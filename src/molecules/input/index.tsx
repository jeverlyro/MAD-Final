import {StyleSheet, Text, View, TextInput as Input} from 'react-native';
import React from 'react';

interface InputProps {
  label: string;
  placeholder: string;
}

const TextInput: React.FC<InputProps> = ({label = '', placeholder = ''}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Input
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="gray"
      />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: 'white',
    paddingBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#2C277F',
    padding: 8,
  },
});
