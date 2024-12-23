import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  useAnimatedValue,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import withTiming from 'react-native-reanimated';
import Svg, {G, Circle} from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Arrow({percentage, isOnboardingComplete, onPress}) {
  const size = 128;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(null);

  const animateProgress = toValue => {
    Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animateProgress(percentage);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener(value => {
      const strokeDashoffset =
        circumference - (circumference * value.value) / 100;

      if (progressRef?.current) {
        progressRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    });
  }, [circumference]);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: isOnboardingComplete ? 1 : 0.7, // Set opacity to 0.5 when not complete
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOnboardingComplete]);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={center}>
          <Circle
            stroke="#E6E7E8"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            ref={progressRef}
            fill="#121927"
            stroke="#5046E5"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
          />
        </G>
      </Svg>
      <Animated.View
        style={[styles.button, {opacity: isOnboardingComplete ? 1 : 0.7}]}>
        <TouchableOpacity
          activeOpacity={0.6}
          disabled={!isOnboardingComplete}
          onPress={onPress}>
          <Ionicons name="chevron-forward-outline" color="#fff" size={32} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121927',
  },
  button: {
    position: 'absolute',
    backgroundColor: '#5046E5',
    borderRadius: 100,
    padding: 20,
  },
});
