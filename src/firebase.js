import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAVQAHf90WWFwmF1k36LhJUNghsDi8XvK8",
  authDomain: "eventifyapp-2bdf7.firebaseapp.com",
  projectId: "eventifyapp-2bdf7",
  storageBucket: "eventifyapp-2bdf7.firebasestorage.app",
  messagingSenderId: "1079347950435",
  appId: "1:1079347950435:web:c6c47b94f692942b51d956",
  measurementId: "G-4WBN8BT28Y"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);