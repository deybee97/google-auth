import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyAB_PrnzHeWG9Xg3SbjzByktGRnNBXfIGw",
    authDomain: "auth-dev-25d33.firebaseapp.com",
    projectId: "auth-dev-25d33",
    storageBucket: "auth-dev-25d33.appspot.com",
    messagingSenderId: "980693666777",
    appId: "1:980693666777:web:2a65606680082aeb5667c8"
  };



const app  = initializeApp(firebaseConfig);
export const auth = getAuth(app)