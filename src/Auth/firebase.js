
import  { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD7u9j56EeQLPy-N_1O-0Dpiu4qQYvmhEM",
    authDomain: "whatsappclone-99c37.firebaseapp.com",
    projectId: "whatsappclone-99c37",
    storageBucket: "whatsappclone-99c37.appspot.com",
    messagingSenderId: "995181534410",
    appId: "1:995181534410:web:f4e5d101ae934531f12833"  
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();
