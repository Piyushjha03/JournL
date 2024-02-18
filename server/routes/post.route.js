import express from 'express'
import { httpGetPost , httpPostPost , httpUpdatePost } from '../controller/post.controller.js';

const postRouter=express.Router();

postRouter.get('/:id',httpGetPost);
postRouter.post('/',httpPostPost);
postRouter.patch('/',httpUpdatePost);


export default postRouter;
