import { io } from 'socket.io-client';

// initializing the socket connection here
export const socket = io(process.env.NEXT_PUBLIC_API_URL as string);