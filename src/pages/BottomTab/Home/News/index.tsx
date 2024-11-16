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
        <Gap height={30} />

        {/* Recommended News Section */}
        <View style={styles.recommendedContainer}>
          <Image
            style={styles.recommendedImage}
            source={RetroKeyboard} // Recommended news image
          />
          <View style={styles.recommendedTextContainer}>
            <Text style={styles.recommendedTitleLong}>
              8BitDo now sells its retro mechanical keyboards with integrated
              number pads
            </Text>
            <Text style={styles.recommendedDescriptionLong}>
              8BitDo has introduced a new version of the Retro Mechanical
              Keyboard it debuted last July with its original tenkeyless layout
              now expanded to include an integrated number pad. The new 8BitDo
              Retro 108 Mechanical Keyboard is available for preorder now
              through Amazon for $119.99 — $20 more expensive than the original
              — with the same NES or Famicom theming. Availability is expected
              to start on December 12th, 2024.
            </Text>
          </View>
        </View>
        <View style={styles.recommendedContainer}>
          <Image
            style={styles.recommendedImage}
            source={BestSelling} // Recommended news image
          />
          <View style={styles.recommendedTextContainer}>
            <Text style={styles.recommendedTitle}>
              Best-selling keyboard switches of October, 2024
            </Text>
            <Text style={styles.recommendedDescription}>
              In the 11 top lists from 11 vendors, 94 different switch models
              are mentioned, with 34 of them being listed for the first time
              (added to the database as new entries). Sales data, coming from
              about half of the shops, is about approximately half a million
              switches sold.
            </Text>
          </View>
        </View>
        <View style={styles.recommendedContainer}>
          <Image
            style={styles.recommendedImage}
            source={MostBrands} // Recommended news image
          />
          <View style={styles.recommendedTextContainer}>
            <Text style={styles.recommendedTitle}>
              5 OF THE MOST RELIABLE MECHANICAL KEYBOARD BRANDS
            </Text>
            <Text style={styles.recommendedDescriptionLong}>
              The best mechanical keyboard brands deliver enthusiast features
              paired with quality builds and affordable prices. We're talking
              stuff like metal construction, gasket-mounted PCB plates, acoustic
              case foam, and bespoke, pre-lubricated switches. Those features
              used to extract a high premium for the privilege, but as the
              mechanical keyboard market has continued to grow, competition has
              forced those prices down.
            </Text>
          </View>
        </View>
        <View style={styles.recommendedContainer}>
          <Image
            style={styles.recommendedImage}
            source={TypingStorm} // Recommended news image
          />
          <View style={styles.recommendedTextContainer}>
            <Text style={styles.recommendedTitleLong}>
              Typing up a storm: Malaysians are clicking on to custom mechanical
              keyboards
            </Text>
            <Text style={styles.recommendedDescriptionLong}>
              For the hardcore enthusiasts who gathered during the 2024 edition
              of the Malaysia Mechanical Keyboard (MYMK) meetup on Oct 28 in
              Kuala Lumpur, this could range from the low hundreds to the tens
              of thousands. Community member and co-organiser of the meetup,
              Joshua Zen (also known as ZenTheGeek online), shared that he has
              collected a total of 12 keyboards, each averaging between RM1,000
              to RM1,500 depending on the configuration.
            </Text>
          </View>
        </View>
        <View style={styles.recommendedContainer}>
          <Image
            style={styles.recommendedImage}
            source={TheLuminkey} // Recommended news image
          />
          <View style={styles.recommendedTextContainer}>
            <Text style={styles.recommendedTitle}>
              The Luminkey Magger 68 HE is a Fantastic Keyboard Made by
              Enthusiasts
            </Text>
            <Text style={styles.recommendedDescriptionLong}>
              Gaming keyboards in 2024 will be remembered as the year Hall
              Effect switches exploded into the mainstream. What began with
              Wooting has now spread far and wide, into both the budget and
              enthusiast spaces. The Luminkey Magger 68 HE sits in both
              categories, coming in at $149 for the "Professional" model and
              $119 for the standard "Performance" version.
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
    fontSize: 20,
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
    fontSize: 10,
  },
  recommendedDescription: {
    color: '#CCCCCC',
    fontSize: 7,
    width: 210,
    fontFamily: 'Lexend-Regular',
    marginBottom: 5,
  },
  recommendedTitleLong: {
    color: '#FFFFFF',
    fontFamily: 'Lexend-Medium',
    width: 220,
    marginBottom: 25,
    fontSize: 10,
  },
  recommendedDescriptionLong: {
    color: '#CCCCCC',
    fontSize: 6,
    width: 220,
    fontFamily: 'Lexend-Regular',
    marginBottom: 5,
  },
});
