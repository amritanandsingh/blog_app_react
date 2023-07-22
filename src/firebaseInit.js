// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
 // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSr-YvEj3qyQsSNJkjpJ-_OELdRZCQ6cw",
  authDomain: "blogging-app-a03eb.firebaseapp.com",
  projectId: "blogging-app-a03eb",
  storageBucket: "blogging-app-a03eb.appspot.com",
  messagingSenderId: "924943698917",
  appId: "1:924943698917:web:8b11c320884ab2f6d73d0c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 