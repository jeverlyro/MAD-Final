import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {BottomNavbar} from '../../../molecules';
import {Gap} from '../../../atoms';
import {Image} from 'react-native';
import {getFirestore, doc, getDoc} from 'firebase/firestore';
import {
  Barebone,
  Foam,
  Keycaps,
  Lubing,
  Mechanical,
  Switch,
  Tape,
} from '../../../assets/images/Learn';

const LearnScreen: React.FC = () => {
  const [aboutData, setLearn] = useState<any>({});

  useEffect(() => {
    const fetchLearn = async () => {
      const db = getFirestore();
      const docRef = doc(db, 'learnTexts', 'docId');
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setLearn(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document: ', error);
      }
    };

    fetchLearn();
  }, []);
  return (
    <>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <Text style={styles.headerText}>{aboutData.headerText}</Text>
          <View style={styles.divider} />
          <Gap height={30} />
          <Image style={styles.image} source={Mechanical} />
          <Text style={styles.sectionTitle}>{aboutData.sectionTitle1}</Text>
          <Text style={styles.sectionContent}>{aboutData.sectionContent1}</Text>
          <Gap height={30} />

          <Image style={styles.image} source={Barebone} />
          <Text style={styles.sectionTitle2}>{aboutData.sectionTitle2}</Text>
          <Text style={styles.sectionContent2}>
            {aboutData.sectionContent2}
          </Text>
          <Gap height={30} />

          <Image style={styles.image} source={Keycaps} />
          <Text style={styles.sectionTitle3}>{aboutData.sectionTitle3}</Text>
          <Text style={styles.sectionContent3}>
            {aboutData.sectionContent3}
          </Text>
          <Gap height={30} />

          <Image style={styles.image} source={Switch} />
          <Text style={styles.sectionTitle4}>{aboutData.sectionTitle4}</Text>
          <Text style={styles.sectionContent4}>
            {aboutData.sectionContent4}
          </Text>
          <Gap height={30} />

          <Image style={styles.image} source={Lubing} />
          <Text style={styles.sectionTitle5}>{aboutData.sectionTitle5}</Text>
          <Text style={styles.sectionContent5}>
            {aboutData.sectionContent5}
          </Text>
          <Gap height={30} />

          <Image style={styles.image} source={Tape} />
          <Text style={styles.sectionTitle6}>{aboutData.sectionTitle6}</Text>
          <Text style={styles.sectionContent6}>
            {aboutData.sectionContent6}
          </Text>
          <Gap height={30} />
          <Image style={styles.image} source={Foam} />
          <Text style={styles.sectionTitle7}>{aboutData.sectionTitle7}</Text>
          <Text style={styles.sectionContent7}>
            {aboutData.sectionContent7}
          </Text>
          <Gap height={40} />
          <Text style={styles.Text1}>{aboutData.finalText1}</Text>
          <Text style={styles.miniText}>{aboutData.finalText2}</Text>
          <Text style={styles.Text2}>{aboutData.finalText3}</Text>
          <Text style={styles.miniText2}>{aboutData.bare}</Text>
          <Text style={styles.Text2}>{aboutData.coseTitle1}</Text>
          <Text style={styles.miniText2}>{aboutData.coseText1}</Text>
          <Text style={styles.Text2}>{aboutData.coseTitle2}</Text>
          <Text style={styles.miniText2}>{aboutData.coseText2}</Text>
        </ScrollView>
      </View>
      <BottomNavbar />
    </>
  );
};

export default LearnScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121927',
  },
  divider: {
    width: '90%',
    height: 0.5,
    backgroundColor: '#222C41',
    marginLeft: 20,
    opacity: 0.5,
    marginBottom: 15,
  },
  headerText: {
    color: 'white',
    fontSize: 28,
    marginTop: 10,
    fontFamily: 'Lexend-Bold',
    marginBottom: 13,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Lexend-SemiBold',
    color: 'white',
    marginHorizontal: 160,
    marginTop: 100,
    position: 'absolute',
    width: '100%',
  },
  sectionContent: {
    fontSize: 9,
    fontFamily: 'Lexend-Regular',
    color: 'white',
    marginHorizontal: 160,
    marginTop: 125,
    position: 'absolute',
    width: 240,
  },
  sectionTitle2: {
    fontSize: 16,
    fontFamily: 'Lexend-SemiBold',
    color: 'white',
    marginHorizontal: 160,
    marginTop: 215,
    position: 'absolute',
    width: '100%',
  },
  sectionContent2: {
    fontSize: 9,
    fontFamily: 'Lexend-Regular',
    color: 'white',
    marginHorizontal: 160,
    marginTop: 240,
    position: 'absolute',
    width: 245,
  },
  sectionTitle3: {
    fontSize: 16,
    fontFamily: 'Lexend-SemiBold',
    color: 'white',
    marginHorizontal: 160,
    marginTop: 330,
    position: 'absolute',
    width: '100%',
  },
  sectionContent3: {
    fontSize: 9,
    fontFamily: 'Lexend-Regular',
    color: 'white',
    marginHorizontal: 160,
    marginTop: 355,
    position: 'absolute',
    width: 230,
  },
  sectionTitle4: {
    fontSize: 16,
    fontFamily: 'Lexend-SemiBold',
    color: 'white',
    marginHorizontal: 160,
    marginTop: 445,
    position: 'absolute',
    width: '100%',
  },
  sectionContent4: {
    fontSize: 9,
    fontFamily: 'Lexend-Regular',
    color: 'white',
    marginHorizontal: 160,
    marginTop: 470,
    position: 'absolute',
    width: 230,
  },
  sectionTitle5: {
    fontSize: 16,
    fontFamily: 'Lexend-SemiBold',
    color: 'white',
    marginHorizontal: 160,
    marginTop: 560,
    position: 'absolute',
    width: '100%',
  },
  sectionContent5: {
    fontSize: 9,
    fontFamily: 'Lexend-Regular',
    color: 'white',
    marginHorizontal: 160,
    marginTop: 585,
    position: 'absolute',
    width: 230,
  },
  sectionTitle6: {
    fontSize: 16,
    fontFamily: 'Lexend-SemiBold',
    color: 'white',
    marginHorizontal: 160,
    marginTop: 675,
    position: 'absolute',
    width: '100%',
  },
  sectionContent6: {
    fontSize: 9,
    fontFamily: 'Lexend-Regular',
    color: 'white',
    marginHorizontal: 160,
    marginTop: 700,
    position: 'absolute',
    width: 230,
  },
  sectionTitle7: {
    fontSize: 16,
    fontFamily: 'Lexend-SemiBold',
    color: 'white',
    marginHorizontal: 160,
    marginTop: 790,
    position: 'absolute',
    width: '100%',
  },
  sectionContent7: {
    fontSize: 9,
    fontFamily: 'Lexend-Regular',
    color: 'white',
    marginHorizontal: 160,
    marginTop: 815,
    position: 'absolute',
    width: 230,
  },
  Text1: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'Lexend-SemiBold',
    marginBottom: 20,
    marginLeft: 20,
    width: '80%',
  },
  Text2: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'Lexend-SemiBold',
    marginBottom: 10,
    marginLeft: 30,
    width: '100%',
  },
  miniText: {
    color: 'white',
    fontSize: 11,
    fontFamily: 'Lexend-Regular',
    marginBottom: 20,
    marginLeft: 25,
    width: 360,
  },
  miniText2: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Lexend-Regular',
    marginBottom: 15,
    marginLeft: 43,
    width: 275,
  },
  image: {
    width: 120,
    height: 85,
    marginLeft: 20,
    borderRadius: 4,
  },
});
