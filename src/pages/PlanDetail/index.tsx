// src/screens/PlanDetail/index.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BottomNavbar} from '../../molecules';

const PlanDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {plan} = route.params;

  const renderComponent = (item, title) => {
    if (!item) {
      return null;
    }

    return (
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          {item.image && (
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="contain"
            />
          )}
        </View>
        <View style={styles.cardDetails}>
          <Text style={styles.componentTitle}>{title}</Text>
          <Text style={styles.cardText}>{item.title}</Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Plan Details</Text>
        </View>
        <View style={styles.divider} />

        <ScrollView style={styles.content}>
          {renderComponent(plan.barebone, 'Barebone Kit')}
          {renderComponent(plan.switches, 'Switches')}
          {renderComponent(plan.keycaps, 'Keycaps')}
          {renderComponent(plan.additional, 'Additional')}
        </ScrollView>
      </View>
      <BottomNavbar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121927',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  backButton: {
    marginTop: 5,
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 26,
    fontFamily: 'Lexend-Bold',
    color: 'white',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#222C41',
    opacity: 0.5,
    marginVertical: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  card: {
    backgroundColor: '#1A1F2E',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 120,
  },
  imageContainer: {
    backgroundColor: '#3A3F4B',
    width: 120,
    height: 90,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cardDetails: {
    flex: 1,
    marginLeft: 15,
  },
  componentTitle: {
    color: '#8F92A1',
    fontSize: 14,
    fontFamily: 'Lexend-Regular',
    marginBottom: 5,
  },
  cardText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Lexend-Regular',
  },
});

export default PlanDetail;
