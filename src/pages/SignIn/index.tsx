import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Input} from '../../molecules';
import {Gap} from '../../atoms';
import {Button} from '../../atoms';
import React from 'react';

const SignIn = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Log In</Text>
      <Gap height={72} />
      <View style={styles.wrapper}>
        <Input label="Email" placeholder="Your email" />
        <Gap height={22} />
        <Input label="Password" placeholder="Your password" />
      </View>
      <Gap height={78} />
      <Button color="#5046E5" text="Sign In" textColor="white" />
      <Gap height={26} />
      <View style={styles.footer}>
        <Text style={styles.loginText}>Doesn't have an account?</Text>
        <TouchableOpacity>
          <Text style={styles.touchableLogin}> Create one</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000',
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
