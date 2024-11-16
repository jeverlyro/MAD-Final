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
import {BottomNavbar} from '../../../../molecules';

const SelectionSwitch = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Select Your Switches</Text>
      <View style={styles.divider} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity>
          <CardB title="Akko Creamy Yellow V3 Pro" imageSource={akkoswc} />
        </TouchableOpacity>
        <TouchableOpacity>
          <CardB title="Gateron Oil King" imageSource={geteswc} />
        </TouchableOpacity>
        <TouchableOpacity>
          <CardB title="HMX Xinhai" imageSource={hmxswc} />
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.tabBar}>
        <BottomNavbar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121927',
  },
  headerTitle: {
    fontSize: 26,
    fontFamily: 'DM-Sans',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  divider: {
    width: '90%',
    height: 1,
    backgroundColor: '#5046E5',
    opacity: 0.5,
    marginVertical: 10,
    alignSelf: 'center',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 80,
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
