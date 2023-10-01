import { useState, useRef} from 'react';
import './Messaging.scss'
import { handleKeyPress, useGetEffect, ChatBox} from '../../utils';
import 'react-chat-elements/dist/main.css'

const API_PATH = 'ws://localhost:8000/ws/chatapp/';

export default function Messaging() {
  let chatSocket = new WebSocket(API_PATH);
  const messageRef = useRef("");
  const userJSON = localStorage.getItem('user');
  const user = JSON.parse(userJSON);
  const userName = user.username
  console.log(userName)

  const [messageHistory, setMessageHistory] = useState([]);

  useGetEffect(`http://localhost:8000/api/chatmessage/`, setMessageHistory)

  chatSocket.onopen = function(e) {
    console.log("chaatscoket open")
    // chatSocket.send("My name is John");
  };

  const handleClick = (event) => {
  const message = messageRef.current.value;
  const data = {
    'message': message,
    'sender': userName,
  };

  console.log('WebSocket message received:', event, userName, data);

  setMessageHistory([...messageHistory,data]);
  chatSocket.send(JSON.stringify(data))

  messageRef.current.value="";

  };

  return (

    <main className="messaging" > 

    <h2 className="messaging__title">Messages</h2>

        <div className="messaging__log">
          {messageHistory.map((message) => (
            ChatBox(message.message, message.sender===userName, message.sender)
              ))}
        </div>

      <input className="messaging__input" ref={messageRef} id="chat-message-input" type="text" placeholder="Type message here" onKeyDown={handleKeyPress}/>
      <button id="chat-message-submit" className="messaging__button" onClick={handleClick} type="submit" >SEND</button>
    </main>
  )
}





