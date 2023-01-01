import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc , onSnapshot, query, where, orderBy} from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAG70XMswSUeOuEEhOOX8ayEaaOHJwpiH4",
    authDomain: "vanilla-chat-app.firebaseapp.com",
    projectId: "vanilla-chat-app",
    storageBucket: "vanilla-chat-app.appspot.com",
    messagingSenderId: "923804990702",
    appId: "1:923804990702:web:2bb180f564d4903882c7ff"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const chatColl = collection(db, 'chats');

class Firebase{
    constructor(){
        this.chatRoom = 'Default';
    }
    addChat(chat){
        const chatDoc = {room: this.chatRoom, userName: this.userName, chat, timestamp: new Date().getTime()};
        addDoc(chatColl, chatDoc);
    }
    async realtimeUpdate(callback){
        this.querychat = query(chatColl, where("room", "==", this.chatRoom), orderBy("timestamp", "asc"));
        this.unsuscribe = onSnapshot(this.querychat, (chatDoc) => {
            chatDoc.docChanges().forEach(chatDoc => {
                callback(chatDoc.doc.data())
            });
        });
    }
    setUserName(userName){
        this.userName = userName;
    }
    setChatRoom(chatRoom){
        this.chatRoom = chatRoom;
        if(this.unsuscribe){
            this.unsuscribe();
        }
    }
}

export default Firebase;