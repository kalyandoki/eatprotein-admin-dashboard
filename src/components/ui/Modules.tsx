// import React from "react";
// import {
//   FaShoppingBag,
//   FaAppleAlt,
//   FaDumbbell,
//   FaUtensils,
//   FaFlask,
// } from "react-icons/fa";

// const modules = [
//   {
//     id: "m1",
//     title: "Shop",
//     icon: <FaShoppingBag className="text-3xl text-blue-600" />,
//     color: "bg-blue-100",
//   },
//   {
//     id: "m2",
//     title: "Diet",
//     icon: <FaAppleAlt className="text-3xl text-green-600" />,
//     color: "bg-green-100",
//   },
//   {
//     id: "m3",
//     title: "Fitness",
//     icon: <FaDumbbell className="text-3xl text-purple-600" />,
//     color: "bg-purple-100",
//   },
//   {
//     id: "m4",
//     title: "Recipes",
//     icon: <FaUtensils className="text-3xl text-orange-600" />,
//     color: "bg-orange-100",
//   },
//   {
//     id: "m5",
//     title: "Labs",
//     icon: <FaFlask className="text-3xl text-red-600" />,
//     color: "bg-red-100",
//   },
// ];

// function Modules() {
//   return (
//     <div className="mb-8">
//       <h3 className="text-xl font-semibold mb-4">Module Quick Access</h3>
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
//         {modules.map((module) => (
//           <div
//             key={module.id}
//             className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition cursor-pointer flex flex-col items-center text-center"
//           >
//             <div
//               className={`${module.color} w-16 h-16 rounded-full flex items-center justify-center mb-3`}
//             >
//               {module.icon}
//             </div>
//             <div className="font-medium">{module.title}</div>
//             <div className="text-xs text-gray-500 mt-1">Open Module</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Modules;

import React from "react";
import { Link } from "react-router-dom";
import {
  FaShoppingBag,
  FaAppleAlt,
  FaDumbbell,
  FaUtensils,
  FaFlask,
  FaArrowRight,
} from "react-icons/fa";

const modules = [
  {
    id: "m1",
    title: "Shop",
    icon: <FaShoppingBag className="text-3xl" />,
    color: "bg-blue-100 text-blue-600",
    hoverColor: "hover:bg-blue-500",
    route: "/shop/products",
    description: "Browse products",
  },
  {
    id: "m2",
    title: "Diet",
    icon: <FaAppleAlt className="text-3xl" />,
    color: "bg-green-100 text-green-600",
    hoverColor: "hover:bg-green-500",
    route: "/diet",
    description: "Meal plans",
  },
  {
    id: "m3",
    title: "Fitness",
    icon: <FaDumbbell className="text-3xl" />,
    color: "bg-purple-100 text-purple-600",
    hoverColor: "hover:bg-purple-500",
    route: "/fitness",
    description: "Workout routines",
  },
  {
    id: "m4",
    title: "Recipes",
    icon: <FaUtensils className="text-3xl" />,
    color: "bg-orange-100 text-orange-600",
    hoverColor: "hover:bg-orange-500",
    route: "/recipes",
    description: "Healthy meals",
  },
  {
    id: "m5",
    title: "Labs",
    icon: <FaFlask className="text-3xl" />,
    color: "bg-red-100 text-red-600",
    hoverColor: "hover:bg-red-500",
    route: "/labs",
    description: "Experiments",
  },
];

function Modules() {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            Module Quick Access
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Navigate to different sections
          </p>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All Modules
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {modules.map((module) => (
          <Link to={module.route} key={module.id}>
            <div
              className={`bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-20 h-20 -mr-10 -mt-10 bg-gray-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div
                className={`${module.color} w-16 h-16 rounded-full flex items-center justify-center mb-3 mx-auto transition-all duration-300 group-hover:scale-110 relative z-10`}
              >
                {module.icon}
              </div>

              <div className="font-semibold text-gray-800 mb-1 text-center">
                {module.title}
              </div>
              <div className="text-xs text-gray-500 text-center mb-3">
                {module.description}
              </div>

              <div className="flex items-center justify-center text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Open</span>
                <FaArrowRight className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Modules;
