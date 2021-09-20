import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc , onSnapshot, query, where, orderBy} from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD1KbfkSbg5ai2BjhAHupSefhfgy16KAt0",
    authDomain: "realtime-chat-app-abd88.firebaseapp.com",
    projectId: "realtime-chat-app-abd88",
    storageBucket: "realtime-chat-app-abd88.appspot.com",
    messagingSenderId: "619869792637",
    appId: "1:619869792637:web:8aae852319b5c634950414"
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