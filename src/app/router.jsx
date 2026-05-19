import ProtectedRoute from "@/auth/ProtectedRoute";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ProductsPage from "@/features/products/ProductsPage";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<div>Dashboard Home</div>} />
          <Route path="products" element={<ProductsPage />} />
        </Route>

        {/* fallback */}
        <Route path="*" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
};

export default Router;