import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Input, Loading} from '../../molecules';
import {Gap} from '../../atoms';
import {Button} from '../../atoms';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {showMessage} from 'react-native-flash-message';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const checkSavedCredentials = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem('savedEmail');
        const savedPassword = await AsyncStorage.getItem('savedPassword');
        const isAuthenticated = await AsyncStorage.getItem('isAuthenticated');

        if (savedEmail && savedPassword && isAuthenticated === 'true') {
          setEmail(savedEmail);
          setPassword(savedPassword);
          setRememberMe(true);
        }
      } catch (error) {
        console.error('Error checking saved credentials:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSavedCredentials();
  }, []);

  const handleRememberMeToggle = () => {
    setRememberMe(prevState => !prevState);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      showMessage({
        message: 'Error',
        description: 'Please fill in all fields',
        type: 'danger',
      });
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      if (rememberMe) {
        await AsyncStorage.multiSet([
          ['savedEmail', email],
          ['savedPassword', password],
          ['isAuthenticated', 'true'],
        ]);
      } else {
        await AsyncStorage.multiRemove([
          'savedEmail',
          'savedPassword',
          'isAuthenticated',
        ]);
      }

      showMessage({
        message: 'Success',
        description: 'Login successful',
        type: 'success',
        icon: 'success',
        backgroundColor: '#5046E5',
        duration: 1000,
      });

      navigation.replace('Home');
    } catch (error) {
      showMessage({
        message: 'Login Failed',
        description: error.message,
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.header}>Log In</Text>
          <Text style={styles.subHeader}>
            Welcome back, glad to see you again!
          </Text>
          <Gap height={65} />
          <Input
            label="Your email"
            placeholder="Enter your email here"
            onChangeText={text => setEmail(text)}
          />
          <Gap height={19} />
          <Input
            label="Your password"
            placeholder="Enter your password here"
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
          />
          <View style={styles.rememberMeContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={handleRememberMeToggle}>
              <Ionicons
                name={rememberMe ? 'checkbox' : 'square-outline'}
                size={20}
                color="#5046E5"
              />
            </TouchableOpacity>
            <Text style={styles.rememberMeText}>Remember Me</Text>
          </View>
        </View>
        <Gap height={42} />
        <Button
          color="#5046E5"
          text="Sign In"
          textColor="white"
          onPress={handleLogin}
        />
        <Gap height={40} />
        <View style={styles.footer}>
          <Text style={styles.loginText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.touchableLogin}> Create one</Text>
          </TouchableOpacity>
        </View>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#121927',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  header: {
    fontSize: 32,
    color: 'white',
    fontFamily: 'Lexend-SemiBold',
  },
  subHeader: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Lexend-Regular',
    marginTop: 8,
  },
  wrapper: {
    margin: 23,
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
    marginTop: 10,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#FFFFFF',
  },
  dividerText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
    marginHorizontal: 8,
    fontSize: 11,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    backgroundColor: '#ffffff',
    borderRadius: 30,
    padding: 10,
    marginHorizontal: 10,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkbox: {
    marginRight: 5,
  },
  rememberMeText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Lexend-Regular',
  },
});
