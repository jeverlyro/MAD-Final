import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {BottomNavbar} from '../../../../molecules';

const SimScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mod Plan</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.noPlansText}>You do not have any plans yet.</Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('Page2')}
          accessibilityLabel="Add new plan">
          <Ionicons name="add" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <BottomNavbar style={styles.bottomNavbar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121927',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
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
    fontFamily: 'DM-Sans, sans-serif',
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
    fontFamily: 'DM-Sans, sans-serif',
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
  bottomNavbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#121927',
    borderTopWidth: 1,
    borderTopColor: '#5046E5',
  },
});

export default SimScreen;
