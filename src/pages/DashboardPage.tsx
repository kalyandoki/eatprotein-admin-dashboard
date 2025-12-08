// import React, { useEffect, useRef } from "react";
// import { useAppDispatch, useAppSelector } from "../store/hooks";
// import { fetchProducts, selectData } from "../store/slices/dataSlice";
// import { selectUi } from "../store/slices/uiSlice";
// import { formatCurrency } from "../utils/helpers";
// import { Link } from "react-router-dom";

// // Chart.js imports
// import {
//   Chart,
//   LineController,
//   LineElement,
//   PointElement,
//   LinearScale,
//   CategoryScale,
//   ArcElement,
//   BarController,
//   BarElement,
//   DoughnutController,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import TopSelling from "../components/ui/TopSelling";
// import FranchisePerformance from "../components/ui/FranchisePerformance";
// import ActiveUsersToday from "../components/ui/ActiveUsersToday";
// import PendingApprovals from "../components/ui/PendingApprovals";
// import SystemHealth from "../components/ui/SystemHealth";
// import RecentOrders from "../components/ui/RecentOrders";
// import Modules from "../components/ui/Modules";
// import KPI from "../components/ui/KPI";

// // Register controllers
// Chart.register(
//   LineController,
//   LineElement,
//   PointElement,
//   LinearScale,
//   CategoryScale,
//   ArcElement,
//   BarController,
//   BarElement,
//   DoughnutController,
//   Tooltip,
//   Legend
// );

// export default function DashboardPage() {
//   const dispatch = useAppDispatch();
//   const { products, loading } = useAppSelector(selectData);
//   const ui = useAppSelector(selectUi);

//   // Chart Refs
//   const revenueChartRef = useRef<HTMLCanvasElement>(null);
//   const moduleChartRef = useRef<HTMLCanvasElement>(null);

//   // Chart instances
//   const revenueChartInstance = useRef<Chart | null>(null);
//   const moduleChartInstance = useRef<Chart | null>(null);

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   // Module Quick Access Data

//   const filteredProducts = products.filter((p) =>
//     ui.searchQuery
//       ? p.title.toLowerCase().includes(ui.searchQuery.toLowerCase())
//       : true
//   );

//   // Create REAL Chart.js charts
//   useEffect(() => {
//     // Cleanup before creating new charts
//     if (revenueChartInstance.current) revenueChartInstance.current.destroy();
//     if (moduleChartInstance.current) moduleChartInstance.current.destroy();

//     // Revenue Line Chart
//     if (revenueChartRef.current) {
//       revenueChartInstance.current = new Chart(revenueChartRef.current, {
//         type: "line",
//         data: {
//           labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//           datasets: [
//             {
//               label: "Revenue",
//               data: [120, 140, 180, 90, 160, 200, 240],
//               borderWidth: 3,
//               borderColor: "#4F46E5",
//               fill: false,
//               tension: 0.3,
//               pointRadius: 4,
//             },
//           ],
//         },
//         options: {
//           responsive: true,
//           plugins: {
//             legend: { display: false },
//           },
//         },
//       });
//     }

//     // Module Usage Pie Chart
//     if (moduleChartRef.current) {
//       moduleChartInstance.current = new Chart(moduleChartRef.current, {
//         type: "doughnut",
//         data: {
//           labels: ["Sales", "Users", "Orders", "Subscriptions"],
//           datasets: [
//             {
//               data: [40, 25, 20, 15],
//               backgroundColor: ["#6366F1", "#34D399", "#FBBF24", "#EF4444"],
//               borderWidth: 1,
//             },
//           ],
//         },
//         options: {
//           responsive: true,
//           plugins: {
//             legend: { position: "bottom" },
//           },
//         },
//       });
//     }

//     return () => {
//       // Final cleanup on unmount
//       if (revenueChartInstance.current) revenueChartInstance.current.destroy();
//       if (moduleChartInstance.current) moduleChartInstance.current.destroy();
//     };
//   }, []);

//   return (
//     <div className="container mx-auto px-4 py-6 max-w-7xl">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
//           <p className="text-sm text-gray-600">Overview & insights</p>
//         </div>
//         <div className="flex gap-3">
//           <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
//             Export CSV
//           </button>
//           <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
//             <Link to="/shop">Go to Shop</Link>
//           </button>
//         </div>
//       </div>

//       {/* KPI Cards */}
//       <KPI />

//       {/* Module Quick Access */}
//       <Modules />

//       {/* Recent Orders Table */}
//       <RecentOrders />

//       {/* Top Selling Products */}

//       <TopSelling />

//       <FranchisePerformance />

//       <ActiveUsersToday />

//       <PendingApprovals />

//       <SystemHealth />

//       {/* Main Content Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Products Section - Takes up 2 columns on large screens */}
//         <div className="lg:col-span-2">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold">Products</h3>
//             <span className="text-sm text-gray-600">
//               {loading ? "Loading..." : `${filteredProducts.length} items`}
//             </span>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {filteredProducts.slice(0, 4).map((product) => (
//               <div
//                 key={product.id}
//                 className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
//               >
//                 <img
//                   src={product.img}
//                   alt={product.title}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-4">
//                   <h4 className="font-medium mb-1">{product.title}</h4>
//                   <p className="text-xs text-gray-500 mb-3">
//                     {product.tags.join(", ")}
//                   </p>
//                   <div className="flex justify-between items-center mb-3">
//                     <span className="font-semibold">
//                       {formatCurrency(product.price)}
//                     </span>
//                   </div>
//                   <div className="flex gap-2">
//                     <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition">
//                       View
//                     </button>
//                     <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
//                       Edit
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Charts Section - Takes up 1 column on large screens */}
//         <div className="space-y-6">
//           {/* Revenue Chart */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
//             <h4 className="font-medium mb-3">Revenue (Last 7 Days)</h4>
//             <div className="h-64">
//               <canvas ref={revenueChartRef}></canvas>
//             </div>
//           </div>

//           {/* Module Usage Chart */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
//             <h4 className="font-medium mb-3">Module Usage</h4>
//             <div className="h-64">
//               <canvas ref={moduleChartRef}></canvas>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProducts, selectData } from "../store/slices/dataSlice";
import { selectUi } from "../store/slices/uiSlice";
import { formatCurrency } from "../utils/helpers";
import { Link } from "react-router-dom";

// Chart.js imports
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  ArcElement,
  BarController,
  BarElement,
  DoughnutController,
  Tooltip,
  Legend,
} from "chart.js";
import TopSelling from "../components/ui/TopSelling";
import FranchisePerformance from "../components/ui/FranchisePerformance";
import ActiveUsersToday from "../components/ui/ActiveUsersToday";
import PendingApprovals from "../components/ui/PendingApprovals";
import SystemHealth from "../components/ui/SystemHealth";
import RecentOrders from "../components/ui/RecentOrders";
import Modules from "../components/ui/Modules";
import KPI from "../components/ui/KPI";

// Register controllers
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  ArcElement,
  BarController,
  BarElement,
  DoughnutController,
  Tooltip,
  Legend
);

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector(selectData);
  const ui = useAppSelector(selectUi);

  // Chart Refs
  const revenueChartRef = useRef<HTMLCanvasElement>(null);
  const moduleChartRef = useRef<HTMLCanvasElement>(null);

  // Chart instances
  const revenueChartInstance = useRef<Chart | null>(null);
  const moduleChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Module Quick Access Data
  const filteredProducts = products.filter((p) =>
    ui.searchQuery
      ? p.title.toLowerCase().includes(ui.searchQuery.toLowerCase())
      : true
  );

  // Create REAL Chart.js charts
  useEffect(() => {
    // Cleanup before creating new charts
    if (revenueChartInstance.current) revenueChartInstance.current.destroy();
    if (moduleChartInstance.current) moduleChartInstance.current.destroy();

    // Revenue Line Chart
    if (revenueChartRef.current) {
      revenueChartInstance.current = new Chart(revenueChartRef.current, {
        type: "line",
        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              label: "Revenue",
              data: [120, 140, 180, 90, 160, 200, 240],
              borderWidth: 3,
              borderColor: "#4F46E5",
              backgroundColor: "rgba(79, 70, 229, 0.1)",
              fill: true,
              tension: 0.4,
              pointRadius: 4,
              pointBackgroundColor: "#fff",
              pointBorderColor: "#4F46E5",
              pointBorderWidth: 2,
              pointHoverRadius: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              padding: 12,
              titleColor: "#fff",
              bodyColor: "#fff",
              borderColor: "#4F46E5",
              borderWidth: 1,
              displayColors: false,
              callbacks: {
                label: function (context) {
                  return `Revenue: $${context.raw}k`;
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: "rgba(0, 0, 0, 0.05)",
              },
              ticks: {
                callback: function (value) {
                  return "$" + value + "k";
                },
              },
            },
            x: {
              grid: {
                display: false,
              },
            },
          },
        },
      });
    }

    // Module Usage Pie Chart
    if (moduleChartRef.current) {
      moduleChartInstance.current = new Chart(moduleChartRef.current, {
        type: "doughnut",
        data: {
          labels: ["Sales", "Users", "Orders", "Subscriptions"],
          datasets: [
            {
              data: [40, 25, 20, 15],
              backgroundColor: ["#6366F1", "#34D399", "#FBBF24", "#EF4444"],
              borderWidth: 0,
              hoverOffset: 8,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                padding: 15,
                usePointStyle: true,
                font: {
                  size: 12,
                },
              },
            },
            tooltip: {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              padding: 12,
              titleColor: "#fff",
              bodyColor: "#fff",
              displayColors: true,
              callbacks: {
                label: function (context) {
                  return `${context.label}: ${context.raw}%`;
                },
              },
            },
          },
          cutout: "70%",
        },
      });
    }

    return () => {
      // Final cleanup on unmount
      if (revenueChartInstance.current) revenueChartInstance.current.destroy();
      if (moduleChartInstance.current) moduleChartInstance.current.destroy();
    };
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
              <p className="text-gray-600 mt-1">Overview & insights</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2 shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <Link to="/shop/products">Go to Shop</Link>
              </button>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="mb-8">
          <KPI />
        </div>

        {/* Module Quick Access */}
        <div className="mb-8">
          <Modules />
        </div>

        {/* Recent Orders Table */}
        <div className="mb-8">
          <RecentOrders />
        </div>

        {/* Top Selling Products */}
        <div className="mb-8">
          <TopSelling />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
          {/* Franchise Performance */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <FranchisePerformance />
          </div>

          {/* Active Users Today */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <ActiveUsersToday />
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="mb-8">
          <PendingApprovals />
        </div>

        {/* System Health */}
        <div className="mb-8">
          <SystemHealth />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Products Section - Takes up 2 columns on large screens */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  Products
                </h3>
                <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  {loading ? "Loading..." : `${filteredProducts.length} items`}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredProducts.slice(0, 4).map((product) => (
                  <div
                    key={product.id}
                    className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="relative">
                      <img
                        src={product.img}
                        alt={product.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-white bg-opacity-90 rounded-full p-1.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium text-gray-800 mb-1">
                        {product.title}
                      </h4>
                      <p className="text-xs text-gray-500 mb-3">
                        {product.tags.join(", ")}
                      </p>
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-bold text-lg text-blue-600">
                          {formatCurrency(product.price)}
                        </span>
                        <div className="flex items-center text-yellow-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-xs text-gray-600 ml-1">
                            4.5
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                          View
                        </button>
                        <button className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <button className="px-4 py-2 text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200">
                  View all products
                </button>
              </div>
            </div>
          </div>

          {/* Charts Section - Takes up 1 column on large screens */}
          <div className="space-y-6">
            {/* Revenue Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-800">
                  Revenue (Last 7 Days)
                </h4>
                <button className="text-gray-500 hover:text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>
              <div className="h-64">
                <canvas ref={revenueChartRef}></canvas>
              </div>
            </div>

            {/* Module Usage Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-800">Module Usage</h4>
                <button className="text-gray-500 hover:text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>
              <div className="h-64">
                <canvas ref={moduleChartRef}></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
