import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {akkoswc, geteswc, hmxswc} from '../../../../assets/images';
import CardB from '../../../../molecules/CardB';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {usePlans} from '../../../../context';

const SelectionSwitch = () => {
  const navigation = useNavigation();
  const {updateSelected} = usePlans();

  const handleSelect = (title: string, image: any) => {
    updateSelected('switches', {title, image});
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
        <Text style={styles.headerTitle}>Select Your Switches</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => handleSelect('Akko Creamy Yellow V3 Pro', akkoswc)}>
          <CardB title="Akko Creamy Yellow V3 Pro" imageSource={akkoswc} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSelect('Gateron Oil King', geteswc)}>
          <CardB title="Gateron Oil King" imageSource={geteswc} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSelect('HMX Xinhai', hmxswc)}>
          <CardB title="HMX Xinhai" imageSource={hmxswc} />
        </TouchableOpacity>
      </ScrollView>
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
    marginBottom: 13,
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
    marginHorizontal: 20,
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
});

export default SelectionSwitch;
