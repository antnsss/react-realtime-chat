interface MessageProps {
  username: string;
  text: string;
  currentUserEmail: string | null;
}

export default function Message({ username, text, currentUserEmail }: MessageProps) {
  const isMe = username === currentUserEmail;

  return (
    <div
      style={{
        textAlign: isMe ? "right" : "left",
        marginBottom: "8px",
      }}
    >
      <div
        style={{
          display: "inline-block",
          padding: "8px 12px",
          borderRadius: "20px",
          backgroundColor: isMe ? "#007bff" : "#ccc",
          color: isMe ? "#fff" : "#333",
          maxWidth: "80%",
          wordBreak: "break-word",
          fontSize: "14px",
          lineHeight: "1.2",
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            fontSize: "12px",
            marginBottom: "4px",
            opacity: 0.8,
          }}
        >
          {username}
        </div>
        <div>{text}</div>
      </div>
    </div>
  );
}
