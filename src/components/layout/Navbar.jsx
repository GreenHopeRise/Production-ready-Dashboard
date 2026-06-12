import { useState } from "react";
import { useAuth } from "@/auth/AuthContext";
// import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { MdNightlightRound } from "react-icons/md";
import { GoPersonFill } from "react-icons/go";
import { useSearch } from "./SearchContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [dark, setDark] = useState(false);
  const { search, setSearch } = useSearch();

  return (
    <header className="h-14 bg-white border-b px-6 flex items-center justify-between">
      <h1 className="text-sm font-medium text-gray-700">
        {user?.role
          ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
          : ""}
        <span> panel</span>
      </h1>

      <input
      value={search}
      onChange={(e)=>{setSearch(e.target.value)}}
        placeholder="Search..."
        className="w-1/3 px-3 py-1 border rounded-md text-sm"
      />

      <div className="flex items-center gap-3">
        <button
          onClick={() => setDark(!dark)}
          className="px-3 py-1  text-2xl"
        >
          {dark ? <MdNightlightRound />: <CiLight />}
        </button>

        <div className="text-xl border rounded-full p-2" ><GoPersonFill /></div>

        <button onClick={logout} className="text-sm text-red-500">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
