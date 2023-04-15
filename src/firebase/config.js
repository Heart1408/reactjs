import firebase from "firebase/compat/app";

import "firebase/compat/analytics";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCkLgTqzAUmXRFVyLLed19nCdowdQSu1lY",
  authDomain: "easytable-chat.firebaseapp.com",
  projectId: "easytable-chat",
  storageBucket: "easytable-chat.appspot.com",
  messagingSenderId: "14344262325",
  appId: "1:14344262325:web:9f19c9857114fa70f964fc",
  measurementId: "G-5X854LQHHM",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
const auth = firebase.auth();
const db = firebase.firestore();

export const createSupporter = () => {
  setDoc(doc(db, "users", "supportid"), {
    displayName: "Supporter",
    email: "supporter@gmail.com",
    photoURL: "",
    uid: "abc123",
    createAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

auth.useEmulator("http://localhost:9099");
if (window.location.hostname === "localhost") {
  // db.useEmulator("localhost", "8080");
  createSupporter();
}

export { auth, db };
export default firebase;
