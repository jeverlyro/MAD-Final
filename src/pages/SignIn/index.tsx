import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Input} from '../../molecules';
import {Gap} from '../../atoms';
import {Button} from '../../atoms';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {showMessage} from 'react-native-flash-message';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../config/firebase';

const SignIn = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        setLoading(false);
        navigation.replace('Home');
        showMessage({
          message: 'Login Succesfully',
          type: 'success',
        });
      })
      .catch(error => {
        setLoading(false);
        showMessage({
          message:
            'Log in failed, make sure your email and password are correct',
          type: 'danger',
        });
      });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.header}>Log In</Text>
          <Text style={styles.subHeader}>
            Welcome back, glad to see you again!
          </Text>
          <Gap height={80} />
          <Input
            label="Your email"
            placeholder="Enter your email here"
            onChangeText={text => setEmail(text)}
          />
          <Gap height={16} />
          <Input
            label="Your password"
            placeholder="Enter your password here"
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
          />
        </View>
        <Gap height={30} />
        <Button
          color="#5046E5"
          text="Sign In"
          textColor="white"
          onPress={handleLogin}
        />
        <Gap height={30} />
        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>Or continue with</Text>
          <View style={styles.line} />
        </View>
        <Gap height={45} />
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.icon}>
            <Ionicons name="logo-facebook" size={24} color="#282A37" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <Ionicons name="logo-google" size={24} color="#282A37" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <Ionicons name="logo-twitter" size={24} color="#282A37" />
          </TouchableOpacity>
        </View>
        <Gap height={45} />
        <View style={styles.footer}>
          <Text style={styles.loginText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.touchableLogin}> Create one</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  header: {
    fontSize: 32,
    color: 'white',
    fontFamily: 'Inter-SemiBold',
  },
  subHeader: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Inter-Regular',
    marginTop: 8,
  },
  wrapper: {
    margin: 23,
  },
  loginText: {
    color: 'white',
    fontFamily: 'Inter-Medium',
  },
  touchableLogin: {
    color: '#5046E5',
    fontFamily: 'Inter-Medium',
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
    backgroundColor: 'white',
  },
  dividerText: {
    color: 'white',
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
});
