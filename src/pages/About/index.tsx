import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {getFirestore, doc, getDoc} from 'firebase/firestore';

const AboutScreen: React.FC = () => {
  const navigation = useNavigation();
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      const db = getFirestore();
      const docRef = doc(db, 'About', 'Details');
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAboutData(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document: ', error);
      }
    };

    fetchAboutData();
  }, []);

  if (!aboutData) {
    return (
      <View style={styles.container}>
        <Text style={{color: 'white'}}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={20}
          color="white"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>{aboutData.headerTitle}</Text>
      </View>

      <View style={styles.infoBox} />
      <Text style={styles.aboutTitle}>{aboutData.aboutTitle}</Text>

      <View style={styles.separator} />

      {aboutData.description.map((paragraph, index) => (
        <Text key={index} style={styles.aboutText}>
          {paragraph}
        </Text>
      ))}
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
