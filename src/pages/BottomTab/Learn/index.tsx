import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {BottomNavbar} from '../../../molecules';
import {Gap} from '../../../atoms';
import {Image} from 'react-native';
import Svg, {Rect} from 'react-native-svg';
import {
  Barebone,
  Foam,
  Keycaps,
  Lubing,
  Mechanical,
  Switch,
  Tape,
} from '../../../assets';

const LearnScreen: React.FC = () => {
  return (
    <>
      <View style={styles.container}>
        <ScrollView style={styles.insideContent}>
          <Text style={styles.headerText}>Learn</Text>
          <Gap height={40} />
          <Image style={styles.image} source={Mechanical} />
          <Text style={styles.sectionTitle}>Mechanical Keyboard</Text>
          <Text style={styles.sectionContent}>
            Mechanical keyboards have physical switches beneath the keys that
            recreate the touch and audio experience of typing on a typewriter.
            Press a key, and you press its switch. You'll hear pretty loud
            clickity-clack sounds as you type.
          </Text>
          <Gap height={30} />

          <Image style={styles.image} source={Barebone} />
          <Text style={styles.sectionTitle2}>Barebone kit</Text>
          <Text style={styles.sectionContent2}>
            A barebones mechanical keyboard is an entry-level kit that allows
            users to create one-of-a-kind mechanical keyboards with little
            effort and technical knowledge. It is an excellent and hassle-free
            way of getting into the hobby as you will get to build your keyboard
            from scratch.
          </Text>
          <Gap height={30} />

          <Image style={styles.image} source={Keycaps} />
          <Text style={styles.sectionTitle3}>Keycaps</Text>
          <Text style={styles.sectionContent3}>
            Keycaps are anessential component of any mechanical keyboard,
            providing a personalized touch to your typing experience while
            influencing your setup's overall aesthetics. There are also many
            types / profiles of keycaps that suitable for a purpose.
          </Text>
          <Gap height={30} />

          <Image style={styles.image} source={Switch} />
          <Text style={styles.sectionTitle4}>Switch</Text>
          <Text style={styles.sectionContent4}>
            In a mechanical keyboard, a switch is the component beneath each key
            that registers your keystroke. When you press a key, the switch
            activates, sending a signal to your computer to produce the
            corresponding character or action.
          </Text>
          <Gap height={30} />

          <Image style={styles.image} source={Lubing} />
          <Text style={styles.sectionTitle5}>Switch lubing</Text>
          <Text style={styles.sectionContent5}>
            The main purpose of lubing switches is to make keypresses feel more
            smooth and consistent. When lubed up the stem will slide in and out
            the housing a lot easier. It also makes the switches sound more bold
            or clicky when pressed.
          </Text>
          <Gap height={30} />

          <Image style={styles.image} source={Tape} />
          <Text style={styles.sectionTitle6}>Tape mod</Text>
          <Text style={styles.sectionContent6}>
            By applying tape between the switch housing and the stem’s rails,
            the tape dampens the stem’s bounce-back after a keypress. It changes
            the sound & feel profile of the switch to be quieter and smoother to
            type on.
          </Text>
          <Gap height={30} />
          <Image style={styles.image} source={Foam} />
          <Text style={styles.sectionTitle7}>Foam mod</Text>
          <Text style={styles.sectionContent7}>
            Foam mitigates unwanted case ping, which is the high-pitched
            reverberation caused by typing in a stock metal case. Additionally,
            the keyboard sounds notably deeper and bolder overall.
          </Text>
          <Gap height={40} />
          <Text style={styles.Text1}>
            Congrats!, now you are ready to mod your keyboards!
          </Text>
          <Text style={styles.miniText}>
            You have already learned the basic components to mod a keyboard. But
            before that, you need to make sure these things :
          </Text>
          <Text style={styles.Text2}>
            ・Look for a hotswappable-switch keyboard
          </Text>
          <Text style={styles.miniText2}>
            Theres a pin on the barebone if u pull out the switches from the
            barebone. But there’s a keyboard that soldered out the switches to
            the PCB so it can not be pulled.
          </Text>
          <Text style={styles.Text2}>・Choose your keycaps profile</Text>
          <Text style={styles.miniText2}>
            There’s so many keycaps profiles out there, for example, XDA profile
            aim to give more ejoyable typing feeling, while OEM profile aim for
            a better gaming experience.
          </Text>
          <Text style={styles.Text2}>・Choose your switches</Text>
          <Text style={styles.miniText2}>
            Many people dislike the blue switches because they are known for
            being loud, there’s many type of switches you can choose that will
            give better sounds, for example, yellow switches give you a
            thocky-like sound.
          </Text>
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
  headerText: {
    color: 'white',
    fontSize: 28,
    marginTop: 10,
    fontFamily: 'Lexend-Bold',
    marginBottom: 15,
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
