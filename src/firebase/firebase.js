import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
    apiKey: "AIzaSyCvi5K24CKTkbHk2tf_B1m_NaekIu35BPs",
    authDomain: "react-login-1b083.firebaseapp.com",
    projectId: "react-login-1b083",
    storageBucket: "react-login-1b083.firebasestorage.app",
    messagingSenderId: "1039737853773",
    appId: "1:1039737853773:web:cbf64d32aa2e45f18e8904",
    measurementId: "G-X8BBGEB917"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const storage = getStorage(app); 
const db = getFirestore(app);
export { db, storage };