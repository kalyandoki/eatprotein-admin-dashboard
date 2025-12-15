// // src/modules/shop/tags/components/EditTagModal.tsx
// import React, { useState, useEffect } from "react";
// import { useAppDispatch } from "../../../../store/hooks";
// import { editTag, Tag } from "../tagsSlice";
// import { FiX } from "react-icons/fi";

// export default function EditTagModal({
//   tag,
//   onClose,
// }: {
//   tag: Tag;
//   onClose: () => void;
// }) {
//   const dispatch = useAppDispatch();
//   const [form, setForm] = useState<Tag>(tag);
//   const [errors, setErrors] = useState({
//     name: "",
//     description: "",
//     category: "",
//     usageCount: "",
//   });

//   useEffect(() => {
//     setForm(tag);
//     setErrors({ name: "", description: "", category: "", usageCount: "" });
//   }, [tag]);

//   const validateForm = () => {
//     let isValid = true;
//     const newErrors = {
//       name: "",
//       description: "",
//       category: "",
//       usageCount: "",
//     };

//     if (!form.name.trim()) {
//       newErrors.name = "Tag name is required";
//       isValid = false;
//     }

//     if (!form.description.trim()) {
//       newErrors.description = "Description is required";
//       isValid = false;
//     }

//     if (!form.category.trim()) {
//       newErrors.category = "Category is required";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSave = () => {
//     if (!validateForm()) return;

//     dispatch(editTag(form));
//     onClose();
//   };

//   const handleClose = () => {
//     setForm(tag);
//     setErrors({ name: "", description: "", category: "", usageCount: "" });
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all">
//         <div className="bg-[#258440] text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
//           <h2 className="text-xl font-semibold">Edit Tag</h2>
//           <button
//             onClick={handleClose}
//             className="text-white hover:text-gray-200"
//           >
//             <FiX className="text-xl" />
//           </button>
//         </div>

//         <div className="p-6">
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Tag Name
//             </label>
//             <input
//               className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
//                 errors.name ? "border-[#D7201A]" : "border-gray-300"
//               }`}
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//             />
//             {errors.name && (
//               <p className="mt-1 text-sm text-[#D7201A]">{errors.name}</p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Description
//             </label>
//             <textarea
//               className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
//                 errors.description ? "border-[#D7201A]" : "border-gray-300"
//               }`}
//               rows={3}
//               value={form.description}
//               onChange={(e) =>
//                 setForm({ ...form, description: e.target.value })
//               }
//             />
//             {errors.description && (
//               <p className="mt-1 text-sm text-[#D7201A]">
//                 {errors.description}
//               </p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Category
//             </label>
//             <input
//               className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
//                 errors.category ? "border-[#D7201A]" : "border-gray-300"
//               }`}
//               value={form.category}
//               onChange={(e) => setForm({ ...form, category: e.target.value })}
//             />
//             {errors.category && (
//               <p className="mt-1 text-sm text-[#D7201A]">{errors.category}</p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               User Count
//             </label>
//             <input
//               type="number"
//               className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
//                 errors.usageCount ? "border-[#D7201A]" : "border-gray-300"
//               }`}
//               value={form.usageCount}
//               onChange={(e) =>
//                 setForm({ ...form, usageCount: Number(e.target.value) })
//               }
//             />
//             {errors.usageCount && (
//               <p className="mt-1 text-sm text-[#D7201A]">{errors.usageCount}</p>
//             )}
//           </div>

//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Status
//             </label>
//             <div className="flex space-x-4">
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   name="status"
//                   value="Active"
//                   checked={form.status === "Active"}
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       status: e.target.value as "Active" | "Inactive",
//                     })
//                   }
//                   className="h-4 w-4 text-[#258440] focus:ring-[#258440] border-gray-300"
//                 />
//                 <span className="ml-2 text-sm text-gray-700">Active</span>
//               </label>
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   name="status"
//                   value="Inactive"
//                   checked={form.status === "Inactive"}
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       status: e.target.value as "Active" | "Inactive",
//                     })
//                   }
//                   className="h-4 w-4 text-[#258440] focus:ring-[#258440] border-gray-300"
//                 />
//                 <span className="ml-2 text-sm text-gray-700">Inactive</span>
//               </label>
//             </div>
//           </div>

//           <div className="flex justify-end gap-3">
//             <button
//               onClick={handleClose}
//               className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSave}
//               className="px-4 py-2 bg-[#258440] text-white rounded-lg hover:bg-[#1E803A] transition-colors duration-200"
//             >
//               Update Tag
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // src/modules/shop/tags/components/EditTagModal.tsx
// import React, { useState, useEffect, useMemo } from "react";
// import { useAppDispatch } from "../../../../store/hooks";
// import { editTag, Tag, Product } from "../tagsSlice";
// import {
//   FiX,
//   FiPlus,
//   FiTrash2,
//   FiSearch,
//   FiPackage,
//   FiCheck,
// } from "react-icons/fi";

// // Mock products for selection (in a real app, these would come from an API)
// const availableProducts: Product[] = Array.from({ length: 1000 }, (_, i) => ({
//   id: `p${i + 1}`,
//   name: `Product ${i + 1}`,
//   sku: `SKU${String(i + 1).padStart(4, "0")}`,
//   price: Math.floor(Math.random() * 100) + 10,
//   image: `https://picsum.photos/seed/product${i + 1}/200/200.jpg`,
// }));

// export default function EditTagModal({
//   tag,
//   onClose,
// }: {
//   tag: Tag;
//   onClose: () => void;
// }) {
//   const dispatch = useAppDispatch();
//   const [form, setForm] = useState<Tag>(tag);
//   const [errors, setErrors] = useState({
//     name: "",
//     description: "",
//     products: "",
//   });
//   const [showProductSelector, setShowProductSelector] = useState(false);
//   const [productSearch, setProductSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectAll, setSelectAll] = useState(false);
//   const productsPerPage = 20; // Number of products to show per page

//   useEffect(() => {
//     setForm(tag);
//     setErrors({ name: "", description: "", products: "" });
//   }, [tag]);

//   // Filter products based on search query
//   const filteredProducts = useMemo(() => {
//     if (!productSearch.trim()) return availableProducts;

//     const searchLower = productSearch.toLowerCase();
//     return availableProducts.filter(
//       (product) =>
//         product.name.toLowerCase().includes(searchLower) ||
//         product.sku.toLowerCase().includes(searchLower)
//     );
//   }, [productSearch]);

//   // Calculate pagination
//   const totalProducts = filteredProducts.length;
//   const totalPages = Math.ceil(totalProducts / productsPerPage);
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = filteredProducts.slice(
//     indexOfFirstProduct,
//     indexOfLastProduct
//   );

//   // Reset to first page when search changes
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [productSearch]);

//   const validateForm = () => {
//     let isValid = true;
//     const newErrors = { name: "", description: "", products: "" };

//     if (!form.name.trim()) {
//       newErrors.name = "Tag name is required";
//       isValid = false;
//     }

//     if (!form.description.trim()) {
//       newErrors.description = "Description is required";
//       isValid = false;
//     }

//     if (form.products.length === 0) {
//       newErrors.products = "At least one product is required";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSave = () => {
//     if (!validateForm()) return;

//     dispatch(editTag(form));
//     onClose();
//   };

//   const handleClose = () => {
//     setForm(tag);
//     setErrors({ name: "", description: "", products: "" });
//     onClose();
//   };

//   const addProduct = (product: Product) => {
//     if (!form.products.find((p) => p.id === product.id)) {
//       setForm({
//         ...form,
//         products: [...form.products, product],
//       });
//     }
//   };

//   const removeProduct = (productId: string) => {
//     setForm({
//       ...form,
//       products: form.products.filter((p) => p.id !== productId),
//     });
//   };

//   const toggleProductSelection = (product: Product) => {
//     const isSelected = form.products.some((p) => p.id === product.id);
//     if (isSelected) {
//       removeProduct(product.id);
//     } else {
//       addProduct(product);
//     }
//   };

//   const handleSelectAll = () => {
//     if (selectAll) {
//       // Deselect all current products
//       setForm({
//         ...form,
//         products: form.products.filter(
//           (p) => !currentProducts.some((cp) => cp.id === p.id)
//         ),
//       });
//     } else {
//       // Select all current products
//       const newProducts = currentProducts.filter(
//         (cp) => !form.products.some((p) => p.id === cp.id)
//       );
//       setForm({
//         ...form,
//         products: [...form.products, ...newProducts],
//       });
//     }
//     setSelectAll(!selectAll);
//   };

//   // Check if all current products are selected
//   useEffect(() => {
//     const allCurrentSelected = currentProducts.every((cp) =>
//       form.products.some((p) => p.id === cp.id)
//     );
//     setSelectAll(allCurrentSelected);
//   }, [currentProducts, form.products]);

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden transform transition-all">
//         <div className="bg-[#258440] text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
//           <h2 className="text-xl font-semibold">Edit Tag</h2>
//           <button
//             onClick={handleClose}
//             className="text-white hover:text-gray-200"
//           >
//             <FiX className="text-xl" />
//           </button>
//         </div>

//         <div className="p-6 overflow-y-auto max-h-[calc(90vh-70px)]">
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Tag Name
//             </label>
//             <input
//               className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
//                 errors.name ? "border-[#D7201A]" : "border-gray-300"
//               }`}
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//             />
//             {errors.name && (
//               <p className="mt-1 text-sm text-[#D7201A]">{errors.name}</p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Description
//             </label>
//             <textarea
//               className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
//                 errors.description ? "border-[#D7201A]" : "border-gray-300"
//               }`}
//               rows={3}
//               value={form.description}
//               onChange={(e) =>
//                 setForm({ ...form, description: e.target.value })
//               }
//             />
//             {errors.description && (
//               <p className="mt-1 text-sm text-[#D7201A]">
//                 {errors.description}
//               </p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Products
//             </label>
//             <div className="flex items-center justify-between mb-2">
//               <span className="text-sm text-gray-500">
//                 {form.products.length} product(s) selected
//               </span>
//               <button
//                 type="button"
//                 onClick={() => setShowProductSelector(!showProductSelector)}
//                 className="px-3 py-1 bg-[#258440] text-white text-sm rounded hover:bg-[#1E803A] transition-colors duration-200 flex items-center gap-1"
//               >
//                 <FiPlus className="text-sm" />
//                 {showProductSelector ? "Hide Products" : "Add Products"}
//               </button>
//             </div>

//             {errors.products && (
//               <p className="mt-1 text-sm text-[#D7201A]">{errors.products}</p>
//             )}

//             {form.products.length > 0 && (
//               <div className="mt-3 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-2">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                   {form.products.map((product) => (
//                     <div
//                       key={product.id}
//                       className="flex items-center justify-between bg-gray-50 p-2 rounded"
//                     >
//                       <div className="flex items-center gap-2">
//                         <img
//                           src={product.image}
//                           alt={product.name}
//                           className="h-8 w-8 rounded object-cover"
//                         />
//                         <div className="min-w-0 flex-1">
//                           <p className="text-sm font-medium text-gray-900 truncate">
//                             {product.name}
//                           </p>
//                           <p className="text-xs text-gray-500 truncate">
//                             {product.sku}
//                           </p>
//                         </div>
//                       </div>
//                       <button
//                         type="button"
//                         onClick={() => removeProduct(product.id)}
//                         className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50"
//                       >
//                         <FiTrash2 className="text-sm" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {showProductSelector && (
//             <div className="mb-4 p-4 border border-gray-200 rounded-lg">
//               <div className="flex items-center justify-between mb-3">
//                 <h3 className="font-medium text-gray-900 flex items-center gap-2">
//                   <FiPackage className="text-lg" />
//                   Select Products
//                 </h3>
//                 <div className="text-sm text-gray-500">
//                   Showing {indexOfFirstProduct + 1}-
//                   {Math.min(indexOfLastProduct, totalProducts)} of{" "}
//                   {totalProducts} products
//                 </div>
//               </div>

//               {/* Search Bar */}
//               <div className="relative mb-4">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FiSearch className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Search products by name or SKU..."
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent"
//                   value={productSearch}
//                   onChange={(e) => setProductSearch(e.target.value)}
//                 />
//               </div>

//               {/* Select All Checkbox */}
//               <div className="mb-3 flex items-center">
//                 <input
//                   type="checkbox"
//                   id="selectAll"
//                   checked={selectAll}
//                   onChange={handleSelectAll}
//                   className="h-4 w-4 text-[#258440] focus:ring-[#258440] border-gray-300 rounded"
//                 />
//                 <label
//                   htmlFor="selectAll"
//                   className="ml-2 text-sm text-gray-700"
//                 >
//                   Select all {currentProducts.length} products on this page
//                 </label>
//               </div>

//               {/* Product List */}
//               <div className="max-h-80 overflow-y-auto border border-gray-200 rounded-lg">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50 sticky top-0">
//                     <tr>
//                       <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Select
//                       </th>
//                       <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Product
//                       </th>
//                       <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         SKU
//                       </th>
//                       <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Price
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {currentProducts.length === 0 ? (
//                       <tr>
//                         <td
//                           colSpan={4}
//                           className="px-4 py-8 text-center text-sm text-gray-500"
//                         >
//                           No products found matching your search.
//                         </td>
//                       </tr>
//                     ) : (
//                       currentProducts.map((product) => {
//                         const isSelected = form.products.some(
//                           (p) => p.id === product.id
//                         );
//                         return (
//                           <tr
//                             key={product.id}
//                             className={`hover:bg-gray-50 cursor-pointer ${
//                               isSelected ? "bg-green-50" : ""
//                             }`}
//                             onClick={() => toggleProductSelection(product)}
//                           >
//                             <td className="px-4 py-2 whitespace-nowrap">
//                               <input
//                                 type="checkbox"
//                                 checked={isSelected}
//                                 onChange={() => toggleProductSelection(product)}
//                                 className="h-4 w-4 text-[#258440] focus:ring-[#258440] border-gray-300 rounded"
//                               />
//                             </td>
//                             <td className="px-4 py-2 whitespace-nowrap">
//                               <div className="flex items-center">
//                                 <img
//                                   src={product.image}
//                                   alt={product.name}
//                                   className="h-8 w-8 rounded object-cover mr-3"
//                                 />
//                                 <div className="text-sm font-medium text-gray-900">
//                                   {product.name}
//                                 </div>
//                               </div>
//                             </td>
//                             <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
//                               {product.sku}
//                             </td>
//                             <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
//                               ${product.price.toFixed(2)}
//                             </td>
//                           </tr>
//                         );
//                       })
//                     )}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Pagination */}
//               {totalPages > 1 && (
//                 <div className="mt-4 flex items-center justify-between">
//                   <div className="text-sm text-gray-700">
//                     Page {currentPage} of {totalPages}
//                   </div>
//                   <div className="flex gap-1">
//                     <button
//                       onClick={() => handlePageChange(currentPage - 1)}
//                       disabled={currentPage === 1}
//                       className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       Previous
//                     </button>
//                     <button
//                       onClick={() => handlePageChange(currentPage + 1)}
//                       disabled={currentPage === totalPages}
//                       className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       Next
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Usage Count
//             </label>
//             <input
//               type="number"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200"
//               value={form.usageCount}
//               onChange={(e) =>
//                 setForm({ ...form, usageCount: Number(e.target.value) })
//               }
//             />
//           </div>

//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Status
//             </label>
//             <div className="flex space-x-4">
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   name="status"
//                   value="Active"
//                   checked={form.status === "Active"}
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       status: e.target.value as "Active" | "Inactive",
//                     })
//                   }
//                   className="h-4 w-4 text-[#258440] focus:ring-[#258440] border-gray-300"
//                 />
//                 <span className="ml-2 text-sm text-gray-700">Active</span>
//               </label>
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   name="status"
//                   value="Inactive"
//                   checked={form.status === "Inactive"}
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       status: e.target.value as "Active" | "Inactive",
//                     })
//                   }
//                   className="h-4 w-4 text-[#258440] focus:ring-[#258440] border-gray-300"
//                 />
//                 <span className="ml-2 text-sm text-gray-700">Inactive</span>
//               </label>
//             </div>
//           </div>

//           <div className="flex justify-end gap-3">
//             <button
//               onClick={handleClose}
//               className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSave}
//               className="px-4 py-2 bg-[#258440] text-white rounded-lg hover:bg-[#1E803A] transition-colors duration-200"
//             >
//               Update Tag
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/modules/shop/tags/components/EditTagModal.tsx
import React, { useState, useEffect, useMemo } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { editTag, Tag, Product } from "../tagsSlice";
import {
  FiX,
  FiPlus,
  FiTrash2,
  FiSearch,
  FiPackage,
  FiCheck,
  FiChevronDown,
  FiFilter,
} from "react-icons/fi";

// Define categories and subcategories
const categories = [
  {
    id: "supplements",
    name: "Supplements",
    subcategories: [
      { id: "protein", name: "Protein" },
      { id: "vitamins", name: "Vitamins" },
      { id: "pre-workout", name: "Pre-Workout" },
      { id: "bcaa", name: "BCAA" },
    ],
  },
  {
    id: "nutrition",
    name: "Nutrition",
    subcategories: [
      { id: "bars", name: "Protein Bars" },
      { id: "snacks", name: "Healthy Snacks" },
      { id: "drinks", name: "Health Drinks" },
    ],
  },
  {
    id: "apparel",
    name: "Apparel",
    subcategories: [
      { id: "mens", name: "Men's" },
      { id: "womens", name: "Women's" },
      { id: "accessories", name: "Accessories" },
    ],
  },
  {
    id: "equipment",
    name: "Equipment",
    subcategories: [
      { id: "weights", name: "Weights" },
      { id: "mats", name: "Exercise Mats" },
      { id: "resistance", name: "Resistance Bands" },
    ],
  },
];

// Mock products for selection with categories and subcategories
const availableProducts: Product[] = Array.from({ length: 1000 }, (_, i) => {
  const category = categories[Math.floor(Math.random() * categories.length)];
  const subcategory =
    category.subcategories[
      Math.floor(Math.random() * category.subcategories.length)
    ];

  return {
    id: `p${i + 1}`,
    name: `Product ${i + 1}`,
    sku: `SKU${String(i + 1).padStart(4, "0")}`,
    price: Math.floor(Math.random() * 100) + 10,
    image: `https://picsum.photos/seed/product${i + 1}/200/200.jpg`,
    category: category.id,
    categoryName: category.name,
    subcategory: subcategory.id,
    subcategoryName: subcategory.name,
  };
});

export default function EditTagModal({
  tag,
  onClose,
}: {
  tag: Tag;
  onClose: () => void;
}) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<Tag>(tag);
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    products: "",
  });
  const [showProductSelector, setShowProductSelector] = useState(false);
  const [productSearch, setProductSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    []
  );
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const productsPerPage = 20; // Number of products to show per page

  useEffect(() => {
    setForm(tag);
    setErrors({ name: "", description: "", products: "" });
  }, [tag]);

  // Filter products based on search query and categories
  const filteredProducts = useMemo(() => {
    let products = [...availableProducts];

    // Apply search filter
    if (productSearch.trim()) {
      const searchLower = productSearch.toLowerCase();
      products = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.sku.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      products = products.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Apply subcategory filter
    if (selectedSubcategories.length > 0) {
      products = products.filter((product) =>
        selectedSubcategories.includes(product.subcategory)
      );
    }

    return products;
  }, [productSearch, selectedCategories, selectedSubcategories]);

  // Calculate pagination
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Reset to first page when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [productSearch, selectedCategories, selectedSubcategories]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", description: "", products: "" };

    if (!form.name.trim()) {
      newErrors.name = "Tag name is required";
      isValid = false;
    }

    if (!form.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }

    if (form.products.length === 0) {
      newErrors.products = "At least one product is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    dispatch(editTag(form));
    onClose();
  };

  const handleClose = () => {
    setForm(tag);
    setErrors({ name: "", description: "", products: "" });
    onClose();
  };

  const addProduct = (product: Product) => {
    if (!form.products.find((p) => p.id === product.id)) {
      setForm({
        ...form,
        products: [...form.products, product],
      });
    }
  };

  const removeProduct = (productId: string) => {
    setForm({
      ...form,
      products: form.products.filter((p) => p.id !== productId),
    });
  };

  const toggleProductSelection = (product: Product) => {
    const isSelected = form.products.some((p) => p.id === product.id);
    if (isSelected) {
      removeProduct(product.id);
    } else {
      addProduct(product);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      // Deselect all current products
      setForm({
        ...form,
        products: form.products.filter(
          (p) => !currentProducts.some((cp) => cp.id === p.id)
        ),
      });
    } else {
      // Select all current products
      const newProducts = currentProducts.filter(
        (cp) => !form.products.some((p) => p.id === cp.id)
      );
      setForm({
        ...form,
        products: [...form.products, ...newProducts],
      });
    }
    setSelectAll(!selectAll);
  };

  // Check if all current products are selected
  useEffect(() => {
    const allCurrentSelected = currentProducts.every((cp) =>
      form.products.some((p) => p.id === cp.id)
    );
    setSelectAll(allCurrentSelected);
  }, [currentProducts, form.products]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleCategoryFilter = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const toggleSubcategoryFilter = (subcategoryId: string) => {
    if (selectedSubcategories.includes(subcategoryId)) {
      setSelectedSubcategories(
        selectedSubcategories.filter((id) => id !== subcategoryId)
      );
    } else {
      setSelectedSubcategories([...selectedSubcategories, subcategoryId]);
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSubcategories([]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[95vh] overflow-hidden transform transition-all">
        <div className="bg-gradient-to-r from-[#258440] to-[#1E803A] text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
          <h2 className="text-xl font-semibold">Edit Tag</h2>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(95vh-70px)]">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tag Name
            </label>
            <input
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
                errors.name ? "border-[#D7201A]" : "border-gray-300"
              }`}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-[#D7201A]">{errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
                errors.description ? "border-[#D7201A]" : "border-gray-300"
              }`}
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            {errors.description && (
              <p className="mt-1 text-sm text-[#D7201A]">
                {errors.description}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Products
            </label>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">
                {form.products.length} product(s) selected
              </span>
              <button
                type="button"
                onClick={() => setShowProductSelector(!showProductSelector)}
                className="px-3 py-1 bg-[#258440] text-white text-sm rounded hover:bg-[#1E803A] transition-colors duration-200 flex items-center gap-1"
              >
                <FiPlus className="text-sm" />
                {showProductSelector ? "Hide Products" : "Add Products"}
              </button>
            </div>

            {errors.products && (
              <p className="mt-1 text-sm text-[#D7201A]">{errors.products}</p>
            )}

            {form.products.length > 0 && (
              <div className="mt-3 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {form.products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between bg-gray-50 p-2 rounded"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-8 w-8 rounded object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {product.sku}
                          </p>
                          <div className="flex items-center gap-1">
                            <span className="text-xs bg-gray-200 text-gray-700 px-1 py-0.5 rounded">
                              {product.categoryName}
                            </span>
                            <span className="text-xs bg-gray-200 text-gray-700 px-1 py-0.5 rounded">
                              {product.subcategoryName}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeProduct(product.id)}
                        className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50"
                      >
                        <FiTrash2 className="text-sm" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {showProductSelector && (
            <div className="mb-4 p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900 flex items-center gap-2">
                  <FiPackage className="text-lg" />
                  Select Products
                </h3>
                <div className="text-sm text-gray-500">
                  Showing {indexOfFirstProduct + 1}-
                  {Math.min(indexOfLastProduct, totalProducts)} of{" "}
                  {totalProducts} products
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search products by name or SKU..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                />
              </div>

              {/* Category Filter */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  {/* <button
                    type="button"
                    onClick={() => setShowCategoryFilter(!showCategoryFilter)}
                    className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    <FiFilter className="text-sm" />
                    Filter by Category
                  </button> */}
                  <button
                    type="button"
                    onClick={() => setShowCategoryFilter(!showCategoryFilter)}
                    className={`flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 ${
                      showCategoryFilter
                        ? "bg-[#258440] text-white shadow-md"
                        : selectedCategories.length > 0 ||
                          selectedSubcategories.length > 0
                        ? "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                    }`}
                  >
                    <FiFilter className="text-sm" />
                    <span>Filter by Category</span>

                    {/* Active filters count badge */}
                    {(selectedCategories.length > 0 ||
                      selectedSubcategories.length > 0) && (
                      <span
                        className={`inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold rounded-full ${
                          showCategoryFilter
                            ? "bg-white text-[#258440]"
                            : "bg-blue-600 text-white"
                        }`}
                      >
                        {selectedCategories.length +
                          selectedSubcategories.length}
                      </span>
                    )}

                    {/* Expand/Collapse indicator */}
                    <FiChevronDown
                      className={`text-sm transition-transform duration-200 ${
                        showCategoryFilter ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {(selectedCategories.length > 0 ||
                    selectedSubcategories.length > 0) && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="text-sm text-[#258440] hover:text-[#1E803A]"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>

                {showCategoryFilter && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {categories.map((category) => (
                        <div key={category.id} className="mb-2">
                          <div className="flex items-center mb-2">
                            <input
                              type="checkbox"
                              id={`category-${category.id}`}
                              checked={selectedCategories.includes(category.id)}
                              onChange={() => toggleCategoryFilter(category.id)}
                              className="h-4 w-4 text-[#258440] focus:ring-[#258440] border-gray-300 rounded mr-2"
                            />
                            <label
                              htmlFor={`category-${category.id}`}
                              className="text-sm font-medium text-gray-700"
                            >
                              {category.name}
                            </label>
                          </div>
                          <div className="ml-6 space-y-1">
                            {category.subcategories.map((subcategory) => (
                              <div
                                key={subcategory.id}
                                className="flex items-center"
                              >
                                <input
                                  type="checkbox"
                                  id={`subcategory-${subcategory.id}`}
                                  checked={selectedSubcategories.includes(
                                    subcategory.id
                                  )}
                                  onChange={() =>
                                    toggleSubcategoryFilter(subcategory.id)
                                  }
                                  className="h-4 w-4 text-[#258440] focus:ring-[#258440] border-gray-300 rounded mr-2"
                                />
                                <label
                                  htmlFor={`subcategory-${subcategory.id}`}
                                  className="text-sm text-gray-600"
                                >
                                  {subcategory.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Select All Checkbox */}
              <div className="mb-3 flex items-center">
                <input
                  type="checkbox"
                  id="selectAll"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="h-4 w-4 text-[#258440] focus:ring-[#258440] border-gray-300 rounded"
                />
                <label
                  htmlFor="selectAll"
                  className="ml-2 text-sm text-gray-700"
                >
                  Select all {currentProducts.length} products on this page
                </label>
              </div>

              {/* Product List */}
              <div className="max-h-80 overflow-y-auto border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Select
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        SKU
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentProducts.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-4 py-8 text-center text-sm text-gray-500"
                        >
                          No products found matching your search or filters.
                        </td>
                      </tr>
                    ) : (
                      currentProducts.map((product) => {
                        const isSelected = form.products.some(
                          (p) => p.id === product.id
                        );
                        return (
                          <tr
                            key={product.id}
                            className={`hover:bg-gray-50 cursor-pointer ${
                              isSelected ? "bg-green-50" : ""
                            }`}
                            onClick={() => toggleProductSelection(product)}
                          >
                            <td className="px-4 py-2 whitespace-nowrap">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleProductSelection(product)}
                                className="h-4 w-4 text-[#258440] focus:ring-[#258440] border-gray-300 rounded"
                              />
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">
                              <div className="flex items-center">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="h-8 w-8 rounded object-cover mr-3"
                                />
                                <div className="text-sm font-medium text-gray-900">
                                  {product.name}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                              {product.sku}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">
                              <div className="flex items-center gap-1">
                                <span className="text-xs bg-blue-100 text-blue-800 px-1 py-0.5 rounded">
                                  {product.categoryName}
                                </span>
                                <span className="text-xs bg-gray-100 text-gray-800 px-1 py-0.5 rounded">
                                  {product.subcategoryName}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                              ${product.price.toFixed(2)}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Usage Count
            </label>
            <input
              type="number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200"
              value={form.usageCount}
              onChange={(e) =>
                setForm({ ...form, usageCount: Number(e.target.value) })
              }
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="Active"
                  checked={form.status === "Active"}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      status: e.target.value as "Active" | "Inactive",
                    })
                  }
                  className="h-4 w-4 text-[#258440] focus:ring-[#258440] border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Active</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="Inactive"
                  checked={form.status === "Inactive"}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      status: e.target.value as "Active" | "Inactive",
                    })
                  }
                  className="h-4 w-4 text-[#258440] focus:ring-[#258440] border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Inactive</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={handleClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#258440] text-white rounded-lg hover:bg-[#1E803A] transition-colors duration-200"
            >
              Update Tag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
