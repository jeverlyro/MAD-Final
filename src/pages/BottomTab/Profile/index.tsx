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
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import FlashMessage from 'react-native-flash-message';

const ProfileScreen: React.FC = () => {
  const [profileImage, setProfileImage] = useState(
    'https://via.placeholder.com/120',
  );
  const navigation = useNavigation();

  const handleSelectImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        showMessage({
          message: 'User cancelled the process',
          description: 'No photo selected.',
          type: 'warning',
          icon: 'warning',
          duration: 2000,
        });
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Something went wrong');
      } else if (response.assets && response.assets.length > 0) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => {
          navigation.navigate('Start');
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      <TouchableOpacity onPress={handleSelectImage}>
        <Image source={{uri: profileImage}} style={styles.profileImage} />
      </TouchableOpacity>

      <Text style={styles.usernameText}>Vichers Rory</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Edit')}>
        <Ionicons name="person" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Personal Info</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Appareance')}>
        <Ionicons name="body" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Appearance</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('About')}>
        <Ionicons name="shield" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>About</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>

      <View style={styles.tabBar}>
        <View style={styles.tabItem}>
          <Ionicons
            name="home-outline"
            size={28}
            color="white"
            onPress={() => navigation.replace('Home')}
          />
          <Text style={styles.tabText} />
        </View>
        <View style={styles.tabItem}>
          <Ionicons
            name="book-outline"
            size={28}
            color="white"
            onPress={() => navigation.replace('Learn')}
          />
          <Text style={styles.tabText} />
        </View>
        <View style={styles.tabItem}>
          <Ionicons
            name="settings-outline"
            size={28}
            color="white"
            onPress={() => navigation.replace('Simulation')}
          />
          <Text style={styles.tabText} />
        </View>
        <View style={styles.tabItem}>
          <Ionicons name="person" size={28} color="#5046E5" />
          <Text style={styles.tabText} />
        </View>
      </View>

      <FlashMessage position="top" />
    </View>
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
    fontFamily: 'Lexend-Medium',
    color: 'white',
    paddingBottom: 31,
  },
  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 4,
    borderColor: '#5046E5',
  },
  usernameText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Lexend-Medium',
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
  icon: {
    marginLeft: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 15,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '80%',
    marginVertical: 10,
    justifyContent: 'center',
  },
  signOutButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
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
    fontFamily: 'Inter-Regular',
    color: 'white',
    fontSize: 10,
    marginTop: 4,
  },
});
