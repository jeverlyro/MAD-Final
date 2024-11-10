import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.greetingText}>
        <Text style={styles.miniText}>Hello,</Text>
      </Text>
      <Text style={styles.usernameText}>I Kadek Tresna Jeverly !</Text>
      <View style={styles.tabBar}>
        <View style={styles.tabItem}>
          <Ionicons
            name="home-outline"
            size={28}
            color="white"
            onPress={() => navigation.replace('Home')}
          />
          <Text style={styles.tabText}>Home</Text>
        </View>
        <View style={styles.tabItem}>
          <Ionicons
            name="book-outline"
            size={28}
            color="white"
            onPress={() => navigation.replace('Learn')}
          />
          <Text style={styles.tabText}>Learn</Text>
        </View>
        <View style={styles.tabItem}>
          <Ionicons
            name="settings-outline"
            size={28}
            color="white"
            onPress={() => navigation.replace('Simulation')}
          />
          <Text style={styles.tabText}>Simulation</Text>
        </View>
        <View style={styles.tabItem}>
          <Ionicons name="person" size={28} color="#5046E5" />
          <Text style={styles.tabText}>Profile</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
    paddingTop: 50,
  },
  greetingText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'white',
  },
  miniText: {
    color: '#5046E5',
  },
  usernameText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    height: 80,
    width: 420,
    backgroundColor: '#121212',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabText: {
    fontFamily: 'Inter-Regular',
    color: 'white',
    fontSize: 10,
    marginTop: 4,
  },
});
