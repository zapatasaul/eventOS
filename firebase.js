import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAGh9MSw8a0dmkX7uIHTLtO_TtizNi7D4U",
  authDomain: "eventos-7dfa8.firebaseapp.com",
  projectId: "eventos-7dfa8",
  storageBucket: "eventos-7dfa8.appspot.com",
  messagingSenderId: "329919688449",
  appId: "1:329919688449:web:c97e9f1d7dbaabaf8c3500",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
