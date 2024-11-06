import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Input} from '../../molecules';
import {Gap} from '../../atoms';
import {Button} from '../../atoms';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const SignUp = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
      <Gap height={40} />
      <View style={styles.wrapper}>
        <Input label="Email" placeholder="Enter your email" />
        <Gap height={22} />
        <Input label="Name" placeholder="Enter your name" />
        <Gap height={22} />
        <Input
          label="Password"
          placeholder="Must contain more than 8 characters"
          secureTextEntry={true}
        />
        <Gap height={22} />
        <Input
          label="Confirm password"
          placeholder="Confirm your password"
          secureTextEntry={true}
        />
      </View>
      <Gap height={26} />
      <Button color="#5046E5" text="Create account" textColor="white" />
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
    backgroundColor: '#0C0C0C',
  },
  header: {
    fontSize: 36,
    color: 'white',
    fontFamily: 'Inter-SemiBold',
    marginLeft: 23,
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
});
