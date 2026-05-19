import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">

      {/* Sidebar */}
      <aside className="w-60 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold">Dashboard</h2>

        <ul className="mt-6 space-y-2">
          <li>Dashboard</li>
          <li>Products</li>
          <li>Users</li>
          <li>Settings</li>
        </ul>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        <div className="border-b pb-4 mb-4">
          Navbar (User / Notification / Theme)
        </div>

        {/* ROUTE CONTENT */}
        <Outlet />
      </main>

    </div>
  );
};

export default DashboardLayout;