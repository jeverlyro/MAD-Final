import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const AboutScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={20}
          color="white"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>About</Text>
      </View>

      <View style={styles.infoBox} />
      <Text style={styles.aboutTitle}>About the app</Text>

      <View style={styles.separator} />

      <Text style={styles.aboutText}>
        Welcome to our app, developed by UDL Corp as part of our Mobile App
        Development class. This application was created to explore and simulate
        the mechanical keyboard modification.
      </Text>
      <Text style={styles.aboutText}>
        Our team is committed to delivering a unique experience through this
        project, combining creativity, technical expertise, and collaboration.
        We hope you enjoy exploring our app and appreciate the effort we've put
        into making this project.
      </Text>
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121927',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Lexend-Bold',
    marginLeft: 10,
  },
  infoBox: {
    backgroundColor: '#0F1522',
    width: '110%',
    marginLeft: -20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  aboutTitle: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Lexend-Bold',
    textAlign: 'center',
    paddingVertical: 18,
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#222C41',
    width: '100%',
  },
  aboutText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Lexend-Regular',
    textAlign: 'left',
    marginTop: 10,
    lineHeight: 18,
  },
});
