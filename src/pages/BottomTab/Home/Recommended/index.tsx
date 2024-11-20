import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import Swiper from 'react-native-swiper';
import {NavButton} from '../../../../molecules';
import {auth, db} from '../../../../config/firebase';
import {doc, getDoc} from 'firebase/firestore';
import {BottomNavbar} from '../../../../molecules';
import {Gap} from '../../../../atoms';
import {
  Air75,
  Banner,
  AulaF75,
  ZuoyaGM67,
  Akko5075B,
  RexusDaivaD87,
  FantechMaxfit61,
  RoyalKludfeR75,
  MXMechanicalMini,
  RazerHMV3_1,
  WOBRainy75R1,
  Wooting60HE,
} from '../../../../assets/images/Home';
import {useUser} from '../../../../context/UserContext';

const Home = () => {
  const [name, setName] = useState('');
  const {profileImage} = useUser();
  const keyboardRecommendations = {
    middleHigh: [
      {image: ZuoyaGM67, title: 'Zuoya GMK67-S Barebone kit'},
      {image: Air75, title: 'NuPhy Air75'},
      {image: Akko5075B, title: 'Akko Black&Silver 5075B Plus'},
      {image: AulaF75, title: 'Aula F75'},
    ],
    lowMiddle: [
      {image: RexusDaivaD87, title: 'Rexus Daiva D87'},
      {image: FantechMaxfit61, title: 'Fantech Maxfit61 Frost'},
      {image: RoyalKludfeR75, title: 'Royal Kludge R75'},
      {image: MXMechanicalMini, title: 'MX Mechanical Mini'},
    ],
    gaming: [
      {image: RazerHMV3_1, title: 'Razer Huntsman Mini V3'},
      {image: WOBRainy75R1, title: 'WOB Rainy75 R1'},
      {image: Wooting60HE, title: 'Wooting 60HE'},
      {image: Akko5075B, title: 'Akko Black&Silver 5075B Plus'},
    ],
  };

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

        {/* Slider Section */}
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
        <Text style={styles.sectionTitle}>Recommended Keyboards</Text>

        <View style={styles.recommendationContainer}>
          <Text style={styles.budgetTitle}>For Middle-to-High Budget</Text>
          <ScrollView
            style={styles.cardContainer}
            horizontal
            bounces={true}
            showsHorizontalScrollIndicator={false}>
            {keyboardRecommendations.middleHigh.map((item, index) => (
              <View key={index} style={styles.card}>
                <Image style={styles.cardImage} source={item.image} />
                <Text style={styles.cardText}>{item.title}</Text>
              </View>
            ))}
          </ScrollView>

          <Text style={styles.budgetTitle}>For Low-to-Middle Budget</Text>
          <ScrollView
            style={styles.cardContainer}
            horizontal
            bounces={true}
            showsHorizontalScrollIndicator={false}>
            {keyboardRecommendations.lowMiddle.map((item, index) => (
              <View key={index} style={styles.card}>
                <Image style={styles.cardImage} source={item.image} />
                <Text style={styles.cardText}>{item.title}</Text>
              </View>
            ))}
          </ScrollView>

          <Text style={styles.budgetTitle}>Recommended Gaming Keyboards</Text>
          <ScrollView
            style={styles.cardContainer}
            horizontal
            bounces={true}
            showsHorizontalScrollIndicator={false}>
            {keyboardRecommendations.gaming.map((item, index) => (
              <View key={index} style={styles.card}>
                <Image style={styles.cardImage} source={item.image} />
                <Text style={styles.cardText}>{item.title}</Text>
              </View>
            ))}
          </ScrollView>
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
  recommendationContainer: {
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#1B2539',
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontFamily: 'Lexend-Medium',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 15,
  },
  budgetTitle: {
    color: '#FFFFFF',
    fontFamily: 'Lexend-Medium',
    fontSize: 16,
    marginVertical: 10,
  },
  cardContainer: {
    flexDirection: 'row',
  },
  card: {
    width: '30%',
    borderRadius: 10,
    padding: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  cardText: {
    color: '#FFFFFF',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 8,
    fontFamily: 'Lexend-Regular',
    maxWidth: 100,
  },
});
