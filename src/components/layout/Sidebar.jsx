import { LucideArrowBigLeftDash, LucideArrowBigRightDash, LucideLayoutDashboard } from "lucide-react";
import { NavLink } from "react-router-dom";
// import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
// import { BsBox2 } from "react-icons/bs";
import { RiSettingsLine } from "react-icons/ri";
import { FaBox } from "react-icons/fa6";
const Sidebar = ({ collapsed, setCollapsed }) => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition ${
      isActive
        ? "bg-black text-green-500"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <aside
      className={`bg-white border-r transition-all duration-500 flex flex-col ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="p-4 flex items-center justify-between">
        <h1 className="font-bold text-lg">
          {collapsed ? "S" : "SaaS"}
        </h1>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-xs px-2 py-1 "
        >
          {collapsed ? <LucideArrowBigRightDash /> : <LucideArrowBigLeftDash />}
        </button>
      </div>

      <nav className="space-y-1 p-2">
        <NavLink to="/" className={linkClass}>
          <LucideLayoutDashboard className="text-xl" /> {!collapsed && "Dashboard"}
        </NavLink>

        <NavLink to="/products" className={linkClass}>
          <FaBox  className="text-xl font-bold" /> {!collapsed && "Products"}
        </NavLink>

        <NavLink to="/users" className={linkClass}>
          <FaUsers className="text-xl"/> {!collapsed && "Users"}
        </NavLink>

        <NavLink to="/settings" className={linkClass}>
          <RiSettingsLine className='text-xl'/> {!collapsed && "Settings"}
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;