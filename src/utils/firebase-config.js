import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBbb1KcpUC00CP57vBz3FpZE5Ry94SSV9Y",
  authDomain: "react-netflix-clone-13565.firebaseapp.com",
  projectId: "react-netflix-clone-13565",
  storageBucket: "react-netflix-clone-13565.appspot.com",
  messagingSenderId: "80706573919",
  appId: "1:80706573919:web:d225253b9951a5aa032dea",
  measurementId: "G-02JS61KTKB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
