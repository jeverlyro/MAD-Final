import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import Swiper from 'react-native-swiper';
import {NavButton} from '../../../molecules';
import {auth, db} from '../../../config/firebase';
import {doc, getDoc} from 'firebase/firestore';

const Home = () => {
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
    <ScrollView style={styles.container} bounces={false}>
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
      <View style={styles.sliderContainer}>
        <Swiper
          style={styles.swiper}
          showsButtons={false}
          dotColor="#fff"
          activeDotColor="#5046E5"
          autoplay={true}
          autoplayTimeout={5}>
          <Image
            style={styles.sliderImage}
            source={{uri: 'https://via.placeholder.com/300x150'}} // Slide image 1
          />
          <Image
            style={styles.sliderImage}
            source={{uri: 'https://via.placeholder.com/300x150'}} // Slide image 2
          />
          <Image
            style={styles.sliderImage}
            source={{uri: 'https://via.placeholder.com/300x150'}} // Slide image 3
          />
        </Swiper>
      </View>

      <NavButton />
      {/* Popular Section */}
      <Text style={styles.sectionTitle}>Popular</Text>
      <View style={styles.popularContainer}>
        {[1, 2, 3].map((_, index) => (
          <View key={index} style={styles.popularCard}>
            <Image
              style={styles.popularImage}
              source={{uri: 'https://via.placeholder.com/100x100'}} // Popular item image
            />
            <Text style={styles.popularText}>Popular Item {index + 1}</Text>
          </View>
        ))}
      </View>
      {/* Recommended News Section */}
      <Text style={styles.sectionTitle}>Recommended news</Text>
      <View style={styles.recommendedContainer}>
        <Image
          style={styles.recommendedImage}
          source={{uri: 'https://via.placeholder.com/150x80'}} // Recommended news image
        />
        <View style={styles.recommendedTextContainer}>
          <Text style={styles.recommendedTitle}>
            Best-selling keyboard switches of October, 2024
          </Text>
          <Text style={styles.recommendedDescription}>
            Discover the latest trending keyboard switches and find the best
            options for your setup.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121927',
  },
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
  sliderContainer: {
    height: 200,
    marginBottom: 20,
  },
  swiper: {
    borderRadius: 0,
  },
  sliderImage: {
    width: '100%',
    height: '100%',
  },
  navButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  navButton: {
    borderColor: '#5046E5',
    borderWidth: 1,
    paddingVertical: 3,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 20,
    width: 80,
    height: 35,
    justifyContent: 'center',
  },
  navButtonText: {
    color: '#FFFFFF',
    fontSize: 9.4,
    textAlign: 'center',
    fontFamily: 'Lexend-Regular',
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontFamily: 'Lexend-Medium',
    marginLeft: 24,
    marginVertical: 10,
    fontSize: 24,
  },
  popularContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 16,
  },
  popularCard: {
    width: '30%',
    borderWidth: 0.3,
    borderColor: '#1B2539',
    borderRadius: 4,
    paddingTop: 6,
    paddingBottom: 30,
    alignItems: 'center',
  },
  popularImage: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
  popularText: {
    color: '#FFFFFF',
    fontFamily: 'Lexend-Regular',
    textAlign: 'center',
    fontSize: 13,
    marginTop: 5,
  },
  recommendedContainer: {
    flexDirection: 'row',
    borderColor: '#222C41',
    borderWidth: 0.3,
    borderRadius: 5,
    padding: 10,
    margin: 15,
    alignItems: 'center',
  },
  recommendedImage: {
    width: 150,
    height: 100,
    borderRadius: 5,
    marginRight: 10,
  },
  recommendedTextContainer: {
    flex: 1,
  },
  recommendedTitle: {
    color: '#FFFFFF',
    fontFamily: 'Lexend-Medium',
    marginBottom: 25,
  },
  recommendedDescription: {
    color: '#CCCCCC',
    fontSize: 10,
    fontFamily: 'Lexend-Regular',
    marginBottom: 5,
  },
});
