import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD0eApcXUpv_GerVIvWGh-c1WkUFYh-CB8',
  authDomain: 'modurkeebs-udl.firebaseapp.com',
  projectId: 'modurkeebs-udl',
  storageBucket: 'modurkeebs-udl.firebasestorage.app',
  messagingSenderId: '262444136325',
  appId: '1:262444136325:web:26295a8d7aab42a2ab76ec',
};

const app = initializeApp(firebaseConfig);

let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (error) {
  auth = getAuth(app);
}

const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export {auth, app, db, provider};
