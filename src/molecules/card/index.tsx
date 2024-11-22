import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {usePlans} from '../../context';

const Card = ({title, imageSource, targetPage, type}) => {
  const navigation = useNavigation();
  const {selectedItems} = usePlans();

  const selectedItem = selectedItems[type];

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        {selectedItem?.image ? (
          <Image
            source={selectedItem.image}
            style={styles.image}
            resizeMode="contain"
          />
        ) : imageSource ? (
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
        <Text style={styles.cardText}>{selectedItem?.title || title}</Text>
        <TouchableOpacity
          style={styles.changeButton}
          onPress={() => navigation.navigate(targetPage)}>
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
    fontSize: 14,
    fontFamily: 'Lexend-Regular',
    marginBottom: 5,
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
  },
  changeButtonText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Lexend-Regular',
  },
});

export default Card;
