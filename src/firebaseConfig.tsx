import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDF3DS6NdYxslX_7RaqLGg025GFCAdWiU8',
  authDomain: 'veganrecipes-7314c.firebaseapp.com',
  databaseURL: 'https://veganrecipes-7314c-default-rtdb.firebaseio.com/',
  projectId: 'veganrecipes-7314c',
  storageBucket: 'veganrecipes-7314c.appspot.com',
  messagingSenderId: '1234567890',
  appId: '1:1234567890:web:abcdef123456',
  measurementId: 'G-ABCDEFG123',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Firebase Realtime Database and get a reference to the service
const db = getDatabase(app);

export { auth, db };

// Example of signing in a user
signInWithEmailAndPassword(auth, 'gdepaula@gmail.com', '05072012')
  .then(userCredential => {
    // Signed in
    const user = userCredential.user;
    console.log('User signed in:', user);
  })
  .catch(error => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error('Error signing in:', errorCode, errorMessage);
  });
