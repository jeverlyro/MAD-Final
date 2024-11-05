import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Logo} from '../../assets';

type RootStackParamList = {
  Splash: undefined;
  Start: undefined;
};

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Splash'
>;

interface SplashProps {
  navigation: SplashScreenNavigationProp;
}

const Splash: React.FC<SplashProps> = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Start');
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.text}>Enhance your modding experience.</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  logo: {
    width: 670 / 2,
    height: 130 / 2,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 13,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
});
