import express from 'express'
import { httpLoginUser , httpPostUser ,httpUpdateUser ,httpGetFeed, httpGetOtherUserInfo } from '../controller/users.controller.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const usersRouter=express.Router();


usersRouter.post('/feed',requireAuth,httpGetFeed);

usersRouter.post('/login',httpLoginUser);

usersRouter.post('/signup',httpPostUser);

usersRouter.patch('/',httpUpdateUser);

usersRouter.post('/otheruser',httpGetOtherUserInfo);



export default usersRouter