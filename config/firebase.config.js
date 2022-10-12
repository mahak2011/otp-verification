// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDbLlquoC2GfSK-YmgTRMK0RTaMj47Z0nM',
  authDomain: 'otp-verification20.firebaseapp.com',
  projectId: 'otp-verification20',
  storageBucket: 'otp-verification20.appspot.com',
  messagingSenderId: '1033666316534',
  appId: '1:1033666316534:web:d91a9caf073cbb351b84d7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
