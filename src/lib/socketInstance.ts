// socketInstance.ts
import { io as clientIo, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = clientIo("https://new.aurora-api.uz", {
      path: "/api-node/socket.io",
      transports: ["websocket", "polling"],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 2000,
      reconnectionDelayMax: 5000,
      timeout: 3000,
      // клиент сам отвечает на ping автоматически
    });
  }

  return socket;
}
