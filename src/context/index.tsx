// src/context/PlansContext.tsx
import React, {createContext, useState, useContext} from 'react';

interface Plan {
  id: string;
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
  savePlan: () => void;
  deletePlan: (id: string) => void;
}

const PlansContext = createContext<PlansContextType | undefined>(undefined);

export const PlansProvider: React.FC = ({children}) => {
  const [selectedItems, setSelectedItems] = useState({
    barebone: null,
    switches: null,
    keycaps: null,
    additional: null,
  });
  const [savedPlans, setSavedPlans] = useState<Plan[]>([]);

  const updateSelected = (type: string, item: {title: string; image: any}) => {
    setSelectedItems(prev => ({
      ...prev,
      [type]: item,
    }));
  };

  const savePlan = () => {
    const newPlan = {
      id: Date.now().toString(),
      ...selectedItems,
    };
    setSavedPlans(prev => [...prev, newPlan]);
    setSelectedItems({
      barebone: null,
      switches: null,
      keycaps: null,
      additional: null,
    });
  };

  const deletePlan = (id: string) => {
    setSavedPlans(prev => prev.filter(plan => plan.id !== id));
  };

  return (
    <PlansContext.Provider
      value={{selectedItems, savedPlans, updateSelected, savePlan, deletePlan}}>
      {children}
    </PlansContext.Provider>
  );
};

export const usePlans = () => {
  const context = useContext(PlansContext);
  if (!context) {
    throw new Error('usePlans must be used within PlansProvider');
  }
  return context;
};
