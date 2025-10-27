// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// --- You can replace the config below with your project's config or use environment variables ---
const firebaseConfig = {
  apiKey: "AIzaSyCMNJDx-2yuxcUiOvZCxPyASzPxHEcqvYk",
  authDomain: "react-au-app-aug25.firebaseapp.com",
  projectId: "react-au-app-aug25",
  storageBucket: "react-au-app-aug25.firebasestorage.app",
  messagingSenderId: "733518610244",
  appId: "1:733518610244:web:016317eb31d32a24fbe111"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
