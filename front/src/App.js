import io from "socket.io-client";
import { useState } from "react";
import Chat from "./components/Chat";
import styled from "styled-components";

const socket = io.connect("http://localhost:4050");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <ChatApp>
      {!showChat ? (
        <ChatContainer>
          <ChatTitle>Chat !</ChatTitle>
          <ChatInput
            type="text"
            placeholder="사용할 이름을 입력해주세요"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <ChatInput
            type="text"
            placeholder="입장할 방을 입력해주세요"
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
          <ChatButton onClick={joinRoom}>입장</ChatButton>
        </ChatContainer>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </ChatApp>
  );
}

export default App;

const ChatApp = styled.div`
  width: 100vw;
  height: 100vh;
  background: #fff;
  color: #212121;
  font-family: "Open Sans", sans-serif;
  display: grid;
  place-items: center;
`

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  border:1px solid steelblue;
  border-radius:6px;
  padding:10px;
`
const ChatTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 1rem;
  color:steelblue;
`
const ChatInput = styled.input`
  height: 35px;
  margin: 7px;
  border: 2px solid steelblue;
  border-radius: 5px;
  padding: 5px;
  font-size: 16px;
`

const ChatButton = styled.button`
  width: 200px;
  height: 50px;
  margin: 10px auto;
  border: none;
  border-radius: 5px;
  padding: 5px;
  font-size: 16px;
  background: steelblue;
  color: #fff;
  cursor: pointer;
  &:hover{  
    background: rgb(35, 65, 89);
  }
`