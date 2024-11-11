import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {Input} from '../../molecules';

const ChangePasswordScreen: React.FC = () => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleUpdatePassword = () => {
    if (newPassword === confirmPassword) {
      Alert.alert(
        'Password Updated',
        'Your password has been successfully updated.',
      );
    } else {
      Alert.alert('Error', 'New passwords do not match.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={20}
          color="white"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Change password</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Change your password</Text>
      </View>

      <Input label="Password" placeholder="Enter your previous password" />

      <Input label="New Password" placeholder="Enter your new password" />

      <Input
        label="Confirm new Password"
        placeholder="Must match the new password"
      />

      <TouchableOpacity
        style={styles.updateButton}
        onPress={handleUpdatePassword}>
        <Text style={styles.updateButtonText}>Update password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121927',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 13,
    color: 'white',
    fontFamily: 'Lexend-Bold',
    marginLeft: 10,
  },
  infoBox: {
    backgroundColor: '#0F1522',
    paddingVertical: 5,
    paddingHorizontal: 25,
    marginHorizontal: -20,
    width: '110%',
    alignSelf: 'stretch',
    marginBottom: 40,
  },
  infoText: {
    color: 'white',
    fontFamily: 'Lexend-Regular',
    fontSize: 7,
  },
  updateButton: {
    backgroundColor: '#5046E5',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 40,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Lexend-SemiBold',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
