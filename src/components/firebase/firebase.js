//import { initializeApp } from "firebase/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCR2KuEp0PKDs4xuR5YlKQdx-q1N5eA694",
  authDomain: "usdoffshore.firebaseapp.com",
  projectId: "usdoffshore",
  storageBucket: "usdoffshore.appspot.com",
  messagingSenderId: "436135682674",
  appId: "1:436135682674:web:5f0e2dd38d36d8d69018eb",
  measurementId: "G-JQFZK2LVN6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

var database = getFirestore(app);
 
export default database;