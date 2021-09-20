//import modules
import Firebase from "/src/firebase";
import UpdateUi from "/src/updateUI";

//querying dom
const hamburgerMenu = document.querySelector('.hamburger-menu');
const chooseRoomElement = document.querySelector('.choose-room');
const sidebar = document.querySelector('.rooms');
const chats = document.querySelector('.chats')
const messageForm = document.querySelector('.message');
const nameForm = document.querySelector('.name-form');

// Initialize modules
const firebaseApp = new Firebase();
const updateUi = new UpdateUi(chats);

//event listners
hamburgerMenu.addEventListener('click', ()=>{
    chooseRoomElement.classList.toggle('active');
    sidebar.classList.toggle('active');
    chats.classList.toggle('blur');
})

//forms
messageForm.addEventListener('submit', e => {
    e.preventDefault();

    if(firebaseApp.userName){
        const message = messageForm.message.value.trim();
        if(message){
            messageForm.reset();
            messageForm.message.blur();
            firebaseApp.addChat(message);
        }
    }
    else{
        updateUi.logError();
    }
})
nameForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = nameForm.name.value.trim();
    if(name){
        nameForm.reset();
        nameForm.name.blur();
        firebaseApp.setUserName(name);
        updateUi.logName(name);
        localStorage.setItem('chatUserName', name)
    }
})
//sidebar
sidebar.addEventListener('click', e => {
    if(e.target.tagName == 'LI'){
        const chatRoom = e.target.textContent;
        updateUi.updateRoom(chatRoom);
        updateUi.clear();
        sidebar.classList.toggle('active');
        chooseRoomElement.classList.toggle('active');
        chats.classList.remove('blur');
        firebaseApp.setChatRoom(chatRoom);
        firebaseApp.realtimeUpdate(chat => {
            const selfClass = (chat.userName === firebaseApp.userName) ? 'self' : '';
            updateUi.addChat(chat.userName, chat.chat, chat.timestamp, selfClass);
        })
    }
})

firebaseApp.realtimeUpdate(chat => {
    const selfClass = (chat.userName === firebaseApp.userName) ? 'self' : '';
    updateUi.addChat(chat.userName, chat.chat, chat.timestamp, selfClass);
})

if(localStorage.getItem('chatUserName')){
    firebaseApp.setUserName(localStorage.getItem('chatUserName'));
    updateUi.logName(localStorage.getItem('chatUserName'));
}
else{
    updateUi.initLog();
}




