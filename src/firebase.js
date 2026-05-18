import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBOufZWSXZO3jXe2dS8KPxGYT5BQvZ5Qtg",
  authDomain: "rivodb-40b09.firebaseapp.com",
  projectId: "rivodb-40b09",
  storageBucket: "rivodb-40b09.firebasestorage.app",
  messagingSenderId: "172758372127",
  appId: "1:172758372127:web:8826cdec2db392df94aa2a",
  measurementId: "G-51X73L5QLG"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);