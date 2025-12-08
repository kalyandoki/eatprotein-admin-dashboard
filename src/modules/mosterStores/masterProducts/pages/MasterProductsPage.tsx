// // src/modules/shop/masterProducts/pages/MasterProductsPage.tsx
// import React, { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
// import { fetchMasterProducts, MasterProduct } from "../masterProductsSlice";
// import {
//   FiPlus,
//   FiSearch,
//   FiRefreshCw,
//   FiEdit2,
//   FiTrash2,
//   FiFilter,
//   FiEye,
//   FiPackage,
//   FiDollarSign,
//   FiTag,
//   FiDownload,
// } from "react-icons/fi";
// import AddProductModal from "../components/AddProductModal";
// import EditProductModal from "../components/EditProductModal";
// import DeleteProductModal from "../components/DeleteProductModal";
// import ViewProductModal from "../components/ViewProductModal";
// import Pagination from "../../../../components/common/Pagination";

// export default function MasterProductsPage() {
//   const dispatch = useAppDispatch();
//   const { products, categories, subcategories, brands, units, status } =
//     useAppSelector((state) => state.masterProducts);
//   const [search, setSearch] = useState("");
//   const [selectedProduct, setSelectedProduct] = useState<MasterProduct | null>(
//     null
//   );
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [categoryFilter, setCategoryFilter] = useState<string>("all");
//   const [brandFilter, setBrandFilter] = useState<string>("all");
//   const [statusFilter, setStatusFilter] = useState<string>("all");

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10; // Number of items per page

//   useEffect(() => {
//     if (status === "idle") dispatch(fetchMasterProducts());
//   }, [status, dispatch]);

//   // Filter products based on search and filters
//   const filteredProducts = products.filter((product) => {
//     const matchesSearch =
//       product.name.toLowerCase().includes(search.toLowerCase()) ||
//       product.sku.toLowerCase().includes(search.toLowerCase()) ||
//       product.description.toLowerCase().includes(search.toLowerCase());

//     const matchesCategory =
//       categoryFilter === "all" || product.category === categoryFilter;
//     const matchesBrand = brandFilter === "all" || product.brand === brandFilter;
//     const matchesStatus =
//       statusFilter === "all" || product.status === statusFilter;

//     return matchesSearch && matchesCategory && matchesBrand && matchesStatus;
//   });

//   // Calculate pagination values
//   const totalItems = filteredProducts.length;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   // Get current page items
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentProducts = filteredProducts.slice(
//     indexOfFirstItem,
//     indexOfLastItem
//   );

//   // Reset to first page when search or filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [search, categoryFilter, brandFilter, statusFilter]);

//   const handleRefresh = () => {
//     dispatch(fetchMasterProducts());
//   };

//   const handleEdit = (product: MasterProduct) => {
//     setSelectedProduct(product);
//     setShowEditModal(true);
//   };

//   const handleDelete = (product: MasterProduct) => {
//     setSelectedProduct(product);
//     setShowDeleteModal(true);
//   };

//   const handleView = (product: MasterProduct) => {
//     setSelectedProduct(product);
//     setShowViewModal(true);
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
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header with gradient background */}
//         <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//             <div className="mb-4 md:mb-0">
//               <h1 className="text-3xl md:text-4xl font-bold mb-2">
//                 Product Configuration
//               </h1>
//               <p className="text-emerald-100 text-lg">
//                 Manage master product catalog
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
//                 <span>Add Product</span>
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
//                   Total Products
//                 </p>
//                 <p className="text-3xl font-bold text-gray-800 mt-1">
//                   {products.length}
//                 </p>
//               </div>
//               <div className="bg-emerald-100 p-3 rounded-full">
//                 <FiPackage className="text-emerald-600 text-xl" />
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-emerald-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 text-sm font-medium">Active</p>
//                 <p className="text-3xl font-bold text-gray-800 mt-1">
//                   {products.filter((p) => p.status === "Active").length}
//                 </p>
//               </div>
//               <div className="bg-emerald-100 p-3 rounded-full">
//                 <FiPackage className="text-emerald-600 text-xl" />
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 text-sm font-medium">Inactive</p>
//                 <p className="text-3xl font-bold text-gray-800 mt-1">
//                   {products.filter((p) => p.status === "Inactive").length}
//                 </p>
//               </div>
//               <div className="bg-red-100 p-3 rounded-full">
//                 <FiPackage className="text-red-600 text-xl" />
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 text-sm font-medium">Categories</p>
//                 <p className="text-3xl font-bold text-gray-800 mt-1">
//                   {categories.length}
//                 </p>
//               </div>
//               <div className="bg-blue-100 p-3 rounded-full">
//                 <FiTag className="text-blue-600 text-xl" />
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
//                   placeholder="Search products..."
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
//                   value={categoryFilter}
//                   onChange={(e) => setCategoryFilter(e.target.value)}
//                 >
//                   <option value="all">All Categories</option>
//                   {categories.map((category) => (
//                     <option key={category} value={category}>
//                       {category}
//                     </option>
//                   ))}
//                 </select>
//                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                   <FiFilter className="h-4 w-4" />
//                 </div>
//               </div>
//               <div className="relative">
//                 <select
//                   className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
//                   value={brandFilter}
//                   onChange={(e) => setBrandFilter(e.target.value)}
//                 >
//                   <option value="all">All Brands</option>
//                   {brands.map((brand) => (
//                     <option key={brand} value={brand}>
//                       {brand}
//                     </option>
//                   ))}
//                 </select>
//                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                   <FiFilter className="h-4 w-4" />
//                 </div>
//               </div>
//               <div className="relative">
//                 <select
//                   className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                 >
//                   <option value="all">All Statuses</option>
//                   <option value="Active">Active</option>
//                   <option value="Inactive">Inactive</option>
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

//         {/* Products Table */}
//         {status === "loading" ? (
//           <div className="flex justify-center items-center py-20 bg-white rounded-xl shadow-lg">
//             <div className="flex flex-col items-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
//               <p className="mt-4 text-gray-600">Loading products...</p>
//             </div>
//           </div>
//         ) : (
//           <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//             <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
//               <h2 className="text-lg font-semibold text-gray-800">
//                 Products ({filteredProducts.length})
//               </h2>
//             </div>
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Product
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       SKU
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Category
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Brand
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Price
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Commission
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                     <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {currentProducts.length === 0 ? (
//                     <tr>
//                       <td colSpan={8} className="px-6 py-16 text-center">
//                         <div className="flex flex-col items-center">
//                           <div className="bg-gray-100 p-4 rounded-full mb-4">
//                             <FiPackage className="h-12 w-12 text-gray-400" />
//                           </div>
//                           <h3 className="mt-2 text-lg font-medium text-gray-900">
//                             {filteredProducts.length === 0
//                               ? "No products found"
//                               : "No products on this page"}
//                           </h3>
//                           <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto">
//                             {search
//                               ? "Try adjusting your search to find what you're looking for"
//                               : filteredProducts.length === 0
//                               ? "Get started by adding a new product"
//                               : "Try a different page"}
//                           </p>
//                           {!search && filteredProducts.length === 0 && (
//                             <button
//                               onClick={() => setShowAddModal(true)}
//                               className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-2 mx-auto"
//                             >
//                               <FiPlus className="text-lg" />
//                               <span>Add Product</span>
//                             </button>
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   ) : (
//                     currentProducts.map((product) => (
//                       <tr
//                         key={product.id}
//                         className="hover:bg-gray-50 transition-colors duration-150"
//                       >
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center">
//                             <div className="flex-shrink-0 h-10 w-10">
//                               <img
//                                 className="h-10 w-10 rounded-lg object-cover"
//                                 src={product.image}
//                                 alt={product.name}
//                               />
//                             </div>
//                             <div className="ml-4">
//                               <div className="text-sm font-medium text-gray-900">
//                                 {product.name}
//                               </div>
//                               <div className="text-sm text-gray-500">
//                                 {product.unit}
//                               </div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-900">
//                             {product.sku}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-900">
//                             {product.category}
//                           </div>
//                           <div className="text-sm text-gray-500">
//                             {product.subcategory}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-900">
//                             {product.brand}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm font-medium text-gray-900">
//                             ${product.price.toFixed(2)}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm font-medium text-gray-900">
//                             {product.commission}%
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span
//                             className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
//                               product.status
//                             )}`}
//                           >
//                             {product.status}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                           <button
//                             onClick={() => handleView(product)}
//                             className="text-emerald-600 hover:text-emerald-900 mr-3 transition-colors duration-150 p-1 rounded-full hover:bg-emerald-50"
//                             title="View"
//                           >
//                             <FiEye className="text-lg" />
//                           </button>
//                           <button
//                             onClick={() => handleEdit(product)}
//                             className="text-emerald-600 hover:text-emerald-900 mr-3 transition-colors duration-150 p-1 rounded-full hover:bg-emerald-50"
//                             title="Edit"
//                           >
//                             <FiEdit2 className="text-lg" />
//                           </button>
//                           <button
//                             onClick={() => handleDelete(product)}
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
//           <AddProductModal onClose={() => setShowAddModal(false)} />
//         )}
//         {showEditModal && selectedProduct && (
//           <EditProductModal
//             product={selectedProduct}
//             onClose={() => {
//               setSelectedProduct(null);
//               setShowEditModal(false);
//             }}
//           />
//         )}
//         {showDeleteModal && selectedProduct && (
//           <DeleteProductModal
//             product={selectedProduct}
//             onClose={() => {
//               setSelectedProduct(null);
//               setShowDeleteModal(false);
//             }}
//           />
//         )}
//         {showViewModal && selectedProduct && (
//           <ViewProductModal
//             product={selectedProduct}
//             onClose={() => {
//               setSelectedProduct(null);
//               setShowViewModal(false);
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// src/modules/shop/masterProducts/pages/MasterProductsPage.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { fetchMasterProducts, MasterProduct } from "../masterProductsSlice";
import {
  FiPlus,
  FiSearch,
  FiRefreshCw,
  FiEdit2,
  FiTrash2,
  FiFilter,
  FiEye,
  FiPackage,
  FiDollarSign,
  FiTag,
  FiDownload,
} from "react-icons/fi";
import AddProductModal from "../components/AddProductModal";
import EditProductModal from "../components/EditProductModal";
import DeleteProductModal from "../components/DeleteProductModal";
import ViewProductModal from "../components/ViewProductModal";
import Pagination from "../../../../components/common/Pagination";

export default function MasterProductsPage() {
  const dispatch = useAppDispatch();
  const { products, categories, subcategories, brands, units, status } =
    useAppSelector((state) => state.masterProducts);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<MasterProduct | null>(
    null
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [brandFilter, setBrandFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  useEffect(() => {
    if (status === "idle") dispatch(fetchMasterProducts());
  }, [status, dispatch]);

  // Filter products based on search and filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.sku.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    const matchesBrand = brandFilter === "all" || product.brand === brandFilter;
    const matchesStatus =
      statusFilter === "all" || product.status === statusFilter;

    return matchesSearch && matchesCategory && matchesBrand && matchesStatus;
  });

  // Calculate pagination values
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Reset to first page when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, categoryFilter, brandFilter, statusFilter]);

  const handleRefresh = () => {
    dispatch(fetchMasterProducts());
  };

  const handleEdit = (product: MasterProduct) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleDelete = (product: MasterProduct) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const handleView = (product: MasterProduct) => {
    setSelectedProduct(product);
    setShowViewModal(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Product Configuration
              </h1>
              <p className="text-emerald-100 text-lg">
                Manage master product catalog
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
                <span>Add Product</span>
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
                  Total Products
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {products.length}
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <FiPackage className="text-emerald-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-emerald-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Active</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {products.filter((p) => p.status === "Active").length}
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <FiPackage className="text-emerald-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Inactive</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {products.filter((p) => p.status === "Inactive").length}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <FiPackage className="text-red-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Categories</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {categories.length}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FiTag className="text-blue-600 text-xl" />
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
                  placeholder="Search products..."
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
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FiFilter className="h-4 w-4" />
                </div>
              </div>
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  value={brandFilter}
                  onChange={(e) => setBrandFilter(e.target.value)}
                >
                  <option value="all">All Brands</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FiFilter className="h-4 w-4" />
                </div>
              </div>
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
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

        {/* Products Table */}
        {status === "loading" ? (
          <div className="flex justify-center items-center py-20 bg-white rounded-xl shadow-lg">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-800">
                Products ({filteredProducts.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SKU
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Brand
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Commission
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentProducts.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center">
                          <div className="bg-gray-100 p-4 rounded-full mb-4">
                            <FiPackage className="h-12 w-12 text-gray-400" />
                          </div>
                          <h3 className="mt-2 text-lg font-medium text-gray-900">
                            {filteredProducts.length === 0
                              ? "No products found"
                              : "No products on this page"}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto">
                            {search
                              ? "Try adjusting your search to find what you're looking for"
                              : filteredProducts.length === 0
                              ? "Get started by adding a new product"
                              : "Try a different page"}
                          </p>
                          {!search && filteredProducts.length === 0 && (
                            <button
                              onClick={() => setShowAddModal(true)}
                              className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-2 mx-auto"
                            >
                              <FiPlus className="text-lg" />
                              <span>Add Product</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentProducts.map((product) => (
                      <tr
                        key={product.id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-lg object-cover"
                                src={product.image}
                                alt={product.name}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {product.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {product.unit}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {product.sku}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {product.category}
                          </div>
                          <div className="text-sm text-gray-500">
                            {product.subcategory}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {product.brand}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            ${product.price.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {product.commission}%
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                              product.status
                            )}`}
                          >
                            {product.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleView(product)}
                            className="text-emerald-600 hover:text-emerald-900 mr-3 transition-colors duration-150 p-1 rounded-full hover:bg-emerald-50"
                            title="View"
                          >
                            <FiEye className="text-lg" />
                          </button>
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-emerald-600 hover:text-emerald-900 mr-3 transition-colors duration-150 p-1 rounded-full hover:bg-emerald-50"
                            title="Edit"
                          >
                            <FiEdit2 className="text-lg" />
                          </button>
                          <button
                            onClick={() => handleDelete(product)}
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
          <AddProductModal onClose={() => setShowAddModal(false)} />
        )}
        {showEditModal && selectedProduct && (
          <EditProductModal
            product={selectedProduct}
            onClose={() => {
              setSelectedProduct(null);
              setShowEditModal(false);
            }}
          />
        )}
        {showDeleteModal && selectedProduct && (
          <DeleteProductModal
            product={selectedProduct}
            onClose={() => {
              setSelectedProduct(null);
              setShowDeleteModal(false);
            }}
          />
        )}
        {showViewModal && selectedProduct && (
          <ViewProductModal
            product={selectedProduct}
            onClose={() => {
              setSelectedProduct(null);
              setShowViewModal(false);
            }}
            onEdit={(product) => {
              setSelectedProduct(product);
              setShowViewModal(false);
              setShowEditModal(true);
            }}
          />
        )}
      </div>
    </div>
  );
}
