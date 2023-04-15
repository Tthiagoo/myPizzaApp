// Import the functions you need from the SDKs you need

import { getStorage } from 'firebase/storage'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
//import {...} from "firebase/database";
import { getFirestore } from 'firebase/firestore'
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBuP5W2wgbmacoTaUhcSkWGksclaiCAKo8',
  authDomain: 'pizzabali-f4c97.firebaseapp.com',
  projectId: 'pizzabali-f4c97',
  storageBucket: 'pizzabali-f4c97.appspot.com',
  messagingSenderId: '1094590764094',
  appId: '1:1094590764094:web:6d64e7812a9fca08da6d6f'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
//const analytics = getAnalytics(app);
