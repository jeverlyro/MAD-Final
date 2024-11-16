import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {Gap} from '../../atoms';

const ReviewContainer = ({reviews}) => {
  return (
    <View style={styles.reviewContainer}>
      {reviews.map((review, index) => (
        <View style={styles.reviewCard} key={index}>
          <Image source={review.image} style={styles.reviewImage} />
          <View style={styles.reviewTextContainer}>
            <Text style={styles.reviewTitle}>{review.title}</Text>
            <Text style={styles.reviewDescription}>{review.description}</Text>
            <Text style={styles.reviewBy}>{`by ${review.by}`}</Text>
            <Text style={styles.reviewRating}>
              {Array.from({length: review.rating}, (_, i) => (
                <Text key={i}>★</Text>
              ))}
            </Text>
          </View>
        </View>
      ))}
      <Gap height={15} />
    </View>
  );
};

// PropTypes for validation
ReviewContainer.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.any.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      by: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired, // Ensure rating is passed as a number
    }),
  ).isRequired,
};

export default ReviewContainer;

const styles = StyleSheet.create({
  reviewContainer: {
    paddingHorizontal: 13,
  },
  reviewCard: {
    flexDirection: 'row',
    backgroundColor: '#121927',
    borderWidth: 0.3,
    borderColor: '#222C41',
    borderRadius: 8,
    padding: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  reviewImage: {
    width: 125,
    height: 85,
    borderRadius: 8,
    marginRight: 15,
  },
  reviewTextContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  reviewTitle: {
    color: '#6563FF',
    fontSize: 18,
    fontFamily: 'Lexend-SemiBold',
    marginBottom: 5,
  },
  reviewDescription: {
    color: '#CCCCCC',
    fontSize: 10.5,
    lineHeight: 16,
    fontFamily: 'Lexend-Regular',
  },
  reviewBy: {
    color: '#CCCCCC',
    fontSize: 11,
    marginTop: 8,
    fontFamily: 'Lexend-Regular',
  },
  reviewRating: {
    color: '#6563FF',
    fontSize: 14,
    marginTop: 5,
    fontFamily: 'Lexend-Bold',
  },
});
