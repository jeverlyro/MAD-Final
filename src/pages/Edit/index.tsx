import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {Input} from '../../molecules';

const EditInfoScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState(null);
  const navigation = useNavigation();

  const handleSave = () => {
    Alert.alert('Profile Saved', 'Your profile information has been updated.');
  };

  const toggleGender = selectedGender => {
    setGender(gender === selectedGender ? null : selectedGender);
  };

  return (
    <View style={styles.Topcontainer}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={19}
          color="white"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Personal info</Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          You can change your personal information here.
        </Text>
      </View>
      <View style={styles.container}>
        <Input label="Email" placeholder="Fill your e-mail here" />

        <Input label="Name" placeholder="Fill your name here" />

        <View style={styles.rowContainer}>
          <TextInput
            style={styles.dateInput}
            placeholder="--/--/----"
            placeholderTextColor="#7A7A7A"
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
          />

          <TouchableOpacity
            onPress={() => toggleGender('Male')}
            style={[
              styles.genderOption,
              gender === 'Male' && styles.selectedGenderOption,
            ]}>
            <Ionicons
              name={gender === 'Male' ? 'radio-button-on' : 'radio-button-off'}
              size={20}
              color="white"
            />
            <Text style={styles.genderText}>Male</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => toggleGender('Female')}
            style={[
              styles.genderOption,
              gender === 'Female' && styles.selectedGenderOption,
            ]}>
            <Ionicons
              name={
                gender === 'Female' ? 'radio-button-on' : 'radio-button-off'
              }
              size={20}
              color="white"
            />
            <Text style={styles.genderText}>Female</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.changePasswordButton}
          onPress={() => navigation.navigate('ChangePassword')}>
          <Text style={styles.changePasswordText}>Change password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditInfoScreen;

const styles = StyleSheet.create({
  Topcontainer: {
    flex: 1,
    backgroundColor: '#121927',
    paddingTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#121927',
    marginTop: 8,
    marginBottom: 50,
    marginHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'Lexend-Bold',
    marginLeft: -185,
  },
  saveButton: {
    width: 50,
    height: 25,
    backgroundColor: '#5046E5',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 8,
    color: 'white',
    fontFamily: 'Lexend-SemiBold',
  },
  infoBox: {
    backgroundColor: '#0F1522',
    padding: 5,
    paddingHorizontal: 20,
    borderRadius: 0,
    width: '100%',
    alignSelf: 'stretch',
    marginBottom: 40,
  },
  infoText: {
    color: 'white',
    fontFamily: 'Lexend-Regular',
    fontSize: 7,
  },
  input: {
    backgroundColor: '#2C2F3E',
    color: 'white',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginVertical: 12,
    marginHorizontal: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 40,
    marginHorizontal: 20,
  },
  dateInput: {
    backgroundColor: '#2C2F3E',
    color: 'white',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    flex: 1,
    marginRight: 5,
  },
  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2F3E',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  selectedGenderOption: {
    backgroundColor: '#5046E5',
  },
  genderText: {
    color: 'white',
    fontFamily: 'Lexend-Regular',
    fontSize: 12,
    marginLeft: 5,
  },
  changePasswordButton: {
    backgroundColor: '#E93E3E',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
  },
  changePasswordText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
