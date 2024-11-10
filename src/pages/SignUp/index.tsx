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
      <Text style={styles.subHeader}>
        Get started in a few clicks and you are ready to go !
      </Text>
      <Gap height={20} />
      <View style={styles.wrapper}>
        <Input label="Email" placeholder="Enter your email" />
        <Gap height={20} />
        <Input label="Name" placeholder="Enter your name" />
        <Gap height={20} />
        <Input
          label="Password"
          placeholder="Must contain more than 6 characters"
          secureTextEntry={true}
        />
        <Gap height={20} />
        <Input
          label="Confirm password"
          placeholder="Confirm your password"
          secureTextEntry={true}
        />
      </View>
      <Gap height={40} />
      <Button
        color="#5046E5"
        text="Create account"
        textColor="#FFFFFF"
        onPress={() => navigation.replace('SignIn')}
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
});
