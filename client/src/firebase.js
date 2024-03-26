

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-c05d3.firebaseapp.com",
  projectId: "mern-blog-c05d3",
  storageBucket: "mern-blog-c05d3.appspot.com",
  messagingSenderId: "933514098276",
  appId: "1:933514098276:web:1c585c6544191f5403d171"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
