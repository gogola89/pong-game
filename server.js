const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server);
const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname));
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/server", (req, res) => {
  res.send("Your server is up!");
});

let readyPlayerCount = 0;

io.on("connection", (socket) => {
  console.log(`A user connected as: ${socket.id}`);
  socket.on("ready", () => {
    console.log(`Player ready as: ${socket.id}`);
    readyPlayerCount++;
    if (readyPlayerCount % 2 === 0) {
      // Broadcast start game
      io.emit("startGame", socket.id);
    }
  });
  socket.on("paddleMove", (paddleData) => {
    socket.broadcast.emit("paddleMove", paddleData);
  });

  socket.on("ballMove", (ballData) => {
    socket.broadcast.emit("ballMove", ballData);
  });
  socket.on("disconnect", (reason) => {
    console.log(`Player ${socket.id} disconnected. (${reason})`);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT} ...`);
});
