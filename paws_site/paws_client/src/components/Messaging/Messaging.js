import React, { useState, useRef} from 'react';
import './Messaging.scss'
import { handleKeyPress, useGetEffect} from '../../utils';

const API_PATH = 'ws://localhost:8000/ws/chatapp/';

export default function Messaging() {
  let chatSocket = new WebSocket(API_PATH);
  const messageRef = useRef("");
  const userJSON = localStorage.getItem('user');
  const user = JSON.parse(userJSON);
  const userName = user.username

  const [messageHistory, setMessageHistory] = useState([]);

  useGetEffect(`http://localhost:8000/api/chatmessage/`, setMessageHistory)
  console.log(messageHistory)

  console.log(chatSocket)
  // chatSocket.onopen = function(e) {
 
  //   chatSocket.send("My name is John");
  // };
  chatSocket.onmessage = function(e) {
    console.log("REACTONMSG", e)
    const data = JSON.parse(e.data);
    console.log("REACT EDATA", e.data)
};

const handleClick = (event) => {
  console.log("handleEvent", event)

  const message = messageRef.current.value;
  const data = {
    'message': message,
    'username': userName,
  };
console.log('WebSocket message received:', event, userName, data);
document.querySelector('#chat-log').value += (userName + ': '  + data.message + '\n');
chatSocket.send(JSON.stringify(data))
messageRef.current.value="";
};



  return (

    <main className="messaging" > 

    <h2 className="messaging__title">Messages</h2>
 
        <div className="comment-list">
          {messageHistory.map((comment) => (
            <li className="comment-list__item" key={comment.id}>{comment.message}</li>
          ))}
        </div>
      
      <textarea className="messaging__log" id="chat-log" rows="20"></textarea>
      <input className="messaging__input" ref={messageRef} id="chat-message-input" type="text" placeholder="Type message here" onKeyDown={handleKeyPress}/>
      <button id="chat-message-submit" className="messaging__button" onClick={handleClick} type="submit" >SEND</button>
    </main>
  )
}





