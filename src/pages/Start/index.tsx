import {StyleSheet, Text, View} from 'react-native';
import {Gap} from '../../atoms';
import React from 'react';
import Button from '../../atoms/button';

const Start = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Explore the app</Text>
      <Text style={styles.subHeader}>
        Now you can learn about modding a mechanical keyboard by your own hands!
      </Text>
      <Gap height={83} />
      <Button
        color="#5046E5"
        text="Sign In"
        textColor="white"
        onPress={() => navigation.navigate('SignIn')}
      />
      <Gap height={13} />
      <Button
        color="#ffffff"
        text="Create account"
        textColor="black"
        onPress={() => navigation.navigate('SignUp')}
      />
    </View>
  );
};

export default Start;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
  },
  header: {
    fontSize: 34,
    color: '#5046E5',
    fontFamily: 'Inter-ExtraBold',
    textAlign: 'center',
    alignSelf: 'center',
  },
  subHeader: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginHorizontal: 15,
    alignSelf: 'center',
  },
});
