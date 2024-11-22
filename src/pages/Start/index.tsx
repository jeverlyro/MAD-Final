import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {Button} from '../../atoms';
import {useNavigation} from '@react-navigation/native';
import {Gap} from '../../atoms';
import LottieView from 'lottie-react-native';
import React from 'react';

const {width} = Dimensions.get('window');
const Start = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/lottie/Keyboard.json')}
        style={styles.image}
        autoPlay
        loop
      />
      <Text style={styles.title}>Explore the app</Text>
      <Text style={styles.description}>
        Now you can learn about modding a mechanical keyboard by your own hands!
      </Text>
      <Gap height={76} />
      <Button
        text="Sign In"
        color="#5046E5"
        textColor="#fff"
        onPress={() => navigation.replace('SignIn')}
      />
      <Gap height={20} />
      <Button
        text="Create account"
        color="#fff"
        textColor="#000"
        onPress={() => navigation.replace('SignUp')}
      />
      <Gap height={240} />
    </View>
  );
};

export default Start;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#121927',
  },
  image: {
    width: width * 0.9,
    height: width,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
    textAlign: 'center',
    color: '#5046E5',
    fontFamily: 'Lexend-SemiBold',
  },
  description: {
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 64,
    fontFamily: 'Lexend-Regular',
  },
});
