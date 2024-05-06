import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import { requireAuth } from "./middleware/authMiddleware.js";
import usersRouter from "./routes/users.router.js";
import tracksRouter from "./routes/tracks.route.js";
import postRouter from "./routes/post.route.js";
import { createServer } from "http";
import chatRouter from "./routes/chat.route.js";
import messageRouter from "./routes/message.route.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "https://journl.onrender.com",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// app.use(express.static(path.join(__dirname,'..','public')))

app.use("/", usersRouter);
app.use("/track", tracksRouter);
app.use("/post", postRouter);
app.use("/chat", chatRouter);
app.use("/message", messageRouter);

export { app };
