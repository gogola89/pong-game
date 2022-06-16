const app = require("./app");
const sockets = require("./sockets");

const http = require("http");
const httpServer = http.createServer(app);

const io = require("socket.io");
const socketServer = io(httpServer);

const PORT = process.env.PORT || 8080;

httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT} ...`);
});

sockets.listen(socketServer);
