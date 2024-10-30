/**
 * ModUrKeebs - Minimalistic React Native Homepage with Dark Mode Toggle using Sun and Moon icons
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ViewStyle,
  FlexAlignType,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function App(): React.JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const backgroundStyle: ViewStyle = {
    backgroundColor: isDarkMode ? '#1e1e1e' : '#f9f9f9',
    flex: 1,
    alignItems: 'center' as FlexAlignType,
  };

  const textStyle = {
    color: isDarkMode ? '#f9f9f9' : '#1e1e1e',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={[styles.container, backgroundStyle]}>
        {/* Header */}
        <Text style={[styles.headerTitle, textStyle]}>ModUrKeebs</Text>
        <Text style={[styles.subTitle, textStyle]}>
          Elevate your keyboard modding experience
        </Text>

        {/* Hot Right Now */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, textStyle]}>Hot Right Now</Text>
          <Image
            source={{uri: 'https://via.placeholder.com/180'}}
            style={styles.productImage}
          />
          <Text style={[styles.productTitle, textStyle]}>
            N1 65% Wireless Mechanical Keyboard
          </Text>
        </View>

        {/* Dark Mode Toggle Button with Icon */}
        <TouchableOpacity style={styles.iconButton} onPress={toggleDarkMode}>
          <Icon
            name={isDarkMode ? 'sunny' : 'moon'}
            size={30}
            color={isDarkMode ? '#ffcc00' : '#333'}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '300',
    textAlign: 'center',
    marginVertical: 10,
  },
  sectionContainer: {
    marginVertical: 30,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  productImage: {
    width: 180,
    height: 180,
    borderRadius: 10,
    marginVertical: 15,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  iconButton: {
    marginTop: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
});

export default App;
