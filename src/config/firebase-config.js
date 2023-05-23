import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDasLuhC0FAtohdOBF4_fmqxIidGyvORV8",
  authDomain: "fir-form-82a4b.firebaseapp.com",
  projectId: "fir-form-82a4b",
  storageBucket: "fir-form-82a4b.appspot.com",
  messagingSenderId: "999787144045",
  appId: "1:999787144045:web:7a979fe941c75524463064",
  measurementId: "G-PTHDBPLGRD",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
