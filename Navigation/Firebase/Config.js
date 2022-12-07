import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
// import { initializeApp } from 'firebase-admin/app';

// import admin from 'firebase-admin';
// import functions from 'firebase-functions';





const firebaseConfig = {

  apiKey: "AIzaSyC-mtHCVj0oxdwcxTJfyoEbr0IrME_bzXQ",
  authDomain: "portfolio-c4a93.firebaseapp.com",
  databaseURL: "https://portfolio-c4a93.firebaseio.com",
  projectId: "portfolio-c4a93",
  storageBucket: "portfolio-c4a93.appspot.com",
  messagingSenderId: "315295652774",
  appId: "1:315295652774:web:a2e4e789544178f8e2cd67",
  measurementId: "G-E9EFE5PNNW"
      };
    
      const app = initializeApp(firebaseConfig);
      const auth = getAuth();
      const firebase = getFirestore();

//       admin.initializeApp(functions.firebaseConfig.firebase);

// const db = admin.firestore();
      
      export {
        auth,
        firebase,
        // db
      }