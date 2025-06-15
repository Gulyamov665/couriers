import { OrdersType } from "@store/services/orders/types";
import { useCallback, useEffect, useRef } from "react";
import io from "socket.io-client";

export const useSocket = (updateOrders: () => void) => {
  const socketRef = useRef<any>(null);

  useEffect(() => {
    const socket = io("https://new.aurora-api.uz", {
      transports: ["websocket", "polling"],
      // forceNew: true,
      reconnection: true, // по умолчанию true, но можно указать явно
      reconnectionDelay: 2000, // начальная задержка между попытками
      reconnectionDelayMax: 5000, // максимальная задержка
      reconnectionAttempts: Infinity,
      timeout: 10000,
      path: "/api-node/socket.io",
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Socket connected");
      updateOrders();
    });

    socket.on("disconnect", (reason) => {
      console.warn("⚠️ Socket disconnected:", reason);
    });

    socket.on("connect_error", (err) => {
      console.log("Socket connection error:", err);
    });

    const handleUpdate = (order: OrdersType) => {
      // console.log(order);
    };

    socket.on("update_order", () => updateOrders());
    socket.on("update_order", handleUpdate);

    return () => {
      socket.off("update_order", updateOrders);
      socket.disconnect();
    };
  }, []);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      console.log("🔌 Socket manually disconnected");
    }
  }, []);

  return { socket: socketRef, disconnect };
};
