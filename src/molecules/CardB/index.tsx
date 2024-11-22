import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const CardB = ({title, imageSource}) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.cardText}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1A1F2E',
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  imageContainer: {
    backgroundColor: 'white',
    width: 120,
    height: 90,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  image: {
    width: '90%',
    height: '90%',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Lexend-Regular',
    bottom: 30,
  },
});

export default CardB;
