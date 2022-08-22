const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const port = 4050;

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`${socket.id} 유저가 접속했습니다`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`${data.username}유저가 ${data.room}번 방에 입장했습니다`);
    socket.emit('member', data.username);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    console.log('데이터 전송')
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(port, () => console.log(`server running on port ${port}`));