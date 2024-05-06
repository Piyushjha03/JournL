import http from "http";
import mongoose from "mongoose";
import { app } from "./app.js";
import { Server } from "socket.io";

// http server
const server = http.createServer(app);
const PORT = process.env.PORT || 8080;

export const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://journl.onrender.com",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected : " + socket.id);

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    console.log("room" + room);
    socket.join(room);
  });

  socket.on("new message", (msg) => {
    console.log(msg);

    if (!msg.chat.users) return console.log("chat.users not found");

    msg.chat.users.forEach((user) => {
      if (user !== msg.sender._id) {
        console.log(user);
        socket.in(user).emit("message received", msg);
      }
    });
  });
});

//  mongoDB connection
mongoose.connection.once("open", () => {
  console.log("MongoDb connected");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function connectMongo() {
  await mongoose.connect(process.env.MONGO_URL, {
    // useFindAndModify: false,
    // useCreateIndex: true,    //From mongoose v6 these values are by default..
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
connectMongo();
server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
