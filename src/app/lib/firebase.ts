import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDG-fcEu0JWeelmocfGip8kmvBjmAxqcek",
  authDomain: "imobiliaria-app-4b725.firebaseapp.com",
  projectId: "imobiliaria-app-4b725",
  storageBucket: "imobiliaria-app-4b725.firebasestorage.app",
  messagingSenderId: "377977837962",
  appId: "1:377977837962:web:c452fb91f142897e3b1073"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
