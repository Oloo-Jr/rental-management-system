// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCd_BsPt7009SjeVlyKGDi3GqJGtqnZvXk",
  authDomain: "rentalmanagementsystem-1ad2b.firebaseapp.com",
  projectId: "rentalmanagementsystem-1ad2b",
  storageBucket: "rentalmanagementsystem-1ad2b.firebasestorage.app",
  messagingSenderId: "522161036039",
  appId: "1:522161036039:web:9aacb28b49a13b41cec3a2",
  measurementId: "G-7VL6BQT43Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);