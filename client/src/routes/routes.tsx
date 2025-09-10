import { Route, Routes } from "react-router-dom";
import Chat from "../pages/Chat";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./private-route";



const AppRoutes = () => {
  
  const navRoutes = [
    {
      path: "/",
      element: (
        <PrivateRoute>
          <Chat />
        </PrivateRoute>
      ),
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ];

  return (
    <Routes>
      {navRoutes.map(({ path, element }, index) => (
        <Route key={index} path={path} element={element} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
