import express from "express";
import {
  httpLoginUser,
  httpPostUser,
  httpUpdateUser,
  httpGetFeed,
  httpGetOtherUserInfo,
  httpLogoutUser,
} from "../controller/users.controller.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const usersRouter = express.Router();

usersRouter.post("/feed", requireAuth, httpGetFeed);

usersRouter.post("/login", httpLoginUser);

usersRouter.get("/logout", httpLogoutUser);

usersRouter.post("/signup", httpPostUser);

usersRouter.patch("/", httpUpdateUser);

usersRouter.post("/otheruser", httpGetOtherUserInfo);

export default usersRouter;
