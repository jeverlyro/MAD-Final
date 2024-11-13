import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Logo} from '../../assets/icons';

type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
};

type SplashScreenNavigationProp = NativeStackNavigationProp<
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
      toValue: 0.3,
      duration: 400,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 600);

    return () => clearTimeout(timer);
  }, [navigation, scaleAnim]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={Logo}
        style={[{transform: [{scale: scaleAnim}]}]}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121927',
  },
});
