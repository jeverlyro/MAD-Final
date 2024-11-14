import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

const NavButton = () => {
  const [selectedButton, setSelectedButton] = useState(null);

  return (
    <View style={styles.navButtonsContainer}>
      {['Home', 'News', 'Reviews', 'Recommended'].map(label => (
        <TouchableOpacity
          key={label}
          style={[
            styles.navButton,
            selectedButton === label && styles.navButtonSelected,
          ]}
          onPress={() => setSelectedButton(label)}>
          <Text style={styles.navButtonText}>{label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default NavButton;

const styles = StyleSheet.create({
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
  navButtonSelected: {
    backgroundColor: 'rgba(80, 70, 229, 0.3)',
  },
  navButtonText: {
    color: '#FFFFFF',
    fontSize: 9.4,
    textAlign: 'center',
    fontFamily: 'Lexend-Regular',
  },
});
