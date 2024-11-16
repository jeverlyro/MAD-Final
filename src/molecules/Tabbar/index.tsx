import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const Tabbar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.tabBar}>
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigation.replace('Home')}>
        <Ionicons name="home-outline" size={28} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigation.replace('Learn')}>
        <Ionicons name="book-outline" size={28} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem}>
        <Ionicons name="settings" size={28} color="#5046E5" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigation.replace('Profile')}>
        <Ionicons name="person-outline" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    height: 80,
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
  },
});

export default Tabbar;
