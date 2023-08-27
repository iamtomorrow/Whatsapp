
import { auth, database } from "./Auth/firebase";
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { 
    collection, getDocs, addDoc, updateDoc, where, query, arrayUnion, doc, setDoc, getDoc, onSnapshot
} from "firebase/firestore";

export const API = {
    getGoogleAuth: async ( ) => {
        const googleProvider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, googleProvider);
            try {
                await setDoc(doc(database, "users", result.user.uid), 
                { 
                    uid: result.user.uid, 
                    name: result.user.displayName, 
                    photoURL: result.user.photoURL 
                });
            } catch (err) {
                console.log(err);
            }
        } catch (err) {
            console.log(err);
        }
    },

    getGithubAuth: async ( ) => {
        const githubProvider = new GithubAuthProvider();
        try {
            const result = await signInWithPopup(auth, githubProvider);
            try {
                await setDoc(doc(database, "users", result.user.uid), 
                {
                    uid: result.user.uid,
                    name: result.user.displayName,
                    photoURL: result.user.photoURL
                });
                console.log(docRef);
            } catch (err) {
                console.log(err)
            }
        } catch (err) {
            console.log( err );
        }
    },

    getChats: async ( id ) => {
        const collectionRef = collection(database, "users");
        let list = [ ]

        await getDocs( collectionRef )
        .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                if ( doc.data().uid !== id) {
                    list.push(doc.data());
                }
            })
        })
        return list;
    },

    addNewChat: async ( user, user2 ) => {
        const collectionRef = collection(database, "chats");
        // const userCollectionRef = doc(database, "chat");

        const newChat = await addDoc(collectionRef, {
            users: [ user.uid, user2.uid ],
            messages: []
        }) 

        await updateDoc(doc(database, "users", user.uid), {
            chats: arrayUnion({
                chat_id: newChat.id,
                title: user2.name,
                image: user2.photoURL,
                with: user2.uid,
                last_msg: "",
                last_time: new Date()
            })
        })

        await updateDoc(doc(database, "users", user2.uid), {
            chats: arrayUnion({
                chat_id: newChat.id,
                title: user.displayName,
                image: user.photoURL,
                with: user.uid,
                last_msg: "",
                last_time: new Date()
            })
        })
    },

    getActiveChats: async ( userId, setChats ) => {
        await getDoc(doc(database, "users", userId))
        .then((snapshot) => {
            setChats(snapshot.data().chats);
        })
    },

    getMessageList: async ( chatInfo, setMessageList) => {
        let users = [];

        await getDocs(collection(database, "chats"))
        .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                if ( doc.id === chatInfo.chat_id ) {
                    setMessageList(doc.data().messages);
                }
            })
        })

        onSnapshot(collection(database, "chats"), ( snapshot ) => {
            snapshot.docs.forEach((doc) => {
                if ( doc.id === chatInfo.chat_id ) {
                    setMessageList(doc.data().messages);
                }
            })
        })
    },

    updateMessageList:  async ( chatInfo, newMessage ) => {
        const docRef = doc(database, "chats", chatInfo.chat_id);
        let users = [ ];
        let chats = [ ];

        await updateDoc(docRef, {
            messages: arrayUnion({
                uid: newMessage.uid,
                author: newMessage.author,
                content: newMessage.content,
                date: new Date(),
                type: newMessage.type
            })
        })

        await getDoc(docRef)
        .then((snapshot) => {
            if ( snapshot.data() ) {
                users = snapshot.data().users;
            }
        })

        for (let i in users) {
            await getDoc(doc(database, "users", users[i]))
            .then((snapshot) => {
                if ( snapshot.data().chats ) {
                    chats = [...snapshot.data().chats];
                    for (let e in chats) {
                        if (chats[e].chat_id === chatInfo.chat_id) {
                            chats[e].last_msg = newMessage.content;
                            chats[e].last_time = new Date();
                        }
                    }
                }
            })
            await updateDoc(doc(database, "users", users[i]), { chats });
        }
    }
}
