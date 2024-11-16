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
import {foam, krytox, tape} from '../../../../assets/images';
import CardB from '../../../../molecules/CardB';
import {BottomNavbar} from '../../../../molecules';

const SelectionAdditional = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Select Your Switches</Text>
      <View style={styles.divider} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity>
          <CardB title="Masking tape" imageSource={tape} />
        </TouchableOpacity>
        <TouchableOpacity>
          <CardB title="Krytox GPL 205g0" imageSource={krytox} />
        </TouchableOpacity>
        <TouchableOpacity>
          <CardB
            title="YIMAGUJRX Keyboard Eva
Foam"
            imageSource={foam}
          />
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

export default SelectionAdditional;
