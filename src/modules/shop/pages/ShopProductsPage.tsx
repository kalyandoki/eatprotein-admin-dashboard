// // // import React, { useState } from "react";
// // // import { useSelector, useDispatch } from "react-redux";
// // // import { RootState, AppDispatch } from "../../../store";
// // // import {
// // //   ShopProduct,
// // //   addShopProduct,
// // //   editShopProduct,
// // //   deleteShopProduct,
// // // } from "../shopSlice";
// // // import ShopProductModal from "../components/ShopProductModal";
// // // import { FaTrash, FaEdit } from "react-icons/fa";

// // // const ShopProductsPage: React.FC = () => {
// // //   const dispatch = useDispatch<AppDispatch>();
// // //   const { products } = useSelector((state: RootState) => state.shop);

// // //   const [search, setSearch] = useState("");
// // //   const [category, setCategory] = useState("");
// // //   const [subCategory, setSubCategory] = useState("");
// // //   const [modalOpen, setModalOpen] = useState(false);
// // //   const [editProduct, setEditProduct] = useState<ShopProduct | undefined>(
// // //     undefined
// // //   );
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const perPage = 5;

// // //   const filteredProducts = products.filter(
// // //     (p) =>
// // //       p.name.toLowerCase().includes(search.toLowerCase()) &&
// // //       (category ? p.category === category : true) &&
// // //       (subCategory ? p.subCategory === subCategory : true)
// // //   );

// // //   const paginatedProducts = filteredProducts.slice(
// // //     (currentPage - 1) * perPage,
// // //     currentPage * perPage
// // //   );
// // //   const totalPages = Math.ceil(filteredProducts.length / perPage);

// // //   const handleSave = (product: ShopProduct) => {
// // //     if (products.find((p) => p.id === product.id))
// // //       dispatch(editShopProduct(product));
// // //     else dispatch(addShopProduct(product));
// // //   };

// // //   return (
// // //     <div className="p-6">
// // //       <h1 className="text-xl font-bold mb-2">Shop Products</h1>
// // //       <p className="text-gray-500 mb-6">Manage products for Shop Module</p>

// // //       <div className="flex flex-wrap gap-4 mb-6">
// // //         <button
// // //           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// // //           onClick={() => {
// // //             setEditProduct(undefined);
// // //             setModalOpen(true);
// // //           }}
// // //         >
// // //           Add Shop Product
// // //         </button>
// // //         <input
// // //           placeholder="Search Product"
// // //           value={search}
// // //           onChange={(e) => setSearch(e.target.value)}
// // //           className="border p-2 rounded"
// // //         />
// // //         <input
// // //           placeholder="Category"
// // //           value={category}
// // //           onChange={(e) => setCategory(e.target.value)}
// // //           className="border p-2 rounded"
// // //         />
// // //         <input
// // //           placeholder="Sub Category"
// // //           value={subCategory}
// // //           onChange={(e) => setSubCategory(e.target.value)}
// // //           className="border p-2 rounded"
// // //         />
// // //       </div>

// // //       <table className="w-full table-auto border-collapse border border-gray-200">
// // //         <thead>
// // //           <tr className="bg-gray-100">
// // //             <th className="border p-2">Id</th>
// // //             <th className="border p-2">Image</th>
// // //             <th className="border p-2">Name</th>
// // //             <th className="border p-2">Price / Stock</th>
// // //             <th className="border p-2">Actions</th>
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {paginatedProducts.map((p) => (
// // //             <tr key={p.id}>
// // //               <td className="border p-2">{p.id}</td>
// // //               <td className="border p-2">
// // //                 <img
// // //                   src={p.image}
// // //                   alt={p.name}
// // //                   className="h-16 w-16 object-cover rounded"
// // //                 />
// // //               </td>
// // //               <td className="border p-2">
// // //                 <div className="font-semibold">{p.name}</div>
// // //                 <div className="text-gray-500 text-sm">{p.description}</div>
// // //               </td>
// // //               <td className="border p-2">
// // //                 <div>₹{p.price}</div>
// // //                 <div>Stock: {p.stock}</div>
// // //               </td>
// // //               <td className="border p-2 flex gap-2">
// // //                 <button
// // //                   onClick={() => {
// // //                     setEditProduct(p);
// // //                     setModalOpen(true);
// // //                   }}
// // //                   className="text-blue-500 hover:text-blue-700"
// // //                 >
// // //                   <FaEdit />
// // //                 </button>
// // //                 <button
// // //                   onClick={() => dispatch(deleteShopProduct(p.id))}
// // //                   className="text-red-500 hover:text-red-700"
// // //                 >
// // //                   <FaTrash />
// // //                 </button>
// // //               </td>
// // //             </tr>
// // //           ))}
// // //         </tbody>
// // //       </table>

// // //       {/* Pagination */}
// // //       <div className="flex justify-end gap-2 mt-4">
// // //         {Array.from({ length: totalPages }, (_, i) => (
// // //           <button
// // //             key={i}
// // //             className={`px-3 py-1 border rounded ${
// // //               currentPage === i + 1 ? "bg-blue-500 text-white" : ""
// // //             }`}
// // //             onClick={() => setCurrentPage(i + 1)}
// // //           >
// // //             {i + 1}
// // //           </button>
// // //         ))}
// // //       </div>

// // //       {/* Modal */}
// // //       <ShopProductModal
// // //         isOpen={modalOpen}
// // //         onClose={() => setModalOpen(false)}
// // //         onSave={handleSave}
// // //         product={editProduct}
// // //       />
// // //     </div>
// // //   );
// // // };

// // // export default ShopProductsPage;

// // // // src/modules/shop/pages/ShopProductsPage.tsx
// // // import React, { useState, useMemo } from "react";
// // // import { useSelector, useDispatch } from "react-redux";
// // // import { RootState, AppDispatch } from "../../../store";
// // // import {
// // //   ShopProduct,
// // //   addShopProduct,
// // //   editShopProduct,
// // //   deleteShopProduct,
// // //   fetchProducts,
// // // } from "../shopSlice";
// // // import ShopProductModal from "../components/ShopProductModal";
// // // import Pagination from "../../../components/common/Pagination";
// // // import ProductCard from "../components/ProductCard";
// // // import SkeletonLoader from "../components/SkeletonLoader";
// // // import {
// // //   FaTrash,
// // //   FaPlus,
// // //   FaSearch,
// // //   FaTimes,
// // //   FaTh,
// // //   FaList,
// // //   FaBox,
// // //   FaCheckSquare,
// // //   FaSquare,
// // //   FaEdit,
// // // } from "react-icons/fa";

// // // const ShopProductsPage: React.FC = () => {
// // //   const dispatch = useDispatch<AppDispatch>();
// // //   const { products, status } = useSelector((state: RootState) => state.shop);

// // //   // State for filters, pagination, and bulk actions
// // //   const [search, setSearch] = useState("");
// // //   const [category, setCategory] = useState("all");
// // //   const [subCategory, setSubCategory] = useState("all");
// // //   const [modalOpen, setModalOpen] = useState(false);
// // //   const [editProduct, setEditProduct] = useState<ShopProduct | undefined>(
// // //     undefined
// // //   );
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const [viewMode, setViewMode] = useState<"table" | "card">("card");
// // //   const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
// // //   const perPage = 5;

// // //   // Get unique categories and sub-categories
// // //   const categories = useMemo(
// // //     () => ["all", ...Array.from(new Set(products.map((p) => p.category)))],
// // //     [products]
// // //   );
// // //   const subCategories = useMemo(
// // //     () => ["all", ...Array.from(new Set(products.map((p) => p.subCategory)))],
// // //     [products]
// // //   );

// // //   // Filter products
// // //   const filteredProducts = useMemo(
// // //     () =>
// // //       products.filter(
// // //         (p) =>
// // //           p.name.toLowerCase().includes(search.toLowerCase()) &&
// // //           (category !== "all" ? p.category === category : true) &&
// // //           (subCategory !== "all" ? p.subCategory === subCategory : true)
// // //       ),
// // //     [products, search, category, subCategory]
// // //   );

// // //   // Paginate filtered products
// // //   const paginatedProducts = useMemo(
// // //     () =>
// // //       filteredProducts.slice(
// // //         (currentPage - 1) * perPage,
// // //         currentPage * perPage
// // //       ),
// // //     [filteredProducts, currentPage, perPage]
// // //   );
// // //   const totalPages = Math.ceil(filteredProducts.length / perPage);

// // //   // --- Handlers ---
// // //   const handleSave = (product: ShopProduct) => {
// // //     if (editProduct) {
// // //       dispatch(editShopProduct(product));
// // //     } else {
// // //       dispatch(addShopProduct(product));
// // //     }
// // //     setSelectedProducts([]); // Clear selection on save
// // //   };

// // //   const handleDelete = (id: number) => {
// // //     if (window.confirm("Are you sure you want to delete this product?")) {
// // //       dispatch(deleteShopProduct(id));
// // //       setSelectedProducts((prev) => prev.filter((pId) => pId !== id));
// // //     }
// // //   };

// // //   const handleBulkDelete = () => {
// // //     if (selectedProducts.length === 0) return;
// // //     if (
// // //       window.confirm(
// // //         `Are you sure you want to delete ${selectedProducts.length} selected products?`
// // //       )
// // //     ) {
// // //       selectedProducts.forEach((id) => dispatch(deleteShopProduct(id)));
// // //       setSelectedProducts([]);
// // //     }
// // //   };

// // //   const openModal = (product?: ShopProduct) => {
// // //     setEditProduct(product);
// // //     setModalOpen(true);
// // //   };

// // //   const clearFilters = () => {
// // //     setSearch("");
// // //     setCategory("all");
// // //     setSubCategory("all");
// // //     setCurrentPage(1);
// // //   };

// // //   const toggleSelectProduct = (id: number) => {
// // //     setSelectedProducts((prev) =>
// // //       prev.includes(id) ? prev.filter((pId) => pId !== id) : [...prev, id]
// // //     );
// // //   };

// // //   const toggleSelectAll = () => {
// // //     if (selectedProducts.length === paginatedProducts.length) {
// // //       setSelectedProducts([]);
// // //     } else {
// // //       setSelectedProducts(paginatedProducts.map((p) => p.id));
// // //     }
// // //   };

// // //   // --- Effects ---
// // //   React.useEffect(() => {
// // //     if (status === "idle") {
// // //       dispatch(fetchProducts());
// // //     }
// // //   }, [status, dispatch]);

// // //   if (status === "loading") {
// // //     return <SkeletonLoader />;
// // //   }

// // //   return (
// // //     <div className="bg-gray-50 min-h-screen">
// // //       <div className="max-w-7xl mx-auto p-6">
// // //         {/* Header Section */}
// // //         <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
// // //           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// // //             <div>
// // //               <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
// // //                 <FaBox className="text-[#258440]" />
// // //                 Shop Products
// // //               </h1>
// // //               <p className="text-gray-600 mt-1">
// // //                 Manage and view all products in the shop
// // //               </p>
// // //             </div>
// // //             <button
// // //               className="flex items-center gap-2 bg-[#258440] text-white px-6 py-3 rounded-lg hover:bg-[#1E803A] transition-colors shadow-md self-start sm:self-auto"
// // //               onClick={() => openModal()}
// // //             >
// // //               <FaPlus /> Add Product
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* Filters Section */}
// // //         <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
// // //           <div className="flex flex-col lg:flex-row gap-4">
// // //             <div className="flex-1">
// // //               <div className="relative">
// // //                 <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
// // //                 <input
// // //                   type="text"
// // //                   placeholder="Search products..."
// // //                   value={search}
// // //                   onChange={(e) => setSearch(e.target.value)}
// // //                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#258440] focus:border-transparent"
// // //                 />
// // //               </div>
// // //             </div>
// // //             <div className="flex gap-2 flex-wrap">
// // //               <select
// // //                 value={category}
// // //                 onChange={(e) => setCategory(e.target.value)}
// // //                 className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#258440] focus:border-transparent"
// // //               >
// // //                 {categories.map((cat) => (
// // //                   <option key={cat} value={cat}>
// // //                     {cat === "all" ? "All Categories" : cat}
// // //                   </option>
// // //                 ))}
// // //               </select>
// // //               <select
// // //                 value={subCategory}
// // //                 onChange={(e) => setSubCategory(e.target.value)}
// // //                 className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#258440] focus:border-transparent"
// // //               >
// // //                 {subCategories.map((sub) => (
// // //                   <option key={sub} value={sub}>
// // //                     {sub === "all" ? "All Sub-Categories" : sub}
// // //                   </option>
// // //                 ))}
// // //               </select>
// // //               <button
// // //                 className="flex items-center gap-2 text-gray-600 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
// // //                 onClick={clearFilters}
// // //               >
// // //                 <FaTimes /> Clear
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Main Content Area */}
// // //         <div className="bg-white rounded-xl shadow-sm overflow-hidden">
// // //           {/* View Toggle and Bulk Actions */}
// // //           <div className="p-4 border-b flex items-center justify-between">
// // //             <div className="flex items-center gap-4">
// // //               <button
// // //                 onClick={toggleSelectAll}
// // //                 className="text-gray-600 hover:text-[#258440] transition-colors"
// // //                 title="Select All"
// // //               >
// // //                 {selectedProducts.length === paginatedProducts.length &&
// // //                 paginatedProducts.length > 0 ? (
// // //                   <FaCheckSquare />
// // //                 ) : (
// // //                   <FaSquare />
// // //                 )}
// // //               </button>
// // //               {selectedProducts.length > 0 && (
// // //                 <button
// // //                   onClick={handleBulkDelete}
// // //                   className="flex items-center gap-2 text-[#D7201A] hover:text-[#D51711] transition-colors"
// // //                 >
// // //                   <FaTrash /> Delete Selected ({selectedProducts.length})
// // //                 </button>
// // //               )}
// // //             </div>
// // //             <div className="flex gap-2">
// // //               <button
// // //                 className={`p-2 rounded ${
// // //                   viewMode === "card"
// // //                     ? "bg-[#258440] text-white"
// // //                     : "bg-white text-gray-600 border border-gray-300"
// // //                 }`}
// // //                 onClick={() => setViewMode("card")}
// // //               >
// // //                 <FaTh />
// // //               </button>
// // //               <button
// // //                 className={`p-2 rounded ${
// // //                   viewMode === "table"
// // //                     ? "bg-[#258440] text-white"
// // //                     : "bg-white text-gray-600 border border-gray-300"
// // //                 }`}
// // //                 onClick={() => setViewMode("table")}
// // //               >
// // //                 <FaList />
// // //               </button>
// // //             </div>
// // //           </div>

// // //           {/* Products Display */}
// // //           {paginatedProducts.length > 0 ? (
// // //             <>
// // //               {viewMode === "card" ? (
// // //                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
// // //                   {paginatedProducts.map((p) => (
// // //                     <ProductCard
// // //                       key={p.id}
// // //                       product={p}
// // //                       isSelected={selectedProducts.includes(p.id)}
// // //                       onToggleSelect={() => toggleSelectProduct(p.id)}
// // //                       onEdit={() => openModal(p)}
// // //                       onDelete={() => handleDelete(p.id)}
// // //                     />
// // //                   ))}
// // //                 </div>
// // //               ) : (
// // //                 <div className="overflow-x-auto">
// // //                   <table className="w-full">
// // //                     <thead className="bg-gray-50">
// // //                       <tr>
// // //                         <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                           <input
// // //                             type="checkbox"
// // //                             className="w-5 h-5 text-[#258440] bg-white border-gray-300 rounded focus:ring-[#258440]"
// // //                             checked={
// // //                               selectedProducts.length ===
// // //                                 paginatedProducts.length &&
// // //                               paginatedProducts.length > 0
// // //                             }
// // //                             onChange={toggleSelectAll}
// // //                           />
// // //                         </th>
// // //                         <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                           Product
// // //                         </th>
// // //                         <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                           Price / Stock
// // //                         </th>
// // //                         <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                           Category
// // //                         </th>
// // //                         <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                           Nutrition
// // //                         </th>
// // //                         <th className="p-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                           Actions
// // //                         </th>
// // //                       </tr>
// // //                     </thead>
// // //                     <tbody className="divide-y divide-gray-200">
// // //                       {paginatedProducts.map((p) => (
// // //                         <tr key={p.id} className="hover:bg-gray-50">
// // //                           <td className="p-3">
// // //                             <input
// // //                               type="checkbox"
// // //                               className="w-5 h-5 text-[#258440] bg-white border-gray-300 rounded focus:ring-[#258440]"
// // //                               checked={selectedProducts.includes(p.id)}
// // //                               onChange={() => toggleSelectProduct(p.id)}
// // //                             />
// // //                           </td>
// // //                           <td className="p-3">
// // //                             <div className="flex items-center">
// // //                               <img
// // //                                 src={p.image}
// // //                                 alt={p.name}
// // //                                 className="h-16 w-16 object-cover rounded-md mr-4"
// // //                               />
// // //                               <div>
// // //                                 <div className="font-semibold text-gray-800">
// // //                                   {p.name}
// // //                                 </div>
// // //                                 <div className="text-sm text-gray-500">
// // //                                   {p.description}
// // //                                 </div>
// // //                               </div>
// // //                             </div>
// // //                           </td>
// // //                           <td className="p-3">
// // //                             <div className="font-semibold text-gray-800">
// // //                               ₹{p.price}
// // //                             </div>
// // //                             <div className="text-sm text-gray-500">
// // //                               Stock: {p.stock}
// // //                             </div>
// // //                           </td>
// // //                           <td className="p-3 text-sm text-gray-500">
// // //                             {p.category} / {p.subCategory}
// // //                           </td>
// // //                           <td className="p-3 text-sm text-gray-700">
// // //                             <div className="grid grid-cols-2 gap-2">
// // //                               <div>
// // //                                 Calories:{" "}
// // //                                 <strong>{p.nutrition.calories}</strong>
// // //                               </div>
// // //                               <div>
// // //                                 Fat: <strong>{p.nutrition.fat}g</strong>
// // //                               </div>
// // //                               <div>
// // //                                 Carbs: <strong>{p.nutrition.carb}g</strong>
// // //                               </div>
// // //                               <div>
// // //                                 Protein:{" "}
// // //                                 <strong className="text-[#258440]">
// // //                                   {p.nutrition.protein}g
// // //                                 </strong>
// // //                               </div>
// // //                             </div>
// // //                           </td>
// // //                           <td className="p-3 text-right">
// // //                             <button
// // //                               onClick={() => openModal(p)}
// // //                               className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-100 transition-colors"
// // //                               title="Edit"
// // //                             >
// // //                               <FaEdit />
// // //                             </button>
// // //                             <button
// // //                               onClick={() => handleDelete(p.id)}
// // //                               className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition-colors ml-2"
// // //                               title="Delete"
// // //                             >
// // //                               <FaTrash />
// // //                             </button>
// // //                           </td>
// // //                         </tr>
// // //                       ))}
// // //                     </tbody>
// // //                   </table>
// // //                 </div>
// // //               )}
// // //             </>
// // //           ) : (
// // //             <div className="p-12 text-center">
// // //               <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
// // //                 <FaBox className="text-gray-400 text-2xl" />
// // //               </div>
// // //               <h3 className="text-lg font-medium text-gray-900 mb-2">
// // //                 No products found
// // //               </h3>
// // //               <p className="text-gray-500 mb-6">
// // //                 Try adjusting your search or filter criteria, or add a new
// // //                 product.
// // //               </p>
// // //               <button
// // //                 className="bg-[#258440] text-white px-6 py-2 rounded-lg hover:bg-[#1E803A] transition-colors"
// // //                 onClick={() => openModal()}
// // //               >
// // //                 Add Your First Product
// // //               </button>
// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* Pagination Component */}
// // //         {totalPages > 1 && (
// // //           <div className="mt-6">
// // //             <Pagination
// // //               currentPage={currentPage}
// // //               totalPages={totalPages}
// // //               onPageChange={setCurrentPage}
// // //               totalItems={filteredProducts.length}
// // //               perPage={perPage}
// // //             />
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* Modal */}
// // //       <ShopProductModal
// // //         isOpen={modalOpen}
// // //         onClose={() => setModalOpen(false)}
// // //         onSave={handleSave}
// // //         product={editProduct}
// // //       />
// // //     </div>
// // //   );
// // // };

// // // export default ShopProductsPage;

// // // // src/modules/shop/pages/ShopProductsPage.tsx
// // // import React, { useState, useMemo } from "react";
// // // import { useSelector, useDispatch } from "react-redux";
// // // import { RootState, AppDispatch } from "../../../store";
// // // import {
// // //   ShopProduct,
// // //   addShopProduct,
// // //   editShopProduct,
// // //   deleteShopProduct,
// // //   fetchProducts,
// // // } from "../shopSlice";
// // // import ShopProductModal from "../components/ShopProductModal";
// // // import Pagination from "../../../components/common/Pagination";
// // // import ProductCard from "../components/ProductCard";
// // // import SkeletonLoader from "../components/SkeletonLoader";
// // // import {
// // //   FaTrash,
// // //   FaPlus,
// // //   FaSearch,
// // //   FaTimes,
// // //   FaTh,
// // //   FaList,
// // //   FaBox,
// // //   FaCheckSquare,
// // //   FaSquare,
// // //   FaEdit,
// // //   FaFilter,
// // //   FaSortAmountDown,
// // //   FaChartBar,
// // //   FaStar,
// // // } from "react-icons/fa";

// // // const ShopProductsPage: React.FC = () => {
// // //   const dispatch = useDispatch<AppDispatch>();
// // //   const { products, status } = useSelector((state: RootState) => state.shop);

// // //   // State for filters, pagination, and bulk actions
// // //   const [search, setSearch] = useState("");
// // //   const [category, setCategory] = useState("all");
// // //   const [subCategory, setSubCategory] = useState("all");
// // //   const [modalOpen, setModalOpen] = useState(false);
// // //   const [editProduct, setEditProduct] = useState<ShopProduct | undefined>(
// // //     undefined
// // //   );
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const [viewMode, setViewMode] = useState<"table" | "card">("card");
// // //   const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
// // //   const [sortBy, setSortBy] = useState("name");
// // //   const [filterOpen, setFilterOpen] = useState(false);
// // //   const perPage = 8; // Increased for better card view

// // //   // Get unique categories and sub-categories
// // //   const categories = useMemo(
// // //     () => ["all", ...Array.from(new Set(products.map((p) => p.category)))],
// // //     [products]
// // //   );
// // //   const subCategories = useMemo(
// // //     () => ["all", ...Array.from(new Set(products.map((p) => p.subCategory)))],
// // //     [products]
// // //   );

// // //   // Filter and sort products
// // //   const filteredProducts = useMemo(() => {
// // //     let filtered = products.filter(
// // //       (p) =>
// // //         p.name.toLowerCase().includes(search.toLowerCase()) &&
// // //         (category !== "all" ? p.category === category : true) &&
// // //         (subCategory !== "all" ? p.subCategory === subCategory : true)
// // //     );

// // //     // Apply sorting
// // //     filtered.sort((a, b) => {
// // //       if (sortBy === "name") return a.name.localeCompare(b.name);
// // //       if (sortBy === "price") return a.price - b.price;
// // //       if (sortBy === "stock") return b.stock - a.stock;
// // //       return 0;
// // //     });

// // //     return filtered;
// // //   }, [products, search, category, subCategory, sortBy]);

// // //   // Paginate filtered products
// // //   const paginatedProducts = useMemo(
// // //     () =>
// // //       filteredProducts.slice(
// // //         (currentPage - 1) * perPage,
// // //         currentPage * perPage
// // //       ),
// // //     [filteredProducts, currentPage, perPage]
// // //   );
// // //   const totalPages = Math.ceil(filteredProducts.length / perPage);

// // //   // --- Handlers ---
// // //   const handleSave = (product: ShopProduct) => {
// // //     if (editProduct) {
// // //       dispatch(editShopProduct(product));
// // //     } else {
// // //       dispatch(addShopProduct(product));
// // //     }
// // //     setSelectedProducts([]);
// // //   };

// // //   const handleDelete = (id: number) => {
// // //     if (window.confirm("Are you sure you want to delete this product?")) {
// // //       dispatch(deleteShopProduct(id));
// // //       setSelectedProducts((prev) => prev.filter((pId) => pId !== id));
// // //     }
// // //   };

// // //   const handleBulkDelete = () => {
// // //     if (selectedProducts.length === 0) return;
// // //     if (
// // //       window.confirm(
// // //         `Are you sure you want to delete ${selectedProducts.length} selected products?`
// // //       )
// // //     ) {
// // //       selectedProducts.forEach((id) => dispatch(deleteShopProduct(id)));
// // //       setSelectedProducts([]);
// // //     }
// // //   };

// // //   const openModal = (product?: ShopProduct) => {
// // //     setEditProduct(product);
// // //     setModalOpen(true);
// // //   };

// // //   const clearFilters = () => {
// // //     setSearch("");
// // //     setCategory("all");
// // //     setSubCategory("all");
// // //     setCurrentPage(1);
// // //   };

// // //   const toggleSelectProduct = (id: number) => {
// // //     setSelectedProducts((prev) =>
// // //       prev.includes(id) ? prev.filter((pId) => pId !== id) : [...prev, id]
// // //     );
// // //   };

// // //   const toggleSelectAll = () => {
// // //     if (selectedProducts.length === paginatedProducts.length) {
// // //       setSelectedProducts([]);
// // //     } else {
// // //       setSelectedProducts(paginatedProducts.map((p) => p.id));
// // //     }
// // //   };

// // //   // --- Effects ---
// // //   React.useEffect(() => {
// // //     if (status === "idle") {
// // //       dispatch(fetchProducts());
// // //     }
// // //   }, [status, dispatch]);

// // //   if (status === "loading") {
// // //     return <SkeletonLoader />;
// // //   }

// // //   return (
// // //     <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
// // //       <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
// // //         {/* Header Section with Stats */}
// // //         <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
// // //           <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6">
// // //             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// // //               <div>
// // //                 <h1 className="text-3xl font-bold text-white flex items-center gap-3">
// // //                   <FaBox className="text-white/90" />
// // //                   Shop Products
// // //                 </h1>
// // //                 <p className="text-white/80 mt-1">
// // //                   Manage and view all products in the shop
// // //                 </p>
// // //               </div>
// // //               <button
// // //                 className="flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition-all shadow-md transform hover:scale-105 self-start sm:self-auto"
// // //                 onClick={() => openModal()}
// // //               >
// // //                 <FaPlus /> Add Product
// // //               </button>
// // //             </div>
// // //           </div>

// // //           {/* Stats Cards */}
// // //           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white">
// // //             <div className="bg-gray-50 rounded-lg p-4 text-center">
// // //               <div className="text-2xl font-bold text-gray-800">
// // //                 {products.length}
// // //               </div>
// // //               <div className="text-sm text-gray-500">Total Products</div>
// // //             </div>
// // //             <div className="bg-gray-50 rounded-lg p-4 text-center">
// // //               <div className="text-2xl font-bold text-emerald-600">
// // //                 {filteredProducts.length}
// // //               </div>
// // //               <div className="text-sm text-gray-500">Filtered</div>
// // //             </div>
// // //             <div className="bg-gray-50 rounded-lg p-4 text-center">
// // //               <div className="text-2xl font-bold text-blue-600">
// // //                 {products.filter((p) => p.stock < 10).length}
// // //               </div>
// // //               <div className="text-sm text-gray-500">Low Stock</div>
// // //             </div>
// // //             <div className="bg-gray-50 rounded-lg p-4 text-center">
// // //               <div className="text-2xl font-bold text-purple-600">
// // //                 {categories.length - 1}
// // //               </div>
// // //               <div className="text-sm text-gray-500">Categories</div>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Filters Section */}
// // //         <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
// // //           <div className="flex items-center justify-between mb-4">
// // //             <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
// // //               <FaFilter className="text-emerald-600" />
// // //               Filters & Search
// // //             </h2>
// // //             <button
// // //               className="text-gray-500 hover:text-gray-700 md:hidden"
// // //               onClick={() => setFilterOpen(!filterOpen)}
// // //             >
// // //               {filterOpen ? <FaTimes /> : <FaFilter />}
// // //             </button>
// // //           </div>

// // //           <div className={`${filterOpen ? "block" : "hidden md:block"}`}>
// // //             <div className="flex flex-col lg:flex-row gap-4">
// // //               <div className="flex-1">
// // //                 <div className="relative">
// // //                   <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
// // //                   <input
// // //                     type="text"
// // //                     placeholder="Search products by name..."
// // //                     value={search}
// // //                     onChange={(e) => setSearch(e.target.value)}
// // //                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
// // //                   />
// // //                 </div>
// // //               </div>
// // //               <div className="flex gap-2 flex-wrap">
// // //                 <select
// // //                   value={category}
// // //                   onChange={(e) => setCategory(e.target.value)}
// // //                   className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white"
// // //                 >
// // //                   {categories.map((cat) => (
// // //                     <option key={cat} value={cat}>
// // //                       {cat === "all" ? "All Categories" : cat}
// // //                     </option>
// // //                   ))}
// // //                 </select>
// // //                 <select
// // //                   value={subCategory}
// // //                   onChange={(e) => setSubCategory(e.target.value)}
// // //                   className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white"
// // //                 >
// // //                   {subCategories.map((sub) => (
// // //                     <option key={sub} value={sub}>
// // //                       {sub === "all" ? "All Sub-Categories" : sub}
// // //                     </option>
// // //                   ))}
// // //                 </select>
// // //                 <select
// // //                   value={sortBy}
// // //                   onChange={(e) => setSortBy(e.target.value)}
// // //                   className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white flex items-center gap-2"
// // //                 >
// // //                   <option value="name">Sort by Name</option>
// // //                   <option value="price">Sort by Price</option>
// // //                   <option value="stock">Sort by Stock</option>
// // //                 </select>
// // //                 <button
// // //                   className="flex items-center gap-2 text-gray-600 px-4 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
// // //                   onClick={clearFilters}
// // //                 >
// // //                   <FaTimes /> Clear
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Main Content Area */}
// // //         <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
// // //           {/* View Toggle and Bulk Actions */}
// // //           <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
// // //             <div className="flex items-center gap-4">
// // //               <button
// // //                 onClick={toggleSelectAll}
// // //                 className="text-gray-600 hover:text-emerald-600 transition-colors p-2 rounded-lg hover:bg-white"
// // //                 title="Select All"
// // //               >
// // //                 {selectedProducts.length === paginatedProducts.length &&
// // //                 paginatedProducts.length > 0 ? (
// // //                   <FaCheckSquare className="text-xl" />
// // //                 ) : (
// // //                   <FaSquare className="text-xl" />
// // //                 )}
// // //               </button>
// // //               {selectedProducts.length > 0 && (
// // //                 <button
// // //                   onClick={handleBulkDelete}
// // //                   className="flex items-center gap-2 text-red-600 hover:text-red-700 bg-white px-3 py-2 rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
// // //                 >
// // //                   <FaTrash /> Delete Selected ({selectedProducts.length})
// // //                 </button>
// // //               )}
// // //             </div>
// // //             <div className="flex gap-2">
// // //               <button
// // //                 className={`p-2 rounded-lg transition-all ${
// // //                   viewMode === "card"
// // //                     ? "bg-emerald-600 text-white shadow-md"
// // //                     : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
// // //                 }`}
// // //                 onClick={() => setViewMode("card")}
// // //                 title="Card View"
// // //               >
// // //                 <FaTh />
// // //               </button>
// // //               <button
// // //                 className={`p-2 rounded-lg transition-all ${
// // //                   viewMode === "table"
// // //                     ? "bg-emerald-600 text-white shadow-md"
// // //                     : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
// // //                 }`}
// // //                 onClick={() => setViewMode("table")}
// // //                 title="Table View"
// // //               >
// // //                 <FaList />
// // //               </button>
// // //             </div>
// // //           </div>

// // //           {/* Products Display */}
// // //           {paginatedProducts.length > 0 ? (
// // //             <>
// // //               {viewMode === "card" ? (
// // //                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
// // //                   {paginatedProducts.map((p) => (
// // //                     <ProductCard
// // //                       key={p.id}
// // //                       product={p}
// // //                       isSelected={selectedProducts.includes(p.id)}
// // //                       onToggleSelect={() => toggleSelectProduct(p.id)}
// // //                       onEdit={() => openModal(p)}
// // //                       onDelete={() => handleDelete(p.id)}
// // //                     />
// // //                   ))}
// // //                 </div>
// // //               ) : (
// // //                 <div className="overflow-x-auto">
// // //                   <table className="w-full">
// // //                     <thead className="bg-gray-50">
// // //                       <tr>
// // //                         <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                           <input
// // //                             type="checkbox"
// // //                             className="w-5 h-5 text-emerald-600 bg-white border-gray-300 rounded focus:ring-emerald-500"
// // //                             checked={
// // //                               selectedProducts.length ===
// // //                                 paginatedProducts.length &&
// // //                               paginatedProducts.length > 0
// // //                             }
// // //                             onChange={toggleSelectAll}
// // //                           />
// // //                         </th>
// // //                         <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                           Product
// // //                         </th>
// // //                         <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                           Price / Stock
// // //                         </th>
// // //                         <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                           Category
// // //                         </th>
// // //                         <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                           Nutrition
// // //                         </th>
// // //                         <th className="p-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                           Actions
// // //                         </th>
// // //                       </tr>
// // //                     </thead>
// // //                     <tbody className="divide-y divide-gray-200">
// // //                       {paginatedProducts.map((p) => (
// // //                         <tr
// // //                           key={p.id}
// // //                           className="hover:bg-gray-50 transition-colors"
// // //                         >
// // //                           <td className="p-3">
// // //                             <input
// // //                               type="checkbox"
// // //                               className="w-5 h-5 text-emerald-600 bg-white border-gray-300 rounded focus:ring-emerald-500"
// // //                               checked={selectedProducts.includes(p.id)}
// // //                               onChange={() => toggleSelectProduct(p.id)}
// // //                             />
// // //                           </td>
// // //                           <td className="p-3">
// // //                             <div className="flex items-center">
// // //                               <div className="h-16 w-16 rounded-lg overflow-hidden mr-4 bg-gray-100 flex-shrink-0">
// // //                                 <img
// // //                                   src={p.image}
// // //                                   alt={p.name}
// // //                                   className="h-full w-full object-cover"
// // //                                 />
// // //                               </div>
// // //                               <div>
// // //                                 <div className="font-semibold text-gray-800">
// // //                                   {p.name}
// // //                                 </div>
// // //                                 <div className="text-sm text-gray-500 truncate max-w-xs">
// // //                                   {p.description}
// // //                                 </div>
// // //                                 <div className="flex items-center mt-1">
// // //                                   {[...Array(5)].map((_, i) => (
// // //                                     <FaStar
// // //                                       key={i}
// // //                                       className={`text-xs ${
// // //                                         i < Math.floor(p.rating || 4)
// // //                                           ? "text-yellow-400"
// // //                                           : "text-gray-300"
// // //                                       }`}
// // //                                     />
// // //                                   ))}
// // //                                   <span className="text-xs text-gray-500 ml-1">
// // //                                     ({p.rating || 4.5})
// // //                                   </span>
// // //                                 </div>
// // //                               </div>
// // //                             </div>
// // //                           </td>
// // //                           <td className="p-3">
// // //                             <div className="font-bold text-lg text-emerald-600">
// // //                               ₹{p.price}
// // //                             </div>
// // //                             <div
// // //                               className={`text-sm font-medium ${
// // //                                 p.stock < 10 ? "text-red-600" : "text-gray-500"
// // //                               }`}
// // //                             >
// // //                               {p.stock < 10 ? "Low Stock: " : "Stock: "}
// // //                               {p.stock}
// // //                             </div>
// // //                           </td>
// // //                           <td className="p-3">
// // //                             <div className="flex flex-col gap-1">
// // //                               <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-800">
// // //                                 {p.category}
// // //                               </span>
// // //                               <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
// // //                                 {p.subCategory}
// // //                               </span>
// // //                             </div>
// // //                           </td>
// // //                           <td className="p-3 text-sm text-gray-700">
// // //                             <div className="grid grid-cols-3 gap-2">
// // //                               <div>
// // //                                 <span className="text-gray-500">Calories:</span>
// // //                                 <strong> {p.nutrition.calories}</strong>
// // //                               </div>
// // //                               <div>
// // //                                 <span className="text-gray-500">Fat:</span>
// // //                                 <strong> {p.nutrition.fat}g</strong>
// // //                               </div>
// // //                               <div>
// // //                                 <span className="text-gray-500">Carbs:</span>
// // //                                 <strong> {p.nutrition.carb}g</strong>
// // //                               </div>
// // //                               <div>
// // //                                 <span className="text-gray-500">Protein:</span>
// // //                                 <strong className="text-emerald-600">
// // //                                   {" "}
// // //                                   {p.nutrition.protein}g
// // //                                 </strong>
// // //                               </div>
// // //                             </div>
// // //                           </td>
// // //                           <td className="p-3 text-right">
// // //                             <button
// // //                               onClick={() => openModal(p)}
// // //                               className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-100 transition-colors"
// // //                               title="Edit"
// // //                             >
// // //                               <FaEdit />
// // //                             </button>
// // //                             <button
// // //                               onClick={() => handleDelete(p.id)}
// // //                               className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition-colors ml-2"
// // //                               title="Delete"
// // //                             >
// // //                               <FaTrash />
// // //                             </button>
// // //                           </td>
// // //                         </tr>
// // //                       ))}
// // //                     </tbody>
// // //                   </table>
// // //                 </div>
// // //               )}
// // //             </>
// // //           ) : (
// // //             <div className="p-12 text-center">
// // //               <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
// // //                 <FaBox className="text-gray-400 text-3xl" />
// // //               </div>
// // //               <h3 className="text-xl font-medium text-gray-900 mb-2">
// // //                 No products found
// // //               </h3>
// // //               <p className="text-gray-500 mb-6 max-w-md mx-auto">
// // //                 Try adjusting your search or filter criteria, or add a new
// // //                 product to get started.
// // //               </p>
// // //               <button
// // //                 className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors inline-flex items-center gap-2 transform hover:scale-105"
// // //                 onClick={() => openModal()}
// // //               >
// // //                 <FaPlus /> Add Your First Product
// // //               </button>
// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* Pagination Component */}
// // //         {totalPages > 1 && (
// // //           <div className="mt-6 bg-white rounded-2xl shadow-lg p-4">
// // //             <Pagination
// // //               currentPage={currentPage}
// // //               totalPages={totalPages}
// // //               onPageChange={setCurrentPage}
// // //               totalItems={filteredProducts.length}
// // //               perPage={perPage}
// // //             />
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* Modal */}
// // //       <ShopProductModal
// // //         isOpen={modalOpen}
// // //         onClose={() => setModalOpen(false)}
// // //         onSave={handleSave}
// // //         product={editProduct}
// // //       />
// // //     </div>
// // //   );
// // // };

// // // export default ShopProductsPage;

// // // src/modules/shop/pages/ShopProductsPage.tsx
// // import React, { useState, useMemo } from "react";
// // import { useSelector, useDispatch } from "react-redux";
// // import { RootState, AppDispatch } from "../../../store";
// // import {
// //   ShopProduct,
// //   addShopProduct,
// //   editShopProduct,
// //   deleteShopProduct,
// //   fetchProducts,
// // } from "../shopSlice";
// // import ShopProductModal from "../components/ShopProductModal";
// // import Pagination from "../../../components/common/Pagination";
// // import ProductCard from "../components/ProductCard";
// // import SkeletonLoader from "../components/SkeletonLoader";
// // import {
// //   FaTrash,
// //   FaPlus,
// //   FaSearch,
// //   FaTimes,
// //   FaTh,
// //   FaList,
// //   FaBox,
// //   FaCheckSquare,
// //   FaSquare,
// //   FaEdit,
// //   FaFilter,
// //   FaSortAmountDown,
// //   FaChartBar,
// //   FaStar,
// //   FaFire,
// //   FaBacon,
// //   FaBreadSlice,
// //   FaEgg,
// // } from "react-icons/fa";

// // const ShopProductsPage: React.FC = () => {
// //   const dispatch = useDispatch<AppDispatch>();
// //   const { products, status } = useSelector((state: RootState) => state.shop);

// //   // State for filters, pagination, and bulk actions
// //   const [search, setSearch] = useState("");
// //   const [category, setCategory] = useState("all");
// //   const [subCategory, setSubCategory] = useState("all");
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [editProduct, setEditProduct] = useState<ShopProduct | undefined>(
// //     undefined
// //   );
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [viewMode, setViewMode] = useState<"table" | "card">("card");
// //   const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
// //   const [sortBy, setSortBy] = useState("name");
// //   const [filterOpen, setFilterOpen] = useState(false);
// //   const perPage = 8; // Increased for better card view

// //   // Get unique categories and sub-categories
// //   const categories = useMemo(
// //     () => ["all", ...Array.from(new Set(products.map((p) => p.category)))],
// //     [products]
// //   );
// //   const subCategories = useMemo(
// //     () => ["all", ...Array.from(new Set(products.map((p) => p.subCategory)))],
// //     [products]
// //   );

// //   // Filter and sort products
// //   const filteredProducts = useMemo(() => {
// //     let filtered = products.filter(
// //       (p) =>
// //         p.name.toLowerCase().includes(search.toLowerCase()) &&
// //         (category !== "all" ? p.category === category : true) &&
// //         (subCategory !== "all" ? p.subCategory === subCategory : true)
// //     );

// //     // Apply sorting
// //     filtered.sort((a, b) => {
// //       if (sortBy === "name") return a.name.localeCompare(b.name);
// //       if (sortBy === "price") return parseFloat(a.price) - parseFloat(b.price);
// //       if (sortBy === "stock") return b.stock - a.stock;
// //       return 0;
// //     });

// //     return filtered;
// //   }, [products, search, category, subCategory, sortBy]);

// //   // Paginate filtered products
// //   const paginatedProducts = useMemo(
// //     () =>
// //       filteredProducts.slice(
// //         (currentPage - 1) * perPage,
// //         currentPage * perPage
// //       ),
// //     [filteredProducts, currentPage, perPage]
// //   );
// //   const totalPages = Math.ceil(filteredProducts.length / perPage);

// //   // --- Handlers ---
// //   const handleSave = (product: ShopProduct) => {
// //     if (editProduct) {
// //       dispatch(editShopProduct(product));
// //     } else {
// //       dispatch(addShopProduct(product));
// //     }
// //     setSelectedProducts([]);
// //   };

// //   const handleDelete = (id: number) => {
// //     if (window.confirm("Are you sure you want to delete this product?")) {
// //       dispatch(deleteShopProduct(id));
// //       setSelectedProducts((prev) => prev.filter((pId) => pId !== id));
// //     }
// //   };

// //   const handleBulkDelete = () => {
// //     if (selectedProducts.length === 0) return;
// //     if (
// //       window.confirm(
// //         `Are you sure you want to delete ${selectedProducts.length} selected products?`
// //       )
// //     ) {
// //       selectedProducts.forEach((id) => dispatch(deleteShopProduct(id)));
// //       setSelectedProducts([]);
// //     }
// //   };

// //   const openModal = (product?: ShopProduct) => {
// //     setEditProduct(product);
// //     setModalOpen(true);
// //   };

// //   const clearFilters = () => {
// //     setSearch("");
// //     setCategory("all");
// //     setSubCategory("all");
// //     setCurrentPage(1);
// //   };

// //   const toggleSelectProduct = (id: number) => {
// //     setSelectedProducts((prev) =>
// //       prev.includes(id) ? prev.filter((pId) => pId !== id) : [...prev, id]
// //     );
// //   };

// //   const toggleSelectAll = () => {
// //     if (selectedProducts.length === paginatedProducts.length) {
// //       setSelectedProducts([]);
// //     } else {
// //       setSelectedProducts(paginatedProducts.map((p) => p.id));
// //     }
// //   };

// //   // --- Effects ---
// //   React.useEffect(() => {
// //     if (status === "idle") {
// //       dispatch(fetchProducts());
// //     }
// //   }, [status, dispatch]);

// //   if (status === "loading") {
// //     return <SkeletonLoader />;
// //   }

// //   return (
// //     <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
// //       <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
// //         {/* Header Section with Stats */}
// //         <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
// //           <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6">
// //             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// //               <div>
// //                 <h1 className="text-3xl font-bold text-white flex items-center gap-3">
// //                   <FaBox className="text-white/90" />
// //                   Shop Products
// //                 </h1>
// //                 <p className="text-white/80 mt-1">
// //                   Manage and view all products in the shop
// //                 </p>
// //               </div>
// //               <button
// //                 className="flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition-all shadow-md transform hover:scale-105 self-start sm:self-auto"
// //                 onClick={() => openModal()}
// //               >
// //                 <FaPlus /> Add Product
// //               </button>
// //             </div>
// //           </div>

// //           {/* Stats Cards */}
// //           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white">
// //             <div className="bg-gray-50 rounded-lg p-4 text-center">
// //               <div className="text-2xl font-bold text-gray-800">
// //                 {products.length}
// //               </div>
// //               <div className="text-sm text-gray-500">Total Products</div>
// //             </div>
// //             <div className="bg-gray-50 rounded-lg p-4 text-center">
// //               <div className="text-2xl font-bold text-emerald-600">
// //                 {filteredProducts.length}
// //               </div>
// //               <div className="text-sm text-gray-500">Filtered</div>
// //             </div>
// //             <div className="bg-gray-50 rounded-lg p-4 text-center">
// //               <div className="text-2xl font-bold text-blue-600">
// //                 {products.filter((p) => p.stock < 10).length}
// //               </div>
// //               <div className="text-sm text-gray-500">Low Stock</div>
// //             </div>
// //             <div className="bg-gray-50 rounded-lg p-4 text-center">
// //               <div className="text-2xl font-bold text-purple-600">
// //                 {categories.length - 1}
// //               </div>
// //               <div className="text-sm text-gray-500">Categories</div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Filters Section */}
// //         <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
// //           <div className="flex items-center justify-between mb-4">
// //             <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
// //               <FaFilter className="text-emerald-600" />
// //               Filters & Search
// //             </h2>
// //             <button
// //               className="text-gray-500 hover:text-gray-700 md:hidden"
// //               onClick={() => setFilterOpen(!filterOpen)}
// //             >
// //               {filterOpen ? <FaTimes /> : <FaFilter />}
// //             </button>
// //           </div>

// //           <div className={`${filterOpen ? "block" : "hidden md:block"}`}>
// //             <div className="flex flex-col lg:flex-row gap-4">
// //               <div className="flex-1">
// //                 <div className="relative">
// //                   <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
// //                   <input
// //                     type="text"
// //                     placeholder="Search products by name..."
// //                     value={search}
// //                     onChange={(e) => setSearch(e.target.value)}
// //                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
// //                   />
// //                 </div>
// //               </div>
// //               <div className="flex gap-2 flex-wrap">
// //                 <select
// //                   value={category}
// //                   onChange={(e) => setCategory(e.target.value)}
// //                   className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white"
// //                 >
// //                   {categories.map((cat) => (
// //                     <option key={cat} value={cat}>
// //                       {cat === "all" ? "All Categories" : cat}
// //                     </option>
// //                   ))}
// //                 </select>
// //                 <select
// //                   value={subCategory}
// //                   onChange={(e) => setSubCategory(e.target.value)}
// //                   className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white"
// //                 >
// //                   {subCategories.map((sub) => (
// //                     <option key={sub} value={sub}>
// //                       {sub === "all" ? "All Sub-Categories" : sub}
// //                     </option>
// //                   ))}
// //                 </select>
// //                 <select
// //                   value={sortBy}
// //                   onChange={(e) => setSortBy(e.target.value)}
// //                   className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white flex items-center gap-2"
// //                 >
// //                   <option value="name">Sort by Name</option>
// //                   <option value="price">Sort by Price</option>
// //                   <option value="stock">Sort by Stock</option>
// //                 </select>
// //                 <button
// //                   className="flex items-center gap-2 text-gray-600 px-4 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
// //                   onClick={clearFilters}
// //                 >
// //                   <FaTimes /> Clear
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Main Content Area */}
// //         <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
// //           {/* View Toggle and Bulk Actions */}
// //           <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
// //             <div className="flex items-center gap-4">
// //               <button
// //                 onClick={toggleSelectAll}
// //                 className="text-gray-600 hover:text-emerald-600 transition-colors p-2 rounded-lg hover:bg-white"
// //                 title="Select All"
// //               >
// //                 {selectedProducts.length === paginatedProducts.length &&
// //                 paginatedProducts.length > 0 ? (
// //                   <FaCheckSquare className="text-xl" />
// //                 ) : (
// //                   <FaSquare className="text-xl" />
// //                 )}
// //               </button>
// //               {selectedProducts.length > 0 && (
// //                 <button
// //                   onClick={handleBulkDelete}
// //                   className="flex items-center gap-2 text-red-600 hover:text-red-700 bg-white px-3 py-2 rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
// //                 >
// //                   <FaTrash /> Delete Selected ({selectedProducts.length})
// //                 </button>
// //               )}
// //             </div>
// //             <div className="flex gap-2">
// //               <button
// //                 className={`p-2 rounded-lg transition-all ${
// //                   viewMode === "card"
// //                     ? "bg-emerald-600 text-white shadow-md"
// //                     : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
// //                 }`}
// //                 onClick={() => setViewMode("card")}
// //                 title="Card View"
// //               >
// //                 <FaTh />
// //               </button>
// //               <button
// //                 className={`p-2 rounded-lg transition-all ${
// //                   viewMode === "table"
// //                     ? "bg-emerald-600 text-white shadow-md"
// //                     : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
// //                 }`}
// //                 onClick={() => setViewMode("table")}
// //                 title="Table View"
// //               >
// //                 <FaList />
// //               </button>
// //             </div>
// //           </div>

// //           {/* Products Display */}
// //           {paginatedProducts.length > 0 ? (
// //             <>
// //               {viewMode === "card" ? (
// //                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
// //                   {paginatedProducts.map((p) => (
// //                     <ProductCard
// //                       key={p.id}
// //                       product={p}
// //                       isSelected={selectedProducts.includes(p.id)}
// //                       onToggleSelect={() => toggleSelectProduct(p.id)}
// //                       onEdit={() => openModal(p)}
// //                       onDelete={() => handleDelete(p.id)}
// //                     />
// //                   ))}
// //                 </div>
// //               ) : (
// //                 <div className="overflow-x-auto">
// //                   <table className="w-full">
// //                     <thead className="bg-gray-50">
// //                       <tr>
// //                         <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                           <input
// //                             type="checkbox"
// //                             className="w-5 h-5 text-emerald-600 bg-white border-gray-300 rounded focus:ring-emerald-500"
// //                             checked={
// //                               selectedProducts.length ===
// //                                 paginatedProducts.length &&
// //                               paginatedProducts.length > 0
// //                             }
// //                             onChange={toggleSelectAll}
// //                           />
// //                         </th>
// //                         <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                           Product
// //                         </th>
// //                         <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                           Price / Stock
// //                         </th>
// //                         <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                           Category
// //                         </th>
// //                         <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                           Nutrition
// //                         </th>
// //                         <th className="p-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                           Actions
// //                         </th>
// //                       </tr>
// //                     </thead>
// //                     <tbody className="divide-y divide-gray-200">
// //                       {paginatedProducts.map((p) => (
// //                         <tr
// //                           key={p.id}
// //                           className="hover:bg-gray-50 transition-colors"
// //                         >
// //                           <td className="p-3">
// //                             <input
// //                               type="checkbox"
// //                               className="w-5 h-5 text-emerald-600 bg-white border-gray-300 rounded focus:ring-emerald-500"
// //                               checked={selectedProducts.includes(p.id)}
// //                               onChange={() => toggleSelectProduct(p.id)}
// //                             />
// //                           </td>
// //                           <td className="p-3">
// //                             <div className="flex items-center">
// //                               <div className="h-16 w-16 rounded-lg overflow-hidden mr-4 bg-gray-100 flex-shrink-0">
// //                                 <img
// //                                   src={p.image}
// //                                   alt={p.name}
// //                                   className="h-full w-full object-cover"
// //                                 />
// //                               </div>
// //                               <div>
// //                                 <div className="font-semibold text-gray-800">
// //                                   {p.name}
// //                                 </div>
// //                                 <div className="text-sm text-gray-500 truncate max-w-xs">
// //                                   {p.description}
// //                                 </div>
// //                                 <div className="flex items-center mt-1">
// //                                   {[...Array(5)].map((_, i) => (
// //                                     <FaStar
// //                                       key={i}
// //                                       className={`text-xs ${
// //                                         i < Math.floor(p.rating || 4)
// //                                           ? "text-yellow-400"
// //                                           : "text-gray-300"
// //                                       }`}
// //                                     />
// //                                   ))}
// //                                   <span className="text-xs text-gray-500 ml-1">
// //                                     ({p.rating || 4.5})
// //                                   </span>
// //                                 </div>
// //                               </div>
// //                             </div>
// //                           </td>
// //                           <td className="p-3">
// //                             <div className="font-bold text-lg text-emerald-600">
// //                               ₹{p.price}
// //                             </div>
// //                             <div
// //                               className={`text-sm font-medium ${
// //                                 p.stock < 10 ? "text-red-600" : "text-gray-500"
// //                               }`}
// //                             >
// //                               {p.stock < 10 ? "Low Stock: " : "Stock: "}
// //                               {p.stock}
// //                             </div>
// //                           </td>
// //                           <td className="p-3">
// //                             <div className="flex flex-col gap-1">
// //                               <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-800">
// //                                 {p.category}
// //                               </span>
// //                               <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
// //                                 {p.subCategory}
// //                               </span>
// //                             </div>
// //                           </td>
// //                           <td className="p-3">
// //                             <div className="flex items-center gap-2">
// //                               {p.nutrition.image && (
// //                                 <div className="h-16 w-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
// //                                   <img
// //                                     src={p.nutrition.image}
// //                                     alt="Nutrition"
// //                                     className="h-full w-full object-cover"
// //                                   />
// //                                 </div>
// //                               )}
// //                               <div className="grid grid-cols-2 gap-1 text-xs">
// //                                 <div className="flex items-center gap-1">
// //                                   <FaFire className="text-orange-500" />
// //                                   <span className="text-gray-600">
// //                                     {p.nutrition.calories} cal
// //                                   </span>
// //                                 </div>
// //                                 <div className="flex items-center gap-1">
// //                                   <FaBacon className="text-yellow-500" />
// //                                   <span className="text-gray-600">
// //                                     {p.nutrition.fat}g
// //                                   </span>
// //                                 </div>
// //                                 <div className="flex items-center gap-1">
// //                                   <FaBreadSlice className="text-amber-500" />
// //                                   <span className="text-gray-600">
// //                                     {p.nutrition.carb}g
// //                                   </span>
// //                                 </div>
// //                                 <div className="flex items-center gap-1">
// //                                   <FaEgg className="text-red-500" />
// //                                   <span className="text-gray-600">
// //                                     {p.nutrition.protein}g
// //                                   </span>
// //                                 </div>
// //                               </div>
// //                             </div>
// //                           </td>
// //                           <td className="p-3 text-right">
// //                             <button
// //                               onClick={() => openModal(p)}
// //                               className="text-green-500 hover:text-green-700 p-2 rounded-full hover:bg-blue-100 transition-colors"
// //                               title="Edit"
// //                             >
// //                               <FaEdit className="text-xl" />
// //                             </button>
// //                             <button
// //                               onClick={() => handleDelete(p.id)}
// //                               className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition-colors ml-2"
// //                               title="Delete"
// //                             >
// //                               <FaTrash className="text-xl" />
// //                             </button>
// //                           </td>
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </table>
// //                 </div>
// //               )}
// //             </>
// //           ) : (
// //             <div className="p-12 text-center">
// //               <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
// //                 <FaBox className="text-gray-400 text-3xl" />
// //               </div>
// //               <h3 className="text-xl font-medium text-gray-900 mb-2">
// //                 No products found
// //               </h3>
// //               <p className="text-gray-500 mb-6 max-w-md mx-auto">
// //                 Try adjusting your search or filter criteria, or add a new
// //                 product to get started.
// //               </p>
// //               <button
// //                 className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors inline-flex items-center gap-2 transform hover:scale-105"
// //                 onClick={() => openModal()}
// //               >
// //                 <FaPlus /> Add Your First Product
// //               </button>
// //             </div>
// //           )}
// //         </div>

// //         {/* Pagination Component */}
// //         {totalPages > 1 && (
// //           <div className="mt-6 bg-white rounded-2xl shadow-lg p-4">
// //             <Pagination
// //               currentPage={currentPage}
// //               totalPages={totalPages}
// //               onPageChange={setCurrentPage}
// //               totalItems={filteredProducts.length}
// //               perPage={perPage}
// //             />
// //           </div>
// //         )}
// //       </div>

// //       {/* Modal */}
// //       <ShopProductModal
// //         isOpen={modalOpen}
// //         onClose={() => setModalOpen(false)}
// //         onSave={handleSave}
// //         product={editProduct}
// //       />
// //     </div>
// //   );
// // };

// // export default ShopProductsPage;

// // src/modules/shop/pages/ShopProductsPage.tsx
// import React, { useState, useMemo } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState, AppDispatch } from "../../../store";
// import ImageUpload from "../../../components/common/ImageUpload";
// import {
//   ShopProduct,
//   addShopProduct,
//   editShopProduct,
//   deleteShopProduct,
//   fetchProducts,
//   setSelectedProduct,
// } from "../shopSlice";
// import ShopProductModal from "../components/ShopProductModal";
// import DeleteProductModal from "../components/DeleteProductModal";
// import Pagination from "../../../components/common/Pagination";
// import ProductCard from "../components/ProductCard";
// import SkeletonLoader from "../components/SkeletonLoader";
// import {
//   FaTrash,
//   FaPlus,
//   FaSearch,
//   FaTimes,
//   FaTh,
//   FaList,
//   FaBox,
//   FaCheckSquare,
//   FaSquare,
//   FaEdit,
//   FaFilter,
//   FaSortAmountDown,
//   FaChartBar,
//   FaStar,
//   FaFire,
//   FaBacon,
//   FaBreadSlice,
//   FaEgg,
//   FaAppleAlt,
//   FaCheese,
//   FaFish,
// } from "react-icons/fa";

// const ShopProductsPage: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { products, status } = useSelector((state: RootState) => state.shop);

//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("all");
//   const [subCategory, setSubCategory] = useState("all");
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editProduct, setEditProduct] = useState<ShopProduct | undefined>(
//     undefined
//   );
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [viewMode, setViewMode] = useState<"table" | "card">("card");
//   const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
//   const [sortBy, setSortBy] = useState("name");
//   const [filterOpen, setFilterOpen] = useState(false);
//   const perPage = 8;

//   const categories = useMemo(
//     () => ["all", ...Array.from(new Set(products.map((p) => p.category)))],
//     [products]
//   );
//   const subCategories = useMemo(
//     () => ["all", ...Array.from(new Set(products.map((p) => p.subCategory)))],
//     [products]
//   );

//   const filteredProducts = useMemo(() => {
//     let filtered = products.filter(
//       (p) =>
//         p.name.toLowerCase().includes(search.toLowerCase()) &&
//         (category !== "all" ? p.category === category : true) &&
//         (subCategory !== "all" ? p.subCategory === subCategory : true)
//     );

//     filtered.sort((a, b) => {
//       if (sortBy === "name") return a.name.localeCompare(b.name);
//       if (sortBy === "price") return parseFloat(a.price) - parseFloat(b.price);
//       if (sortBy === "stock") return b.stock - a.stock;
//       return 0;
//     });

//     return filtered;
//   }, [products, search, category, subCategory, sortBy]);

//   const paginatedProducts = useMemo(
//     () =>
//       filteredProducts.slice(
//         (currentPage - 1) * perPage,
//         currentPage * perPage
//       ),
//     [filteredProducts, currentPage, perPage]
//   );
//   const totalPages = Math.ceil(filteredProducts.length / perPage);

//   const handleSave = (product: ShopProduct) => {
//     if (editProduct) {
//       dispatch(editShopProduct(product));
//     } else {
//       dispatch(addShopProduct(product));
//     }
//     setSelectedProducts([]);
//   };

//   const handleDelete = (product: ShopProduct) => {
//     dispatch(setSelectedProduct(product));
//     setDeleteModalOpen(true);
//   };

//   const handleBulkDelete = () => {
//     if (selectedProducts.length === 0) return;
//     if (
//       window.confirm(
//         `Are you sure you want to delete ${selectedProducts.length} selected products?`
//       )
//     ) {
//       selectedProducts.forEach((id) => dispatch(deleteShopProduct(id)));
//       setSelectedProducts([]);
//     }
//   };

//   const openModal = (product?: ShopProduct) => {
//     setEditProduct(product);
//     setModalOpen(true);
//   };

//   const closeDeleteModal = () => {
//     setDeleteModalOpen(false);
//     dispatch(setSelectedProduct(null));
//   };

//   const handleProductImageChange = (productId: number, imageUrl: string) => {
//     const product = products.find((p) => p.id === productId);
//     if (product) {
//       dispatch(
//         editShopProduct({
//           ...product,
//           image: imageUrl,
//         })
//       );
//     }
//   };

//   const clearFilters = () => {
//     setSearch("");
//     setCategory("all");
//     setSubCategory("all");
//     setCurrentPage(1);
//   };

//   const toggleSelectProduct = (id: number) => {
//     setSelectedProducts((prev) =>
//       prev.includes(id) ? prev.filter((pId) => pId !== id) : [...prev, id]
//     );
//   };

//   const toggleSelectAll = () => {
//     if (selectedProducts.length === paginatedProducts.length) {
//       setSelectedProducts([]);
//     } else {
//       setSelectedProducts(paginatedProducts.map((p) => p.id));
//     }
//   };

//   React.useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchProducts());
//     }
//   }, [status, dispatch]);

//   const getNutritionIcon = (category: string) => {
//     switch (category.toLowerCase()) {
//       case "nuts":
//         return <FaAppleAlt className="text-amber-500" />;
//       case "dairy":
//         return <FaCheese className="text-yellow-500" />;
//       case "oils":
//         return <FaBacon className="text-yellow-600" />;
//       case "grains":
//         return <FaBreadSlice className="text-amber-600" />;
//       case "sweeteners":
//         return <FaAppleAlt className="text-red-500" />;
//       default:
//         return <FaFish className="text-blue-500" />;
//     }
//   };

//   if (status === "loading") {
//     return <SkeletonLoader />;
//   }

//   return (
//     <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
//       <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
//         <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
//           <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//               <div>
//                 <h1 className="text-3xl font-bold text-white flex items-center gap-3">
//                   <FaBox className="text-white/90" />
//                   Shop Products
//                 </h1>
//                 <p className="text-white/80 mt-1">
//                   Manage and view all products in shop
//                 </p>
//               </div>
//               <button
//                 className="flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition-all shadow-md transform hover:scale-105 self-start sm:self-auto"
//                 onClick={() => openModal()}
//               >
//                 <FaPlus /> Add Product
//               </button>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white">
//             <div className="bg-gray-50 rounded-lg p-4 text-center">
//               <div className="text-2xl font-bold text-gray-800">
//                 {products.length}
//               </div>
//               <div className="text-sm text-gray-500">Total Products</div>
//             </div>
//             <div className="bg-gray-50 rounded-lg p-4 text-center">
//               <div className="text-2xl font-bold text-emerald-600">
//                 {filteredProducts.length}
//               </div>
//               <div className="text-sm text-gray-500">Filtered</div>
//             </div>
//             <div className="bg-gray-50 rounded-lg p-4 text-center">
//               <div className="text-2xl font-bold text-blue-600">
//                 {products.filter((p) => p.stock < 10).length}
//               </div>
//               <div className="text-sm text-gray-500">Low Stock</div>
//             </div>
//             <div className="bg-gray-50 rounded-lg p-4 text-center">
//               <div className="text-2xl font-bold text-purple-600">
//                 {categories.length - 1}
//               </div>
//               <div className="text-sm text-gray-500">Categories</div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//               <FaFilter className="text-emerald-600" />
//               Filters & Search
//             </h2>
//             <button
//               className="text-gray-500 hover:text-gray-700 md:hidden"
//               onClick={() => setFilterOpen(!filterOpen)}
//             >
//               {filterOpen ? <FaTimes /> : <FaFilter />}
//             </button>
//           </div>

//           <div className={`${filterOpen ? "block" : "hidden md:block"}`}>
//             <div className="flex flex-col lg:flex-row gap-4">
//               <div className="flex-1">
//                 <div className="relative">
//                   <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search products by name..."
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
//                   />
//                 </div>
//               </div>
//               <div className="flex gap-2 flex-wrap">
//                 <select
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                   className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white"
//                 >
//                   {categories.map((cat) => (
//                     <option key={cat} value={cat}>
//                       {cat === "all" ? "All Categories" : cat}
//                     </option>
//                   ))}
//                 </select>
//                 <select
//                   value={subCategory}
//                   onChange={(e) => setSubCategory(e.target.value)}
//                   className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white"
//                 >
//                   {subCategories.map((sub) => (
//                     <option key={sub} value={sub}>
//                       {sub === "all" ? "All Sub-Categories" : sub}
//                     </option>
//                   ))}
//                 </select>
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white"
//                 >
//                   <option value="name">Sort by Name</option>
//                   <option value="price">Sort by Price</option>
//                   <option value="stock">Sort by Stock</option>
//                 </select>
//                 <button
//                   className="flex items-center gap-2 text-gray-600 px-4 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
//                   onClick={clearFilters}
//                 >
//                   <FaTimes /> Clear
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//           <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={toggleSelectAll}
//                 className="text-gray-600 hover:text-emerald-600 transition-colors p-2 rounded-lg hover:bg-white"
//                 title="Select All"
//               >
//                 {selectedProducts.length === paginatedProducts.length &&
//                 paginatedProducts.length > 0 ? (
//                   <FaCheckSquare className="text-xl" />
//                 ) : (
//                   <FaSquare className="text-xl" />
//                 )}
//               </button>
//               {selectedProducts.length > 0 && (
//                 <button
//                   onClick={handleBulkDelete}
//                   className="flex items-center gap-2 text-red-600 hover:text-red-700 bg-white px-3 py-2 rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
//                 >
//                   <FaTrash /> Delete Selected ({selectedProducts.length})
//                 </button>
//               )}
//             </div>
//             <div className="flex gap-2">
//               <button
//                 className={`p-2 rounded-lg transition-all ${
//                   viewMode === "card"
//                     ? "bg-emerald-600 text-white shadow-md"
//                     : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
//                 }`}
//                 onClick={() => setViewMode("card")}
//                 title="Card View"
//               >
//                 <FaTh />
//               </button>
//               <button
//                 className={`p-2 rounded-lg transition-all ${
//                   viewMode === "table"
//                     ? "bg-emerald-600 text-white shadow-md"
//                     : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
//                 }`}
//                 onClick={() => setViewMode("table")}
//                 title="Table View"
//               >
//                 <FaList />
//               </button>
//             </div>
//           </div>

//           {paginatedProducts.length > 0 ? (
//             <>
//               {viewMode === "card" ? (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
//                   {paginatedProducts.map((p) => (
//                     <ProductCard
//                       key={p.id}
//                       product={p}
//                       isSelected={selectedProducts.includes(p.id)}
//                       onToggleSelect={() => toggleSelectProduct(p.id)}
//                       onEdit={() => openModal(p)}
//                       onDelete={() => handleDelete(p)}
//                       onImageChange={(imageUrl) =>
//                         handleProductImageChange(p.id, imageUrl)
//                       }
//                     />
//                   ))}
//                 </div>
//               ) : (
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           <input
//                             type="checkbox"
//                             className="w-5 h-5 text-emerald-600 bg-white border-gray-300 rounded focus:ring-emerald-500"
//                             checked={
//                               selectedProducts.length ===
//                                 paginatedProducts.length &&
//                               paginatedProducts.length > 0
//                             }
//                             onChange={toggleSelectAll}
//                           />
//                         </th>
//                         <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Product
//                         </th>
//                         {/* <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Price / Stock
//                         </th> */}
//                         <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Category
//                         </th>
//                         <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Nutrition
//                         </th>
//                         <th className="p-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Actions
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200">
//                       {paginatedProducts.map((p) => (
//                         <tr
//                           key={p.id}
//                           className="hover:bg-gray-50 transition-colors"
//                         >
//                           <td className="p-3">
//                             <input
//                               type="checkbox"
//                               className="w-5 h-5 text-emerald-600 bg-white border-gray-300 rounded focus:ring-emerald-500"
//                               checked={selectedProducts.includes(p.id)}
//                               onChange={() => toggleSelectProduct(p.id)}
//                             />
//                           </td>
//                           <td className="p-3">
//                             <div className="flex items-center">
//                               <div className=" rounded-lg overflow-hidden mr-4 bg-gray-100 flex-shrink-0">
//                                 <ImageUpload
//                                   initialImage={p.image}
//                                   onImageChange={(imageUrl) =>
//                                     handleProductImageChange(p.id, imageUrl)
//                                   }
//                                   // height="h-16"
//                                   // width="w-16"
//                                   // className="rounded-lg"
//                                   size="md"
//                                 />
//                               </div>
//                               <div>
//                                 <div className="font-semibold text-gray-800">
//                                   {p.name}
//                                 </div>
//                                 <div className="text-sm text-gray-500 truncate max-w-xs">
//                                   {p.description}
//                                 </div>
//                                 <div className="flex items-center mt-1">
//                                   {[...Array(5)].map((_, i) => (
//                                     <FaStar
//                                       key={i}
//                                       className={`text-xs ${
//                                         i < Math.floor(p.rating || 4)
//                                           ? "text-yellow-400"
//                                           : "text-gray-300"
//                                       }`}
//                                     />
//                                   ))}
//                                   <span className="text-xs text-gray-500 ml-1">
//                                     ({p.rating || 4.5})
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                           {/* <td className="p-3">
//                             <div className="font-bold text-lg text-emerald-600">
//                               ₹{p.price}
//                             </div>
//                             <div
//                               className={`text-sm font-medium ${
//                                 p.stock < 10 ? "text-red-600" : "text-gray-500"
//                               }`}
//                             >
//                               {p.stock < 10 ? "Low Stock: " : "Stock: "}
//                               {p.stock}
//                             </div>
//                           </td> */}
//                           <td className="p-3">
//                             <div className="flex flex-col gap-1">
//                               <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-800">
//                                 {p.category}
//                               </span>
//                               <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
//                                 {p.subCategory}
//                               </span>
//                             </div>
//                           </td>
//                           <td className="p-3">
//                             <div className="flex items-start gap-3">
//                               {p.nutrition.image && (
//                                 <div className=" rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
//                                   <ImageUpload
//                                     initialImage={p.nutrition.image}
//                                     onImageChange={(imageUrl) =>
//                                       handleProductImageChange(
//                                         p.nutrition.id,
//                                         imageUrl
//                                       )
//                                     }
//                                     size="md"
//                                     // height="h-16"
//                                     // width="w-20"
//                                     // className="rounded-lg"
//                                   />
//                                 </div>
//                               )}
//                               <div className="min-w-0 flex-1">
//                                 <div className="flex items-center gap-1 mb-1">
//                                   {getNutritionIcon(p.category)}
//                                   <span className="text-sm font-medium text-gray-700">
//                                     Nutrition Facts
//                                   </span>
//                                 </div>
//                                 <div className="grid grid-cols-2 gap-1 text-xs">
//                                   <div className="flex items-center gap-1">
//                                     <FaFire className="text-orange-500" />
//                                     <span className="text-gray-600">
//                                       {p.nutrition.calories} cal
//                                     </span>
//                                   </div>
//                                   <div className="flex items-center gap-1">
//                                     <FaBacon className="text-yellow-500" />
//                                     <span className="text-gray-600">
//                                       {p.nutrition.fat}g
//                                     </span>
//                                   </div>
//                                   <div className="flex items-center gap-1">
//                                     <FaBreadSlice className="text-amber-500" />
//                                     <span className="text-gray-600">
//                                       {p.nutrition.carb}g
//                                     </span>
//                                   </div>
//                                   <div className="flex items-center gap-1">
//                                     <FaEgg className="text-red-500" />
//                                     <span className="text-gray-600">
//                                       {p.nutrition.protein}g
//                                     </span>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="p-3 text-right">
//                             <button
//                               onClick={() => openModal(p)}
//                               className="text-emerald-500 hover:text-emerald-700 p-2 rounded-full hover:bg-emerald-100 transition-colors"
//                               title="Edit"
//                             >
//                               <FaEdit className="text-xl" />
//                             </button>
//                             <button
//                               onClick={() => handleDelete(p)}
//                               className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition-colors ml-2"
//                               title="Delete"
//                             >
//                               <FaTrash className="text-xl" />
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </>
//           ) : (
//             <div className="p-12 text-center">
//               <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
//                 <FaBox className="text-gray-400 text-3xl" />
//               </div>
//               <h3 className="text-xl font-medium text-gray-900 mb-2">
//                 No products found
//               </h3>
//               <p className="text-gray-500 mb-6 max-w-md mx-auto">
//                 Try adjusting your search or filter criteria, or add a new
//                 product to get started.
//               </p>
//               <button
//                 className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors inline-flex items-center gap-2 transform hover:scale-105"
//                 onClick={() => openModal()}
//               >
//                 <FaPlus /> Add Your First Product
//               </button>
//             </div>
//           )}
//         </div>

//         {totalPages > 1 && (
//           <div className="mt-6 bg-white rounded-2xl shadow-lg p-4">
//             <Pagination
//               currentPage={currentPage}
//               totalPages={totalPages}
//               onPageChange={setCurrentPage}
//               totalItems={filteredProducts.length}
//               perPage={perPage}
//             />
//           </div>
//         )}
//       </div>

//       <ShopProductModal
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         onSave={handleSave}
//         product={editProduct}
//       />

//       <DeleteProductModal open={deleteModalOpen} onClose={closeDeleteModal} />
//     </div>
//   );
// };

// export default ShopProductsPage;

// src/modules/shop/pages/ShopProductsPage.tsx
import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import ImageUpload from "../../../components/common/ImageUpload";
import {
  ShopProduct,
  addShopProduct,
  editShopProduct,
  deleteShopProduct,
  fetchProducts,
  setSelectedProduct,
} from "../shopSlice";
import ShopProductModal from "../components/ShopProductModal";
import DeleteProductModal from "../components/DeleteProductModal";
import Pagination from "../../../components/common/Pagination";
import ProductCard from "../components/ProductCard";
import SkeletonLoader from "../components/SkeletonLoader";
import {
  FaTrash,
  FaPlus,
  FaSearch,
  FaTimes,
  FaTh,
  FaList,
  FaBox,
  FaCheckSquare,
  FaSquare,
  FaEdit,
  FaFilter,
  FaSortAmountDown,
  FaChartBar,
  FaStar,
  FaFire,
  FaBacon,
  FaBreadSlice,
  FaEgg,
  FaAppleAlt,
  FaCheese,
  FaFish,
} from "react-icons/fa";

const ShopProductsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, status } = useSelector((state: RootState) => state.shop);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [subCategory, setSubCategory] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<ShopProduct | undefined>(
    undefined
  );
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("name");
  const [filterOpen, setFilterOpen] = useState(false);
  const perPage = 8;

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(products.map((p) => p.category)))],
    [products]
  );
  const subCategories = useMemo(
    () => ["all", ...Array.from(new Set(products.map((p) => p.subCategory)))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) &&
        (category !== "all" ? p.category === category : true) &&
        (subCategory !== "all" ? p.subCategory === subCategory : true)
    );

    filtered.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price") return parseFloat(a.price) - parseFloat(b.price);
      if (sortBy === "stock") return b.stock - a.stock;
      return 0;
    });

    return filtered;
  }, [products, search, category, subCategory, sortBy]);

  const paginatedProducts = useMemo(
    () =>
      filteredProducts.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
      ),
    [filteredProducts, currentPage, perPage]
  );
  const totalPages = Math.ceil(filteredProducts.length / perPage);

  const handleSave = (product: ShopProduct) => {
    if (editProduct) {
      dispatch(editShopProduct(product));
    } else {
      dispatch(addShopProduct(product));
    }
    setSelectedProducts([]);
  };

  const handleDelete = (product: ShopProduct) => {
    dispatch(setSelectedProduct(product));
    setDeleteModalOpen(true);
  };

  const handleBulkDelete = () => {
    if (selectedProducts.length === 0) return;
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedProducts.length} selected products?`
      )
    ) {
      selectedProducts.forEach((id) => dispatch(deleteShopProduct(id)));
      setSelectedProducts([]);
    }
  };

  const openModal = (product?: ShopProduct) => {
    setEditProduct(product);
    setModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    dispatch(setSelectedProduct(null));
  };

  const handleProductImageChange = (productId: number, imageUrl: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      dispatch(
        editShopProduct({
          ...product,
          image: imageUrl,
        })
      );
    }
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setSubCategory("all");
    setCurrentPage(1);
  };

  const toggleSelectProduct = (id: number) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pId) => pId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedProducts.length === paginatedProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(paginatedProducts.map((p) => p.id));
    }
  };

  React.useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const getNutritionIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "nuts":
        return <FaAppleAlt className="text-amber-500" />;
      case "dairy":
        return <FaCheese className="text-yellow-500" />;
      case "oils":
        return <FaBacon className="text-yellow-600" />;
      case "grains":
        return <FaBreadSlice className="text-amber-600" />;
      case "sweeteners":
        return <FaAppleAlt className="text-red-500" />;
      default:
        return <FaFish className="text-blue-500" />;
    }
  };

  if (status === "loading") {
    return <SkeletonLoader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
                <FaBox className="text-white/90" />
                Shop Products
              </h1>
              <p className="text-emerald-100 text-lg">
                Manage and view all products in shop
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg hover:bg-white/30 transition-all duration-200 flex items-center gap-2"
                title="Refresh"
              >
                <FaSortAmountDown className="text-lg" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              {/* <button
                onClick={() => {
                  // Add export logic here
                  console.log("Exporting products...");
                }}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg hover:bg-white/30 transition-all duration-200 flex items-center gap-2"
                title="Export"
              >
                <FaChartBar className="text-lg" />
                <span className="hidden sm:inline">Export</span>
              </button> */}
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className={`px-4 py-2 ${
                  filterOpen ? "bg-white/30" : "bg-white/20"
                } backdrop-blur-sm border border-white/30 text-white rounded-lg hover:bg-white/30 transition-all duration-200 flex items-center gap-2`}
                title="Filters"
              >
                <FaFilter className="text-lg" />
                <span className="hidden sm:inline">Filters</span>
              </button>
              <button
                onClick={() => openModal()}
                className="px-4 py-2 bg-white text-emerald-700 font-medium rounded-lg hover:bg-emerald-50 transition-all duration-200 shadow-md flex items-center gap-2"
              >
                <FaPlus className="text-lg" />
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
                <FaBox className="text-emerald-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-emerald-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Filtered</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {filteredProducts.length}
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <FaFilter className="text-emerald-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Low Stock</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {products.filter((p) => p.stock < 10).length}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <FaTimes className="text-red-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Categories</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {categories.length - 1}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FaChartBar className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {filterOpen && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 transform transition-all duration-300 ease-in-out animate-fadeIn">
            <div className="flex items-center mb-4">
              <FaFilter className="text-gray-500 mr-2" />
              <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === "all" ? "All Categories" : cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sub-Category
                </label>
                <select
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                >
                  {subCategories.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub === "all" ? "All Sub-Categories" : sub}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price">Sort by Price</option>
                  <option value="stock">Sort by Stock</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={clearFilters}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Reset
              </button>
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200">
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Search and Table Container */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search products by name..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className={`px-4 py-2 ${
                    filterOpen
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  } rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-2`}
                >
                  <FaFilter />
                  <span className="hidden sm:inline">Filters</span>
                </button>
                <button
                  className={`px-4 py-2 ${
                    viewMode === "card"
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  } rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-2`}
                  onClick={() => setViewMode("card")}
                >
                  <FaTh />
                  <span className="hidden sm:inline">Card</span>
                </button>
                <button
                  className={`px-4 py-2 ${
                    viewMode === "table"
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  } rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-2`}
                  onClick={() => setViewMode("table")}
                >
                  <FaList />
                  <span className="hidden sm:inline">Table</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedProducts.length > 0 && (
            <div className="px-6 py-3 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-emerald-800 font-medium">
                  {selectedProducts.length} products selected
                </span>
              </div>
              <button
                onClick={handleBulkDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center gap-2"
              >
                <FaTrash />
                Delete Selected
              </button>
            </div>
          )}

          {/* Product Display */}
          {paginatedProducts.length > 0 ? (
            <>
              {viewMode === "card" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                  {paginatedProducts.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      isSelected={selectedProducts.includes(p.id)}
                      onToggleSelect={() => toggleSelectProduct(p.id)}
                      onEdit={() => openModal(p)}
                      onDelete={() => handleDelete(p)}
                      onImageChange={(imageUrl) =>
                        handleProductImageChange(p.id, imageUrl)
                      }
                    />
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <input
                            type="checkbox"
                            className="w-5 h-5 text-emerald-600 bg-white border-gray-300 rounded focus:ring-emerald-500"
                            checked={
                              selectedProducts.length ===
                                paginatedProducts.length &&
                              paginatedProducts.length > 0
                            }
                            onChange={toggleSelectAll}
                          />
                        </th>
                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nutrition
                        </th>
                        <th className="p-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {paginatedProducts.map((p) => (
                        <tr
                          key={p.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="p-3">
                            <input
                              type="checkbox"
                              className="w-5 h-5 text-emerald-600 bg-white border-gray-300 rounded focus:ring-emerald-500"
                              checked={selectedProducts.includes(p.id)}
                              onChange={() => toggleSelectProduct(p.id)}
                            />
                          </td>
                          <td className="p-3">
                            <div className="flex items-center">
                              <div className="rounded-lg overflow-hidden mr-4 bg-gray-100 flex-shrink-0">
                                <ImageUpload
                                  initialImage={p.image}
                                  onImageChange={(imageUrl) =>
                                    handleProductImageChange(p.id, imageUrl)
                                  }
                                  size="md"
                                />
                              </div>
                              <div>
                                <div className="font-semibold text-gray-800">
                                  {p.name}
                                </div>
                                <div className="text-sm text-gray-500 truncate max-w-xs">
                                  {p.description}
                                </div>
                                <div className="flex items-center mt-1">
                                  {[...Array(5)].map((_, i) => (
                                    <FaStar
                                      key={i}
                                      className={`text-xs ${
                                        i < Math.floor(p.rating || 4)
                                          ? "text-yellow-400"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                  <span className="text-xs text-gray-500 ml-1">
                                    ({p.rating || 4.5})
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex flex-col gap-1">
                              <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-800">
                                {p.category}
                              </span>
                              <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                {p.subCategory}
                              </span>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-start gap-3">
                              {p.nutrition.image && (
                                <div className="rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                  <ImageUpload
                                    initialImage={p.nutrition.image}
                                    onImageChange={(imageUrl) =>
                                      handleProductImageChange(
                                        p.nutrition.id,
                                        imageUrl
                                      )
                                    }
                                    size="md"
                                  />
                                </div>
                              )}
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-1 mb-1">
                                  {getNutritionIcon(p.category)}
                                  <span className="text-sm font-medium text-gray-700">
                                    Nutrition Facts
                                  </span>
                                </div>
                                <div className="grid grid-cols-2 gap-1 text-xs">
                                  <div className="flex items-center gap-1">
                                    <FaFire className="text-orange-500" />
                                    <span className="text-gray-600">
                                      {p.nutrition.calories} cal
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <FaBacon className="text-yellow-500" />
                                    <span className="text-gray-600">
                                      {p.nutrition.fat}g
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <FaBreadSlice className="text-amber-500" />
                                    <span className="text-gray-600">
                                      {p.nutrition.carb}g
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <FaEgg className="text-red-500" />
                                    <span className="text-gray-600">
                                      {p.nutrition.protein}g
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => openModal(p)}
                              className="text-emerald-500 hover:text-emerald-700 p-2 rounded-full hover:bg-emerald-100 transition-colors"
                              title="Edit"
                            >
                              <FaEdit className="text-xl" />
                            </button>
                            <button
                              onClick={() => handleDelete(p)}
                              className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition-colors ml-2"
                              title="Delete"
                            >
                              <FaTrash className="text-xl" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          ) : (
            <div className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                <FaBox className="text-gray-400 text-3xl" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Try adjusting your search or filter criteria, or add a new
                product to get started.
              </p>
              <button
                className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors inline-flex items-center gap-2 transform hover:scale-105"
                onClick={() => openModal()}
              >
                <FaPlus /> Add Your First Product
              </button>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-6 bg-white rounded-xl shadow-lg p-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={filteredProducts.length}
              perPage={perPage}
            />
          </div>
        )}
      </div>

      <ShopProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        product={editProduct}
      />

      <DeleteProductModal open={deleteModalOpen} onClose={closeDeleteModal} />
    </div>
  );
};

export default ShopProductsPage;
