import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {akkokey, akkomakey, gmkkey} from '../../../../assets/images';
import CardB from '../../../../molecules/CardB';
import {BottomNavbar} from '../../../../molecules';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {usePlans} from '../../../../context';

const SelectionKey = () => {
  const navigation = useNavigation();
  const {updateSelected} = usePlans();

  const handleSelect = (title: string, image: any) => {
    updateSelected('keycaps', {title, image});
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="white"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
        <Text style={styles.headerTitle}>Select Your Keycaps</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => handleSelect('Akko Warm Gray Keycaps Set', akkokey)}>
          <CardB title="Akko Warm Gray Keycaps Set" imageSource={akkokey} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSelect('GMK Red Samurai Keycaps set', gmkkey)}>
          <CardB title="GMK Red Samurai Keycaps set" imageSource={gmkkey} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            handleSelect('Akko Matcha Bear Keycaps Set', akkomakey)
          }>
          <CardB title="Akko Matcha Bear Keycaps Set" imageSource={akkomakey} />
        </TouchableOpacity>
      </ScrollView>
      <BottomNavbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121927',
  },
  headerContainer: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 26,
    fontFamily: 'Lexend-Bold',
    color: 'white',
    textAlign: 'center',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#222C41',
    opacity: 0.5,
    marginVertical: 5,
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    height: 80,
    width: '100%',
    backgroundColor: 'transparent ',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
  },
  tabText: {
    fontFamily: 'Inter-Regular',
    color: 'white',
    fontSize: 10,
    marginTop: 4,
  },
});

export default SelectionKey;
