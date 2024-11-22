import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Input, Loading} from '../../molecules';
import {Gap} from '../../atoms';
import {Button} from '../../atoms';
import {useNavigation} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {db} from '../../config/firebase';
import {doc, setDoc} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import {sendEmailVerification} from 'firebase/auth';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = password => {
    return (
      password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)
    );
  };

  const doPasswordsMatch = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  const validateName = name => {
    return name.trim().length >= 2;
  };

  const handleSignUp = async () => {
    try {
      setLoading(true);

      if (!email || !password || !name) {
        showMessage({
          message: 'All fields are required',
          type: 'danger',
          icon: 'danger',
        });
        return;
      }

      if (!validateEmail(email)) {
        showMessage({
          message: 'Please enter a valid email address',
          type: 'danger',
          icon: 'danger',
        });
        return;
      }

      if (!validatePassword(password)) {
        showMessage({
          message:
            'Password must be at least 8 characters with 1 uppercase letter and 1 number',
          type: 'danger',
          icon: 'danger',
        });
        return;
      }

      if (!validateName(name)) {
        showMessage({
          message: 'Name must be at least 2 characters long',
          type: 'danger',
          icon: 'danger',
        });
        return;
      }

      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await sendEmailVerification(userCredential.user);

      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: email.toLowerCase(),
        name: name.trim(),
        createdAt: new Date().toISOString(),
        emailVerified: false,
      });

      showMessage({
        message: 'Account created! Please verify your email.',
        type: 'success',
        icon: 'success',
        backgroundColor: '#5046E5',
      });

      navigation.replace('VerifyEmail', {email});
    } catch (error) {
      let errorMessage = 'Failed to create account';

      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email is already registered';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email format';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak';
      }

      showMessage({
        message: errorMessage,
        type: 'danger',
        icon: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
      <Text style={styles.subHeader}>
        Get started in a few clicks and you are ready to go !
      </Text>
      <Gap height={20} />
      <View style={styles.wrapper}>
        <Input
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <Gap height={22} />
        <Input
          label="Name"
          placeholder="Enter your name"
          value={name}
          onChangeText={text => setName(text)}
        />
        <Gap height={22} />
        <Input
          label="Password"
          placeholder="Must contain more than 6 characters"
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <Gap height={20} />
        <Input
          label="Confirm password"
          placeholder="Confirm your password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
          error={
            password &&
            confirmPassword &&
            !doPasswordsMatch(password, confirmPassword)
          }
          errorText="Passwords do not match"
        />
      </View>
      <Gap height={62} />
      <Button
        color="#5046E5"
        textColor="white"
        onPress={handleSignUp}
        text="Create Account"
      />
      <Gap height={26} />
      <View style={styles.footer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.touchableLogin}> Log in</Text>
        </TouchableOpacity>
      </View>
      {loading && <Loading />}
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#121927',
  },
  header: {
    fontSize: 36,
    color: 'white',
    fontFamily: 'Lexend-SemiBold',
    marginLeft: 23,
  },
  subHeader: {
    fontSize: 16,
    color: 'white',
    marginLeft: 23,
    fontFamily: 'Lexend-Regular',
    marginTop: 5,
    width: 350,
    marginBottom: 30,
  },
  wrapper: {
    marginHorizontal: 22,
  },
  loginText: {
    color: 'white',
    fontFamily: 'Lexend-Medium',
  },
  touchableLogin: {
    color: '#5046E5',
    fontFamily: 'Lexend-Medium',
  },
  footer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
});
