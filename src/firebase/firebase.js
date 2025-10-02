import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB8yYR1jizR31VeS8TDqN8gm5T3MYIslA4",
  authDomain: "beti-nails.firebaseapp.com",
  projectId: "beti-nails",
  storageBucket: "beti-nails.firebasestorage.app",
  messagingSenderId: "288411915818",
  appId: "1:288411915818:web:f1713bacea7da87cd09553"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);
export {db, auth,storage };