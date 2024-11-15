import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  Adjust,
  Document,
  HomeIcon,
  Profile,
  AdjustHighlight,
  DocumentHighlight,
  HomeIconHighlight,
  ProfileHighlight,
} from '../../assets/icons';

const BottomNavbar = () => {
  const [selected, setSelected] = useState<string | null>('home');

  const handlePress = (iconName: string) => {
    setSelected(iconName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handlePress('home')}>
        <View
          style={[
            styles.iconContainer,
            selected === 'home' && styles.selected,
          ]}>
          {selected === 'home' ? (
            <HomeIconHighlight height={26} width={26} />
          ) : (
            <HomeIcon height={28} width={28} />
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress('document')}>
        <View
          style={[
            styles.iconContainer,
            selected === 'document' && styles.selected,
          ]}>
          {selected === 'document' ? (
            <DocumentHighlight height={26} width={26} />
          ) : (
            <Document height={28} width={28} />
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress('adjust')}>
        <View
          style={[
            styles.iconContainer,
            selected === 'adjust' && styles.selected,
          ]}>
          {selected === 'adjust' ? (
            <AdjustHighlight height={26} width={26} />
          ) : (
            <Adjust height={28} width={28} />
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress('profile')}>
        <View
          style={[
            styles.iconContainer,
            selected === 'profile' && styles.selected,
          ]}>
          {selected === 'profile' ? (
            <ProfileHighlight height={26} width={26} />
          ) : (
            <Profile height={28} width={28} />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavbar;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: '#121927',
    width: '100%',
    height: 70,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  selected: {
    color: '#5046e5d9',
    borderTopWidth: 2.5,
    borderTopColor: '#5046e5d9',
  },
});
