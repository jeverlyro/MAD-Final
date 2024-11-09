import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.insideContent}>
        <Text style={styles.greetingText}>
          <Text style={styles.miniText}>Hello,</Text>
        </Text>
        <Text style={styles.usernameText}>I Kadek Tresna Jeverly !</Text>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          <Text style={styles.sectionContent}>
            Check out the latest reviews on the best tech products.
          </Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Best Keyboards</Text>
          <Text style={styles.sectionContent}>
            Discover top-rated keyboards for coding, gaming, and more.
          </Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Getting Started</Text>
          <Text style={styles.sectionContent}>
            Learn how to get started with your new setup and tools.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.tabBar}>
        <View style={styles.tabItem}>
          <Ionicons name="home-sharp" size={28} color="#5046E5" />
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
          <Ionicons
            name="person-outline"
            size={28}
            color="white"
            onPress={() => navigation.replace('Profile')}
          />
          <Text style={styles.tabText}>Profile</Text>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  insideContent: {
    margin: 25,
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
    marginBottom: 20,
  },
  sectionContainer: {
    backgroundColor: '#1c1c1e',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: 'white',
    marginBottom: 5,
  },
  sectionContent: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#A9A9A9',
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    height: 80,
    width: '100%',
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
