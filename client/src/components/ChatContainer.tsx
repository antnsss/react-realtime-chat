import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "../hooks/useAuth";
import Message from "./Message";
import PrivateMessagesContainer from "./PrivateMessagesContainer";

const socket: Socket = io("http://localhost:3000");

interface ChatMessage {
  username: string;
  text: string;
  chatId: string; // "Group" або приватний чат
}

export default function ChatContainer() {
  const { email } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");
  const [privateUsers, setPrivateUsers] = useState<string[]>(["Group"]);
  const [selectedUser, setSelectedUser] = useState<string>("Group");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // --- Завантаження повідомлень та приватних чатів з localStorage ---
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) setMessages(JSON.parse(savedMessages));

    const savedUsers = localStorage.getItem("privateUsers");
    if (savedUsers) setPrivateUsers(JSON.parse(savedUsers));
  }, []);

  // --- Підписка на нові повідомлення ---
  useEffect(() => {
    const handleNewMessage = (msg: ChatMessage) => {
      setMessages((prev) => {
        const isDuplicate = prev.some(
          (m) =>
            m.username === msg.username &&
            m.text === msg.text &&
            m.chatId === msg.chatId
        );
        if (isDuplicate) return prev;

        const updated = [...prev, msg];
        localStorage.setItem("chatMessages", JSON.stringify(updated));

        // --- Додаємо нового користувача у приватні чати ---
        if (
          msg.chatId !== "Group" &&
          msg.username !== email &&
          !privateUsers.includes(msg.username)
        ) {
          const updatedUsers = [...privateUsers, msg.username];
          setPrivateUsers(updatedUsers);
          localStorage.setItem("privateUsers", JSON.stringify(updatedUsers));
        }

        return updated;
      });
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [privateUsers, email]);

  // --- Автоскролл ---
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedUser]);

 const sendMessage = () => {
  if (!text.trim() || !selectedUser) return;

  // Забороняємо писати самому собі
  if (selectedUser === email) {
    alert("You cannot send a message to yourself!");
    return;
  }

  const chatId =
    selectedUser === "Group"
      ? "Group"
      : [email, selectedUser].sort().join("-"); // Приватний чат

  const msg: ChatMessage = {
    username: email || "Anonymous",
    text,
    chatId,
  };

  socket.emit("newMessage", msg);

  setMessages((prev) => {
    const updated = [...prev, msg];
    localStorage.setItem("chatMessages", JSON.stringify(updated));
    return updated;
  });

  setText("");
};


  const handleAddUser = (username: string) => {
    if (!privateUsers.includes(username) && username !== "Group") {
      const updatedUsers = [...privateUsers, username];
      setPrivateUsers(updatedUsers);
      localStorage.setItem("privateUsers", JSON.stringify(updatedUsers));
    }
  };

 

  return (
    <div className="flex justify-center p-4">
      <div className="flex w-full max-w-6xl gap-4">
        {/* Список приватних чатів */}
        <PrivateMessagesContainer
          users={privateUsers}
          selectedUser={selectedUser}
          onSelectUser={setSelectedUser}
        />

        {/* Основний чат */}
        <div className="flex-1 flex flex-col">
          <div className="h-180 overflow-y-scroll border border-gray-300 p-3 rounded-lg bg-gray-50 mb-3">
            {messages
              .filter((m) => {
                const chatId =
                  selectedUser === "Group"
                    ? "Group"
                    : [email, selectedUser].sort().join("-");
                return m.chatId === chatId;
              })
              .map((m, i) => (
                <Message
                  key={i}
                  username={m.username}
                  text={m.text}
                  currentUserEmail={email}
                  onAddUser={handleAddUser}
                />
              ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter message..."
              className="flex-1 px-4 py-2 rounded-full border border-gray-300 outline-none"
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
