import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: 'AIzaSyBxaAmHx2fOAG5dZfJXQQTbEjsaBnwZzhQ',
  authDomain: 'modurkeebs.firebaseapp.com',
  databaseURL:
    'https://modurkeebs-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'modurkeebs',
  storageBucket: 'modurkeebs.firebasestorage.app',
  messagingSenderId: '532261638908',
  appId: '1:532261638908:web:01b3cf8f226eac58c3bd79',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
