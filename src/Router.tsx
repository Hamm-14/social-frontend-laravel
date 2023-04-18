import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import PostList from "./components/feed/PostList";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import Register from "./screens/Register";

const Router = () => {
  let navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={token ? <PostList /> : <Login />}
        />
         <Route
          path="/register"
          element={token ? <PostList /> : <Register />}
        />
        <Route element={<ProtectedRoutes />}>
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
};

export default Router;
