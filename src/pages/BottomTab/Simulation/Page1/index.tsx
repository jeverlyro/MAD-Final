import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const SimScreen: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mod Plan</Text>
      </View>

      <View style={styles.divider} />

      <Text style={styles.noPlansText}>You did not have any plans yet.</Text>

      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>

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
    </View>
  );
};

export default SimScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121927',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 26,
    fontFamily: 'DM-Sans',
    color: 'white',
    fontWeight: 'bold',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#5046E5',
    opacity: 0.5,
    marginVertical: 5,
  },
  noPlansText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'DM-Sans',
    marginTop: 15,
  },
  addButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: '#5046E5',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#5046E5',
    shadowRadius: 15,
    elevation: 15,
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    height: 80,
    width: '110%',
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

export default SimScreen;
