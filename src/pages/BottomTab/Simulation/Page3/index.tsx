import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {akko, kaychron, gamakay} from '../../../../assets/images';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CardB from '../../../../molecules/CardB';
import {usePlans} from '../../../../context';

const BareboneSelection = () => {
  const navigation = useNavigation();
  const {updateSelected} = usePlans();

  const handleSelect = (title: string, image: any) => {
    updateSelected('barebone', {title, image});
    navigation.goBack();
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="white"
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          />
          <Text style={styles.headerTitle}>Select Your Barebone</Text>
        </View>
        <View style={styles.divider} />

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <TouchableOpacity
            onPress={() => handleSelect('Akko ACR75 Barebone Kit', akko)}>
            <CardB title="Akko ACR75 Barebone Kit" imageSource={akko} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              handleSelect('Keychron V4 QMK Barebone Kit', kaychron)
            }>
            <CardB
              title="Keychron V4 QMK Barebone Kit"
              imageSource={kaychron}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSelect('GamaKay CK68 Barebone Kit', gamakay)}>
            <CardB title="GamaKay CK68 Barebone Kit" imageSource={gamakay} />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121927',
    paddingHorizontal: 20,
  },
  headerContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  scrollContainer: {
    marginTop: 10,
  },
  backButton: {
    padding: 'auto',
  },
  headerTitle: {
    fontSize: 26,
    fontFamily: 'Lexend-Bold',
    color: 'white',
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#222C41',
    opacity: 0.5,
    marginVertical: 5,
  },
});

export default BareboneSelection;
