import { formatDistanceToNow } from 'date-fns';
const logElement = document.querySelector('.logs');
const messageForm = document.querySelector('.message');
const nameForm = document.querySelector('.name-form');
const rooms = document.querySelector('.rooms');

class UpdateUi{
    constructor(chats){
        this.chats = chats;
    }
    deleteChat(chat){
        chat.remove();
    }
    clear(){
        this.chats.innerHTML = "";
    }
    addChat(userName, chat, time, selfClass){
        const when = formatDistanceToNow(new Date(time), {addSuffix:true});
        const chatElement = document.createElement('li');
        chatElement.innerHTML = `
            <li>
                <div class="${selfClass}">
                    <h4 class="name ${selfClass}">${userName}</h4>
                    <p class="chat ${selfClass}">${chat}</p>
                </div>
                <p class="time ${selfClass}">${when}</p>
            </li>
            <hr>
        `;
        this.chats.appendChild(chatElement);
    }
    updateRoom(chatRoom){
        Array.from(rooms.children).forEach(room => {
            if(room.textContent === chatRoom)
                room.classList.add('active');
            else{
                room.classList.remove('active');
            }
        })
    }
    logName(name){
        logElement.querySelector('p').textContent = `Welcome ${name} you can send a message now`
        messageForm.querySelector('label').textContent = name + ':';
        nameForm.querySelector('label').textContent = 'Name:'; 
        logElement.classList.add('active')
        setTimeout(() => {
            logElement.classList.remove('active')
        },4000)
    }
    logError(){
        console.log('hello');
        logElement.querySelector('p').textContent = 'Plese enter your name before sending a message'
        logElement.classList.add('active')
        setTimeout(() => {
            logElement.classList.remove('active')
        },4000)
    }
    initLog(){
        logElement.querySelector('p').textContent = 'Enter your name and send message'
        logElement.classList.add('active')
        setTimeout(() => {
            logElement.classList.remove('active')
        },4000)
    }
}

export default UpdateUi;