import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import {doc, getDoc} from 'firebase/firestore';
import {auth, db} from '../../config/firebase';

const PersonalInfo: React.FC = () => {
  const [displayName, setDisplayName] = useState('');
  const [displayEmail, setDisplayEmail] = useState('');
  const [displayDOB, setDisplayDOB] = useState('');
  const [displayGender, setDisplayGender] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setDisplayName(userData.name || '');
            setDisplayEmail(userData.email || '');
            setDisplayDOB(userData.dateOfBirth || '');
            setDisplayGender(userData.gender || '');
          }
        } catch (error) {
          showMessage({
            message: 'Error',
            description: 'Failed to fetch user data',
            type: 'danger',
            icon: 'danger',
          });
        }
      }
    };

    fetchUserData();
  }, []);

  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Animated.View style={[styles.content, {opacity: fadeAnim}]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Personal Information</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            You can see your personal information here.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="person-circle" size={40} color="#5046E5" />
            <Text style={styles.cardTitle}>Profile Details</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Name</Text>
            <Text style={styles.infoValue}>{displayName}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{displayEmail}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Date of Birth</Text>
            <Text style={styles.infoValue}>{displayDOB}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Gender</Text>
            <Text style={styles.infoValue}>{displayGender}</Text>
          </View>
        </View>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121927',
  },
  content: {
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
    width: '120%',
    marginLeft: -20,
    paddingVertical: 5,
  },
  infoText: {
    fontSize: 11,
    color: 'white',
    fontFamily: 'Lexend-Regular',
    marginLeft: 20,
  },
  infoCard: {
    backgroundColor: '#1E2433',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Lexend-Bold',
    marginLeft: 12,
  },
  infoItem: {
    marginVertical: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#2A2F3E',
    marginVertical: 8,
  },
  infoLabel: {
    fontSize: 12,
    color: '#8F9BB3',
    fontFamily: 'Lexend-Regular',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Lexend-Medium',
  },
});

export default PersonalInfo;
