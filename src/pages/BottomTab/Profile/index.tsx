import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {BottomNavbar} from '../../../molecules';
import {showMessage} from 'react-native-flash-message';
import {auth, db} from '../../../config/firebase';
import {useUser} from '../../../context/UserContext';
import {doc, updateDoc, getDoc} from 'firebase/firestore';
import {onSnapshot} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PLACEHOLDER_IMAGE =
  'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg';

const ProfileScreen = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const {profileImage, setProfileImage} = useUser();
  const [userName, setUserName] = useState('');
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
            setUserName(userData.name || '');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  const displayImage = selectedImage || profileImage || PLACEHOLDER_IMAGE;

  const handleLogout = async () => {
    try {
      await auth.signOut();
      await AsyncStorage.multiRemove([
        'savedEmail',
        'savedPassword',
        'isAuthenticated',
      ]);
      navigation.replace('Onboarding');
    } catch (error) {
      console.error('Logout error:', error);
    }
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

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      return;
    }

    const userRef = doc(db, 'users', user.uid);
    const unsubscribe = onSnapshot(userRef, doc => {
      if (doc.exists()) {
        setProfileImage(doc.data().profileImage);
      }
    });

    return () => unsubscribe();
  }, []);

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

  const handleDeleteImage = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        profileImage: 'https://via.placeholder.com/120',
      });
      showMessage({
        message: 'Profile image deleted successfully',
        type: 'success',
        icon: 'info',
      });
    } catch (error) {
      console.error('Error deleting profile image:', error);
      showMessage({
        message: 'Failed to delete profile image',
        type: 'danger',
      });
    }
  };

  useEffect(() => {
    if (!displayImage) {
      setSelectedImage(PLACEHOLDER_IMAGE);
    }
  }, [displayImage]);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>My Profile</Text>

        <TouchableOpacity onPress={handleSelectImage}>
          <Image
            source={{
              uri: displayImage ? displayImage : PLACEHOLDER_IMAGE,
            }}
            style={styles.profileImage}
            defaultSource={require('../../../assets/placeholder.jpg')}
            onError={() => {
              setSelectedImage(PLACEHOLDER_IMAGE);
            }}
          />
        </TouchableOpacity>
        <Text style={styles.usernameText}>{userName}</Text>

        <View style={styles.divider} />

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PersonalInfo')}>
          <Ionicons name="person" size={15} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>Personal Info</Text>
          <Ionicons
            name="chevron-forward"
            size={17}
            color="#fff"
            style={styles.arrowIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Edit')}>
          <Ionicons
            name="settings"
            size={15}
            color="#fff"
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Edit Profile</Text>
          <Ionicons
            name="chevron-forward"
            size={17}
            color="#fff"
            style={styles.arrowIcon}
          />
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('About')}>
          <Ionicons name="shield" size={15} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>About</Text>
          <Ionicons
            name="chevron-forward"
            size={17}
            color="#fff"
            style={styles.arrowIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Ionicons
            name="exit"
            size={15}
            color="#fff"
            style={styles.exitButton}
          />
          <Text style={styles.buttonText}>Sign Out</Text>
          <Ionicons
            name="chevron-forward"
            size={17}
            color="#fff"
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      </View>
      <BottomNavbar />
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121927',
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    color: 'white',
    paddingBottom: 50,
    fontFamily: 'Lexend-Bold',
  },
  icon: {
    backgroundColor: '#5046E5',
    padding: 10,
    borderRadius: 10,
  },
  arrowIcon: {
    alignItems: 'flex-end',
    marginLeft: 'auto',
  },
  divider: {
    width: '80%',
    height: 0.5,
    backgroundColor: '#222C41',
    opacity: 0.5,
    marginVertical: 5,
  },
  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 10,
    borderColor: '#5046E5',
  },
  usernameText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Lexend-Bold',
    paddingTop: 20,
    paddingBottom: 53,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginVertical: 10,
    justifyContent: 'flex-start',
  },
  exitButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    marginLeft: 15,
    marginBottom: 5,
    fontFamily: 'Lexend-Medium',
  },
});
