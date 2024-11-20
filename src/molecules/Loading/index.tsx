import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React from 'react';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="Large" color="#5046E5" />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});
