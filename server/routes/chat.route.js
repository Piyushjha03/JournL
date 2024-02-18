import express from 'express'
import { httpGetAllChat, httpGetChat } from '../controller/chat.controller.js';


const chatRouter=express.Router();

chatRouter.post('/getChat',httpGetChat)
chatRouter.post('/getAllChat',httpGetAllChat)



export default chatRouter;
