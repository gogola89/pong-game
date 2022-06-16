function listen(io) {
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
}

module.exports = {
  listen,
};
