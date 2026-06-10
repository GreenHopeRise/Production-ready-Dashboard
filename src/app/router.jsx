import GuestRoute from "@/auth/GuestRoute";
import ProtectedRoute from "@/auth/ProtectedRoute";
import RoleRoute from "@/auth/RoleRoute";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardPage from "@/features/dashboard/DashboardHome";
// import DashboardPage from "@/features/dashboard/DashboardHome";
import ProductsPage from "@/features/products/ProductsPage";
import UsersPage from "@/features/users/UsersPage";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Unauthorized from "@/pages/Unauthorized";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />

        <Route
          path="/register"
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />

        {/* PROTECTED AREA */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard */}
          <Route
            index
            element={
              <RoleRoute allow={["admin", "editor", "user"]}>
                <DashboardPage/>
              </RoleRoute>
            }
          />

          {/* Products */}
          <Route
            path="products"
            element={
              <RoleRoute allow={["admin", "editor", "user"]}>
                <ProductsPage />
              </RoleRoute>
            }
          />

          {/* Users (Admin only) */}
          <Route
            path="users"
            element={
              <RoleRoute allow={["admin"]}>
                <UsersPage />
              </RoleRoute>
            }
          />
        </Route>

        {/* Unauthorized */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
