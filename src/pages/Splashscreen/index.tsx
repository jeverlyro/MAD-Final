import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View, Animated} from 'react-native';
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
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace('Start');
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation, scaleAnim]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={Logo}
        style={[styles.logo, {transform: [{scale: scaleAnim}]}]}
      />
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
    backgroundColor: '#0C0C0C',
  },
  logo: {
    width: 335,
    height: 65,
    marginBottom: 30,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 13,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
});
