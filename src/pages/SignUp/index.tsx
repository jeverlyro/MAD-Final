import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Input} from '../../molecules';
import {Gap} from '../../atoms';
import {Button} from '../../atoms';
import {useNavigation} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth, db} from '../../config/firebase';
import {doc, setDoc} from 'firebase/firestore';

const SignUp = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, confirmPassword] = useState('');
  const fbAuth = auth;

  const createUser = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        fbAuth,
        email,
        password,
      );
      const user = userCredential.user;

      // Add user data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: email,
        name: name,
        password: password,
      });

      showMessage({
        message: 'Create account succesfully, now you can Log In',
        type: 'success',
      });
      navigation.replace('SignIn');
    } catch (error) {
      const errorMessage = error.message;
      showMessage({
        message: errorMessage,
        type: 'danger',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
      <Text style={styles.subHeader}>
        Get started in a few clicks and you are ready to go !
      </Text>
      <Gap height={40} />
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
        <Gap height={22} />
        <Input
          label="Confirm password"
          placeholder="Confirm your password"
          secureTextEntry={true}
          value={confirm}
          onChangeText={text => confirmPassword(text)}
        />
      </View>
      <Gap height={32} />
      <Button
        color="#5046E5"
        textColor="white"
        onPress={createUser}
        text="Create Account"
      />
      <Gap height={26} />
      <View style={styles.footer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.touchableLogin}> Log in</Text>
        </TouchableOpacity>
      </View>
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
    fontFamily: 'Inter-SemiBold',
    marginLeft: 23,
  },
  subHeader: {
    fontSize: 16,
    color: 'white',
    marginLeft: 23,
    fontFamily: 'Inter-Regular',
    marginTop: 5,
    width: 350,
  },
  wrapper: {
    marginHorizontal: 22,
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
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
});
