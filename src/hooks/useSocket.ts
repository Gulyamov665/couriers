// import { OrdersType } from "@store/services/orders/types";
// import { authState } from "@store/slices/auth";
// import { useCallback, useEffect, useRef } from "react";
// import { useSelector } from "react-redux";
// import io from "socket.io-client";
// import notifee, { AndroidImportance } from "@notifee/react-native";

// export const useSocket = (updateOrders: () => void) => {
//   const socketRef = useRef<any>(null);
//   const { userInfo } = useSelector(authState);

//   useEffect(() => {
//     const socket = io("https://new.aurora-api.uz", {
//       transports: ["websocket", "polling"],
//       // forceNew: true,
//       reconnection: true, // по умолчанию true, но можно указать явно
//       reconnectionDelay: 2000, // начальная задержка между попытками
//       reconnectionDelayMax: 5000, // максимальная задержка
//       reconnectionAttempts: Infinity,
//       timeout: 10000,
//       path: "/api-node/socket.io",
//     });
//     socketRef.current = socket;

//     socket.on("connect", () => {
//       console.log("✅ Socket connected");
//       updateOrders();
//     });

//     socket.on("disconnect", (reason) => {
//       console.warn("⚠️ Socket disconnected:", reason);
//     });

//     socket.on("connect_error", (err) => {
//       console.log("Socket connection error:", err);
//     });

//     const handleUpdate = async (order: OrdersType) => {
//       const channel = userInfo?.channels.includes(order.restaurant.id);
//       if (channel && order.status === "awaiting_courier") {
//         await notifee.displayNotification({
//           title: "Новый заказ",
//           body: `Сокет #${order.id} ожидает подтверждения`,
//           android: {
//             channelId: "aurora",
//             sound: "sound",
//             importance: AndroidImportance.HIGH,
//             vibrationPattern: [300, 500],
//             pressAction: { id: "default" },
//           },
//         });
//       }
//     };

//     socket.on("update_order", () => updateOrders());
//     socket.on("update_order", handleUpdate);

//     return () => {
//       socket.off("update_order", updateOrders);
//       socket.disconnect();
//     };
//   }, []);

//   const disconnect = useCallback(() => {
//     if (socketRef.current) {
//       socketRef.current.disconnect();
//       console.log("🔌 Socket manually disconnected");
//     }
//   }, []);

//   return { socket: socketRef, disconnect };
// };

// useSocket.ts
import { useEffect } from "react";
import { getSocket } from "lib/socketInstance";
import notifee, { AndroidImportance } from "@notifee/react-native";
import { useSelector } from "react-redux";
import { authState } from "@store/slices/auth";

export const useSocket = (updateOrders: () => void) => {
  const { userInfo } = useSelector(authState);
  const socket = getSocket();

  useEffect(() => {
    const onConnect = () => {
      console.log("✅ Socket connected");
      updateOrders();
    };
    const onDisconnect = (reason: string) => {
      console.warn("⚠️ Socket disconnected:", reason);
    };
    const onError = (err: any) => {
      console.error("🔌 Socket error:", err);
    };

    const onUpdate = async (order: any) => {
      updateOrders();
      if (userInfo?.channels.includes(order.restaurant.id) && order.status === "awaiting_courier") {
        await notifee.displayNotification({
          title: "Новый заказ",
          body: `Сокет #${order.id} ожидает подтверждения`,
          android: {
            channelId: "aurora",
            sound: "sound",
            importance: AndroidImportance.HIGH,
            vibrationPattern: [300, 500],
            pressAction: { id: "default" },
          },
        });
      }
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onError);
    socket.on("update_order", onUpdate);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onError);
      socket.off("update_order", onUpdate);
      // НЕ отключаем socket.disconnect()
    };
  }, [socket, updateOrders, userInfo]);
};
