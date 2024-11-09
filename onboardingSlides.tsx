import LottieView from 'lottie-react-native';
import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  image: {
    width: width * 0.9,
    height: width,
  },
});

export default [
  {
    id: 1,
    title: 'Getting Started',
    description:
      "There's recommendation for you to choose which keyboard is good for you!",
    image: (
      <LottieView
        source={require('./src/assets/lottie/Animation - 1731133179110.json')}
        style={styles.image}
        autoPlay
        loop
      />
    ),
  },
  {
    id: 2,
    title: 'Getting Started',
    description: 'You can also makes your own keyboard mod plans!',
    image: (
      <LottieView
        source={require('./src/assets/lottie/Animation - 1731133216866.json')}
        style={styles.image}
        autoPlay
        loop
      />
    ),
  },
  {
    id: 3,
    title: 'Getting Started',
    description: 'With news about mechanical keyboards around the world!',
    image: (
      <LottieView
        source={require('./src/assets/lottie/Animation - 1731133690588.json')}
        style={styles.image}
        autoPlay
        loop
      />
    ),
  },
  {
    id: 4,
    title: 'Explore the app',
    description:
      'Now you can learn about modding a mechanical keyboard by your own hands!',
    image: (
      <LottieView
        source={require('./src/assets/lottie/Keyboard.json')}
        style={styles.image}
        autoPlay
        loop
      />
    ),
  },
];
