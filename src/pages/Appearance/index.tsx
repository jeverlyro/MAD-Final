import React, {useState} from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const AppearanceScreen: React.FC = () => {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleSwitch = () => setIsDarkMode(previousState => !previousState);

  const styles = createStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={20}
          color={isDarkMode ? 'white' : 'black'}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Appearance</Text>
      </View>

      <View style={styles.infoBox}>
        <Text
          style={[styles.infoText, {color: isDarkMode ? 'white' : 'black'}]}>
          You can change your preferences whenever you want.
        </Text>
      </View>

      <View style={styles.switchContainer}>
        <Ionicons
          name={isDarkMode ? 'moon' : 'sunny'}
          size={24}
          color={isDarkMode ? 'white' : 'black'}
          style={styles.icon}
        />
        <Text style={styles.aboutTitle}>
          {isDarkMode ? 'Dark mode' : 'Light mode'}
        </Text>
        <Switch
          style={styles.switch}
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isDarkMode}
        />
      </View>

      <Text style={styles.aboutText}>
        Activate to make the display in dark mode
      </Text>
      <View style={styles.separator} />
    </View>
  );
};

const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#121927' : '#f4f3f4',
      padding: 20,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    headerTitle: {
      fontSize: 16,
      color: isDarkMode ? 'white' : 'black',
      fontFamily: 'Lexend-Bold',
      marginLeft: 10,
    },
    infoBox: {
      backgroundColor: isDarkMode ? '#0F1522' : '#e0e0e0',
      width: '120%',
      marginLeft: -25,
      alignSelf: 'stretch',
      paddingVertical: 5,
      marginBottom: 12,
      borderRadius: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
    },
    infoText: {
      fontFamily: 'Lexend-Regular',
      fontSize: 10,
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    icon: {
      marginRight: 10,
    },
    aboutTitle: {
      color: isDarkMode ? 'white' : 'black',
      fontSize: 16,
      fontFamily: 'Lexend-Bold',
      flex: 1,
    },
    switch: {
      transform: [{scaleX: 1.2}, {scaleY: 1.2}],
    },
    separator: {
      height: 1,
      backgroundColor: isDarkMode ? '#222C41' : '#c0c0c0',
      width: '100%',
      marginVertical: 10,
    },
    aboutText: {
      color: isDarkMode ? 'white' : 'black',
      fontSize: 12,
      fontFamily: 'Lexend-Regular',
      textAlign: 'left',
      marginTop: 10,
      lineHeight: 18,
    },
  });

export default AppearanceScreen;
