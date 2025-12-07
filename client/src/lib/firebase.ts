// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXFUHzeoUNdWkU9XXzYFUSR9cuNLtlvRU",
  authDomain: "deepsolv-pokemon.firebaseapp.com",
  projectId: "deepsolv-pokemon",
  storageBucket: "deepsolv-pokemon.firebasestorage.app",
  messagingSenderId: "1004555894018",
  appId: "1:1004555894018:web:571f18ac891a83543ad61b",
  measurementId: "G-RGW4Y4XF9Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);