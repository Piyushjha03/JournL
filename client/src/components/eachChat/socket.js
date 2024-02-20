import { io } from 'socket.io-client';

const Endpoint='https://journl-server.onrender.com'
export const socket=io(Endpoint,{
    withCredentials:true
})