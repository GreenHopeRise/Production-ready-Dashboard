import { FaBox, FaUsers } from "react-icons/fa6";
import { RiSettingsLine } from "react-icons/ri";
import { LucideLayoutDashboard } from "lucide-react";

export const sidebarItem = [
  {
    label: "Dashboard",
    path: "/",
    icon: LucideLayoutDashboard,
    allow: ["admin", "editor", "user"],
  },
  {
    label: "Products",
    path: "/products",
    icon: FaBox,
    allow: ["admin", "editor"],
  },
  {
    label: "Users",
    path: "/users",
    icon: FaUsers,
    allow: ["admin"],
  },
  {
    label: "Settings",
    path: "/settings",
    icon: RiSettingsLine,
    allow: ["admin"],
  },
];