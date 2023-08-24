import { io } from 'socket.io-client';

// initializing the socket connection here
export const socket = io('http://localhost:9000');