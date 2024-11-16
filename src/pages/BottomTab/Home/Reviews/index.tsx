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

const Reviews = () => {
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
    <>
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

        {/* Reviewed Popular Keyboards Section */}
        <Text style={styles.sectionTitle}>Reviewed Popular Keyboards</Text>
        <Gap height={25} />
        <View style={styles.reviewContainer}>
          <View style={styles.reviewCard}>
            <Image source={Air75} style={styles.reviewImage} />
            <View style={styles.reviewTextContainer}>
              <Text style={styles.reviewTitle}>NuPhy Air75</Text>
              <Text style={styles.reviewDescription}>
                "Tampilan tidak cocok, warna terasa kosong, body-nya premium,
                tambahan plate chrome yang rata di belakang."
              </Text>
              <Text style={styles.reviewBy}>by GTID</Text>
              <Text style={styles.reviewRating}>★★★★★</Text>
            </View>
          </View>
          <Gap height={5} />

          <View style={styles.reviewCard}>
            <Image source={MXMechanicalMini} style={styles.reviewImage} />
            <View style={styles.reviewTextContainer}>
              <Text style={styles.reviewTitle}>MX Mechanical Mini</Text>
              <Text style={styles.reviewDescription}>
                "Great features, but lacking in typing experience."
              </Text>
              <Text style={styles.reviewBy}>by Created Tech</Text>
              <Text style={styles.reviewRating}>★★★★☆</Text>
            </View>
          </View>
          <Gap height={5} />

          <View style={styles.reviewCard}>
            <Image source={AulaF75} style={styles.reviewImage} />
            <View style={styles.reviewTextContainer}>
              <Text style={styles.reviewTitle}>AULA F75</Text>
              <Text style={styles.reviewDescription}>
                "Feels pretty decent, but lacks a lot of common feel."
              </Text>
              <Text style={styles.reviewBy}>by Hypo Tech</Text>
              <Text style={styles.reviewRating}>★★★★☆</Text>
            </View>
          </View>
          <Gap height={5} />

          <View style={styles.reviewCard}>
            <Image source={RazerHMV3} style={styles.reviewImage} />
            <View style={styles.reviewTextContainer}>
              <Text style={styles.reviewTitle}>Razer Huntsman Mini V3</Text>
              <Text style={styles.reviewDescription}>
                "Lower input lag, great for gaming."
              </Text>
              <Text style={styles.reviewBy}>by Optimum</Text>
              <Text style={styles.reviewRating}>★★★★★</Text>
            </View>
          </View>
        </View>
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
    color: '#FFFFFF',
    fontFamily: 'Lexend-Medium',
    marginLeft: 24,
    marginVertical: 10,
    fontSize: 20,
    textAlign: 'center',
  },
  reviewContainer: {
    paddingHorizontal: 13,
  },
  reviewCard: {
    flexDirection: 'row',
    backgroundColor: '#121927',
    borderWidth: 0.3,
    borderColor: '#222C41',
    borderRadius: 8,
    padding: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  reviewImage: {
    width: 120,
    height: 85,
    borderRadius: 8,
    marginRight: 15,
  },
  reviewTextContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  reviewTitle: {
    color: '#6563FF',
    fontSize: 18,
    fontFamily: 'Lexend-SemiBold',
    marginBottom: 5,
  },
  reviewDescription: {
    color: '#CCCCCC',
    fontSize: 10.5,
    lineHeight: 16,
    fontFamily: 'Lexend-Regular',
  },
  reviewBy: {
    color: '#CCCCCC',
    fontSize: 11,
    marginTop: 8,
    fontFamily: 'Lexend-Regular',
  },
  reviewRating: {
    color: '#6563FF',
    fontSize: 14,
    marginTop: 5,
    fontFamily: 'Lexend-Bold',
  },
});
