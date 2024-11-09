import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React from 'react';

const OnboardingItem = ({item}) => {
  const {width} = useWindowDimensions();

  return (
    <View style={[styles.container, {width}]}>
      <View style={[styles.imageContainer, {width}]}>{item.image}</View>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

export default OnboardingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121927',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
    textAlign: 'center',
    color: '#5046E5',
    fontFamily: 'Lexend-SemiBold',
  },
  description: {
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 64,
    fontFamily: 'Lexend-Regular',
  },
  textWrapper: {
    flex: 0.3,
  },
});
