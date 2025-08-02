// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxWD5qmfKxZTelx6WguxrS50T1fvpkqSU",
  authDomain: "ai-t-7f55a.firebaseapp.com",
  projectId: "ai-t-7f55a",
  storageBucket: "ai-t-7f55a.firebasestorage.app",
  messagingSenderId: "12810205133",
  appId: "1:12810205133:web:b76e7e31dd04c6fafff684",
  measurementId: "G-4GXMP0R1KR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);