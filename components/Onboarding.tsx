import {StyleSheet, View, FlatList, Animated} from 'react-native';
import React, {useState, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';

import slides from '../onboardingSlides';
import OnboardingItem from './OnboardingItem';
import Paginator from './Paginator';
import Arrow from './Arrow';
import {Gap} from '../src/atoms';

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slideRef = useRef(null);
  const navigation = useNavigation();

  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
  const isOnboardingComplete = currentIndex === slides.length - 1;

  const handlePress = () => {
    if (isOnboardingComplete) {
      navigation.replace('Start');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.insideContainer}>
        <FlatList
          data={slides}
          renderItem={({item}) => <OnboardingItem item={item} />}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slideRef}
        />
      </View>

      <Paginator data={slides} scrollX={scrollX} />
      <Arrow
        percentage={(currentIndex + 1) * (100 / slides.length)}
        isOnboardingComplete={isOnboardingComplete}
        onPress={handlePress}
      />
      <Gap height={64} />
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121927',
    justifyContent: 'center',
    alignItems: 'center',
  },
  insideContainer: {
    flex: 3,
  },
});
