import { useState } from "react";
import { useAuth } from "@/auth/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [dark, setDark] = useState(false);

  return (
    <header className="h-14 bg-white border-b px-6 flex items-center justify-between">

      <h1 className="text-sm font-medium text-gray-700">
        Dashboard
      </h1>

      <input
        placeholder="Search..."
        className="w-1/3 px-3 py-1 border rounded-md text-sm"
      />

      <div className="flex items-center gap-3">

        <button
          onClick={() => setDark(!dark)}
          className="px-3 py-1 border rounded-md text-sm"
        >
          {dark ? "🌙" : "☀️"}
        </button>

        <div className="w-8 h-8 rounded-full bg-gray-200" />

        <button
          onClick={logout}
          className="text-sm text-red-500"
        >
          Logout
        </button>

      </div>
    </header>
  );
};

export default Navbar;