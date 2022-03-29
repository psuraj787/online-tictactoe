// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3U_9rsojI-V_t2rSb0GPelbBkPpk0WM0",
  authDomain: "online-tictactoe-22645.firebaseapp.com",
  projectId: "online-tictactoe-22645",
  storageBucket: "online-tictactoe-22645.appspot.com",
  messagingSenderId: "233727500723",
  appId: "1:233727500723:web:d8bd5bb7c72035af0e2bc6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;