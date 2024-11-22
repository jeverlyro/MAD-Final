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
              // Handle load errors by falling back to placeholder
              setSelectedImage(PLACEHOLDER_IMAGE);
            }}
          />
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          {tempImage && (
            <TouchableOpacity
              style={[styles.iconButton, {backgroundColor: '#5046E5'}]}
              onPress={handleSaveImage}>
              <Ionicons name="save-outline" size={24} color="#fff" />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.iconButton, styles.deleteButton]}
            onPress={handleDeleteImage}>
            <Ionicons name="trash" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.usernameText}>{userName}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Edit')}>
          <Ionicons name="person" size={20} color="#fff" />
          <Text style={styles.buttonText}>Personal Info</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('About')}>
          <Ionicons name="shield" size={20} color="#fff" />
          <Text style={styles.buttonText}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.exitButton} onPress={handleLogout}>
          <Ionicons name="exit" size={20} color="#fff" />
          <Text style={styles.buttonText}>Sign Out</Text>
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
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    paddingBottom: 31,
    fontFamily: 'Lexend-Bold',
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
    marginTop: 20,
    backgroundColor: '#2C3545',
    width: '10%',
    justifyContent: 'center',
  },
  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 5,
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
    backgroundColor: '#5046E5',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '90%',
    marginVertical: 10,
    justifyContent: 'flex-start',
  },
  exitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF3B30',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '90%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 15,
    fontFamily: 'Poppins-Medium',
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
  tabText: {
    fontFamily: 'Lexend-Regular',
    color: 'white',
    fontSize: 10,
    marginTop: 4,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
});
