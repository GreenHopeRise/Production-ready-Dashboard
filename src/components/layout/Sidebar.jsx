import {
  LucideArrowBigLeftDash,
  LucideArrowBigRightDash,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import { useAuth } from "@/auth/AuthContext";
import { sidebarItem } from "@/lib/sidebar.config";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const { user } = useAuth();

  /* ---------------- ACTIVE LINK STYLE ---------------- */

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all
     ${
       isActive
         ? "bg-black text-green-500"
         : "text-gray-600 hover:bg-gray-100"
     }`;

  /* ---------------- RBAC FILTER ---------------- */

  const allowedItems = sidebarItem.filter((item) =>
    item.allow.includes(user?.role)
  );

  /* ---------------- UI ---------------- */

  return (
    <aside
      className={`bg-white border-r flex flex-col transition-all duration-300
      ${collapsed ? "w-16" : "w-64"}`}
    >
      {/* ---------- LOGO + COLLAPSE ---------- */}
      <div className="h-14 px-4 flex items-center justify-between border-b">
        <h1 className="font-bold text-lg tracking-wide">
          {collapsed ? "S" : "SaaS"}
        </h1>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-gray-100"
        >
          {collapsed ? (
            <LucideArrowBigRightDash size={18} />
          ) : (
            <LucideArrowBigLeftDash size={18} />
          )}
        </button>
      </div>

      {/* ---------- MENU ---------- */}
      <nav className="flex-1 p-2 space-y-1">
        {allowedItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink key={item.path} to={item.path} className={linkClass}>
              <Icon className="text-xl shrink-0" />

              {!collapsed && (
                <span className="truncate">{item.label}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* ---------- FOOTER ---------- */}
      <div className="p-3 border-t text-xs text-gray-400 text-center">
        {!collapsed && "SaaS Dashboard v1.0"}
      </div>
    </aside>
  );
};

export default Sidebar;