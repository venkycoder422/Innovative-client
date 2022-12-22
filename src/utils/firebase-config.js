import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyD7--HwDlcqWhAUFyXYbJ11BPLSR07FUfs",
    authDomain: "netflix-clone-1d1aa.firebaseapp.com",
    projectId: "netflix-clone-1d1aa",
    storageBucket: "netflix-clone-1d1aa.appspot.com",
    messagingSenderId: "489070251423",
    appId: "1:489070251423:web:e9d55cfd842992f698c1aa",
    measurementId: "G-3Q11W5DV5L"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);

  export const firebaseAuth  = getAuth(app) 