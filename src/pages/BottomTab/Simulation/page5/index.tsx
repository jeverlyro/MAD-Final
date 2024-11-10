import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {akkoswc, geteswc, hmxswc} from '../../../../assets/images';
import CardB from '../../../../molecules/CardB';

const SelectionSwicth = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Select Your Switches</Text>
      <View style={styles.divider} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity>
          <CardB
            title="Akko Creamy Yellow
V3 Pro"
            imageSource={akkoswc}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <CardB title="Gateron Oil King" imageSource={geteswc} />
        </TouchableOpacity>
        <TouchableOpacity>
          <CardB title="HMX Xinhai" imageSource={hmxswc} />
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.replace('Home')}>
          <Ionicons name="home-outline" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.replace('Learn')}>
          <Ionicons name="book-outline" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="settings" size={28} color="#5046E5" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.replace('Profile')}>
          <Ionicons name="person-outline" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121927',
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontFamily: 'DM-Sans',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  divider: {
    width: '90%',
    height: 1,
    backgroundColor: '#5046E5',
    opacity: 0.5,
    marginBottom: 10,
    alignSelf: 'center',
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

export default SelectionSwicth;
