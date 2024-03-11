 import { io } from "socket.io-client";
const local = "http://localhost:3000";

export const getSocketConnection = (client_id : string) => {
  return io(`${local}/api/websocket`, {
    withCredentials: true,
    transports: ["polling"],
    extraHeaders:{
      clientid: client_id 
    },
    autoConnect: false,
  });
};
