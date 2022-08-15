import './Chat.css';
import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { Message } from './Message';

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className='RoomContainer'>
      <div className='RoomHeader'>
        <p>{room}번 채팅방</p>
      </div>
      <div className='RoomBody'>
        <ScrollToBottom className='MessageBox'>
          {messageList.map((messageContent) => {
            return <Message messageContent={messageContent} username={username} />;
          })}
        </ScrollToBottom>
      </div>
      <div className='ChatInput'>
        <input
          type='text'
          value={currentMessage}
          placeholder='메세지를 입력해주세요'
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === 'Enter' && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
