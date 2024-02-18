import { io } from 'socket.io-client';

const Endpoint='http://localhost:8001'
export const socket=io(Endpoint)