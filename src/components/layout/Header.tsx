// import React from "react";
// import { FiSearch, FiBell, FiSun, FiMenu } from "react-icons/fi";
// import { useAppDispatch, useAppSelector } from "../../store/hooks";
// import {
//   selectUi,
//   toggleSidebar,
//   toggleDarkMode,
//   setSearchQuery,
// } from "../../store/slices/uiSlice";
// import { selectAuth } from "../../store/slices/authSlice";

// export default function Header() {
//   const dispatch = useAppDispatch();
//   const ui = useAppSelector(selectUi);
//   const auth = useAppSelector(selectAuth);

//   return (
//     <header className="flex items-center justify-between px-6 py-3 bg-white shadow-soft z-10">
//       <div className="flex items-center gap-3">
//         <button
//           onClick={() => dispatch(toggleSidebar())}
//           className="p-2 rounded-md hover:bg-gray-100 focus:ring-2 focus:ring-brand-dark"
//           aria-label="Toggle menu"
//         >
//           <FiMenu />
//         </button>

//         <div className="relative">
//           <label htmlFor="global-search" className="sr-only">
//             Search
//           </label>
//           <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 min-w-[240px]">
//             <FiSearch className="mr-2" />
//             <input
//               id="global-search"
//               placeholder="Search dashboard..."
//               className="bg-transparent outline-none text-sm w-full"
//               value={ui.searchQuery}
//               onChange={(e) => dispatch(setSearchQuery(e.target.value))}
//             />
//           </div>
//         </div>
//       </div>

//       <div className="flex items-center gap-3">
//         <button
//           aria-pressed={ui.darkMode}
//           onClick={() => dispatch(toggleDarkMode())}
//           title="Toggle dark mode"
//           className="p-2 rounded-md hover:bg-gray-100 focus:ring-2 focus:ring-brand-dark"
//         >
//           <FiSun />
//         </button>

//         <button
//           className="p-2 rounded-md hover:bg-gray-100 focus:ring-2 focus:ring-brand-dark"
//           aria-label="Notifications"
//         >
//           <FiBell />
//         </button>

//         <div className="flex items-center gap-2">
//           <div className="text-sm">
//             <div className="font-medium">{auth.profile?.name}</div>
//             <div className="text-xs opacity-80">{auth.profile?.email}</div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// import React from "react";
// import { FiSearch, FiBell, FiSun, FiMenu, FiUser } from "react-icons/fi";
// import { useAppDispatch, useAppSelector } from "../../store/hooks";
// import {
//   selectUi,
//   toggleSidebar,
//   toggleDarkMode,
//   setSearchQuery,
// } from "../../store/slices/uiSlice";
// import { selectAuth } from "../../store/slices/authSlice";

// export default function Header() {
//   const dispatch = useAppDispatch();
//   const ui = useAppSelector(selectUi);
//   const auth = useAppSelector(selectAuth);

//   return (
//     <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Left Side - Menu and Search */}
//           <div className="flex items-center space-x-4">
//             {/* Toggle Sidebar Button */}
//             <button
//               onClick={() => dispatch(toggleSidebar())}
//               className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
//               aria-label="Toggle sidebar"
//             >
//               <FiMenu className="w-5 h-5 text-gray-600" />
//             </button>

//             {/* Search Bar */}
//             <div className="relative hidden md:block">
//               <label htmlFor="search" className="sr-only">
//                 Search
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FiSearch className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="search"
//                   type="search"
//                   placeholder="Search dashboard..."
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm"
//                   value={ui.searchQuery}
//                   onChange={(e) => dispatch(setSearchQuery(e.target.value))}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Actions and Profile */}
//           <div className="flex items-center space-x-4">
//             {/* Dark Mode Toggle */}
//             <button
//               onClick={() => dispatch(toggleDarkMode())}
//               className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
//               aria-label="Toggle dark mode"
//             >
//               <FiSun className="w-5 h-5 text-gray-600" />
//             </button>

//             {/* Notifications */}
//             <button
//               className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors relative"
//               aria-label="Notifications"
//             >
//               <FiBell className="w-5 h-5 text-gray-600" />
//               <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
//             </button>

//             {/* User Profile Dropdown */}
//             <div className="flex items-center space-x-2">
//               <div className="flex items-center space-x-2">
//                 <img
//                   src={auth.profile?.avatarUrl || "https://placehold.co/32x32"}
//                   alt={auth.profile?.name}
//                   className="h-8 w-8 rounded-full object-cover"
//                 />
//                 <div className="hidden md:flex flex-col">
//                   <span className="text-sm font-medium text-gray-700">
//                     {auth.profile?.name}
//                   </span>
//                   <span className="text-xs text-gray-500">
//                     {auth.profile?.role}
//                   </span>
//                 </div>
//               </div>
//               <button className="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
//                 <FiUser className="w-5 h-5 text-gray-600" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// import React, { useState, useRef, useEffect } from "react";
// import {
//   FiSearch,
//   FiBell,
//   FiSun,
//   FiMoon,
//   FiMenu,
//   FiUser,
//   FiLogOut,
//   FiSettings,
//   FiChevronDown,
// } from "react-icons/fi";
// import { useAppDispatch, useAppSelector } from "../../store/hooks";
// import {
//   selectUi,
//   toggleSidebar,
//   toggleDarkMode,
//   setSearchQuery,
// } from "../../store/slices/uiSlice";
// import { selectAuth } from "../../store/slices/authSlice";
// import { useNavigate } from "react-router-dom";

// // Type definitions
// interface UserProfileDropdownProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// // User Profile Dropdown Component
// const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({
//   isOpen,
//   onClose,
// }) => {
//   const dispatch = useAppDispatch();
//   const auth = useAppSelector(selectAuth);
//   const navigate = useNavigate();
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         onClose();
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen, onClose]);

//   const handleLogout = () => {
//     // Add logout logic here
//     navigate("/login");
//   };

//   const handleProfile = () => {
//     navigate("/profile");
//     onClose();
//   };

//   const handleSettings = () => {
//     navigate("/settings");
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div
//       ref={dropdownRef}
//       className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200"
//     >
//       <div className="px-4 py-2 border-b border-gray-100">
//         <p className="text-sm font-medium text-gray-900">
//           {auth.profile?.name}
//         </p>
//         <p className="text-xs text-gray-500 truncate">{auth.profile?.email}</p>
//       </div>
//       <button
//         onClick={handleProfile}
//         className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
//       >
//         <FiUser className="mr-2 h-4 w-4" />
//         Profile
//       </button>
//       <button
//         onClick={handleSettings}
//         className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
//       >
//         <FiSettings className="mr-2 h-4 w-4" />
//         Settings
//       </button>
//       <button
//         onClick={handleLogout}
//         className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none border-t border-gray-100"
//       >
//         <FiLogOut className="mr-2 h-4 w-4" />
//         Logout
//       </button>
//     </div>
//   );
// };

// // Notifications Dropdown Component
// const NotificationsDropdown: React.FC<{
//   isOpen: boolean;
//   onClose: () => void;
// }> = ({ isOpen, onClose }) => {
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         onClose();
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen, onClose]);

//   // Sample notifications data
//   const notifications = [
//     {
//       id: 1,
//       text: "New workout plan available",
//       time: "2 hours ago",
//       read: false,
//     },
//     {
//       id: 2,
//       text: "You've reached your weekly goal!",
//       time: "1 day ago",
//       read: false,
//     },
//     {
//       id: 3,
//       text: "Reminder: Log your meals today",
//       time: "2 days ago",
//       read: true,
//     },
//   ];

//   if (!isOpen) return null;

//   return (
//     <div
//       ref={dropdownRef}
//       className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 border border-gray-200"
//     >
//       <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
//         <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
//         <button className="text-xs text-blue-600 hover:text-blue-800">
//           Mark all as read
//         </button>
//       </div>
//       <div className="max-h-64 overflow-y-auto">
//         {notifications.length > 0 ? (
//           notifications.map((notification) => (
//             <div
//               key={notification.id}
//               className={`px-4 py-3 hover:bg-gray-50 border-b border-gray-100 ${
//                 !notification.read ? "bg-blue-50" : ""
//               }`}
//             >
//               <p className="text-sm text-gray-800">{notification.text}</p>
//               <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
//             </div>
//           ))
//         ) : (
//           <div className="px-4 py-6 text-center text-sm text-gray-500">
//             No new notifications
//           </div>
//         )}
//       </div>
//       <div className="px-4 py-2 border-t border-gray-100">
//         <button className="text-xs text-blue-600 hover:text-blue-800">
//           View all notifications
//         </button>
//       </div>
//     </div>
//   );
// };

// // Main Header Component
// export default function Header() {
//   const dispatch = useAppDispatch();
//   const ui = useAppSelector(selectUi);
//   const auth = useAppSelector(selectAuth);
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//   const [isNotificationsDropdownOpen, setIsNotificationsDropdownOpen] =
//     useState(false);
//   const [isSearchExpanded, setIsSearchExpanded] = useState(false);
//   const searchInputRef = useRef<HTMLInputElement>(null);

//   // Focus search input when expanded
//   useEffect(() => {
//     if (isSearchExpanded && searchInputRef.current) {
//       searchInputRef.current.focus();
//     }
//   }, [isSearchExpanded]);

//   // Handle search submission
//   const handleSearchSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Add search logic here
//     console.log("Searching for:", ui.searchQuery);
//   };

//   // Count unread notifications
//   const unreadNotificationsCount = 3; // This would come from your state

//   return (
//     <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40 transition-colors duration-200">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Left Side - Menu and Search */}
//           <div className="flex items-center space-x-4">
//             {/* Toggle Sidebar Button */}
//             <button
//               onClick={() => dispatch(toggleSidebar())}
//               className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
//               aria-label="Toggle sidebar"
//             >
//               <FiMenu className="w-5 h-5 text-gray-600" />
//             </button>

//             {/* Search Bar */}
//             <div
//               className={`${
//                 isSearchExpanded
//                   ? "absolute inset-0 bg-white z-10 flex items-center px-4"
//                   : "relative hidden md:block"
//               }`}
//             >
//               <form onSubmit={handleSearchSubmit} className="relative w-full">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FiSearch className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   ref={searchInputRef}
//                   id="search"
//                   type="search"
//                   placeholder="Search dashboard..."
//                   className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm transition-all duration-200"
//                   value={ui.searchQuery}
//                   onChange={(e) => dispatch(setSearchQuery(e.target.value))}
//                 />
//                 {isSearchExpanded && (
//                   <button
//                     type="button"
//                     onClick={() => setIsSearchExpanded(false)}
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   >
//                     <span className="text-gray-400 hover:text-gray-600">
//                       &times;
//                     </span>
//                   </button>
//                 )}
//               </form>
//             </div>

//             {/* Mobile Search Toggle */}
//             <button
//               onClick={() => setIsSearchExpanded(true)}
//               className="md:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
//               aria-label="Search"
//             >
//               <FiSearch className="w-5 h-5 text-gray-600" />
//             </button>
//           </div>

//           {/* Right Side - Actions and Profile */}
//           <div className="flex items-center space-x-1 sm:space-x-2">
//             {/* Dark Mode Toggle */}
//             <button
//               onClick={() => dispatch(toggleDarkMode())}
//               className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
//               aria-label="Toggle dark mode"
//             >
//               {ui.darkMode ? (
//                 <FiMoon className="w-5 h-5 text-gray-600" />
//               ) : (
//                 <FiSun className="w-5 h-5 text-gray-600" />
//               )}
//             </button>

//             {/* Notifications */}
//             <div className="relative">
//               <button
//                 onClick={() => {
//                   setIsNotificationsDropdownOpen(!isNotificationsDropdownOpen);
//                   setIsProfileDropdownOpen(false);
//                 }}
//                 className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 relative"
//                 aria-label="Notifications"
//               >
//                 <FiBell className="w-5 h-5 text-gray-600" />
//                 {unreadNotificationsCount > 0 && (
//                   <span className="absolute top-1 right-1 flex h-2 w-2">
//                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
//                     <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
//                   </span>
//                 )}
//               </button>
//               <NotificationsDropdown
//                 isOpen={isNotificationsDropdownOpen}
//                 onClose={() => setIsNotificationsDropdownOpen(false)}
//               />
//             </div>

//             {/* User Profile Dropdown */}
//             <div className="relative">
//               <button
//                 onClick={() => {
//                   setIsProfileDropdownOpen(!isProfileDropdownOpen);
//                   setIsNotificationsDropdownOpen(false);
//                 }}
//                 className="flex items-center space-x-2 p-1 sm:p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
//                 aria-label="User menu"
//                 aria-expanded={isProfileDropdownOpen}
//               >
//                 <img
//                   src={auth.profile?.avatarUrl || "https://placehold.co/32x32"}
//                   alt={auth.profile?.name}
//                   className="h-8 w-8 rounded-full object-cover border border-gray-200"
//                 />
//                 <div className="hidden md:flex flex-col items-start">
//                   <span className="text-sm font-medium text-gray-700">
//                     {auth.profile?.name}
//                   </span>
//                   <span className="text-xs text-gray-500">
//                     {auth.profile?.role}
//                   </span>
//                 </div>
//                 <FiChevronDown
//                   className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
//                     isProfileDropdownOpen ? "transform rotate-180" : ""
//                   }`}
//                 />
//               </button>
//               <UserProfileDropdown
//                 isOpen={isProfileDropdownOpen}
//                 onClose={() => setIsProfileDropdownOpen(false)}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

import React, { useState, useRef, useEffect } from "react";
import {
  FiSearch,
  FiBell,
  FiSun,
  FiMoon,
  FiMenu,
  FiUser,
  FiLogOut,
  FiSettings,
  FiChevronDown,
  FiX,
  FiActivity,
  FiShoppingCart,
  FiPackage,
  FiServer,
  FiUsers,
  FiHeart,
  FiBookOpen,
  FiEdit,
  FiCreditCard,
  FiBarChart2,
  FiList,
  FiHome,
  FiBox,
  FiCalendar,
  FiClock,
  FiFileText,
} from "react-icons/fi";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectUi,
  toggleSidebar,
  toggleDarkMode,
  setSearchQuery,
} from "../../store/slices/uiSlice";
import { selectAuth } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { navItems, NavItem } from "../../data/navItems";

// Icon mapping for search results
const iconMap: Record<string, React.ElementType> = {
  FiList,
  FiHome,
  FiShoppingCart,
  FiPackage,
  FiServer,
  FiUsers,
  FiHeart,
  FiActivity,
  FiBookOpen,
  FiEdit,
  FiCreditCard,
  FiBarChart2,
  FiBox,
  FiCalendar,
  FiClock,
  FiSettings,
  FiFileText,
};

// Type definitions
interface UserProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

// User Profile Dropdown Component
const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleLogout = () => {
    // Add logout logic here
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");
    onClose();
  };

  const handleSettings = () => {
    navigate("/settings");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-200"
    >
      <div className="px-4 py-3 border-b border-gray-200">
        <p className="text-sm font-medium text-gray-900">
          {auth.profile?.name || "User"}
        </p>
        <p className="text-xs text-gray-500 truncate">
          {auth.profile?.email || "user@example.com"}
        </p>
      </div>
      <button
        onClick={handleProfile}
        className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none transition-colors"
      >
        <FiUser className="mr-3 h-4 w-4" />
        Profile
      </button>
      <button
        onClick={handleSettings}
        className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none transition-colors"
      >
        <FiSettings className="mr-3 h-4 w-4" />
        Settings
      </button>
      <button
        onClick={handleLogout}
        className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 focus:outline-none transition-colors border-t border-gray-200 mt-1"
      >
        <FiLogOut className="mr-3 h-4 w-4" />
        Logout
      </button>
    </div>
  );
};

// Notifications Dropdown Component
const NotificationsDropdown: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      text: "New workout plan available",
      time: "2 hours ago",
      read: false,
      icon: FiActivity,
    },
    {
      id: 2,
      text: "You've reached your weekly goal!",
      time: "1 day ago",
      read: false,
      icon: FiHeart,
    },
    {
      id: 3,
      text: "Reminder: Log your meals today",
      time: "2 days ago",
      read: true,
      icon: FiCalendar,
    },
    {
      id: 4,
      text: "New product added to your wishlist",
      time: "3 days ago",
      read: true,
      icon: FiShoppingCart,
    },
  ];

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 border border-gray-200"
    >
      <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
        <button className="text-xs text-green-600 hover:text-green-700">
          Mark all as read
        </button>
      </div>
      <div className="max-h-64 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notification) => {
            const IconComponent = notification.icon;
            return (
              <div
                key={notification.id}
                className={`px-4 py-3 hover:bg-gray-50 border-b border-gray-100 ${
                  !notification.read ? "bg-green-50" : ""
                }`}
              >
                <div className="flex items-start">
                  <div className="mr-3 mt-0.5">
                    <IconComponent className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">{notification.text}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {notification.time}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="h-2 w-2 bg-green-600 rounded-full mt-2"></div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="px-4 py-6 text-center text-sm text-gray-500">
            No new notifications
          </div>
        )}
      </div>
      <div className="px-4 py-2 border-t border-gray-200">
        <button className="text-xs text-green-600 hover:text-green-700">
          View all notifications
        </button>
      </div>
    </div>
  );
};

// Search Results Dropdown Component
const SearchResultsDropdown: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
}> = ({ isOpen, onClose, searchQuery }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Filter navItems based on search query
  const filterNavItems = (items: NavItem[], query: string): NavItem[] => {
    if (!query.trim()) return [];

    const filteredItems: NavItem[] = [];

    items.forEach((item) => {
      // Skip header items
      if (item.id === "nav-header") return;

      // Check if the item label matches the query
      if (item.label.toLowerCase().includes(query.toLowerCase())) {
        filteredItems.push(item);
      }

      // Check if any child items match
      if (item.children) {
        const matchingChildren = item.children.filter((child) =>
          child.label.toLowerCase().includes(query.toLowerCase())
        );

        if (matchingChildren.length > 0) {
          // If parent doesn't match but children do, add parent with matching children
          if (!filteredItems.includes(item)) {
            filteredItems.push({
              ...item,
              children: matchingChildren,
            });
          }
        }
      }
    });

    return filteredItems;
  };

  const filteredItems = filterNavItems(navItems, searchQuery);

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  if (!isOpen || !searchQuery.trim()) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-xl z-50 border border-gray-200 max-h-96 overflow-y-auto"
    >
      {filteredItems.length > 0 ? (
        <div className="py-2">
          {filteredItems.map((item) => {
            const IconComponent = iconMap[item.icon] || FiList;

            return (
              <div key={item.id}>
                <button
                  onClick={() => handleNavigate(item.path)}
                  className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 focus:outline-none transition-colors"
                >
                  <IconComponent className="mr-3 h-4 w-4 text-green-600" />
                  <span>{item.label}</span>
                </button>

                {item.children && item.children.length > 0 && (
                  <div className="ml-4 pl-4 border-l border-gray-200">
                    {item.children.map((child) => (
                      <button
                        key={child.id}
                        onClick={() => handleNavigate(child.path)}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-600 hover:text-green-700 hover:bg-green-50 focus:outline-none transition-colors"
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="px-4 py-6 text-center text-sm text-gray-500">
          No results found for "{searchQuery}"
        </div>
      )}
    </div>
  );
};

// Main Header Component
export default function Header() {
  const dispatch = useAppDispatch();
  const ui = useAppSelector(selectUi);
  const auth = useAppSelector(selectAuth);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationsDropdownOpen, setIsNotificationsDropdownOpen] =
    useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isSearchResultsOpen, setIsSearchResultsOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus search input when expanded
  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add search logic here
    console.log("Searching for:", ui.searchQuery);
    setIsSearchResultsOpen(true);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
    setIsSearchResultsOpen(e.target.value.length > 0);
  };

  // Handle search input blur
  const handleSearchBlur = () => {
    // Delay closing search results to allow clicking on a result
    setTimeout(() => {
      setIsSearchResultsOpen(false);
    }, 200);
  };

  // Count unread notifications
  const unreadNotificationsCount = 2; // This would come from your state

  return (
    <header className="bg-white shadow-lg border-b border-green-600/40 sticky top-0 z-40 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left Side - Menu and Search */}
          <div className="flex items-center space-x-4">
            {/* Toggle Sidebar Button */}
            {/* <button
              onClick={() => dispatch(toggleSidebar())}
              className="p-2 rounded-lg hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
              aria-label="Toggle sidebar"
            >
              <FiMenu className="w-5 h-5 text-gray-700" />
            </button> */}

            {/* Search Bar */}
            <div
              className={`${
                isSearchExpanded
                  ? "absolute inset-0 bg-white z-10 flex items-center px-4"
                  : "relative hidden md:block w-80"
              }`}
            >
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  ref={searchInputRef}
                  id="search"
                  type="search"
                  placeholder="Search dashboard..."
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 sm:text-sm transition-all duration-200 text-gray-900"
                  value={ui.searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() =>
                    setIsSearchResultsOpen(ui.searchQuery.length > 0)
                  }
                  onBlur={handleSearchBlur}
                />
                {isSearchExpanded && (
                  <button
                    type="button"
                    onClick={() => setIsSearchExpanded(false)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <FiX className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </form>
              {/* Search Results Dropdown */}
              <SearchResultsDropdown
                isOpen={isSearchResultsOpen && !isSearchExpanded}
                onClose={() => setIsSearchResultsOpen(false)}
                searchQuery={ui.searchQuery}
              />
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsSearchExpanded(true)}
              className="md:hidden p-2 rounded-lg hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
              aria-label="Search"
            >
              <FiSearch className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Right Side - Actions and Profile */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Dark Mode Toggle */}
            {/* <button
              onClick={() => dispatch(toggleDarkMode())}
              className="p-2 rounded-lg hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
              aria-label="Toggle dark mode"
            >
              {ui.darkMode ? (
                <FiMoon className="w-5 h-5 text-gray-700" />
              ) : (
                <FiSun className="w-5 h-5 text-gray-700" />
              )}
            </button> */}

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsNotificationsDropdownOpen(!isNotificationsDropdownOpen);
                  setIsProfileDropdownOpen(false);
                }}
                className="p-2 rounded-lg hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 relative"
                aria-label="Notifications"
              >
                <FiBell className="w-5 h-5 text-gray-700" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                )}
              </button>
              <NotificationsDropdown
                isOpen={isNotificationsDropdownOpen}
                onClose={() => setIsNotificationsDropdownOpen(false)}
              />
            </div>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsProfileDropdownOpen(!isProfileDropdownOpen);
                  setIsNotificationsDropdownOpen(false);
                }}
                className="flex items-center space-x-2 p-1 sm:p-2 rounded-lg hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                aria-label="User menu"
                aria-expanded={isProfileDropdownOpen}
              >
                <img
                  src={auth.profile?.avatarUrl || "https://placehold.co/32x32"}
                  alt={auth.profile?.name}
                  className="h-10 w-10 rounded-full object-cover border-2 border-green-600"
                />
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-medium text-gray-900">
                    {auth.profile?.name || "User"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {auth.profile?.role || "Admin"}
                  </span>
                </div>
                <FiChevronDown
                  className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                    isProfileDropdownOpen ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              <UserProfileDropdown
                isOpen={isProfileDropdownOpen}
                onClose={() => setIsProfileDropdownOpen(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
