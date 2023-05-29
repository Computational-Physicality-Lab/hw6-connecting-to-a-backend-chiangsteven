import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKMLGaRi7r6RqB7ny4CDDbZ4oTYDvGcg4",
  authDomain: "pui-hw6-backend.firebaseapp.com",
  projectId: "pui-hw6-backend",
  storageBucket: "pui-hw6-backend.appspot.com",
  messagingSenderId: "818172845274",
  appId: "1:818172845274:web:c4a8162eb4a838abe6d9e3",
  measurementId: "G-PQFKZ24WJF"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
export default db;