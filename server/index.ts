import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const httpServer = createServer(app);

// Додаємо CORS middleware для REST-запитів (якщо потрібно)
app.use(cors());

// Створюємо Socket.IO сервер з CORS
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // твій React клієнт
    methods: ["GET", "POST"]
  }
});

// Зберігаємо історію чату
const messages: { username: string; text: string }[] = [];

// Підключення клієнта
io.on('connection', (socket) => {
  console.log('A user connected');

  // Відправляємо історію чату
  socket.emit('chatHistory', messages);

  // Отримуємо нове повідомлення
  socket.on('newMessage', (msg) => {
    messages.push(msg);
    io.emit('newMessage', msg); // розсилаємо всім
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

httpServer.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
