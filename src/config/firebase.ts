// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
//import {...} from "firebase/database";
import { getFirestore } from 'firebase/firestore'
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDquP3djL576Bq5Wn-4cJIYhOf7plHMHKE',
  authDomain: 'freelaapppizza.firebaseapp.com',
  projectId: 'freelaapppizza',
  storageBucket: 'freelaapppizza.appspot.com',
  messagingSenderId: '102928636598',
  appId: '1:102928636598:web:128c98695c80574de3a417',
  measurementId: 'G-2NP9H5K96G'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
//const analytics = getAnalytics(app);
