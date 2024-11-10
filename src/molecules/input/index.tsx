import {
  StyleSheet,
  Text,
  View,
  TextInput as Input,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface InputProps {
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
}

const TextInput: React.FC<InputProps> = ({
  label = '',
  placeholder = '',
  secureTextEntry = false,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <View>
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
        ]}>
        <Text style={styles.label}>{label}</Text>
        <Input
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="gray"
          secureTextEntry={isPasswordVisible && secureTextEntry}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.iconContainer}>
            <Ionicons
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="white"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: 'white',
    paddingBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3A4052',
    borderRadius: 10,
    padding: 1,
  },
  inputContainerFocused: {
    borderColor: 'white',
    borderWidth: 1,
  },
  input: {
    flex: 1,
    color: 'white',
  },
  iconContainer: {
    marginRight: 10,
  },
});
