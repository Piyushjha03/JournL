import express from 'express'
import { httpGetTracks , httpPostTracks ,httpGetPostsByTrack} from '../controller/tracks.controller.js';

const tracksRouter=express.Router();

tracksRouter.get('/:id',httpGetTracks);
tracksRouter.post('/',httpPostTracks);
tracksRouter.post('/trackFeed',httpGetPostsByTrack);

httpGetPostsByTrack


export default tracksRouter;
