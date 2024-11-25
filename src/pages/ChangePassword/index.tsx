import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {Input} from '../../molecules';
import {Gap} from '../../atoms';
import {
  getAuth,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';
import {showMessage} from 'react-native-flash-message';
import {Loading} from '../../molecules';

const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = password => {
    return (
      password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)
    );
  };

  const handleUpdatePassword = async () => {
    try {
      setIsLoading(true);
      const auth = getAuth();
      const user = auth.currentUser;

      if (!currentPassword || !newPassword || !confirmNewPassword) {
        showMessage({
          message: 'All fields are required',
          type: 'danger',
        });
        return;
      }

      if (!validatePassword(newPassword)) {
        showMessage({
          message:
            'Password must be at least 8 characters long and contain uppercase letter and number',
          type: 'danger',
        });
        return;
      }

      if (newPassword !== confirmNewPassword) {
        showMessage({
          message: 'New passwords do not match',
          type: 'danger',
        });
        return;
      }

      // Reauthenticate
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword,
      );
      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, newPassword);

      showMessage({
        message: 'Password updated successfully',
        type: 'success',
      });
      navigation.goBack();
    } catch (error) {
      showMessage({
        message: error.message || 'Failed to update password',
        type: 'danger',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Ionicons
            name="arrow-back"
            size={20}
            color="white"
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Change Password</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Change your password here.</Text>
        </View>
        <Input
          label="Password"
          placeholder="Enter your previous password"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry
        />
        <Gap height={20} />
        <Input
          label="New Password"
          placeholder="Enter your new password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />
        <Gap height={20} />
        <Input
          label="Confirm new Password"
          placeholder="Must match the new password"
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleUpdatePassword}>
          <Text style={styles.updateButtonText}>Update password</Text>
        </TouchableOpacity>
      </View>
      {isLoading && <Loading />}
    </>
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
    fontSize: 16,
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
    fontSize: 11,
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
