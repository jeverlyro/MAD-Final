import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {BottomNavbar} from '../../../../molecules';
import {usePlans} from '../../../../context';
import {auth} from '../../../../config/firebase';

const SimScreen: React.FC = () => {
  const navigation = useNavigation();
  const {savedPlans, deletePlan} = usePlans();
  const currentUserId = auth.currentUser?.uid;

  const handleDelete = (id: string) => {
    Alert.alert('Delete Plan', 'Are you sure you want to delete this plan?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => deletePlan(id),
        style: 'destructive',
      },
    ]);
  };

  const userPlans = savedPlans.filter(plan => plan.userId === currentUserId);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Mod Plan</Text>
          </View>
          <View style={styles.divider} />

          {userPlans.length === 0 ? (
            <Text style={styles.noPlansText}>
              You do not have any plans yet.
            </Text>
          ) : (
            <ScrollView style={styles.plansList}>
              {userPlans.map(plan => (
                <View key={plan.id} style={styles.planCard}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('PlanDetails', {plan})}
                    style={styles.planContent}>
                    <View>
                      <Text style={styles.planTitle}>
                        {plan.barebone?.title || 'Custom Keyboard'}
                      </Text>
                      <Text style={styles.planSubtitle}>
                        {plan.switches?.title || 'No switches selected'}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleDelete(plan.id)}
                      style={styles.deleteButton}>
                      <Ionicons
                        name="trash-outline"
                        size={24}
                        color="#FF4444"
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('Plans')}
            accessibilityLabel="Add new plan">
            <Ionicons name="add" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <BottomNavbar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121927',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 26,
    fontFamily: 'Lexend-Bold',
    color: 'white',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#222C41',
    opacity: 0.5,
    marginVertical: 5,
  },
  noPlansText: {
    color: '#8F92A1',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Lexend-Regular',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#5046E5',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  plansList: {
    marginTop: 10,
  },
  planCard: {
    backgroundColor: '#1A1F2E',
    borderRadius: 10,
    marginBottom: 12,
    padding: 15,
  },
  planContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planTitle: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Lexend-Medium',
    marginBottom: 4,
  },
  planSubtitle: {
    color: '#8F92A1',
    fontSize: 14,
    fontFamily: 'Lexend-Regular',
  },
  deleteButton: {
    padding: 8,
  },
});

export default SimScreen;
