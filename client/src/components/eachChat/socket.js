import { io } from 'socket.io-client';

const Endpoint='https://journl-server.vercel.app'
export const socket=io(Endpoint,{
    transports: [ "websocket" ]
})