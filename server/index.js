const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const port = 4000;

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {

  let username = '';

  socket.on("join_room", (data) => {
    socket.join(data.room);
    console.log(`${data.username}유저가 ${data.room}번 방에 입장했습니다`);
    let noti = {
      message:`${data.username} 유저가 방에 입장했습니다`,
      author:'알림'
    }
    socket.to(data.room).emit('receive_message', noti);
    return username = data.username;
  });

  socket.on("send_message", (data) => {
    console.log(data)
    socket.to(data.room).emit("receive_message", data);
    console.log('데이터 전송')
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(port, () => console.log(`server running on port ${port}`));