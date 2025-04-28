import {useEffect, useRef} from 'react';
import io from 'socket.io-client';

export const useSocket = (newOrder: (data: any) => void) => {
  const socketRef = useRef<any>(null);

  useEffect(() => {
    const socket = io('https://new.aurora-api.uz', {
      transports: ['websocket'],
      forceNew: true,
      reconnectionAttempts: 5,
      timeout: 10000,
      path: '/api-node/socket.io',
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('✅ Socket connected');
    });

    socket.on('connect_error', err => {
      console.log('Socket connection error:', err);
    });

    socket.on('update_order', newOrder);

    return () => {
      socket.off('update_order', newOrder);
      socket.disconnect();
    };
  }, []);

  return socketRef;
};
