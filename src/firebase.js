// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOg5KRfp0TBq2sFi4G9Sp-C_EYNPVK7mo",
  authDomain: "loyalty-web-app-dbc8e.firebaseapp.com",
  projectId: "loyalty-web-app-dbc8e",
  storageBucket: "loyalty-web-app-dbc8e.appspot.com",
  messagingSenderId: "1014430136327",
  appId: "1:1014430136327:web:a9304b42c58a61d82592a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
