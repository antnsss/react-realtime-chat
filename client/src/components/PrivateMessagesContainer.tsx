interface PrivateMessagesContainerProps {
  users: string[];
  selectedUser: string | null;
  onSelectUser: (username: string) => void;
}

export default function PrivateMessagesContainer({
  users,
  selectedUser,
  onSelectUser,
}: PrivateMessagesContainerProps) {
  return (
    <div className="w-72 h-screen bg-white border-r shadow-sm flex flex-col">
      {/* Заголовок */}
      <div className="p-4 bg-blue-500 text-white font-semibold flex justify-between items-center">
        <span>Chats</span>
        <button className="text-sm opacity-80 hover:opacity-100">+</button>
      </div>

      {/* Список чатів */}
      <div className="flex-1 overflow-y-auto">
        {users.map((user) => (
          <div
            key={user}
            onClick={() => onSelectUser(user)}
            className={`px-4 py-3 cursor-pointer border-b hover:bg-gray-100 ${
              user === selectedUser ? "bg-gray-200 font-bold" : ""
            }`}
          >
            <div className="font-semibold text-gray-800">{user}</div>
            <div className="text-sm text-gray-500 truncate">
              {user === "Group" ? "Group Chat" : "New messages..."}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
