import React, {createContext, useContext, useState, useEffect} from 'react';
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import {db} from '../config/firebase';

interface Plan {
  id: string;
  barebone: {title: string; image: any};
  switches: {title: string; image: any};
  keycaps: {title: string; image: any};
  additional: {title: string; image: any};
  userId: string;
}

interface PlansContextType {
  selectedItems: {
    barebone: {title: string; image: any} | null;
    switches: {title: string; image: any} | null;
    keycaps: {title: string; image: any} | null;
    additional: {title: string; image: any} | null;
  };
  savedPlans: Plan[];
  updateSelected: (
    type: string,
    item: {title: string; image: any} | null,
  ) => void;
  savePlan: (plan: Omit<Plan, 'id'>) => Promise<void>;
  deletePlan: (id: string) => void;
}

const PlansContext = createContext<PlansContextType | undefined>(undefined);

export const usePlans = () => {
  const context = useContext(PlansContext);
  if (!context) {
    throw new Error('usePlans must be used within a PlansProvider');
  }
  return context;
};

export const PlansProvider: React.FC = ({children}) => {
  const [savedPlans, setSavedPlans] = useState<Plan[]>([]);
  const [selectedItems, setSelectedItems] = useState({
    barebone: null,
    switches: null,
    keycaps: null,
    additional: null,
  });

  useEffect(() => {
    const auth = getAuth();

    const unsubscribeAuth = auth.onAuthStateChanged(user => {
      if (!user) {
        setSavedPlans([]);
        return;
      }

      const plansRef = collection(db, 'plans');
      const q = query(plansRef, where('userId', '==', user.uid));

      const unsubscribePlans = onSnapshot(q, snapshot => {
        const plans = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Plan[];
        setSavedPlans(plans);
      });

      return () => {
        unsubscribePlans();
      };
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  const updateSelected = (type: string, item: {title: string; image: any}) => {
    setSelectedItems(prev => ({...prev, [type]: item}));
  };

  const savePlan = async (plan: Omit<Plan, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, 'plans'), plan);
      // No need to update state manually as onSnapshot will handle it
      return docRef.id;
    } catch (error) {
      console.error('Error saving plan:', error);
      throw error;
    }
  };

  const deletePlan = async (planId: string) => {
    try {
      await deleteDoc(doc(db, 'plans', planId));
      // No need to update state manually as onSnapshot will handle it
    } catch (error) {
      console.error('Error deleting plan:', error);
      throw error;
    }
  };

  return (
    <PlansContext.Provider
      value={{
        savedPlans,
        selectedItems,
        updateSelected,
        savePlan,
        deletePlan,
      }}>
      {children}
    </PlansContext.Provider>
  );
};
