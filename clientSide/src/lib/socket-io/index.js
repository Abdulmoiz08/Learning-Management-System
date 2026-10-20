import { io } from "socket.io-client";

let socket;

export const connectSocket = (studentId) => {
  socket = io("http://localhost:3001", {
    auth: {
      userId: studentId,
    },
  });

  return socket;
};

export const getSocket = () => socket;
