// src/components/Sidebar.tsx

import React from "react";
import { Link, useLocation } from "react-router-dom";
// Importing modern, clean YouTube-style icons
import {
  Home,
  Zap,
  Clapperboard,
  History,
  PlaySquare,
  Flame,
} from "lucide-react";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Navigation schema for easy mapping
  const mainNavItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/shorts", label: "Shorts", icon: Zap },
    { path: "/subscriptions", label: "Subscriptions", icon: Clapperboard },
  ];

  const secondaryNavItems = [
    { path: "/trending", label: "Trending", icon: Flame },
    { path: "/library", label: "Library", icon: PlaySquare },
    { path: "/history", label: "History", icon: History },
  ];

  return (
    <aside className="w-64 h-[calc(100vh-56px)] bg-white text-zinc-900 flex flex-col px-3 py-3 border-r border-zinc-100 sticky top-14 overflow-y-auto">
      {/* Primary Navigation Section */}
      <ul className="space-y-1">
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;

          return (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`w-full flex items-center gap-5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
                  ${
                    isActive
                      ? "bg-zinc-100 text-black font-semibold"
                      : "hover:bg-zinc-50 text-zinc-700 hover:text-black"
                  }`}
              >
                {/* Pop the icon slightly on hover, color it red if active */}
                <Icon
                  size={20}
                  className={`transition-transform duration-200 group-hover:scale-105 
                    ${
                      isActive
                        ? "text-red-600 stroke-[2.5px]"
                        : "text-zinc-600 group-hover:text-black stroke-[2px]"
                    }`}
                />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Modern thin separator line */}
      <hr className="my-4 border-zinc-200 mx-2" />

      {/* Secondary Section to give it that authentic YouTube feel */}
      <div>
        <span className="px-4 text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-2">
          Explore
        </span>
        <ul className="space-y-1">
          {secondaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`w-full flex items-center gap-5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
                    ${
                      isActive
                        ? "bg-zinc-100 text-black font-semibold"
                        : "hover:bg-zinc-50 text-zinc-700 hover:text-black"
                    }`}
                >
                  <Icon
                    size={20}
                    className={`transition-transform duration-200 group-hover:scale-105 
                      ${
                        isActive
                          ? "text-red-600 stroke-[2.5px]"
                          : "text-zinc-600 group-hover:text-black stroke-[2px]"
                      }`}
                  />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
