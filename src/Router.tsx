import { useEffect } from "react";
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
          element={token ? <FloorPlanList /> : <Login />}
        />
         <Route
          path="/register"
          element={token ? <FloorPlanList /> : <Register />}
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
