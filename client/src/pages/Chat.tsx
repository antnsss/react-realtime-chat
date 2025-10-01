import { useDispatch } from "react-redux";
import { useAuth } from "../hooks/useAuth";
import { removeUser } from "../store/slices/userSlice";
import ChatContainer from "../components/ChatContainer";

function Chat() {
    const dispatch = useDispatch();
    const { isAuth, email } = useAuth();

    if (!isAuth)
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-600 text-lg">You are not logged in</p>
            </div>
        );

    const handleLogout = () => {
        dispatch(removeUser());
        localStorage.removeItem("user");
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Хедер */}
            <header className="flex items-center justify-between px-6 py-4 bg-blue-600 text-white shadow-md">
                <h1 className="text-lg font-semibold">Welcome, {email}!</h1>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition-colors font-medium"
                >
                    Log out
                </button>
            </header>

            {/* Основний контейнер чату */}
            <main className="flex-1 overflow-hidden">
                <ChatContainer />
            </main>
        </div>
    );
}

export default Chat;
