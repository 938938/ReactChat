import React, { useEffect, useRef, useState } from "react";
// import ScrollToBottom from "react-scroll-to-bottom";
import { Message } from "./Message";
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';
import { Member } from './Member';

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [member, setMember] = useState([]);

  const messageBottomRef = useRef(null);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  console.log(socket);

  // useEffect(()=>{
  //   socket.close();
  // },[])

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  socket.on('member', (data)=>{
    console.log(data)
    setMember((member)=>[...member, data]);
  })

  useEffect(() => {
    messageBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  return (
    <RoomContainer>
      <RoomHeader>
        <RoomTitle>{room}번 채팅방</RoomTitle>
      </RoomHeader>
      {/* <Member member={member} /> */}
      <RoomBody>
        {/* <ScrollToBottom className='MessageBox'> */}
        <MessageBox>
          {messageList.map((messageContent) => {
            return (
              <Message messageContent={messageContent} username={username} key={uuidv4()} />
            );
          })}
          <div ref={messageBottomRef} />
        </MessageBox>
        {/* </ScrollToBottom> */}
      </RoomBody>
      <ChatInputBox>
        <ChatInput
          type='text'
          value={currentMessage}
          placeholder='메세지를 입력해주세요'
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <ChatButton onClick={sendMessage}>&#9658;</ChatButton>
      </ChatInputBox>
    </RoomContainer>
  );
}

export default Chat;

const RoomContainer = styled.div`
  width: 300px;
  height: 440px;
`;

const RoomHeader = styled.div`
  height: 40px;
  border-radius: 6px 6px 0 0;
  background: #355463;
  position: relative;
`;

const RoomTitle = styled.p`
  margin: 0;
  display: block;
  padding: 0 1em 0 2em;
  color: #fff;
  font-weight: 700;
  line-height: 45px;
`;

const RoomBody = styled.div`
  height: 360px;
  border: 1px solid #355463;
  background: #fff;
  position: relative;
`;

const MessageBox = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  &:-webkit-scrollbar {
    display: none;
  }
  padding-top:5px;
`;

const ChatInputBox = styled.div`
  height: 40px;
  border: 1px solid #355463;
  border-top: none;
  display: flex;
  border-radius: 0 0 6px 6px;
`;

const ChatInput = styled.input`
  height: 100%;
  flex: 85%;
  border: 0;
  padding: 0 0.7em;
  font-size: 1em;
  border-right: 1px dotted #355463;
  outline: none;
  background: transparent;
`;

const ChatButton = styled.button`
  border: 0;
  display: grid;
  place-items: center;
  cursor: pointer;
  flex: 15%;
  height: 100%;
  background: transparent;
  outline: none;
  font-size: 25px;
  color: lightgray;
  &:hover {
    background: steelblue;
  }
`;
