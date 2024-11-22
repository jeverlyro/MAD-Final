import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import Swiper from 'react-native-swiper';
import {NavButton} from '../../../molecules';
import {auth, db} from '../../../config/firebase';
import {doc} from 'firebase/firestore';
import {BottomNavbar} from '../../../molecules';
import {Gap} from '../../../atoms';
import {
  Air75,
  Banner,
  BestSelling,
  HallEffect,
  RazerSnap,
} from '../../../assets/images/Home';
import {useUser} from '../../../context/UserContext';
import {onSnapshot} from 'firebase/firestore';

const PLACEHOLDER_IMAGE =
  'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg';

const Home = () => {
  const [name, setName] = useState('');
  const {profileImage, setProfileImage} = useUser();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const popularImages = [
    {image: RazerSnap, title: 'RAZER SNAP TAP: What is it?'},
    {image: HallEffect, title: 'Hall Effect Switches: What are they?'},
    {image: Air75, title: 'NuPhy Air75: The best 75% keyboard?'},
  ];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const unsubscribeDoc = onSnapshot(userRef, doc => {
          if (doc.exists()) {
            const userData = doc.data();
            setName(userData.name || '');
            if (userData.profileImage) {
              setSelectedImage(userData.profileImage);
              setProfileImage(userData.profileImage);
            } else {
              setSelectedImage(PLACEHOLDER_IMAGE);
              setProfileImage(PLACEHOLDER_IMAGE);
            }
          }
        });

        return () => unsubscribeDoc();
      } else {
        setName('');
        setSelectedImage(PLACEHOLDER_IMAGE);
        setProfileImage(PLACEHOLDER_IMAGE);
      }
    });

    return () => unsubscribe();
  }, [setProfileImage]);

  const displayImage = selectedImage || profileImage || PLACEHOLDER_IMAGE;

  return (
    <>
      <ScrollView style={styles.container} bounces={false}>
        <View style={styles.welcomeSection}>
          <View style={styles.textContainer}>
            <Text style={styles.greetingText}>Hello,</Text>
            <Text style={styles.userName}>{name}</Text>
          </View>
          <Image style={styles.profileImage} source={{uri: displayImage}} />
        </View>
        <View style={styles.sliderContainer}>
          <Swiper
            style={styles.swiper}
            showsButtons={false}
            dotColor="#fff"
            activeDotColor="#5046E5"
            autoplay={true}
            autoplayTimeout={5}>
            <Image style={styles.sliderImage} source={Banner} />
            <Image style={styles.sliderImage} source={Banner} />
            <Image style={styles.sliderImage} source={Banner} />
          </Swiper>
        </View>
        <Gap height={15} />
        <NavButton />
        <Gap height={30} />
        {/* Popular Section */}
        <Text style={styles.sectionTitle}>Popular</Text>
        <View style={styles.popularContainer}>
          {popularImages.map((item, index) => (
            <View key={index} style={styles.popularCard}>
              <Image style={styles.popularImage} source={item.image} />
              <Text style={styles.popularText}>{item.title}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.sectionTitle}>Recommended news</Text>
        <View style={styles.recommendedContainer}>
          <Image style={styles.recommendedImage} source={BestSelling} />
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
      <BottomNavbar />
    </>
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
    fontSize: 20,
  },
  popularContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
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
    fontSize: 10,
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
    fontSize: 12,
  },
  recommendedDescription: {
    color: '#CCCCCC',
    fontSize: 9,
    fontFamily: 'Lexend-Regular',
    marginBottom: 5,
  },
});
