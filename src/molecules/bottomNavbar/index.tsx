import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Adjust, Document, HomeIcon, Profile} from '../../assets/icons';

const BottomNavbar = () => {
  const navigation = useNavigation();

  const handlePress = (screen: string) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePress('Home')}>
        <HomeIcon />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePress('Learn')}>
        <Document />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePress('Simulation')}>
        <Adjust />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePress('Profile')}>
        <Profile />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#121927',
  },
  button: {
    alignContent: 'center',
    justifyContent: 'center',
    height: 60,
  },
});

export default BottomNavbar;
