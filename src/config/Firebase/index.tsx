// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export default app;
