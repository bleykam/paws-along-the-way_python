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
    <main>
      <textarea id="chat-log" cols="100" rows="20"></textarea>
      <input ref={messageRef} id="chat-message-input" type="text" size="100" onKeyDown={handleKeyPress}/>
      <button id="chat-message-submit" className="messaging__button" onClick={handleClick} type="submit" >SEND</button>
    </main>
  )
}
