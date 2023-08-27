
import { initializeApp } from "firebase/app";
import {
    addDoc, collection, getDocs,
    getFirestore, deleteDoc, doc
} from 'firebase/firestore';
 
const firebaseConfig = {
    apiKey: "AIzaSyD7u9j56EeQLPy-N_1O-0Dpiu4qQYvmhEM",
    authDomain: "whatsappclone-99c37.firebaseapp.com",
    projectId: "whatsappclone-99c37",
    storageBucket: "whatsappclone-99c37.appspot.com",
    messagingSenderId: "995181534410",
    appId: "1:995181534410:web:f4e5d101ae934531f12833"  
}


// initialize the app
const app = initializeApp(firebaseConfig);

// initialize services
export const database = getFirestore(app);

// collection references 
const collectionRef = collection(database, "users");

// get collection data
await getDocs(collectionRef)
.then((snapshot) => 
    snapshot.docs.forEach((doc) => {
        doc.data();
    })
);

const addData = async ( ) => {
    try {
        await addDoc(collectionRef, { name: " " })
    } catch (err) {
        console.log(err)
    }
}

const deleteData = async ( ) => {
    const documentRef = doc(database, "users", '9');
    try {
        await deleteDoc(documentRef);
    } catch (err) {
        console.log(err)
    }
}

// add();
// delete();
