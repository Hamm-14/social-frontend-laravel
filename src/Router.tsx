import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import PostList from "./components/feed/PostList";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import Register from "./screens/Register";
import CreatePost from "./components/post/CreatePost";
import EditPost from "./components/post/EditPost";
import ProfileView from "./components/profile/ProfileView";
import SocialNetwork from "./components/network/SocialNetwork";

const Router = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    navigate(location.pathname);
  },[]);


  return (
    <div>
      <Routes>
        <Route path="/" element={token ? <PostList /> : <Login />} />
        <Route path="/register" element={token ? <PostList /> : <Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/profile" element={<ProfileView />} />
          <Route path="/social-network" element={<SocialNetwork />} />
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
};

export default Router;
