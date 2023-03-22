import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyA6Ig3JFfYHSt7w7ZlvXMf-TP0j1XPTNS0",
//   authDomain: "inventory-manager-848e7.firebaseapp.com",
//   projectId: "inventory-manager-848e7",
//   storageBucket: "inventory-manager-848e7.appspot.com",
//   messagingSenderId: "496121723763",
//   appId: "1:496121723763:web:ae9be44e97989ce28b2306",
//   measurementId: "G-ZY2S3NSKQH",
// };
const firebaseConfig = {
  apiKey: "AIzaSyDS2N3J-rEk6WqI3TunWADBWg6r9QzmDpg",
  authDomain: "rotable-repair.firebaseapp.com",
  projectId: "rotable-repair",
  storageBucket: "rotable-repair.appspot.com",
  messagingSenderId: "454501408304",
  appId: "1:454501408304:web:ce1c5d09ebd94d413ed7f5",
  measurementId: "G-14G1TGYENN",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default db;
