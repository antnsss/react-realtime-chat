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
    <div className="w-72 h-full bg-white border-r border-gray-200 shadow-sm flex flex-col">
      {/* Заголовок */}
      <div className="p-4 bg-blue-600 text-white font-semibold flex justify-between items-center shadow-sm">
        <span className="text-lg">Chats</span>
        <button className="text-xl rounded-full hover:bg-blue-500 w-7 h-7 flex items-center justify-center transition">
          +
        </button>
      </div>

      {/* Список чатів */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        {users.map((user) => (
          <div
            key={user}
            onClick={() => onSelectUser(user)}
            className={`px-4 py-3 cursor-pointer border-b border-gray-200 transition-colors ${
              user === selectedUser
                ? "bg-blue-100 font-semibold"
                : "hover:bg-gray-100"
            }`}
          >
            <div className="font-medium text-gray-800">{user}</div>
            <div className="text-sm text-gray-500 truncate">
              {user === "Group" ? "Group Chat" : "Private Chat"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
