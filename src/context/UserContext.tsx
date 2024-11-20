import React, {createContext, useContext, useState, useEffect} from 'react';
import {auth, db} from '../config/firebase';
import {doc, onSnapshot} from 'firebase/firestore';

interface UserContextType {
  profileImage: string;
  setProfileImage: (url: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children}) => {
  const [profileImage, setProfileImage] = useState(
    'https://via.placeholder.com/120',
  );

  useEffect(() => {
    if (auth.currentUser) {
      const userRef = doc(db, 'users', auth.currentUser.uid);

      const unsubscribe = onSnapshot(userRef, docSnapshot => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          if (userData.profileImage) {
            setProfileImage(userData.profileImage);
          }
        }
      });

      return () => unsubscribe();
    }
  }, [auth.currentUser]);

  return (
    <UserContext.Provider value={{profileImage, setProfileImage}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
