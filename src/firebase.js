// Import the necessary Firebase SDK functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // ✅ Import auth
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArwppy9GErBrwkrmXoJCwdPOU5Nxyb2Zs",
  authDomain: "defihub-28f02.firebaseapp.com",
  projectId: "defihub-28f02",
  storageBucket: "defihub-28f02.appspot.com",
  messagingSenderId: "313493069160",
  appId: "1:313493069160:web:4cd73002ed9872188ecadd",
  measurementId: "G-EVQSXKLS9S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // ✅ Initialize Firebase Auth

export { auth }; // ✅ Export auth so it can be used in SignUp.js and Login.js
