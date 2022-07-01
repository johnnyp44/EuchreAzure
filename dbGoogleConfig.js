import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAKuRJmWzXRIFxMPsq1Ibwq5Mop518xjjY",
  authDomain: "euchrestats-bbe6d.firebaseapp.com",
  projectId: "euchrestats-bbe6d",
  storageBucket: "euchrestats-bbe6d.appspot.com",
  messagingSenderId: "205649322170",
  appId: "1:205649322170:web:9d89b59f684d54ba82a283",
  measurementId: "G-C7KSNB2L6F"
};

//Initialize Firebase
const g_app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(g_app);

export { db };
