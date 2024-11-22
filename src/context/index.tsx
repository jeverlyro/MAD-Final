// src/context/PlansContext.tsx
import React, {createContext, useState, useContext, useEffect} from 'react';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from 'firebase/firestore';
import {db} from '../config/firebase';
import {getAuth} from 'firebase/auth';

interface Plan {
  id: string;
  userId: string;
  barebone: {title: string; image: any} | null;
  switches: {title: string; image: any} | null;
  keycaps: {title: string; image: any} | null;
  additional: {title: string; image: any} | null;
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
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const docRef = await addDoc(collection(db, 'plans'), {
        ...plan,
        userId: user.uid,
      });
      setSavedPlans([
        ...savedPlans,
        {id: docRef.id, ...plan, userId: user.uid},
      ]);
    }
  };

  const deletePlan = async (id: string) => {
    await deleteDoc(doc(db, 'plans', id));
    setSavedPlans(savedPlans.filter(plan => plan.id !== id));
  };

  return (
    <PlansContext.Provider
      value={{selectedItems, savedPlans, updateSelected, savePlan, deletePlan}}>
      {children}
    </PlansContext.Provider>
  );
};
