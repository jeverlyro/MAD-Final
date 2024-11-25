import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import React from 'react';

const Privacy = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={20}
          color="white"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Privacy Settings</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          You can update your privacy preferences here.
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.navigate('ChangePassword')}>
        <View style={styles.section}>
          <Ionicons name="shield-checkmark" size={20} color="white" />
          <Text style={styles.text}>Change Password</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Privacy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121927',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Lexend-Bold',
    marginLeft: 10,
  },
  infoBox: {
    backgroundColor: '#0F1522',
    paddingVertical: 5,
    paddingHorizontal: 25,
    marginHorizontal: -20,
    width: '110%',
    alignSelf: 'stretch',
  },
  infoText: {
    color: 'white',
    fontFamily: 'Lexend-Regular',
    fontSize: 11,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Lexend-Bold',
    marginLeft: 15,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#222C41',
  },
});
