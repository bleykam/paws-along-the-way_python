import React, { useRef, useState, useEffect } from 'react';
import './Messaging.scss';
import { w3cwebsocket as WebSocket } from "websocket";
import { handleKeyPress } from '../../utils';


export default function Messaging() {
  const messageRef = useRef("");
  const userJSON = localStorage.getItem('user');
  const user = JSON.parse(userJSON);
  const userName= user.username;

const handleClick = (event) => {
 
  const message = messageRef.current.value;
  const data = {
    'message': message,
    'username': userName,
  };
console.log('WebSocket message received:', event.data, userName, data);
document.querySelector('#chat-log').value += (userName + ': '  + data.message + '\n');
};

  return (

    <main className="messaging" >
    <h2 className="messaging__title">Messages</h2>
      <textarea className="messaging__log" id="chat-log" rows="20"></textarea>
      <input className="messaging__input" ref={messageRef} id="chat-message-input" type="text" placeholder="Type message here" onKeyDown={handleKeyPress}/>
      <button id="chat-message-submit" className="messaging__button" onClick={handleClick} type="submit" >SEND</button>
    </main>
  )
}
