import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {BottomNavbar} from '../../../molecules';
import {showMessage} from 'react-native-flash-message';
import {auth} from '../../../config/firebase';

const ProfileScreen = () => {
  const [profileImage, setProfileImage] = useState(
    'https://via.placeholder.com/120',
  );

  const navigation = useNavigation();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      // Reset navigation stack to prevent going back
      navigation.reset({
        index: 0,
        routes: [{name: 'Start'}],
      });
    } catch (error) {
      console.error('Sign out error:', error);
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };

  const handleSelectImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        showMessage({
          message: 'No image selected',
          type: 'info',
          icon: 'info',
          backgroundColor: '#5046E5',
          duration: 2000,
        });
      } else if (response.errorCode) {
        showMessage({
          message: 'Error',
          description: response.errorMessage || 'Something went wrong',
          type: 'danger',
          icon: 'danger',
          duration: 2000,
        });
      } else if (response.assets && response.assets.length > 0) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>My Profile</Text>

        <TouchableOpacity onPress={handleSelectImage}>
          <Image source={{uri: profileImage}} style={styles.profileImage} />
        </TouchableOpacity>

        <Text style={styles.usernameText}>I Kadek Tresna Jeverly</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Edit')}>
          <Ionicons name="person" size={20} color="#fff" />
          <Text style={styles.buttonText}>Personal Info</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Appareance')}>
          <Ionicons name="body" size={20} color="#fff" />
          <Text style={styles.buttonText}>Appearance</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('About')}>
          <Ionicons name="shield" size={20} color="#fff" />
          <Text style={styles.buttonText}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.exitButton} onPress={handleSignOut}>
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
  title: {
    fontSize: 24,
    color: 'white',
    paddingBottom: 31,
    fontFamily: 'Lexend-Bold',
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
    width: '80%',
    marginVertical: 10,
    justifyContent: 'flex-start',
  },
  exitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF3D71',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
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
});
