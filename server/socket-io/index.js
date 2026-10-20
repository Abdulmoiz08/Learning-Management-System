const { Server } = require("socket.io");

let io;
const userMap = {}; // shared across app

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.auth.userId;

    console.log("User connected:", userId);

    if (userId) {
      userMap[userId] = socket.id;
    }

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      delete userMap[userId];
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

module.exports = {
  initSocket,
  getIO,
  userMap,
};
