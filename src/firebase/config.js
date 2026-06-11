import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase Console se mili hui real live production keys
const firebaseConfig = {
  apiKey: "AIzaSyDwNjWey3ZdcBB8Vj_Dk1kEViYhnCTWa5Q",
  authDomain: "elite-arena-7c676.firebaseapp.com",
  projectId: "elite-arena-7c676",
  storageBucket: "elite-arena-7c676.firebaseapp.com",
  messagingSenderId: "522756433242",
  appId: "1:522756433242:web:07669ca148e767820eff63",
  measurementId: "G-VY08L0N668"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore (Database) aur isay export kiya
export const db = getFirestore(app);