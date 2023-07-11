import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAunuk-U4zPiPdCC8Tm_HyPfWYYSyQLgik",
  authDomain: "beloved-book.firebaseapp.com",
  projectId: "beloved-book",
  storageBucket: "beloved-book.appspot.com",
  messagingSenderId: "514902766423",
  appId: "1:514902766423:web:5ba0e2a502d86308800412"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;