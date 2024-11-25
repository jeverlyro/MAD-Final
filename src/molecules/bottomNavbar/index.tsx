import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  Adjust,
  Document,
  HomeIcon,
  Profile,
  AdjustHighlight,
  DocumentHighlight,
  HomeIconHighlight,
  ProfileHighlight,
} from '../../assets/icons';

const BottomNavbar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const homeScreens = ['Home', 'News', 'Reviews', 'Recommended'];
  const isHomeScreen = homeScreens.includes(route.name);

  const handlePress = (label: string) => {
    navigation.navigate(label);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={() => handlePress('Home')}>
        {isHomeScreen ? <HomeIconHighlight /> : <HomeIcon />}
        <Text style={[styles.text, isHomeScreen && styles.activeText]}>
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={() => handlePress('Learn')}>
        {route.name === 'Learn' ? <DocumentHighlight /> : <Document />}
        <Text
          style={[styles.text, route.name === 'Learn' && styles.activeText]}>
          Learn
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={() => handlePress('Simulation')}>
        {route.name === 'Simulation' ? <AdjustHighlight /> : <Adjust />}
        <Text
          style={[
            styles.text,
            route.name === 'Simulation' && styles.activeText,
          ]}>
          Plan
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={() => handlePress('Profile')}>
        {route.name === 'Profile' ? <ProfileHighlight /> : <Profile />}
        <Text
          style={[styles.text, route.name === 'Profile' && styles.activeText]}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#121927',
    paddingVertical: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    fontFamily: 'Lexend-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: 4,
  },
  activeText: {
    color: '#5046E5',
  },
});

export default BottomNavbar;
