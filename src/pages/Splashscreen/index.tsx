import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Logo} from '../../assets/icons';
import {signInWithEmailAndPassword} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {auth} from '../../config/firebase';

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
    const checkAuthStatus = async () => {
      try {
        // Start animation
        Animated.timing(scaleAnim, {
          toValue: 0.3,
          duration: 400,
          useNativeDriver: true,
        }).start();

        const savedEmail = await AsyncStorage.getItem('savedEmail');
        const savedPassword = await AsyncStorage.getItem('savedPassword');
        const isAuthenticated = await AsyncStorage.getItem('isAuthenticated');

        if (savedEmail && savedPassword && isAuthenticated === 'true') {
          try {
            // Attempt auto-login
            await signInWithEmailAndPassword(auth, savedEmail, savedPassword);

            // Add slight delay for animation
            setTimeout(() => {
              navigation.replace('Home');
            }, 600);
          } catch (error) {
            console.error('Auto-login failed:', error);
            // Clear credentials on failed auto-login
            await AsyncStorage.multiRemove([
              'savedEmail',
              'savedPassword',
              'isAuthenticated',
            ]);
            setTimeout(() => {
              navigation.replace('Onboarding');
            }, 600);
          }
        } else {
          // No saved credentials, go to onboarding
          setTimeout(() => {
            navigation.replace('Onboarding');
          }, 600);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setTimeout(() => {
          navigation.replace('Onboarding');
        }, 600);
      }
    };

    checkAuthStatus();
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
