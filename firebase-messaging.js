// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyC6WWQpGt21tbHoBbEaA2J8Ia8gbA1ca9I",
  authDomain: "irctc-clone-db.firebaseapp.com",
  databaseURL: "https://irctc-clone-db-default-rtdb.firebaseio.com",
  projectId: "irctc-clone-db",
  storageBucket: "irctc-clone-db.firebasestorage.app",
  messagingSenderId: "67679210271",
  appId: "1:67679210271:web:add449a3c596c187a7fe2a",
  measurementId: "G-N098RFRGDB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };