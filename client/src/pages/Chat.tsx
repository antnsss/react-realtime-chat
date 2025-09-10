import { useDispatch } from "react-redux";
import { useAuth } from "../hooks/useAuth";
import { removeUser } from "../store/slices/userSlice";
import ChatContainer from "../components/ChatContainer";

function Chat() {
    const dispatch = useDispatch();
    const { isAuth, email } = useAuth();

    if (!isAuth) return <p>You are not logged in</p>;

    const handleLogout = () => {
        dispatch(removeUser());
        localStorage.removeItem('user'); 
    };

    return (
        <div>
            <p>Welcome, {email}!</p>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded"
            >
                Log out
            </button>

          <ChatContainer />

        </div>
    );
}

export default Chat;
