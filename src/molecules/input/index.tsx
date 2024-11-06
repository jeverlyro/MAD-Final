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

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <Input
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="gray"
          secureTextEntry={isPasswordVisible && secureTextEntry}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.iconContainer}>
            <Ionicons
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={20}
              color="gray"
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
    fontSize: 16,
    color: 'white',
    paddingBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#2C277F',
    padding: 5,
  },
  input: {
    flex: 1,
  },
  iconContainer: {
    marginRight: 10,
  },
});
