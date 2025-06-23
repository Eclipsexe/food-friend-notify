
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCtnUhxetVtQ7XdejiJOobzxsRrI8VRkHY",
  authDomain: "uringredients.firebaseapp.com",
  databaseURL: "https://uringredients-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "uringredients",
  storageBucket: "uringredients.firebasestorage.app",
  messagingSenderId: "1016308517022",
  appId: "1:1016308517022:web:920041db2a1c175d69138f",
  measurementId: "G-S8KDBCVNRD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
