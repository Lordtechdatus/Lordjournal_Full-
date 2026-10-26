import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import pollingService from '../services/pollingService';

const WebSocketContext = createContext();

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [usePolling, setUsePolling] = useState(false);

  useEffect(() => {
    // Auto-detect environment and use appropriate WebSocket URL
    const isProd = import.meta?.env?.PROD || window.location.hostname !== 'localhost';
    
    // If PROD: connect to the SAME ORIGIN (Nginx will proxy to Node)
    // If DEV: connect directly to your backend dev server
    const WS_URL = isProd
      ? undefined  // same-origin (will use current domain)
      : 'http://localhost:5000';  // dev: connect directly to backend

    const newSocket = io(WS_URL, {
      // IMPORTANT: this must match your Nginx location block
      path: '/socket.io/',
      withCredentials: true,
      transports: ['websocket', 'polling'],
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
      timeout: 20000,
    });

    newSocket.on('connect', () => {
      setIsConnected(true);
      setUsePolling(false);
      pollingService.stopAllPolling();
    });

    newSocket.on('disconnect', () => setIsConnected(false));

    newSocket.on('connect_error', () => {
      setIsConnected(false);
      setUsePolling(true);
    });

    setSocket(newSocket);
    return () => {
      newSocket.close();
      pollingService.stopAllPolling();
    };
  }, []);

  const joinUserRoom = (userEmail) => {
    if (socket && userEmail) {
      socket.emit('join-user-room', userEmail);
    }
    
    // Start polling as fallback if WebSocket is not connected
    if (usePolling && userEmail) {
      pollingService.startUserPolling(userEmail, (userData) => {
        // This will be handled by the component that calls this
      //  console.log('Polling received user data:', userData);
      });
    }
  };

  const joinAdminRoom = (adminEmail) => {
    if (socket && adminEmail) {
      socket.emit('join-admin-room', adminEmail);
    }
    
    // Start polling as fallback if WebSocket is not connected
    if (usePolling && adminEmail) {
      pollingService.startAdminPolling(adminEmail, (adminData) => {
        // This will be handled by the component that calls this
      //  console.log('Polling received admin data:', adminData);
      });
    }
  };

  const onSubmissionStatusUpdate = (callback) => {
    if (socket) {
      socket.on('submission-status-updated', callback);
    }
  };

  const offSubmissionStatusUpdate = (callback) => {
    if (socket) {
      socket.off('submission-status-updated', callback);
    }
  };

  const value = {
    socket,
    isConnected,
    usePolling,
    joinUserRoom,
    joinAdminRoom,
    onSubmissionStatusUpdate,
    offSubmissionStatusUpdate,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};
