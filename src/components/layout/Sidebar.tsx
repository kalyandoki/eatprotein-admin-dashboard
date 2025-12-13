// import React from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import { navItems } from "../../data/navItems";
// import { useAppDispatch, useAppSelector } from "../../store/hooks";
// import {
//   selectUi,
//   setSidebarCollapsed,
//   toggleSidebar,
// } from "../../store/slices/uiSlice";
// import * as icons from "react-icons/fi";
// import Avatar from "../ui/Avatar";

// const IconFromName = ({
//   name,
//   className = "w-5 h-5",
// }: {
//   name?: string;
//   className?: string;
// }) => {
//   if (!name) return null;
//   // try to get from react-icons/fi, fallback
//   const Comp = (icons as any)[name] ?? (icons as any)["FiCircle"];
//   return <Comp className={className} aria-hidden />;
// };

// export default function Sidebar() {
//   const dispatch = useAppDispatch();
//   const { sidebarCollapsed } = useAppSelector(selectUi);
//   const location = useLocation();

//   const width = sidebarCollapsed ? "w-[72px]" : "w-[260px]";

//   return (
//     <>
//       <aside
//         className={`sidebar-bg text-white ${width} transition-all duration-200 flex flex-col min-h-screen`}
//         aria-label="Primary"
//       >
//         <div className="flex items-center justify-between px-4 py-4">
//           <div className="flex items-center gap-3">
//             <div className="bg-white/10 rounded-md p-2">
//               <svg
//                 width="28"
//                 height="28"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 aria-hidden
//               >
//                 <rect
//                   width="24"
//                   height="24"
//                   rx="6"
//                   fill="#fff"
//                   opacity="0.12"
//                 ></rect>
//               </svg>
//             </div>
//             {!sidebarCollapsed && (
//               <h1 className="font-semibold text-lg">EatProtien</h1>
//             )}
//           </div>
//           <button
//             aria-label={
//               sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
//             }
//             onClick={() => dispatch(setSidebarCollapsed(!sidebarCollapsed))}
//             className="p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
//           >
//             <svg
//               width="18"
//               height="18"
//               viewBox="0 0 24 24"
//               fill="none"
//               className="opacity-90"
//             >
//               <path
//                 d="M6 12h12"
//                 stroke="white"
//                 strokeWidth="1.6"
//                 strokeLinecap="round"
//               />
//             </svg>
//           </button>
//         </div>

//         <nav className="flex-1 overflow-auto px-2" aria-label="Main navigation">
//           <ul className="space-y-1">
//             {navItems.map((item) => {
//               const active = location.pathname.startsWith(item.path);
//               const isHeader = item.id === "nav-header";
//               if (isHeader) {
//                 return (
//                   <li
//                     key={item.id}
//                     className="px-3 pt-4 pb-2 text-xs uppercase opacity-80"
//                   >
//                     {sidebarCollapsed ? "" : item.label}
//                   </li>
//                 );
//               }
//               return (
//                 <li key={item.id}>
//                   <NavLink
//                     to={item.path}
//                     className={({ isActive }) =>
//                       `flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 ${
//                         isActive || active ? "bg-white/10" : ""
//                       }`
//                     }
//                   >
//                     <span className="flex items-center justify-center w-6">
//                       <IconFromName name={item.icon} />
//                     </span>
//                     {!sidebarCollapsed && (
//                       <span className="truncate">{item.label}</span>
//                     )}
//                   </NavLink>
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>

//         {/* profile fixed to bottom */}
//         <div className="px-3 py-4 border-t border-white/10">
//           <div className="flex items-center gap-3">
//             <Avatar name="Kalyan R" size={36} />
//             {!sidebarCollapsed && (
//               <div className="flex-1">
//                 <div className="text-sm font-medium">Kalyan Reddy</div>
//                 <div className="text-xs opacity-80">kalyan@example.com</div>
//               </div>
//             )}
//             {!sidebarCollapsed && (
//               <div className="flex gap-2">
//                 <NavLink
//                   to="/profile"
//                   className="text-white/90 hover:underline text-sm"
//                 >
//                   Profile
//                 </NavLink>
//                 <button className="text-white/90 text-sm opacity-90">
//                   Sign out
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }

// import React, { useState } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import { navItems, NavItem } from "../../data/navItems";
// import { useAppDispatch, useAppSelector } from "../../store/hooks";
// import { selectUi, setSidebarCollapsed } from "../../store/slices/uiSlice";

// import * as FiIcons from "react-icons/fi";
// import * as FaIcons from "react-icons/fa";
// import * as MdIcons from "react-icons/md";

// import Avatar from "../ui/Avatar";

// // ===================== ICON HANDLER =====================
// const IconFromName = ({ name, className = "w-5 h-5" }: any) => {
//   if (!name) return <FiIcons.FiCircle className={className} />;

//   const prefix = name.substring(0, 2); // Fi, Fa, Md
//   const libraries: any = {
//     Fi: FiIcons,
//     Fa: FaIcons,
//     Md: MdIcons,
//   };

//   const lib = libraries[prefix];
//   const IconComponent = lib?.[name];

//   // If icon does NOT exist, show a default icon instead of crashing
//   if (!IconComponent) {
//     console.warn("❌ Invalid Icon Name:", name);
//     return <FiIcons.FiAlertCircle className={className} />;
//   }

//   return <IconComponent className={className} />;
// };

// // ===================== CHILD MENU COMPONENT =====================
// const ChildMenu = ({
//   parent,
//   collapsed,
// }: {
//   parent: NavItem;
//   collapsed: boolean;
// }) => {
//   const location = useLocation();

//   const isActive = location.pathname.startsWith(parent.path);

//   const [open, setOpen] = useState(isActive);

//   return (
//     <div>
//       {/* Parent Button */}
//       <button
//         onClick={() => setOpen(!open)}
//         className={`flex items-center gap-3 py-2 px-3 w-full rounded-lg hover:bg-white/10 ${
//           isActive ? "bg-white/10" : ""
//         }`}
//       >
//         <IconFromName name={parent.icon} />
//         {!collapsed && <span className="truncate">{parent.label}</span>}
//         {!collapsed && <span className="ml-auto">{open ? "▾" : "▸"}</span>}
//       </button>

//       {/* Child List */}
//       {open && !collapsed && (
//         <ul className="ml-10 mt-1 space-y-1">
//           {parent.children?.map((child) => {
//             const childActive = location.pathname.startsWith(child.path);
//             return (
//               <li key={child.id}>
//                 <NavLink
//                   to={child.path}
//                   className={({ isActive }) =>
//                     `block py-1.5 px-2 text-sm rounded-md ${
//                       isActive || childActive
//                         ? "bg-white/10 text-white"
//                         : "text-gray-300 hover:bg-white/10"
//                     }`
//                   }
//                 >
//                   {child.label}
//                 </NavLink>
//               </li>
//             );
//           })}
//         </ul>
//       )}
//     </div>
//   );
// };

// // ===================== MAIN SIDEBAR =====================
// export default function Sidebar() {
//   const dispatch = useAppDispatch();
//   const { sidebarCollapsed } = useAppSelector(selectUi);
//   const location = useLocation();

//   const width = sidebarCollapsed ? "w-[72px]" : "w-[260px]";

//   return (
//     <aside
//       className={`sidebar-bg text-white ${width} transition-all duration-200 flex flex-col min-h-screen`}
//     >
//       {/* Logo & Collapse Button */}
//       <div className="flex items-center justify-between px-4 py-4">
//         <div className="flex items-center gap-3">
//           <div className="bg-white/10 rounded-md p-2">
//             <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
//               <rect width="24" height="24" rx="6" fill="#fff" opacity="0.12" />
//             </svg>
//           </div>
//           {!sidebarCollapsed && (
//             <h1 className="font-semibold text-lg">EatProtien</h1>
//           )}
//         </div>

//         <button
//           aria-label="Toggle sidebar"
//           onClick={() => dispatch(setSidebarCollapsed(!sidebarCollapsed))}
//           className="p-2 rounded-md hover:bg-white/10"
//         >
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//             <path
//               d="M6 12h12"
//               stroke="white"
//               strokeWidth="1.6"
//               strokeLinecap="round"
//             />
//           </svg>
//         </button>
//       </div>

//       {/* Sidebar Navigation */}
//       <nav className="flex-1 overflow-auto px-2">
//         <ul className="space-y-1">
//           {navItems.map((item) => {
//             const isHeader = item.id === "nav-header";

//             if (isHeader) {
//               return (
//                 <li
//                   key={item.id}
//                   className="px-3 pt-4 pb-2 text-xs uppercase opacity-80"
//                 >
//                   {!sidebarCollapsed && item.label}
//                 </li>
//               );
//             }

//             // If item has children → Use ChildMenu component
//             if (item.children) {
//               return (
//                 <ChildMenu
//                   key={item.id}
//                   parent={item}
//                   collapsed={sidebarCollapsed}
//                 />
//               );
//             }

//             // Normal Menu Item
//             const active = location.pathname.startsWith(item.path);

//             return (
//               <li key={item.id}>
//                 <NavLink
//                   to={item.path}
//                   className={({ isActive }) =>
//                     `flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-white/10 ${
//                       isActive || active ? "bg-white/10" : ""
//                     }`
//                   }
//                 >
//                   <IconFromName name={item.icon} />

//                   {!sidebarCollapsed && (
//                     <span className="truncate">{item.label}</span>
//                   )}
//                 </NavLink>
//               </li>
//             );
//           })}
//         </ul>
//       </nav>

//       {/* Bottom Profile Section */}
//       <div className="px-3 py-4 border-t border-white/10">
//         <div className="flex items-center gap-3">
//           <Avatar name="Kalyan R" size={36} />
//           {!sidebarCollapsed && (
//             <div className="flex-1">
//               <div className="text-sm font-medium">Kalyan Reddy</div>
//               <div className="text-xs opacity-80">kalyan@example.com</div>
//             </div>
//           )}
//         </div>
//       </div>
//     </aside>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import { navItems, NavItem } from "../../data/navItems";
// import { useAppDispatch, useAppSelector } from "../../store/hooks";
// import { selectUi, setSidebarCollapsed } from "../../store/slices/uiSlice";

// import * as FiIcons from "react-icons/fi";
// import * as FaIcons from "react-icons/fa";
// import * as MdIcons from "react-icons/md";

// import Avatar from "../ui/Avatar";

// // ===================== ICON HANDLER =====================
// interface IconProps {
//   name?: string;
//   className?: string;
// }

// const IconFromName: React.FC<IconProps> = ({ name, className = "w-5 h-5" }) => {
//   if (!name) return <FiIcons.FiCircle className={className} />;

//   const prefix = name.substring(0, 2); // Fi, Fa, Md
//   const libraries: Record<string, any> = {
//     Fi: FiIcons,
//     Fa: FaIcons,
//     Md: MdIcons,
//   };

//   const lib = libraries[prefix];
//   const IconComponent = lib?.[name];

//   // If icon does NOT exist, show a default icon instead of crashing
//   if (!IconComponent) {
//     console.warn("❌ Invalid Icon Name:", name);
//     return <FiIcons.FiAlertCircle className={className} />;
//   }

//   return <IconComponent className={className} />;
// };

// // ===================== CHILD MENU COMPONENT =====================
// interface ChildMenuProps {
//   parent: NavItem;
//   collapsed: boolean;
// }

// const ChildMenu: React.FC<ChildMenuProps> = ({ parent, collapsed }) => {
//   const location = useLocation();
//   const isActive = location.pathname.startsWith(parent.path);
//   const [open, setOpen] = useState(isActive);

//   // Update open state when route changes
//   useEffect(() => {
//     setOpen(isActive);
//   }, [isActive]);

//   return (
//     <div className="mb-1">
//       {/* Parent Button */}
//       <button
//         onClick={() => setOpen(!open)}
//         className={`flex items-center gap-3 py-2.5 px-3 w-full rounded-lg transition-all duration-200 hover:bg-white/10 ${
//           isActive ? "bg-white/10 text-white" : "text-gray-300"
//         }`}
//       >
//         <IconFromName name={parent.icon} />
//         {!collapsed && (
//           <>
//             <span className="truncate font-medium">{parent.label}</span>
//             <span className="ml-auto transition-transform duration-200">
//               {open ? "▾" : "▸"}
//             </span>
//           </>
//         )}
//       </button>

//       {/* Child List with Animation */}
//       <div
//         className={`overflow-hidden transition-all duration-300 ${
//           open && !collapsed ? "max-h-96" : "max-h-0"
//         }`}
//       >
//         {open && !collapsed && (
//           <ul className="ml-10 mt-1 space-y-1">
//             {parent.children?.map((child) => {
//               const childActive = location.pathname.startsWith(child.path);
//               return (
//                 <li key={child.id}>
//                   <NavLink
//                     to={child.path}
//                     className={({ isActive }) =>
//                       `block py-1.5 px-3 text-sm rounded-md transition-all duration-200 ${
//                         isActive || childActive
//                           ? "bg-white/10 text-white font-medium"
//                           : "text-gray-300 hover:bg-white/10 hover:text-white"
//                       }`
//                     }
//                   >
//                     {child.label}
//                   </NavLink>
//                 </li>
//               );
//             })}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// // ===================== MAIN SIDEBAR =====================
// const Sidebar: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const { sidebarCollapsed } = useAppSelector(selectUi);
//   const location = useLocation();

//   const width = sidebarCollapsed ? "w-[72px]" : "w-[260px]";

//   return (
//     <aside
//       className={`sidebar-bg text-white ${width} transition-all duration-300 flex flex-col min-h-screen shadow-xl`}
//     >
//       {/* Logo & Collapse Button */}
//       <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
//         <div className="flex items-center gap-3">
//           <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-2.5 shadow-md">
//             <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
//               <rect width="24" height="24" rx="6" fill="#fff" opacity="0.12" />
//               <path
//                 d="M12 2L2 7L12 12L22 7L12 2Z"
//                 stroke="white"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//               <path
//                 d="M2 17L12 22L22 17"
//                 stroke="white"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//               <path
//                 d="M2 12L12 17L22 12"
//                 stroke="white"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </div>
//           {!sidebarCollapsed && (
//             <h1 className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//               EatProtein
//             </h1>
//           )}
//         </div>

//         <button
//           aria-label="Toggle sidebar"
//           onClick={() => dispatch(setSidebarCollapsed(!sidebarCollapsed))}
//           className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
//         >
//           <svg
//             width="20"
//             height="20"
//             viewBox="0 0 24 24"
//             fill="none"
//             className={`transition-transform duration-200 ${
//               sidebarCollapsed ? "rotate-180" : ""
//             }`}
//           >
//             <path
//               d="M15 18L9 12L15 6"
//               stroke="white"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         </button>
//       </div>

//       {/* Sidebar Navigation */}
//       <nav className="flex-1 overflow-auto px-3 py-4">
//         <ul className="space-y-2">
//           {navItems.map((item) => {
//             const isHeader = item.id === "nav-header";

//             if (isHeader) {
//               return (
//                 <li
//                   key={item.id}
//                   className="px-3 pt-4 pb-2 text-xs uppercase tracking-wider opacity-60 font-semibold"
//                 >
//                   {!sidebarCollapsed && item.label}
//                 </li>
//               );
//             }

//             // If item has children → Use ChildMenu component
//             if (item.children) {
//               return (
//                 <ChildMenu
//                   key={item.id}
//                   parent={item}
//                   collapsed={sidebarCollapsed}
//                 />
//               );
//             }

//             // Normal Menu Item
//             const active = location.pathname.startsWith(item.path);

//             return (
//               <li key={item.id}>
//                 <NavLink
//                   to={item.path}
//                   className={({ isActive }) =>
//                     `flex items-center gap-3 py-2.5 px-3 rounded-lg transition-all duration-200 hover:bg-white/10 ${
//                       isActive || active
//                         ? "bg-white/10 text-white shadow-sm"
//                         : "text-gray-300 hover:text-white"
//                     }`
//                   }
//                 >
//                   <IconFromName name={item.icon} />
//                   {!sidebarCollapsed && (
//                     <span className="truncate font-medium">{item.label}</span>
//                   )}
//                 </NavLink>
//               </li>
//             );
//           })}
//         </ul>
//       </nav>

//       {/* Bottom Profile Section */}
//       <div className="px-3 py-4 border-t border-white/10">
//         <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors duration-200">
//           <Avatar name="Kalyan R" size={40} />
//           {!sidebarCollapsed && (
//             <div className="flex-1 min-w-0">
//               <div className="text-sm font-medium truncate">Kalyan Reddy</div>
//               <div className="text-xs opacity-70 truncate">
//                 kalyan@example.com
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;

import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { navItems, NavItem } from "../../data/navItems";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUi, setSidebarCollapsed } from "../../store/slices/uiSlice";

import * as FiIcons from "react-icons/fi";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";

// ===================== ICON HANDLER =====================
interface IconProps {
  name?: string;
  className?: string;
}

const IconFromName: React.FC<IconProps> = ({ name, className = "w-5 h-5" }) => {
  if (!name) return <FiIcons.FiCircle className={className} />;

  const prefix = name.substring(0, 2); // Fi, Fa, Md
  const libraries: Record<string, any> = {
    Fi: FiIcons,
    Fa: FaIcons,
    Md: MdIcons,
  };

  const lib = libraries[prefix];
  const IconComponent = lib?.[name];

  // If icon does NOT exist, show a default icon instead of crashing
  if (!IconComponent) {
    console.warn("❌ Invalid Icon Name:", name);
    return <FiIcons.FiAlertCircle className={className} />;
  }

  return <IconComponent className={className} />;
};

// ===================== CHILD MENU COMPONENT =====================
interface ChildMenuProps {
  parent: NavItem;
  collapsed: boolean;
}

const ChildMenu: React.FC<ChildMenuProps> = ({ parent, collapsed }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(parent.path);
  const [open, setOpen] = useState(isActive);

  // Update open state when route changes
  useEffect(() => {
    setOpen(isActive);
  }, [isActive]);

  return (
    <div className="mb-1">
      {/* Parent Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-3 py-2.5 px-3 w-full rounded-lg transition-all duration-200 hover:bg-white/10 ${
          isActive ? "bg-white/10 text-white" : "text-gray-300"
        }`}
      >
        <IconFromName name={parent.icon} />
        {!collapsed && (
          <>
            <span className="truncate font-medium">{parent.label}</span>
            <span className="ml-auto transition-transform duration-200">
              {open ? "▾" : "▸"}
            </span>
          </>
        )}
      </button>

      {/* Child List with Animation */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open && !collapsed ? "max-h-96" : "max-h-0"
        }`}
      >
        {open && !collapsed && (
          <ul className="ml-10 mt-1 space-y-1">
            {parent.children?.map((child) => {
              const childActive = location.pathname.startsWith(child.path);
              return (
                <li key={child.id}>
                  <NavLink
                    to={child.path}
                    className={({ isActive }) =>
                      `block py-1.5 px-3 text-sm rounded-md transition-all duration-200 ${
                        isActive || childActive
                          ? "bg-white/10 text-white font-medium"
                          : "text-gray-300 hover:bg-white/10 hover:text-white"
                      }`
                    }
                  >
                    {child.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

// ===================== MAIN SIDEBAR =====================
const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sidebarCollapsed } = useAppSelector(selectUi);
  const location = useLocation();

  const width = sidebarCollapsed ? "w-[62px]" : "w-[230px]";

  return (
    <aside
      className={`sticky top-0 h-screen bg-gradient-to-b from-green-700 to-green-900 text-white ${width} transition-all duration-300 flex flex-col min-h-screen shadow-xl border-r border-green-600`}
    >
      {/* Logo & Collapse Button */}
      <div className="flex items-center justify-between px-1 py-4 border-b border-green-600/30">
        <div className="flex items-center gap-2">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2.5 shadow-md">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" rx="6" fill="#fff" opacity="0.12" />
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          {!sidebarCollapsed && (
            <h1 className="font-bold text-xl text-white">EatProtein</h1>
          )}
        </div>

        <button
          aria-label="Toggle sidebar"
          onClick={() => dispatch(setSidebarCollapsed(!sidebarCollapsed))}
          className="rounded-lg hover:bg-white/10 transition-colors duration-200"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className={`transition-transform duration-200 ${
              sidebarCollapsed ? "rotate-180" : ""
            }`}
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-1 overflow-auto px-2 py-3">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isHeader = item.id === "nav-header";

            if (isHeader) {
              return (
                <li
                  key={item.id}
                  className="px-3 pt-4 pb-2 text-xs uppercase tracking-wider opacity-60 font-semibold"
                >
                  {!sidebarCollapsed && item.label}
                </li>
              );
            }

            // If item has children → Use ChildMenu component
            if (item.children) {
              return (
                <ChildMenu
                  key={item.id}
                  parent={item}
                  collapsed={sidebarCollapsed}
                />
              );
            }

            // Normal Menu Item
            const active = location.pathname.startsWith(item.path);

            return (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 py-2.5 px-3 rounded-lg transition-all duration-200 hover:bg-white/10 ${
                      isActive || active
                        ? "bg-white/10 text-white shadow-sm"
                        : "text-gray-300 hover:text-white"
                    }`
                  }
                >
                  <IconFromName name={item.icon} />
                  {!sidebarCollapsed && (
                    <span className="truncate font-medium">{item.label}</span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Profile Section */}
      <div className="px-0 py-2 border-t border-green-600/30">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors duration-200">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold">
              KR
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-green-700"></div>
          </div>
          {!sidebarCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">
                Kalyan
              </div>
              <div className="text-xs opacity-70 truncate">
                kalyan@example.com
              </div>
            </div>
          )}
        </div>

        {/* {!sidebarCollapsed && (
          <div className="mt-3 flex gap-2">
            <button className="flex-1 py-1.5 px-2 bg-white/10 hover:bg-white/20 rounded text-xs text-center transition-colors duration-200">
              View Profile
            </button>
            <button className="flex-1 py-1.5 px-2 bg-white/10 hover:bg-white/20 rounded text-xs text-center transition-colors duration-200">
              Settings
            </button>
          </div>
        )} */}
      </div>
    </aside>
  );
};

export default Sidebar;
