import { NavLink } from "react-router-dom";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition ${
      isActive
        ? "bg-black text-white"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <aside
      className={`bg-white border-r transition-all duration-300 flex flex-col ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="p-4 flex items-center justify-between">
        <h1 className="font-bold text-lg">
          {collapsed ? "S" : "SaaS"}
        </h1>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-xs px-2 py-1 border rounded"
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      <nav className="space-y-1 p-2">
        <NavLink to="/" className={linkClass}>
          🏠 {!collapsed && "Dashboard"}
        </NavLink>

        <NavLink to="/products" className={linkClass}>
          📦 {!collapsed && "Products"}
        </NavLink>

        <NavLink to="/users" className={linkClass}>
          👤 {!collapsed && "Users"}
        </NavLink>

        <NavLink to="/settings" className={linkClass}>
          ⚙️ {!collapsed && "Settings"}
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;