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
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Something went wrong');
      } else if (response.assets && response.assets.length > 0) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      <TouchableOpacity onPress={handleSelectImage}>
        <Image source={{uri: profileImage}} style={styles.profileImage} />
      </TouchableOpacity>

      <Text style={styles.usernameText}>Vixxxzy</Text>

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
  icon: {
    marginLeft: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 15,
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
