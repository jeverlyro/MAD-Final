import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import Swiper from 'react-native-swiper';
import {NavButton} from '../../../../molecules';
import {auth, db} from '../../../../config/firebase';
import {doc} from 'firebase/firestore';
import {BottomNavbar} from '../../../../molecules';
import {Gap} from '../../../../atoms';
import {
  Banner,
  Air75,
  MXMechanicalMini,
  AulaF75,
  RazerHMV3,
} from '../../../../assets/images/Home';
import ReviewContainer from '../../../../molecules/review';
import {useUser} from '../../../../context/UserContext';
import {onSnapshot} from 'firebase/firestore';

const PLACEHOLDER_IMAGE =
  'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg';

const Reviews = () => {
  const [name, setName] = useState('');
  const {profileImage, setProfileImage} = useUser();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const reviewData = [
    {
      image: Air75,
      title: 'NuPhy Air75',
      description:
        'Tampilan tidak cocok, warna terasa kosong, body-nya premium, tambahan plate chrome yang rata di belakang.',
      by: 'GTID',
      rating: 5,
    },
    {
      image: MXMechanicalMini,
      title: 'MX Mechanical Mini',
      description: 'Great features, but lacking in typing experience.',
      by: 'Created Tech',
      rating: 4,
    },
    {
      image: AulaF75,
      title: 'AULA F75',
      description: 'Feels pretty decent, but lacks a lot of common feel.',
      by: 'Hypo Tech',
      rating: 4,
    },
    {
      image: RazerHMV3,
      title: 'Razer Huntsman Mini V3',
      description: 'Lower input lag, great for gaming.',
      by: 'Optimum',
      rating: 5,
    },
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
            <Image
              style={styles.sliderImage}
              source={Banner} // Slide image 1
            />
            <Image
              style={styles.sliderImage}
              source={Banner} // Slide image 2
            />
            <Image
              style={styles.sliderImage}
              source={Banner} // Slide image 3
            />
          </Swiper>
        </View>
        <Gap height={15} />
        <NavButton />
        <Gap height={15} />
        <Text style={styles.sectionTitle}>Reviewed Popular Keyboards</Text>
        <Gap height={25} />
        <ReviewContainer reviews={reviewData} />
      </ScrollView>
      <BottomNavbar />
    </>
  );
};

export default Reviews;

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
  sectionTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Lexend-SemiBold',
    marginLeft: 20,
  },
});
