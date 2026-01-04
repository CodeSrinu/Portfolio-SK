import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA8nL3M6a72kUzfpMJgHwiJzJ_OHxAl6Ms",
  authDomain: "portfolio-admin-35688.firebaseapp.com",
  projectId: "portfolio-admin-35688",
  storageBucket: "portfolio-admin-35688.firebasestorage.app",
  messagingSenderId: "242847845212",
  appId: "1:242847845212:web:a0a95e05930a687fd18f99"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
