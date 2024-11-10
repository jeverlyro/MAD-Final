import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Card = ({title, imageSource}) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        {imageSource ? (
          <Image
            source={imageSource}
            style={styles.image}
            resizeMode="contain"
          />
        ) : (
          <Ionicons name="add" size={40} color="#8F92A1" />
        )}
      </View>
      <View style={styles.cardDetails}>
        <Text style={styles.cardText}>{title}</Text>
        <TouchableOpacity style={styles.changeButton}>
          <Text style={styles.changeButtonText}>Change</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1A1F2E',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    minHeight: 120,
    marginHorizontal: 5,
  },
  imageContainer: {
    backgroundColor: '#3A3F4B',
    width: 120,
    height: 90,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cardDetails: {
    flex: 1,
    marginLeft: 15,
    position: 'relative',
  },
  cardText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'DM-Sans',
    marginBottom: 5,
    fontWeight: '600',
    bottom: 34,
  },
  changeButton: {
    backgroundColor: '#5046E5',
    paddingVertical: 4,
    paddingHorizontal: 15,
    borderRadius: 12,
    alignSelf: 'flex-start',
    position: 'absolute',
    bottom: -30,
    left: 0,
  },
  changeButtonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default Card;
