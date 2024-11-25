import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import Card from '../../../../molecules/card';
import {BottomNavbar} from '../../../../molecules';
import {usePlans} from '../../../../context';
import {auth} from '../../../../config/firebase';

const Plans = () => {
  const navigation = useNavigation();
  const {savePlan, selectedItems} = usePlans();
  const [showNotification, setShowNotification] = useState(false);

  const handleSavePlan = async () => {
    try {
      const plan = {
        barebone: selectedItems.barebone,
        switches: selectedItems.switches,
        keycaps: selectedItems.keycaps,
        additional: selectedItems.additional,
        userId: auth.currentUser?.uid,
        createdAt: new Date().toISOString(),
      };
      await savePlan(plan);
      navigation.navigate('Simulation');
    } catch (error) {
      console.error('Error saving plan:', error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="white"
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          />
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Make Your Plans</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {[
            {
              title: 'Choose your barebone kit',
              targetPage: 'Page3',
              type: 'barebone',
            },
            {
              title: 'Choose your switches',
              targetPage: 'Page4',
              type: 'switches',
            },
            {
              title: 'Choose your keycaps',
              targetPage: 'Page5',
              type: 'keycaps',
            },
            {title: 'Additional', targetPage: 'Page6', type: 'additional'},
          ].map((item, index) => (
            <Card
              key={index}
              title={item.title}
              targetPage={item.targetPage}
              type={item.type}
            />
          ))}
          <TouchableOpacity style={styles.saveButton} onPress={handleSavePlan}>
            <Text style={styles.saveButtonText}>Save plan</Text>
          </TouchableOpacity>
        </ScrollView>
        {showNotification && (
          <View style={styles.notification}>
            <Text style={styles.notificationText}>
              Plan saved successfully!
            </Text>
          </View>
        )}
      </View>
      <BottomNavbar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121927',
    paddingHorizontal: 20,
  },
  headerContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    padding: 'auto',
  },
  header: {
    flexDirection: 'row',
  },
  headerTitle: {
    fontSize: 26,
    fontFamily: 'Lexend-Bold',
    color: 'white',
    paddingHorizontal: 'auto',
    textAlign: 'center',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#222C41',
    opacity: 0.5,
    marginVertical: 5,
  },
  scrollContainer: {
    marginTop: 10,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#5046E5',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Lexend-Regular',
  },
  notification: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: '#5046E5',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  notificationText: {
    color: 'white',
    fontFamily: 'Lexend-Regular',
  },
});

export default Plans;
