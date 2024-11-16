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
  BestSelling,
  MostBrands,
  RetroKeyboard,
  TheLuminkey,
  TypingStorm,
} from '../../../../assets/images/Home';

const News = () => {
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
            <Image style={styles.sliderImage} source={Banner} />
            <Image style={styles.sliderImage} source={Banner} />
            <Image style={styles.sliderImage} source={Banner} />
          </Swiper>
        </View>
        <Gap height={15} />
        <NavButton />

        {/* Recommended News Section */}
        <View style={styles.recommendedContainer}>
          <Image style={styles.recommendedImage} source={RetroKeyboard} />
          <View style={styles.recommendedTextContainer}>
            <Text style={styles.recommendedTitleLong}>
              8BitDo now sells its retro mechanical keyboards with integrated
              number pads
            </Text>
            <Text style={styles.recommendedDescriptionLong}>
              8BitDo has introduced a new version of the Retro Mechanical
              Keyboard it debuted last July with its original tenkey ...
            </Text>
          </View>
        </View>
        <View style={styles.recommendedContainer}>
          <Image style={styles.recommendedImage} source={BestSelling} />
          <View style={styles.recommendedTextContainer}>
            <Text style={styles.recommendedTitle}>
              Best-selling keyboard switches of October, 2024
            </Text>
            <Text style={styles.recommendedDescription}>
              In the 11 top lists from 11 vendors, 94 different switch models
              are mentioned, with 34 of them being listed for the first time.
            </Text>
          </View>
        </View>
        <View style={styles.recommendedContainer}>
          <Image style={styles.recommendedImage} source={MostBrands} />
          <View style={styles.recommendedTextContainer}>
            <Text style={styles.recommendedTitle}>
              5 OF THE MOST RELIABLE MECHANICAL KEYBOARD BRANDS
            </Text>
            <Text style={styles.recommendedDescriptionLong}>
              The best mechanical keyboard brands deliver enthusiast features
              paired with quality builds and affordable prices.
            </Text>
          </View>
        </View>
        <View style={styles.recommendedContainer}>
          <Image style={styles.recommendedImage} source={TypingStorm} />
          <View style={styles.recommendedTextContainer}>
            <Text style={styles.recommendedTitleLong}>
              Typing up a storm: Malaysians are clicking ...
            </Text>
            <Text style={styles.recommendedDescriptionLong}>
              For the hardcore enthusiasts who gathered during the 2024 edition
              of the Malaysia Mechanical Keyboard (MYMK) ...
            </Text>
          </View>
        </View>
        <View style={styles.recommendedContainer}>
          <Image style={styles.recommendedImage} source={TheLuminkey} />
          <View style={styles.recommendedTextContainer}>
            <Text style={styles.recommendedTitle}>
              The Luminkey Magger 68 HE is a Fantastic Keyboard Made by
              Enthusiasts
            </Text>
            <Text style={styles.recommendedDescriptionLong}>
              Gaming keyboards in 2024 will be remembered as the year Hall
              Effect switches exploded into the mainstream.
            </Text>
          </View>
        </View>
      </ScrollView>
      <BottomNavbar />
    </>
  );
};

export default News;

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
    fontSize: 10,
    width: 210,
    fontFamily: 'Lexend-Regular',
    marginBottom: 5,
  },
  recommendedTitleLong: {
    color: '#FFFFFF',
    fontFamily: 'Lexend-Medium',
    width: 220,
    marginBottom: 25,
    fontSize: 11,
  },
  recommendedDescriptionLong: {
    color: '#CCCCCC',
    fontSize: 9,
    width: 210,
    fontFamily: 'Lexend-Regular',
    marginBottom: 5,
  },
});
