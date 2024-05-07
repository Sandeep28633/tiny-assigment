import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBNMF7Kie5gdPPgoi-R0bVi971Wz1AUxy4",
  authDomain: "tiny-assignment.firebaseapp.com",
  projectId: "tiny-assignment",
  storageBucket: "tiny-assignment.appspot.com",
  messagingSenderId: "746439117831",
  appId: "1:746439117831:web:f3c0034fdea9a69b702ea2",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
