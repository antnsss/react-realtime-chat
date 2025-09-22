import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const httpServer = createServer(app);

app.use(cors());

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const messages: { username: string; text: string }[] = [];

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.emit("chatHistory", messages);

  socket.on("newMessage", (msg) => {
    messages.push(msg);
    io.emit("newMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

httpServer.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
