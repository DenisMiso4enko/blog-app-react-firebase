import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC1zX9iucpmTyQbXSHunnl8LZRCbYxe8Ro",
  authDomain: "blog-92656.firebaseapp.com",
  projectId: "blog-92656",
  storageBucket: "blog-92656.appspot.com",
  messagingSenderId: "663250393006",
  appId: "1:663250393006:web:fc3f24d109220daa139a3f",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
