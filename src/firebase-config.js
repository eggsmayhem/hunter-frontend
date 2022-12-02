
import { initializeApp } from "firebase/app"

const firebaseConfig = {
    apiKey: "AIzaSyCD0QR9WZvqyM7hbDU68Ykw-s65USQyLlM",
    authDomain: "hunterbot-d707b.firebaseapp.com",
    projectId: "hunterbot-d707b",
    storageBucket: "hunterbot-d707b.appspot.com",
    messagingSenderId: "964856479110",
    appId: "1:964856479110:web:fd44a0f7df03a3753a0007",
    measurementId: "G-KYKJK09FCR"
  
};
// try {
//   const app = initializeApp(firebaseConfig);
// } catch (err) {
//   if (!/already exists/.test(err.message)) {
//     console.error('Firebase initialization error', err.stack);
//   }
// }
// const fire = firebase;
// export default fire;

export const app = initializeApp(firebaseConfig);