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
import CardB from '../../../../molecules/CardB';
import {Tabbar} from '../../../../molecules';

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
      <Tabbar />
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
});

export default BareboneSelection;
