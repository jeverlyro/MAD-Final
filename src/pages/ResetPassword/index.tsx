import {StyleSheet, Text, View} from 'react-native';
import {Input, Loading} from '../../molecules';
import {Gap, Button} from '../../atoms';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import {sendPasswordResetEmail} from 'firebase/auth';
import {auth} from '../../config/firebase';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    try {
      setLoading(true);

      if (!email) {
        showMessage({
          message: 'Please enter your email address',
          type: 'danger',
        });
        return;
      }

      await sendPasswordResetEmail(auth, email);

      showMessage({
        message: 'Password reset email sent! Check your inbox',
        type: 'success',
      });

      navigation.goBack();
    } catch (error) {
      showMessage({
        message: error.message || 'Failed to send reset email',
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>
        Enter your email and we'll send you instructions to reset your password
      </Text>
      <Gap height={24} />
      <View style={styles.inputContainer}>
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
      />
      </View>
      <Gap height={24} />

      <Button
        text="Send Reset Link"
        color="#5046E5"
        textColor="#FFFFFF"
        onPress={handleForgotPassword}
        disabled={loading}
      />

      {loading && <Loading />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121927',
  },
    inputContainer: {
        paddingHorizontal: 20,
    },
  title: {
    fontSize: 24,
    fontFamily: 'Lexend-Medium',
    textAlign: 'center',
    padding: 20,
    color: '#FFFFFF',
  },
  subtitle: {
    fontFamily: 'Lexend-Regular',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginTop: 8,
    color: '#fff',
  },
});

export default ForgotPassword;