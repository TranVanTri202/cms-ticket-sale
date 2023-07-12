// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDZMyCK6Fh1acGCCfDYCNAJmTBGUDjEN3w",
  authDomain: "project-ticket-141b0.firebaseapp.com",
  projectId: "project-ticket-141b0",
  storageBucket: "project-ticket-141b0.appspot.com",
  messagingSenderId: "968272857407",
  appId: "1:968272857407:web:ef30cc6f4fc9d7d4ac2b8a",
  measurementId: "G-MV0MGLQBHX"
};


const app = initializeApp(firebaseConfig);
const apiFirebase = getFirestore(app)

export default apiFirebase;