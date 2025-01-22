// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCk5kL7gvVg73SkAgSUYcS3rmmZPLXrIv0",
  authDomain: "softwarep-01.firebaseapp.com",
  projectId: "softwarep-01",
  storageBucket: "softwarep-01.appspot.com",
  messagingSenderId: "214073127754",
  appId: "1:214073127754:web:1611e0a327d7958f0387b3",
  measurementId: "G-29LX5Y1DBY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);