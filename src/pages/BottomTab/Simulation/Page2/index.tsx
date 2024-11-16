import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Card from '../../../../molecules/card';
import {BottomNavbar} from '../../../../molecules';

const Plans: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Make Your Plans</Text>
      </View>

      <View style={styles.divider} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {[
          {title: 'Choose your barebone kit', targetPage: 'Page3'},
          {title: 'Choose your switches', targetPage: 'Page4'},
          {title: 'Choose your keycaps', targetPage: 'Page5'},
          {title: 'Additional', targetPage: 'Page6'},
        ].map((item, index) => (
          <Card key={index} title={item.title} targetPage={item.targetPage} />
        ))}

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save plan</Text>
        </TouchableOpacity>
      </ScrollView>
      <BottomNavbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121927',
    paddingTop: 20,
  },
  header: {
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
    width: '90%',
    height: 1,
    backgroundColor: '#5046E5',
    opacity: 0.5,
    alignSelf: 'center',
    marginVertical: 10,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#5046E5',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
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

export default Plans;
