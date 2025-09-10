import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../hooks/useAuth";
import Message from "./Message";

const socket = io("http://localhost:3000");

export default function ChatContainer() {
  const { email } = useAuth();
  const [messages, setMessages] = useState<{ username: string; text: string }[]>([]);
  const [text, setText] = useState("");

 
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    socket.on("newMessage", (msg) => {
      setMessages((prev) => {
       
        const isDuplicate = prev.some(
          (m) => m.username === msg.username && m.text === msg.text
        );
        if (isDuplicate) return prev;

        const updated = [...prev, msg];
        localStorage.setItem("chatMessages", JSON.stringify(updated));
        return updated;
      });
    });

    return () => {
      socket.off("newMessage");
    };
  }, []);

  const sendMessage = () => {
    if (!text.trim()) return;

    const msg = {
      username: email || "Anonymous",
      text,
    };

   
    socket.emit("newMessage", msg);

    
    setMessages((prev) => {
      const updated = [...prev, msg];
      localStorage.setItem("chatMessages", JSON.stringify(updated));
      return updated;
    });

    setText("");
  };

  return (
    <div style={{ width: "600px", margin: "0 auto" }}>
      <div
        style={{
          height: "300px",
          overflowY: "scroll",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          marginBottom: "10px",
        }}
      >
        {messages.map((m, i) => (
          <Message key={i} username={m.username} text={m.text} currentUserEmail={email} />
        ))}
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter message..."
          style={{
            flex: 1,
            padding: "8px",
            borderRadius: "20px",
            border: "1px solid #ccc",
            outline: "none",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "8px 16px",
            borderRadius: "20px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
