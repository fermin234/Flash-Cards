import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBuQUib4kVbC3kbOgJ1w9HGBRmdUzWuMQY",
  authDomain: "flash-card-native-8ad8e.firebaseapp.com",
  projectId: "flash-card-native-8ad8e",
  storageBucket: "flash-card-native-8ad8e.appspot.com",
  messagingSenderId: "774590002270",
  appId: "1:774590002270:web:f5820bb06e0882a5b3f0cf",
};

export const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore(app);
export const auth = getAuth(app);
