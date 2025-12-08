// // src/modules/shop/tags/pages/ViewProductsPage.tsx
// import React, { useState, useMemo } from "react";
// import { useAppSelector } from "../../../../store/hooks";
// import { Tag } from "../tagsSlice";
// import {
//   FiX,
//   FiPackage,
//   FiSearch,
//   FiChevronLeft,
//   FiChevronRight,
// } from "react-icons/fi";
// import { useNavigate, useParams } from "react-router-dom";

// export default function ViewProductsPage() {
//   const navigate = useNavigate();
//   const { id } = useParams<{ id: string }>();
//   const { tags } = useAppSelector((state) => state.tags);

//   const [tag, setTag] = useState<Tag | null>(null);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 9; // Number of products to show per page

//   useEffect(() => {
//     if (id && tags.length > 0) {
//       const foundTag = tags.find((t) => t.id === id);
//       if (foundTag) {
//         setTag(foundTag);
//       }
//     }
//   }, [id, tags]);

//   // Filter products based on search query
//   const filteredProducts = useMemo(() => {
//     if (!tag) return [];

//     if (!search.trim()) return tag.products;

//     const searchLower = search.toLowerCase();
//     return tag.products.filter(
//       (product) =>
//         product.name.toLowerCase().includes(searchLower) ||
//         product.sku.toLowerCase().includes(searchLower)
//     );
//   }, [search, tag]);

//   // Calculate pagination values
//   const totalProducts = filteredProducts.length;
//   const totalPages = Math.ceil(totalProducts / productsPerPage);

//   // Get current page products
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = filteredProducts.slice(
//     indexOfFirstProduct,
//     indexOfLastProduct
//   );

//   // Reset to first page when search changes
//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearch(e.target.value);
//     setCurrentPage(1);
//   };

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   const goToPreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const goToNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   if (!tag) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#258440]"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-[#258440] to-[#1E803A] text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
//           <h2 className="text-xl font-semibold flex items-center gap-2">
//             <FiPackage className="text-xl" />
//             Products for "{tag.name}" Tag
//           </h2>
//           <button
//             onClick={() => navigate("/tags")}
//             className="text-white hover:text-gray-200"
//           >
//             <FiX className="text-xl" />
//           </button>
//         </div>

//         {/* Breadcrumb Navigation */}
//         <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
//           <nav className="flex items-center text-sm">
//             <a href="/tags" className="text-gray-500 hover:text-gray-700 flex items-center">
//               <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l2-2m-2 2l-2 2m0 0l2-2" />
//               </svg>
//               Home
//             </a>
//             <span className="mx-2 text-gray-400">/</span>
//             <a href="/tags" className="text-gray-500 hover:text-gray-700">
//               Tags
//             </a>
//             <span className="mx-2 text-gray-400">/</span>
//             <span className="text-gray-700 font-medium">{tag.name}</span>
//           </nav>
//         </div>

//         {/* Stats Cards */}
//         <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-gray-500 text-sm">Total Products</p>
//                   <p className="text-2xl font-bold text-gray-900">
//                     {tag.products.length}
//                   </p>
//                 </div>
//                 <div className="bg-blue-100 p-3 rounded-full">
//                   <FiPackage className="text-blue-600 text-xl" />
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-gray-500 text-sm">Average Price</p>
//                   <p className="text-2xl font-bold text-gray-900">
//                     ${(tag.products.reduce((sum, product) => sum + product.price, 0) / tag.products.length).toFixed(2)}
//                   </p>
//                 </div>
//                 <div className="bg-green-100 p-3 rounded-full">
//                   <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3-1.343-3-3-3 1.343 0 3 1.343 3 3zm0 6c0 1.657 1.343 3 3 3 3-1.343 0-3-3-3z" />
//                   </svg>
//                 </div>
//               </div>
//             </div>
//             </div>
//             <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-gray-500 text-sm">Total Value</p>
//                   <p className="text-2xl font-bold text-gray-900">
//                     ${tag.products.reduce((sum, product) => sum + product.price, 0).toFixed(2)}
//                   </p>
//                 </div>
//                 <div className="bg-purple-100 p-3 rounded-full">
//                   <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0l-3-3-3-3-3 0 0 0 0-3 3-3m0 6c0 1.657 1.343 3 3 3 3-1.343 0-3-3-3z" />
//                   </svg>
//                 </div>
//               </div>
//             </div>
//             </div>
//             <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-gray-500 text-sm">Usage Count</p>
//                   <p className="text-2xl font-bold text-gray-900">
//                     {tag.usageCount}
//                   </p>
//                 </div>
//                 <div className="bg-orange-100 p-3 rounded-full">
//                   <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 00-3 3 0 0 0-3 3 0 0 0 0-3 3m0 6a3 3 0 00-3 3 0 0 0 0-3 3-3m0 6c0 1.657 1.343 3 3 3 3-1.343 0-3-3-3z" />
//                   </svg>
//                 </div>
//               </div>
//             </div>
//             </div>
//           </div>
//         </div>

//         {/* Search Bar and Product Count */}
//         <div className="px-6 py-4 bg-white border-b border-gray-200">
//           <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
//             <div className="relative w-full sm:w-64">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FiSearch className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent"
//                 value={search}
//                 onChange={handleSearchChange}
//               />
//             </div>
//             <div className="text-sm text-gray-500">
//               Showing {indexOfFirstProduct + 1}-
//               {Math.min(indexOfLastProduct, totalProducts)} of{" "}
//               {totalProducts} products
//             </div>
//           </div>
//         </div>

//         {/* Products Grid */}
//         {tag.products.length === 0 ? (
//           <div className="px-6 py-12 bg-white">
//             <div className="text-center py-12">
//               <div className="bg-gray-100 p-4 rounded-full inline-flex mb-4">
//                 <FiPackage className="h-12 w-12 text-gray-400" />
//               </div>
//               <h3 className="text-lg font-medium text-gray-900 mb-2">
//                 No products found
//               </h3>
//               <p className="text-gray-500">
//                 This tag doesn't have any products associated with it.
//               </p>
//             </div>
//           </div>
//         ) : (
//           <>
//             {currentProducts.length === 0 ? (
//               <div className="px-6 py-12 bg-white">
//                 <div className="text-center py-12">
//                   <div className="bg-gray-100 p-4 rounded-full inline-flex mb-4">
//                     <FiSearch className="h-12 w-12 text-gray-400" />
//                   </div>
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">
//                     No products found
//                   </h3>
//                   <p className="text-gray-500">
//                     Try adjusting your search to find what you're looking for.
//                   </p>
//                 </div>
//               </div>
//             ) : (
//               <div className="px-6 py-4 bg-white">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {currentProducts.map((product) => (
//                     <div
//                       key={product.id}
//                       className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
//                     >
//                       <div className="h-48 overflow-hidden">
//                         <img
//                           src={product.image}
//                           alt={product.name}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                       <div className="p-4">
//                         <h3 className="font-medium text-gray-900 mb-1 truncate">
//                           {product.name}
//                         </h3>
//                         <p className="text-sm text-gray-500 mb-2">
//                           SKU: {product.sku}
//                         </p>
//                         <div className="flex justify-between items-center">
//                           <span className="text-lg font-bold text-gray-900">
//                             ${product.price.toFixed(2)}
//                           </span>
//                           <button className="px-3 py-1 bg-[#258440] text-white text-sm rounded hover:bg-[#1E803A] transition-colors duration-200">
//                             View Details
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
//                 <div className="flex items-center justify-between">
//                   <div className="text-sm text-gray-700">
//                     Page {currentPage} of {totalPages}
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={goToPreviousPage}
//                       disabled={currentPage === 1}
//                       className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//                       aria-label="Previous page"
//                     >
//                       <FiChevronLeft className="h-5 w-5" />
//                     </button>

//                     {/* Page Numbers */}
//                     <div className="flex items-center gap-1">
//                       {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
//                         let pageNum;
//                         if (totalPages <= 5) {
//                           pageNum = i + 1;
//                         } else if (currentPage <= 3) {
//                           pageNum = i + 1;
//                         } else if (currentPage >= totalPages - 2) {
//                           pageNum = totalPages - 4 + i;
//                         } else {
//                           pageNum = currentPage - 2 + i;
//                         }

//                         return (
//                           <button
//                             key={pageNum}
//                             onClick={() => handlePageChange(pageNum)}
//                             className={`w-8 h-8 rounded-md flex items-center justify-center text-sm ${
//                               currentPage === pageNum
//                                 ? "bg-[#258440] text-white"
//                                 : "border border-gray-300 hover:bg-gray-100"
//                             }`}
//                           >
//                             {pageNum}
//                           </button>
//                         );
//                       })}
//                     </div>

//                     <button
//                       onClick={goToNextPage}
//                       disabled={currentPage === totalPages}
//                       className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//                       aria-label="Next page"
//                     >
//                       <FiChevronRight className="h-5 w-5" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
