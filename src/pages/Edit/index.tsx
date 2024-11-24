import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import {doc, updateDoc, getDoc} from 'firebase/firestore';
import {auth, db} from '../../config/firebase';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {showMessage} from 'react-native-flash-message';
import {useUser} from '../../context/UserContext';
import {launchImageLibrary} from 'react-native-image-picker';

const PLACEHOLDER_IMAGE =
  'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg';

const Edit = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const {profileImage, setProfileImage} = useUser();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const user = auth.currentUser;
    if (user) {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setName(data.name || '');
        setEmail(data.email || '');
        setDateOfBirth(data.dateOfBirth || '');
        setGender(data.gender || '');
      }
    }
  };

  const displayImage = selectedImage || profileImage || PLACEHOLDER_IMAGE;

  const handleUpdate = async () => {
    if (!name || !email || !dateOfBirth || !gender) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        await updateDoc(docRef, {
          name,
          email,
          dateOfBirth,
          gender,
          updatedAt: new Date(),
        });
        Alert.alert('Success', 'Profile updated successfully');
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
    setLoading(false);
  };

  const updateProfileImageInDB = async base64Image => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        profileImage: `data:image/jpeg;base64,${base64Image}`,
      });

      setProfileImage(`data:image/jpeg;base64,${base64Image}`);
      showMessage({
        message: 'Profile image updated successfully',
        type: 'success',
        icon: 'success',
      });
    } catch (error) {
      console.error('Error updating profile image:', error);
      showMessage({
        message: 'Failed to update profile image',
        type: 'danger',
      });
    }
  };

  const handleSelectImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.5,
      includeBase64: true,
    };

    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        showMessage({
          message: 'No image selected',
          type: 'info',
          icon: 'info',
        });
        return;
      }

      if (response.errorCode) {
        showMessage({
          message: 'Image picker error: ' + response.errorMessage,
          type: 'danger',
        });
        return;
      }

      if (response.assets && response.assets[0].base64) {
        await updateProfileImageInDB(response.assets[0].base64);
      }
    });
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      setDateOfBirth(selectedDate.toISOString().split('T')[0]);
    }
  };

  useEffect(() => {
    if (!displayImage) {
      setSelectedImage(PLACEHOLDER_IMAGE);
    }
  }, [displayImage]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Information</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          You can update your personal information here.
        </Text>
      </View>

      <View style={styles.photo}>
        <Image
          source={{
            uri: displayImage ? displayImage : PLACEHOLDER_IMAGE,
          }}
          style={styles.profileImage}
          onError={() => {
            setSelectedImage(PLACEHOLDER_IMAGE);
          }}
        />
        <TouchableOpacity onPress={handleSelectImage}>
          <Text style={styles.photoChangeText}>Change Profile Picture</Text>
        </TouchableOpacity>
      </View>

      <View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor="#666"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date of Birth</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateButtonText}>
              {dateOfBirth || 'Select Date'}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity
              onPress
              style={[
                styles.genderButton,
                gender === 'Male' && styles.genderButtonActive,
              ]}
              onPress={() => setGender('Male')}>
              <Icon
                name="gender-male"
                size={20}
                color={gender === 'Male' ? '#fff' : '#666'}
              />
              <Text
                style={[
                  styles.genderButtonText,
                  gender === 'Male' && styles.genderButtonTextActive,
                ]}>
                Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.genderButton,
                gender === 'Female' && styles.genderButtonActive,
              ]}
              onPress={() => setGender('Female')}>
              <Icon
                name="gender-female"
                size={20}
                color={gender === 'Female' ? '#fff' : '#666'}
              />
              <Text
                style={[
                  styles.genderButtonText,
                  gender === 'Female' && styles.genderButtonTextActive,
                ]}>
                Female
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.updateButton, loading && styles.updateButtonDisabled]}
          onPress={handleUpdate}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.updateButtonText}>Update Profile</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

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
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: '#8F9BB3',
    marginBottom: 8,
    fontSize: 12,
    fontFamily: 'Lexend-Medium',
  },
  input: {
    backgroundColor: '#1E2433',
    borderRadius: 8,
    padding: 10,
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Lexend-Regular',
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
  dateButton: {
    backgroundColor: '#1E2433',
    borderRadius: 8,
    padding: 12,
  },
  dateButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Lexend-Regular',
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  genderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 8,
    flex: 1,
    backgroundColor: '#1E2433',
    borderRadius: 8,
  },
  genderButtonActive: {
    backgroundColor: '#5046E5',
  },
  genderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Lexend-Regular',
  },
  genderButtonTextActive: {
    fontFamily: 'Lexend-Medium',
  },
  photo: {
    marginVertical: 30,
    flexDirection: 'row',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  photoChangeText: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#5046E5',
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Lexend-Medium',
    margin: 'auto',
    marginLeft: 50,
  },
  updateButton: {
    backgroundColor: '#5046E5',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  updateButtonDisabled: {
    opacity: 0.7,
  },
  updateButtonText: {
    fontFamily: 'Lexend-Medium',
    color: '#fff',
    fontSize: 16,
  },
});

export default Edit;
