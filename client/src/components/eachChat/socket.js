import { io } from 'socket.io-client';

const Endpoint='https://journl-server.vercel.app:8001'
export const socket=io(Endpoint)