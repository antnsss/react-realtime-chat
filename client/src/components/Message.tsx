import { useState, useRef, useEffect } from "react";

interface MessageProps {
  username: string;
  text: string;
  currentUserEmail: string | null;
  onAddUser: (username: string) => void;
}

export default function Message({
  username,
  text,
  currentUserEmail,
  onAddUser,
}: MessageProps) {
  const isMe = username === currentUserEmail;
  const [showOptions, setShowOptions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`mb-2 ${isMe ? "text-right" : "text-left"}`}>
      <div
        onClick={() => setShowOptions((prev) => !prev)}
        className={`inline-block px-3 py-2 rounded-2xl max-w-[80%] break-words text-sm leading-tight cursor-pointer
          ${isMe ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"}`}
      >
        <div className="font-bold text-xs mb-1 opacity-80">{username}</div>
        <div>{text}</div>
      </div>

      {showOptions && (
        <div className="mt-1 p-2 bg-white border rounded-lg shadow-md inline-block text-sm">
          <div className="mb-1 font-semibold">{username}</div>
          <button
            onClick={() => onAddUser(username)}
            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add to Private
          </button>
        </div>
      )}
    </div>
  );
}
