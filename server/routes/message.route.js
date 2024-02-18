import express from 'express'
import { httpGetAllMessage, httpPostMessage } from '../controller/message.controller.js';

const messageRouter=express.Router();

messageRouter.post('/send',httpPostMessage)
messageRouter.post('/getAllMessages',httpGetAllMessage)



export default messageRouter;
