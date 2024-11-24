import React, {createContext, useContext, useState, useEffect} from 'react';
import {collection, query, where, getDocs, addDoc, deleteDoc, doc} from 'firebase/firestore';
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
  updateSelected: (type: string, item: {title: string; image: any}) => void;
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
    const fetchPlans = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const q = query(
          collection(db, 'plans'),
          where('userId', '==', user.uid),
        );
        const querySnapshot = await getDocs(q);
        const plans = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Plan[];
        setSavedPlans(plans);
      }
    };

    fetchPlans();
  }, []);

  const updateSelected = (type: string, item: {title: string; image: any}) => {
    setSelectedItems(prev => ({...prev, [type]: item}));
  };

  const savePlan = async (plan: Omit<Plan, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, 'plans'), plan);
      setSavedPlans(prev => [...prev, {...plan, id: docRef.id} as Plan]);
    } catch (error) {
      console.error('Error saving plan:', error);
      throw error;
    }
  };

  const deletePlan = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'plans', id));
      setSavedPlans(prev => prev.filter(plan => plan.id !== id));
    } catch (error) {
      console.error('Error deleting plan:', error);
    }
  };

  return (
    <PlansContext.Provider
      value={{selectedItems, savedPlans, updateSelected, savePlan, deletePlan}}>
      {children}
    </PlansContext.Provider>
  );
};