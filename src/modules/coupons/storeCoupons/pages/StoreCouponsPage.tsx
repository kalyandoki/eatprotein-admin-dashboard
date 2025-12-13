// // src/modules/coupons/storeCoupons/pages/StoreCouponsPage.tsx
// import React, { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
// import {
//   fetchStoreCoupons,
//   StoreCoupon,
//   duplicateStoreCoupon,
// } from "../storeCouponsSlice";
// import {
//   FiPlus,
//   FiSearch,
//   FiRefreshCw,
//   FiEdit2,
//   FiTrash2,
//   FiFilter,
//   FiCopy,
//   FiDownload,
//   FiTag,
// } from "react-icons/fi";
// import AddStoreCouponModal from "../components/AddStoreCouponModal";
// import EditStoreCouponModal from "../components/EditStoreCouponModal";
// import DeleteStoreCouponModal from "../components/DeleteStoreCouponModal";
// import Pagination from "../../../../components/common/Pagination";

// export default function StoreCouponsPage() {
//   const dispatch = useAppDispatch();
//   const { coupons, status } = useAppSelector((state) => state.storeCoupons);
//   const [search, setSearch] = useState("");
//   const [selectedCoupon, setSelectedCoupon] = useState<StoreCoupon | null>(
//     null
//   );
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [statusFilter, setStatusFilter] = useState<string>("all");

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   useEffect(() => {
//     if (status === "idle") dispatch(fetchStoreCoupons());
//   }, [status, dispatch]);

//   // Filter coupons based on search and filters
//   const filteredCoupons = coupons.filter((coupon) => {
//     const matchesSearch = coupon.couponCode
//       .toLowerCase()
//       .includes(search.toLowerCase());
//     //   coupon.couponName.toLowerCase().includes(search.toLowerCase());

//     const matchesStatus =
//       statusFilter === "all" || coupon.status === statusFilter;

//     return matchesSearch && matchesStatus;
//   });

//   // Calculate pagination values
//   const totalItems = filteredCoupons.length;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   // Get current page items
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentCoupons = filteredCoupons.slice(
//     indexOfFirstItem,
//     indexOfLastItem
//   );

//   // Reset to first page when search or filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [search, statusFilter]);

//   const handleRefresh = () => {
//     dispatch(fetchStoreCoupons());
//   };

//   const handleEdit = (coupon: StoreCoupon) => {
//     setSelectedCoupon(coupon);
//     setShowEditModal(true);
//   };

//   const handleDelete = (coupon: StoreCoupon) => {
//     setSelectedCoupon(coupon);
//     setShowDeleteModal(true);
//   };

//   const handleDuplicate = (couponId: string) => {
//     dispatch(duplicateStoreCoupon(couponId));
//   };

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "Active":
//         return "bg-green-100 text-green-800";
//       case "Inactive":
//         return "bg-red-100 text-red-800";
//       case "In Progress":
//         return "bg-blue-100 text-blue-800";
//       case "Expired":
//         return "bg-gray-100 text-gray-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "2-digit",
//       day: "2-digit",
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header with gradient background */}
//         <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//             <div className="mb-4 md:mb-0">
//               <h1 className="text-3xl md:text-4xl font-bold mb-2">
//                 Store Coupons
//               </h1>
//               <p className="text-emerald-100 text-lg">
//                 Manage store-specific coupons and promotional codes
//               </p>
//             </div>
//             <div className="flex gap-3">
//               <button
//                 onClick={handleRefresh}
//                 className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg hover:bg-white/30 transition-all duration-200 flex items-center gap-2"
//                 title="Refresh"
//               >
//                 <FiRefreshCw className="text-lg" />
//                 <span className="hidden sm:inline">Refresh</span>
//               </button>
//               <button
//                 onClick={() => setShowAddModal(true)}
//                 className="px-4 py-2 bg-white text-emerald-700 font-medium rounded-lg hover:bg-emerald-50 transition-all duration-200 shadow-md flex items-center gap-2"
//               >
//                 <FiPlus className="text-lg" />
//                 <span>Add Coupon</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-emerald-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 text-sm font-medium">
//                   Total Coupons
//                 </p>
//                 <p className="text-3xl font-bold text-gray-800 mt-1">
//                   {coupons.length}
//                 </p>
//               </div>
//               <div className="bg-emerald-100 p-3 rounded-full">
//                 <FiTag className="text-emerald-600 text-xl" />
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-emerald-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 text-sm font-medium">Active</p>
//                 <p className="text-3xl font-bold text-gray-800 mt-1">
//                   {coupons.filter((c) => c.status === "Active").length}
//                 </p>
//               </div>
//               <div className="bg-emerald-100 p-3 rounded-full">
//                 <FiTag className="text-emerald-600 text-xl" />
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 text-sm font-medium">In Progress</p>
//                 <p className="text-3xl font-bold text-gray-800 mt-1">
//                   {coupons.filter((c) => c.status === "In Progress").length}
//                 </p>
//               </div>
//               <div className="bg-blue-100 p-3 rounded-full">
//                 <FiTag className="text-blue-600 text-xl" />
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 text-sm font-medium">Expired</p>
//                 <p className="text-3xl font-bold text-gray-800 mt-1">
//                   {coupons.filter((c) => c.status === "Expired").length}
//                 </p>
//               </div>
//               <div className="bg-red-100 p-3 rounded-full">
//                 <FiTag className="text-red-600 text-xl" />
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-gray-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 text-sm font-medium">Inactive</p>
//                 <p className="text-3xl font-bold text-gray-800 mt-1">
//                   {coupons.filter((c) => c.status === "Inactive").length}
//                 </p>
//               </div>
//               <div className="bg-gray-100 p-3 rounded-full">
//                 <FiTag className="text-gray-600 text-xl" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Search and Filters */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//           <div className="flex flex-col lg:flex-row gap-4">
//             <div className="flex-1">
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FiSearch className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Search coupons..."
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div className="flex gap-3">
//               <div className="relative">
//                 <select
//                   className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                 >
//                   <option value="all">All Statuses</option>
//                   <option value="Active">Active</option>
//                   <option value="Inactive">Inactive</option>
//                   <option value="In Progress">In Progress</option>
//                   <option value="Expired">Expired</option>
//                 </select>
//                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                   <FiFilter className="h-4 w-4" />
//                 </div>
//               </div>
//               <button className="px-3 py-2 bg-emerald-600 text-white text-sm rounded hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-1">
//                 <FiDownload className="text-sm" />
//                 Export
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Coupons Table */}
//         {status === "loading" ? (
//           <div className="flex justify-center items-center py-20 bg-white rounded-xl shadow-lg">
//             <div className="flex flex-col items-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
//               <p className="mt-4 text-gray-600">Loading coupons...</p>
//             </div>
//           </div>
//         ) : (
//           <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//             <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
//               <h2 className="text-lg font-semibold text-gray-800">
//                 Store Coupons ({filteredCoupons.length})
//               </h2>
//             </div>
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       S.No
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Date
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Coupon Code
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Coupon Percentage
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Coupon Image
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Validity
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Total Orders
//                     </th>
//                     <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {currentCoupons.length === 0 ? (
//                     <tr>
//                       <td colSpan={8} className="px-6 py-16 text-center">
//                         <div className="flex flex-col items-center">
//                           <div className="bg-gray-100 p-4 rounded-full mb-4">
//                             <FiTag className="h-12 w-12 text-gray-400" />
//                           </div>
//                           <h3 className="mt-2 text-lg font-medium text-gray-900">
//                             {filteredCoupons.length === 0
//                               ? "No coupons found"
//                               : "No coupons on this page"}
//                           </h3>
//                           <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto">
//                             {search
//                               ? "Try adjusting your search to find what you're looking for"
//                               : filteredCoupons.length === 0
//                               ? "Get started by adding a new coupon"
//                               : "Try a different page"}
//                           </p>
//                           {!search && filteredCoupons.length === 0 && (
//                             <button
//                               onClick={() => setShowAddModal(true)}
//                               className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-2 mx-auto"
//                             >
//                               <FiPlus className="text-lg" />
//                               <span>Add Coupon</span>
//                             </button>
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   ) : (
//                     currentCoupons.map((coupon) => (
//                       <tr
//                         key={coupon.id}
//                         className="hover:bg-gray-50 transition-colors duration-150"
//                       >
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-900">
//                             {coupon.sno}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-900">
//                             {formatDate(coupon.date)}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm font-medium text-gray-900">
//                             {coupon.couponCode}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-900">
//                             {coupon.couponPercentage}%
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="relative group">
//                             <img
//                               src={coupon.couponImage}
//                               alt={coupon.couponCode}
//                               className="h-16 w-24 object-cover rounded-lg cursor-pointer transition-all duration-200 group-hover:opacity-75"
//                               onClick={() => handleEdit(coupon)}
//                             />
//                             <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//                               <div className="bg-black bg-opacity-75 text-white p-1 rounded-full">
//                                 <FiEdit2
//                                   className="h-4 w-4"
//                                   onClick={() => handleEdit(coupon)}
//                                 />
//                               </div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-900">
//                             {formatDate(coupon.validity)}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span
//                             className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
//                               coupon.status
//                             )}`}
//                           >
//                             {coupon.status}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm font-medium text-gray-900">
//                             {coupon.totalOrders}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                           <button
//                             onClick={() => handleEdit(coupon)}
//                             className="text-emerald-600 hover:text-emerald-900 mr-3 transition-colors duration-150 p-1 rounded-full hover:bg-emerald-50"
//                             title="Edit"
//                           >
//                             <FiEdit2 className="text-lg" />
//                           </button>
//                           <button
//                             onClick={() => handleDelete(coupon)}
//                             className="text-red-600 hover:text-red-900 transition-colors duration-150 p-1 rounded-full hover:bg-red-50"
//                             title="Delete"
//                           >
//                             <FiTrash2 className="text-lg" />
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
//                 <Pagination
//                   currentPage={currentPage}
//                   totalPages={totalPages}
//                   onPageChange={handlePageChange}
//                   totalItems={totalItems}
//                   perPage={itemsPerPage}
//                 />
//               </div>
//             )}
//           </div>
//         )}

//         {/* Modals */}
//         {showAddModal && (
//           <AddStoreCouponModal onClose={() => setShowAddModal(false)} />
//         )}
//         {showEditModal && selectedCoupon && (
//           <EditStoreCouponModal
//             coupon={selectedCoupon}
//             onClose={() => {
//               setSelectedCoupon(null);
//               setShowEditModal(false);
//             }}
//           />
//         )}
//         {showDeleteModal && selectedCoupon && (
//           <DeleteStoreCouponModal
//             coupon={selectedCoupon}
//             onClose={() => {
//               setSelectedCoupon(null);
//               setShowDeleteModal(false);
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// src/modules/coupons/storeCoupons/pages/StoreCouponsPage.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  fetchStoreCoupons,
  StoreCoupon,
  duplicateStoreCoupon,
  updateStoreCouponImage,
} from "../storeCouponsSlice";
import {
  FiPlus,
  FiSearch,
  FiRefreshCw,
  FiEdit2,
  FiTrash2,
  FiFilter,
  FiCopy,
  FiDownload,
  FiTag,
} from "react-icons/fi";
import AddStoreCouponModal from "../components/AddStoreCouponModal";
import EditStoreCouponModal from "../components/EditStoreCouponModal";
import DeleteStoreCouponModal from "../components/DeleteStoreCouponModal";
import Pagination from "../../../../components/common/Pagination";
import ImageUpload from "../../../../components/common/ImageUpload";

export default function StoreCouponsPage() {
  const dispatch = useAppDispatch();
  const { coupons, status } = useAppSelector((state) => state.storeCoupons);
  const [search, setSearch] = useState("");
  const [selectedCoupon, setSelectedCoupon] = useState<StoreCoupon | null>(
    null
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (status === "idle") dispatch(fetchStoreCoupons());
  }, [status, dispatch]);

  // Filter coupons based on search and filters
  const filteredCoupons = coupons.filter((coupon) => {
    const matchesSearch = coupon.couponCode
      .toLowerCase()
      .includes(search.toLowerCase());
    //   coupon.couponName.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || coupon.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate pagination values
  const totalItems = filteredCoupons.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCoupons = filteredCoupons.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Reset to first page when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  const handleRefresh = () => {
    dispatch(fetchStoreCoupons());
  };

  const handleEdit = (coupon: StoreCoupon) => {
    setSelectedCoupon(coupon);
    setShowEditModal(true);
  };

  const handleDelete = (coupon: StoreCoupon) => {
    setSelectedCoupon(coupon);
    setShowDeleteModal(true);
  };

  const handleDuplicate = (couponId: string) => {
    dispatch(duplicateStoreCoupon(couponId));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleImageChange = (couponId: string, imageUrl: string) => {
    dispatch(updateStoreCouponImage({ couponId, imageUrl }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Expired":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Store Coupons
              </h1>
              <p className="text-emerald-100 text-lg">
                Manage store-specific coupons and promotional codes
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleRefresh}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg hover:bg-white/30 transition-all duration-200 flex items-center gap-2"
                title="Refresh"
              >
                <FiRefreshCw className="text-lg" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-white text-emerald-700 font-medium rounded-lg hover:bg-emerald-50 transition-all duration-200 shadow-md flex items-center gap-2"
              >
                <FiPlus className="text-lg" />
                <span>Add Coupon</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-emerald-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Coupons
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {coupons.length}
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <FiTag className="text-emerald-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-emerald-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Active</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {coupons.filter((c) => c.status === "Active").length}
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <FiTag className="text-emerald-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">In Progress</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {coupons.filter((c) => c.status === "In Progress").length}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FiTag className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Expired</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {coupons.filter((c) => c.status === "Expired").length}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <FiTag className="text-red-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-gray-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Inactive</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {coupons.filter((c) => c.status === "Inactive").length}
                </p>
              </div>
              <div className="bg-gray-100 p-3 rounded-full">
                <FiTag className="text-gray-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search coupons..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Expired">Expired</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FiFilter className="h-4 w-4" />
                </div>
              </div>
              <button className="px-3 py-2 bg-emerald-600 text-white text-sm rounded hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-1">
                <FiDownload className="text-sm" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Coupons Table */}
        {status === "loading" ? (
          <div className="flex justify-center items-center py-20 bg-white rounded-xl shadow-lg">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
              <p className="mt-4 text-gray-600">Loading coupons...</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-800">
                Store Coupons ({filteredCoupons.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      S.No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Coupon Code
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Coupon Percentage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Coupon Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Validity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Orders
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentCoupons.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center">
                          <div className="bg-gray-100 p-4 rounded-full mb-4">
                            <FiTag className="h-12 w-12 text-gray-400" />
                          </div>
                          <h3 className="mt-2 text-lg font-medium text-gray-900">
                            {filteredCoupons.length === 0
                              ? "No coupons found"
                              : "No coupons on this page"}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto">
                            {search
                              ? "Try adjusting your search to find what you're looking for"
                              : filteredCoupons.length === 0
                              ? "Get started by adding a new coupon"
                              : "Try a different page"}
                          </p>
                          {!search && filteredCoupons.length === 0 && (
                            <button
                              onClick={() => setShowAddModal(true)}
                              className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-2 mx-auto"
                            >
                              <FiPlus className="text-lg" />
                              <span>Add Coupon</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentCoupons.map((coupon) => (
                      <tr
                        key={coupon.id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {coupon.sno}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {formatDate(coupon.date)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {coupon.couponCode}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {coupon.couponPercentage}%
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <ImageUpload
                            initialImage={coupon.couponImage}
                            onImageChange={(imageUrl) =>
                              handleImageChange(coupon.id, imageUrl)
                            }
                            size="sm"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {formatDate(coupon.validity)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                              coupon.status
                            )}`}
                          >
                            {coupon.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {coupon.totalOrders}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEdit(coupon)}
                            className="text-emerald-600 hover:text-emerald-900 mr-3 transition-colors duration-150 p-1 rounded-full hover:bg-emerald-50"
                            title="Edit"
                          >
                            <FiEdit2 className="text-lg" />
                          </button>
                          {/* <button
                            onClick={() => handleDuplicate(coupon.id)}
                            className="text-blue-600 hover:text-blue-900 mr-3 transition-colors duration-150 p-1 rounded-full hover:bg-blue-50"
                            title="Duplicate"
                          >
                            <FiCopy className="text-lg" />
                          </button> */}
                          <button
                            onClick={() => handleDelete(coupon)}
                            className="text-red-600 hover:text-red-900 transition-colors duration-150 p-1 rounded-full hover:bg-red-50"
                            title="Delete"
                          >
                            <FiTrash2 className="text-lg" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalItems={totalItems}
                  perPage={itemsPerPage}
                />
              </div>
            )}
          </div>
        )}

        {/* Modals */}
        {showAddModal && (
          <AddStoreCouponModal onClose={() => setShowAddModal(false)} />
        )}
        {showEditModal && selectedCoupon && (
          <EditStoreCouponModal
            coupon={selectedCoupon}
            onClose={() => {
              setSelectedCoupon(null);
              setShowEditModal(false);
            }}
          />
        )}
        {showDeleteModal && selectedCoupon && (
          <DeleteStoreCouponModal
            coupon={selectedCoupon}
            onClose={() => {
              setSelectedCoupon(null);
              setShowDeleteModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
