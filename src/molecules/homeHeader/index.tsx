import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {auth, db} from '../../config/firebase';
import {doc, getDoc} from 'firebase/firestore';

const Header = () => {
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setName(userDoc.data().name);
          }
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    fetchUserName();
  }, []);
  return (
    <View>
      <View style={styles.welcomeSection}>
        <View style={styles.textContainer}>
          <Text style={styles.greetingText}>Hello,</Text>
          <Text style={styles.userName}>{name}</Text>
        </View>
        <Image
          style={styles.profileImage}
          source={{uri: 'https://via.placeholder.com/50'}}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  welcomeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#121927',
    borderRadius: 10,
    marginHorizontal: 15,
  },
  textContainer: {
    marginVertical: 20,
    flexDirection: 'column',
  },
  greetingText: {
    fontSize: 20,
    fontFamily: 'Lexend-Regular',
    color: '#FFFFFF',
  },
  userName: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Lexend-SemiBold',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
});
