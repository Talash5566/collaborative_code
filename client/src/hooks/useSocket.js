'use client';
import { useEffect, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

export const useSocket = () => {
  const socketRef = useRef(null);

  useEffect(() => {
    // KEY: socket in a ref, NOT useState — prevents re-renders from killing the connection
    socketRef.current = io(SOCKET_URL, {
      withCredentials: true,   // send auth cookie with socket handshake too
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  // Emit an event to the server
  const emit = useCallback((event, data) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(event, data);
    } else {
      console.warn(`Socket not connected. Tried to emit: ${event}`);
    }
  }, []);

  // Listen for an event. Returns a cleanup function — use in useEffect
  const on = useCallback((event, handler) => {
    socketRef.current?.on(event, handler);
    return () => socketRef.current?.off(event, handler);
  }, []);

  return { socketRef, emit, on };
};