import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const Button = ({color = '#02CF8E', text, textColor = '#020202', onPress, disabled}) => {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: color}]}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}>
      <Text style={[styles.text, {color: textColor}]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    marginHorizontal: 23,
  },
  text: {
    fontFamily: 'Lexend-SemiBold',
    fontSize: 15,
  },
});
