import React from 'react';

export const Message = (props) => {
  const messageContent = props.messageContent;
  const username = props.username;
  
  return (
    <div className='Message' id={username === messageContent.author ? 'me' : 'other'}>
      <div>
        <div className='MessageBody'>
          <p>{messageContent.message}</p>
        </div>
        <div className='MessageSub'>
          <p id='time'>{messageContent.time}</p>
          <p id='author'>{messageContent.author}</p>
        </div>
      </div>
    </div>
  );
};