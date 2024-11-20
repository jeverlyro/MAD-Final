import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import Swiper from 'react-native-swiper';
import {NavButton} from '../../../../molecules';
import {auth, db} from '../../../../config/firebase';
import {doc, getDoc} from 'firebase/firestore';
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

const Reviews = () => {
  const [name, setName] = useState('');
  const {profileImage} = useUser();

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
    <>
      <ScrollView style={styles.container} bounces={false}>
        <View style={styles.welcomeSection}>
          <View style={styles.textContainer}>
            <Text style={styles.greetingText}>Hello,</Text>
            <Text style={styles.userName}>{name}</Text>
          </View>
          <Image style={styles.profileImage} source={{uri: profileImage}} />
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
