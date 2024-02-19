import { io } from 'socket.io-client';

const Endpoint='https://journl-server.up.railway.app/'
export const socket=io(Endpoint,{
    withCredentials:true,
    "transports": ['websocket']
})