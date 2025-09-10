import type { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; 

interface ChildProp {
    children: React.ReactNode;
}

const PrivateRoute: FC<ChildProp> = ({ children }) => {
    const { isAuth, email } = useAuth(); 
    if (isAuth === null) {
        return <p>Loading...</p>;
    }

    return isAuth ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
