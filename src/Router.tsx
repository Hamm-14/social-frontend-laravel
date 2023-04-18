import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import BusinessDetailView from "./components/business/BusinessDetailView";
import BusinessList from "./components/business/BusinessList";
import CreditLineDetailView from "./components/credit-line/CreditLineDetailView";
import CreditLinesList from "./components/credit-line/CreditLinesList";
import CustomerDetailView from "./components/customers/CustomerDetailView";
import CustomersList from "./components/customers/CustomersList";
import FloorPlanList from "./components/floor-plan/FloorPlanList";
import FloorPlanTabs from "./components/floor-plan/FloorPlanTabs";
import UserDetailView from "./components/users/UserDetailView";
import UsersList from "./components/users/UsersList";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import { DecodedToken } from "./types/token";

const dummyDecodedToken = {
  user_email: "",
  user_id: "",
  type: "",
  iat: 0,
  exp: 0,
};

const Router = () => {
  const [decodedToken, setDecodedToken] = useState<DecodedToken>(dummyDecodedToken);
  let navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      // const decoded: DecodedToken = jwtDecode(token);
      // setDecodedToken(decoded);
      // if (decoded.exp < Date.now() / 1000) {
      //   localStorage.clear();
      //   localStorage.removeItem("token");
      //   localStorage.removeItem("userId");
      //   navigate("/");
      // }
      navigate("/");
    }
  }, [token, navigate, setDecodedToken]);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={token ? <FloorPlanList /> : <Login />}
        />
        <Route element={<ProtectedRoutes />}>
          <Route path="/floor-plan-request/:id" element={<FloorPlanTabs />} />
          <Route path="/credit-line-application" element={<CreditLinesList />} />
          <Route path="/credit-line-application/:id" element={<CreditLineDetailView />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/:id" element={<UserDetailView />} />
          <Route path="/customers" element={<CustomersList />} />
          <Route path="/customers/:id" element={<CustomerDetailView />} />
          <Route path="/business" element={<BusinessList />} />
          <Route path="/business/:id" element={<BusinessDetailView />} />
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
};

export default Router;
