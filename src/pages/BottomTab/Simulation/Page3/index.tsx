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
import {akko, kaychron, gamakay} from '../../../../assets/images';
import CardB from '../../../../molecules/Barebone';

const BareboneSelection = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Select Your Barebone</Text>
      <View style={styles.divider} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity>
          <CardB title="Akko ACR75 Barebone Kit" imageSource={akko} />
        </TouchableOpacity>
        <TouchableOpacity>
          <CardB title="Keychron V4 QMK Barebone Kit" imageSource={kaychron} />
        </TouchableOpacity>
        <TouchableOpacity>
          <CardB title="GamaKay CK68 Barebone Kit" imageSource={gamakay} />
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.tabBar}>
        <View style={styles.tabItem}>
          <Ionicons
            name="home-sharp"
            color="white"
            size={28}
            onPress={() => navigation.replace('Home')}
          />
          <Text style={styles.tabText}>Home</Text>
        </View>
        <View style={styles.tabItem}>
          <Ionicons
            name="book-outline"
            size={28}
            color="white"
            onPress={() => navigation.replace('Learn')}
          />
          <Text style={styles.tabText}>Learn</Text>
        </View>
        <View style={styles.tabItem}>
          <Ionicons
            name="settings-outline"
            size={28}
            color="white"
            size={28}
            color="#5046E5"
            onPress={() => navigation.replace('Simulation')}
          />
          <Text style={styles.tabText}>Simulation</Text>
        </View>
        <View style={styles.tabItem}>
          <Ionicons
            name="person-outline"
            size={28}
            color="white"
            onPress={() => navigation.replace('Profile')}
          />
          <Text style={styles.tabText}>Profile</Text>
        </View>
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
    width: 420,
    backgroundColor: '#121212',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabText: {
    fontFamily: 'Inter-Regular',
    color: 'white',
    fontSize: 10,
    marginTop: 4,
  },
});

export default BareboneSelection;
