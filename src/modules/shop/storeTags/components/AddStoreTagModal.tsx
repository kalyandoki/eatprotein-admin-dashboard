// // // // src/modules/shop/storeTags/components/AddStoreTagModal.tsx
// // // import React, { useState } from "react";
// // // import { useAppDispatch } from "../../../../store/hooks";
// // // import { addStoreTag, StoreTag } from "../storeTagsSlice";
// // // import { FiX } from "react-icons/fi";

// // // export default function AddStoreTagModal({ onClose }: { onClose: () => void }) {
// // //   const dispatch = useAppDispatch();
// // //   const [form, setForm] = useState<StoreTag>({
// // //     id: "",
// // //     name: "",
// // //     description: "",
// // //     store: "",
// // //     priority: "Medium",
// // //     status: "Active",
// // //   });

// // //   const [errors, setErrors] = useState({
// // //     name: "",
// // //     description: "",
// // //     store: "",
// // //   });

// // //   const stores = [
// // //     "Downtown Store",
// // //     "Airport Terminal",
// // //     "Mall Branch",
// // //     "Suburban Plaza",
// // //     "Highway Outlet",
// // //     "Parkside Store",
// // //     "Tech Hub",
// // //     "City Center",
// // //   ];

// // //   const validateForm = () => {
// // //     let isValid = true;
// // //     const newErrors = { name: "", description: "", store: "" };

// // //     if (!form.name.trim()) {
// // //       newErrors.name = "Tag name is required";
// // //       isValid = false;
// // //     }

// // //     if (!form.description.trim()) {
// // //       newErrors.description = "Description is required";
// // //       isValid = false;
// // //     }

// // //     if (!form.store.trim()) {
// // //       newErrors.store = "Store is required";
// // //       isValid = false;
// // //     }

// // //     setErrors(newErrors);
// // //     return isValid;
// // //   };

// // //   const handleSave = () => {
// // //     if (!validateForm()) return;

// // //     dispatch(addStoreTag(form));
// // //     onClose();
// // //     // Reset form
// // //     setForm({
// // //       id: "",
// // //       name: "",
// // //       description: "",
// // //       store: "",
// // //       priority: "Medium",
// // //       status: "Active",
// // //     });
// // //     setErrors({ name: "", description: "", store: "" });
// // //   };

// // //   const handleClose = () => {
// // //     setForm({
// // //       id: "",
// // //       name: "",
// // //       description: "",
// // //       store: "",
// // //       priority: "Medium",
// // //       status: "Active",
// // //     });
// // //     setErrors({ name: "", description: "", store: "" });
// // //     onClose();
// // //   };

// // //   return (
// // //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// // //       <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all">
// // //         <div className="bg-[#258440] text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
// // //           <h2 className="text-xl font-semibold">Add Store Tag</h2>
// // //           <button
// // //             onClick={handleClose}
// // //             className="text-white hover:text-gray-200"
// // //           >
// // //             <FiX className="text-xl" />
// // //           </button>
// // //         </div>

// // //         <div className="p-6">
// // //           <div className="mb-4">
// // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // //               Tag Name
// // //             </label>
// // //             <input
// // //               className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
// // //                 errors.name ? "border-[#D7201A]" : "border-gray-300"
// // //               }`}
// // //               placeholder="Enter tag name"
// // //               value={form.name}
// // //               onChange={(e) => setForm({ ...form, name: e.target.value })}
// // //             />
// // //             {errors.name && (
// // //               <p className="mt-1 text-sm text-[#D7201A]">{errors.name}</p>
// // //             )}
// // //           </div>

// // //           <div className="mb-4">
// // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // //               Description
// // //             </label>
// // //             <textarea
// // //               className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
// // //                 errors.description ? "border-[#D7201A]" : "border-gray-300"
// // //               }`}
// // //               rows={3}
// // //               placeholder="Enter description"
// // //               value={form.description}
// // //               onChange={(e) =>
// // //                 setForm({ ...form, description: e.target.value })
// // //               }
// // //             />
// // //             {errors.description && (
// // //               <p className="mt-1 text-sm text-[#D7201A]">
// // //                 {errors.description}
// // //               </p>
// // //             )}
// // //           </div>

// // //           <div className="mb-4">
// // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // //               Store
// // //             </label>
// // //             <select
// // //               className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
// // //                 errors.store ? "border-[#D7201A]" : "border-gray-300"
// // //               }`}
// // //               value={form.store}
// // //               onChange={(e) => setForm({ ...form, store: e.target.value })}
// // //             >
// // //               <option value="">Select Store</option>
// // //               {stores.map((store) => (
// // //                 <option key={store} value={store}>
// // //                   {store}
// // //                 </option>
// // //               ))}
// // //             </select>
// // //             {errors.store && (
// // //               <p className="mt-1 text-sm text-[#D7201A]">{errors.store}</p>
// // //             )}
// // //           </div>

// // //           <div className="mb-4">
// // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // //               Priority
// // //             </label>
// // //             <select
// // //               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200"
// // //               value={form.priority}
// // //               onChange={(e) =>
// // //                 setForm({ ...form, priority: e.target.value as any })
// // //               }
// // //             >
// // //               <option value="High">High</option>
// // //               <option value="Medium">Medium</option>
// // //               <option value="Low">Low</option>
// // //             </select>
// // //           </div>

// // //           <div className="mb-6">
// // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // //               Status
// // //             </label>
// // //             <div className="flex space-x-4">
// // //               <label className="flex items-center">
// // //                 <input
// // //                   type="radio"
// // //                   name="status"
// // //                   value="Active"
// // //                   checked={form.status === "Active"}
// // //                   onChange={(e) =>
// // //                     setForm({
// // //                       ...form,
// // //                       status: e.target.value as "Active" | "Inactive",
// // //                     })
// // //                   }
// // //                   className="h-4 w-4 text-[#258440] focus:ring-[#258440] border-gray-300"
// // //                 />
// // //                 <span className="ml-2 text-sm text-gray-700">Active</span>
// // //               </label>
// // //               <label className="flex items-center">
// // //                 <input
// // //                   type="radio"
// // //                   name="status"
// // //                   value="Inactive"
// // //                   checked={form.status === "Inactive"}
// // //                   onChange={(e) =>
// // //                     setForm({
// // //                       ...form,
// // //                       status: e.target.value as "Active" | "Inactive",
// // //                     })
// // //                   }
// // //                   className="h-4 w-4 text-[#258440] focus:ring-[#258440] border-gray-300"
// // //                 />
// // //                 <span className="ml-2 text-sm text-gray-700">Inactive</span>
// // //               </label>
// // //             </div>
// // //           </div>

// // //           <div className="flex justify-end gap-3">
// // //             <button
// // //               onClick={handleClose}
// // //               className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
// // //             >
// // //               Cancel
// // //             </button>
// // //             <button
// // //               onClick={handleSave}
// // //               className="px-4 py-2 bg-[#258440] text-white rounded-lg hover:bg-[#1E803A] transition-colors duration-200"
// // //             >
// // //               Add Store Tag
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // src/modules/shop/storeTags/components/AddStoreTagModal.tsx
// // import React, { useState, useEffect } from "react";
// // import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
// // import { addStoreTag, StoreTag, fetchStores } from "../storeTagsSlice";
// // import { FiX } from "react-icons/fi";

// // export default function AddStoreTagModal({ onClose }: { onClose: () => void }) {
// //   const dispatch = useAppDispatch();
// //   const { stores } = useAppSelector((state) => state.storeTags);
// //   const [form, setForm] = useState<StoreTag>({
// //     id: "",
// //     name: "",
// //     description: "",
// //     store: "",
// //     priority: "Medium",
// //     status: "Active",
// //     productsCount: 0,
// //     createdAt: "",
// //     updatedAt: "",
// //   });

// //   const [errors, setErrors] = useState({
// //     name: "",
// //     description: "",
// //     store: "",
// //   });

// //   useEffect(() => {
// //     dispatch(fetchStores());
// //   }, [dispatch]);

// //   const validateForm = () => {
// //     let isValid = true;
// //     const newErrors = { name: "", description: "", store: "" };

// //     if (!form.name.trim()) {
// //       newErrors.name = "Tag name is required";
// //       isValid = false;
// //     }

// //     if (!form.description.trim()) {
// //       newErrors.description = "Description is required";
// //       isValid = false;
// //     }

// //     if (!form.store.trim()) {
// //       newErrors.store = "Store is required";
// //       isValid = false;
// //     }

// //     setErrors(newErrors);
// //     return isValid;
// //   };

// //   const handleSave = () => {
// //     if (!validateForm()) return;

// //     dispatch(addStoreTag(form));
// //     onClose();
// //     // Reset form
// //     setForm({
// //       id: "",
// //       name: "",
// //       description: "",
// //       store: "",
// //       priority: "Medium",
// //       status: "Active",
// //       productsCount: 0,
// //       createdAt: "",
// //       updatedAt: "",
// //     });
// //     setErrors({ name: "", description: "", store: "" });
// //   };

// //   const handleClose = () => {
// //     setForm({
// //       id: "",
// //       name: "",
// //       description: "",
// //       store: "",
// //       priority: "Medium",
// //       status: "Active",
// //       productsCount: 0,
// //       createdAt: "",
// //       updatedAt: "",
// //     });
// //     setErrors({ name: "", description: "", store: "" });
// //     onClose();
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //       <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all">
// //         <div className="bg-[#258440] text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
// //           <h2 className="text-xl font-semibold">Add Store Tag</h2>
// //           <button
// //             onClick={handleClose}
// //             className="text-white hover:text-gray-200"
// //           >
// //             <FiX className="text-xl" />
// //           </button>
// //         </div>

// //         <div className="p-6">
// //           <div className="mb-4">
// //             <label className="block text-sm font-medium text-gray-700 mb-2">
// //               Tag Name
// //             </label>
// //             <input
// //               className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
// //                 errors.name ? "border-[#D7201A]" : "border-gray-300"
// //               }`}
// //               placeholder="Enter tag name"
// //               value={form.name}
// //               onChange={(e) => setForm({ ...form, name: e.target.value })}
// //             />
// //             {errors.name && (
// //               <p className="mt-1 text-sm text-[#D7201A]">{errors.name}</p>
// //             )}
// //           </div>

// //           <div className="mb-4">
// //             <label className="block text-sm font-medium text-gray-700 mb-2">
// //               Description
// //             </label>
// //             <textarea
// //               className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
// //                 errors.description ? "border-[#D7201A]" : "border-gray-300"
// //               }`}
// //               rows={3}
// //               placeholder="Enter description"
// //               value={form.description}
// //               onChange={(e) =>
// //                 setForm({ ...form, description: e.target.value })
// //               }
// //             />
// //             {errors.description && (
// //               <p className="mt-1 text-sm text-[#D7201A]">
// //                 {errors.description}
// //               </p>
// //             )}
// //           </div>

// //           <div className="mb-4">
// //             <label className="block text-sm font-medium text-gray-700 mb-2">
// //               Store
// //             </label>
// //             <select
// //               className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
// //                 errors.store ? "border-[#D7201A]" : "border-gray-300"
// //               }`}
// //               value={form.store}
// //               onChange={(e) => setForm({ ...form, store: e.target.value })}
// //             >
// //               <option value="">Select Store</option>
// //               {stores.map((store) => (
// //                 <option key={store.id} value={store.name}>
// //                   {store.name}
// //                 </option>
// //               ))}
// //             </select>
// //             {errors.store && (
// //               <p className="mt-1 text-sm text-[#D7201A]">{errors.store}</p>
// //             )}
// //           </div>

// //           <div className="mb-4">
// //             <label className="block text-sm font-medium text-gray-700 mb-2">
// //               Priority
// //             </label>
// //             <select
// //               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200"
// //               value={form.priority}
// //               onChange={(e) =>
// //                 setForm({ ...form, priority: e.target.value as any })
// //               }
// //             >
// //               <option value="High">High</option>
// //               <option value="Medium">Medium</option>
// //               <option value="Low">Low</option>
// //             </select>
// //           </div>

// //           <div className="mb-6">
// //             <label className="block text-sm font-medium text-gray-700 mb-2">
// //               Status
// //             </label>
// //             <div className="flex space-x-4">
// //               <label className="flex items-center">
// //                 <input
// //                   type="radio"
// //                   name="status"
// //                   value="Active"
// //                   checked={form.status === "Active"}
// //                   onChange={(e) =>
// //                     setForm({
// //                       ...form,
// //                       status: e.target.value as "Active" | "Inactive",
// //                     })
// //                   }
// //                   className="h-4 w-4 text-[#258440] focus:ring-[#258440] border-gray-300"
// //                 />
// //                 <span className="ml-2 text-sm text-gray-700">Active</span>
// //               </label>
// //               <label className="flex items-center">
// //                 <input
// //                   type="radio"
// //                   name="status"
// //                   value="Inactive"
// //                   checked={form.status === "Inactive"}
// //                   onChange={(e) =>
// //                     setForm({
// //                       ...form,
// //                       status: e.target.value as "Active" | "Inactive",
// //                     })
// //                   }
// //                   className="h-4 w-4 text-[#258440] focus:ring-[#258440] border-gray-300"
// //                 />
// //                 <span className="ml-2 text-sm text-gray-700">Inactive</span>
// //               </label>
// //             </div>
// //           </div>

// //           <div className="flex justify-end gap-3">
// //             <button
// //               onClick={handleClose}
// //               className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               onClick={handleSave}
// //               className="px-4 py-2 bg-[#258440] text-white rounded-lg hover:bg-[#1E803A] transition-colors duration-200"
// //             >
// //               Add Store Tag
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // src/modules/shop/storeTags/components/AddStoreTagModal.tsx
// import React, { useState, useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
// import {
//   addStoreTag,
//   StoreTag,
//   fetchStores,
//   fetchStoreCategories,
// } from "../storeTagsSlice";
// import {
//   FiX,
//   FiSearch,
//   FiFilter,
//   FiMapPin,
//   FiPackage,
//   FiCheck,
// } from "react-icons/fi";

// export default function AddStoreTagModal({ onClose }: { onClose: () => void }) {
//   const dispatch = useAppDispatch();
//   const { stores, storeCategories, status } = useAppSelector(
//     (state) => state.storeTags
//   );
//   const [form, setForm] = useState<StoreTag>({
//     id: "",
//     name: "",
//     description: "",
//     stores: [],
//     priority: "Medium",
//     status: "Active",
//     productsCount: 0,
//     createdAt: "",
//     updatedAt: "",
//   });

//   const [errors, setErrors] = useState({
//     name: "",
//     description: "",
//     stores: "",
//   });

//   const [storeSearch, setStoreSearch] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [selectedSubcategory, setSelectedSubcategory] = useState("all");
//   const [showStoreSelector, setShowStoreSelector] = useState(false);
//   const [selectedStores, setSelectedStores] = useState<string[]>([]);

//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchStores());
//       dispatch(fetchStoreCategories());
//     }
//   }, [status, dispatch]);

//   // Filter stores based on search and category
//   const filteredStores = stores.filter((store) => {
//     const matchesSearch = store.name
//       .toLowerCase()
//       .includes(storeSearch.toLowerCase());
//     const matchesCategory =
//       selectedCategory === "all" || store.category === selectedCategory;
//     const matchesSubcategory =
//       selectedSubcategory === "all" ||
//       store.subcategory === selectedSubcategory;

//     return matchesSearch && matchesCategory && matchesSubcategory;
//   });

//   const validateForm = () => {
//     let isValid = true;
//     const newErrors = { name: "", description: "", stores: "" };

//     if (!form.name.trim()) {
//       newErrors.name = "Tag name is required";
//       isValid = false;
//     }

//     if (!form.description.trim()) {
//       newErrors.description = "Description is required";
//       isValid = false;
//     }

//     if (selectedStores.length === 0) {
//       newErrors.stores = "At least one store is required";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSave = () => {
//     if (!validateForm()) return;

//     const updatedForm = { ...form, stores: selectedStores };
//     dispatch(addStoreTag(updatedForm));
//     onClose();
//     // Reset form
//     setForm({
//       id: "",
//       name: "",
//       description: "",
//       stores: [],
//       priority: "Medium",
//       status: "Active",
//       productsCount: 0,
//       createdAt: "",
//       updatedAt: "",
//     });
//     setErrors({ name: "", description: "", stores: "" });
//     setSelectedStores([]);
//     setStoreSearch("");
//     setSelectedCategory("all");
//     setSelectedSubcategory("all");
//   };

//   const handleClose = () => {
//     setForm({
//       id: "",
//       name: "",
//       description: "",
//       stores: [],
//       priority: "Medium",
//       status: "Active",
//       productsCount: 0,
//       createdAt: "",
//       updatedAt: "",
//     });
//     setErrors({ name: "", description: "", stores: "" });
//     setSelectedStores([]);
//     setStoreSearch("");
//     setSelectedCategory("all");
//     setSelectedSubcategory("all");
//     onClose();
//   };

//   const toggleStoreSelection = (storeId: string) => {
//     if (selectedStores.includes(storeId)) {
//       setSelectedStores(selectedStores.filter((id) => id !== storeId));
//     } else {
//       setSelectedStores([...selectedStores, storeId]);
//     }
//   };

//   const handleCategoryChange = (categoryId: string) => {
//     setSelectedCategory(categoryId);
//     setSelectedSubcategory("all");
//   };

//   const handleStoreSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setStoreSearch(e.target.value);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden transform transition-all">
//         <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
//           <h2 className="text-xl font-semibold flex items-center gap-2">
//             <FiPackage className="text-lg" />
//             Add Store Tag
//           </h2>
//           <button
//             onClick={handleClose}
//             className="text-white hover:text-gray-200"
//           >
//             <FiX className="text-xl" />
//           </button>
//         </div>

//         <div className="p-6 overflow-y-auto max-h-[calc(90vh-70px)]">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Left Column - Tag Details */}
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Tag Name
//                 </label>
//                 <input
//                   className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${
//                     errors.name ? "border-red-500" : "border-gray-300"
//                   }`}
//                   placeholder="Enter tag name"
//                   value={form.name}
//                   onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 />
//                 {errors.name && (
//                   <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
//                     <FiX className="text-xs" />
//                     {errors.name}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Description
//                 </label>
//                 <textarea
//                   className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${
//                     errors.description ? "border-red-500" : "border-gray-300"
//                   }`}
//                   rows={3}
//                   placeholder="Enter description"
//                   value={form.description}
//                   onChange={(e) =>
//                     setForm({ ...form, description: e.target.value })
//                   }
//                 />
//                 {errors.description && (
//                   <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
//                     <FiX className="text-xs" />
//                     {errors.description}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Priority
//                 </label>
//                 <div className="grid grid-cols-3 gap-2">
//                   {["High", "Medium", "Low"].map((priority) => (
//                     <button
//                       key={priority}
//                       type="button"
//                       className={`py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
//                         form.priority === priority
//                           ? priority === "High"
//                             ? "bg-red-100 text-red-800 border border-red-300"
//                             : priority === "Medium"
//                             ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
//                             : "bg-green-100 text-green-800 border border-green-300"
//                           : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
//                       }`}
//                       onClick={() =>
//                         setForm({ ...form, priority: priority as any })
//                       }
//                     >
//                       {priority}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Status
//                 </label>
//                 <div className="grid grid-cols-2 gap-2">
//                   {["Active", "Inactive"].map((status) => (
//                     <button
//                       key={status}
//                       type="button"
//                       className={`py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
//                         form.status === status
//                           ? status === "Active"
//                             ? "bg-green-100 text-green-800 border border-green-300"
//                             : "bg-red-100 text-red-800 border border-red-300"
//                           : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
//                       }`}
//                       onClick={() =>
//                         setForm({
//                           ...form,
//                           status: status as "Active" | "Inactive",
//                         })
//                       }
//                     >
//                       {status}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Right Column - Store Selection */}
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Stores ({selectedStores.length} selected)
//                 </label>
//                 <button
//                   type="button"
//                   onClick={() => setShowStoreSelector(!showStoreSelector)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
//                 >
//                   <span>Select Stores</span>
//                   <FiFilter className="text-lg" />
//                 </button>
//                 {errors.stores && (
//                   <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
//                     <FiX className="text-xs" />
//                     {errors.stores}
//                   </p>
//                 )}
//               </div>

//               {/* Selected Stores */}
//               {selectedStores.length > 0 && (
//                 <div className="bg-gray-50 rounded-lg p-3">
//                   <h4 className="text-sm font-medium text-gray-700 mb-2">
//                     Selected Stores
//                   </h4>
//                   <div className="space-y-2 max-h-32 overflow-y-auto">
//                     {selectedStores.map((storeId) => {
//                       const store = stores.find((s) => s.id === storeId);
//                       return store ? (
//                         <div
//                           key={storeId}
//                           className="flex items-center justify-between bg-white p-2 rounded border"
//                         >
//                           <div className="flex items-center gap-2">
//                             <FiMapPin className="text-gray-400" />
//                             <span className="text-sm text-gray-700">
//                               {store.name}
//                             </span>
//                           </div>
//                           <button
//                             type="button"
//                             onClick={() => toggleStoreSelection(storeId)}
//                             className="text-red-500 hover:text-red-700"
//                           >
//                             <FiX />
//                           </button>
//                         </div>
//                       ) : null;
//                     })}
//                   </div>
//                 </div>
//               )}

//               {/* Store Selector */}
//               {showStoreSelector && (
//                 <div className="border border-gray-200 rounded-lg p-4">
//                   <h4 className="text-sm font-medium text-gray-700 mb-3">
//                     Select Stores
//                   </h4>

//                   {/* Store Search */}
//                   <div className="relative mb-3">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <FiSearch className="h-4 w-4 text-gray-400" />
//                     </div>
//                     <input
//                       type="text"
//                       placeholder="Search stores..."
//                       className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                       value={storeSearch}
//                       onChange={handleStoreSearch}
//                     />
//                   </div>

//                   {/* Category Filters */}
//                   <div className="grid grid-cols-2 gap-2 mb-3">
//                     <select
//                       className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                       value={selectedCategory}
//                       onChange={(e) => handleCategoryChange(e.target.value)}
//                     >
//                       <option value="all">All Categories</option>
//                       {storeCategories.map((category) => (
//                         <option key={category.id} value={category.id}>
//                           {category.name}
//                         </option>
//                       ))}
//                     </select>
//                     <select
//                       className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                       value={selectedSubcategory}
//                       onChange={(e) => setSelectedSubcategory(e.target.value)}
//                       disabled={selectedCategory === "all"}
//                     >
//                       <option value="all">All Subcategories</option>
//                       {selectedCategory !== "all" &&
//                         storeCategories
//                           .find((c) => c.id === selectedCategory)
//                           ?.subcategories.map((subcategory) => (
//                             <option key={subcategory.id} value={subcategory.id}>
//                               {subcategory.name}
//                             </option>
//                           ))}
//                     </select>
//                   </div>

//                   {/* Store List */}
//                   <div className="max-h-64 overflow-y-auto space-y-2">
//                     {filteredStores.slice(0, 20).map((store) => (
//                       <div
//                         key={store.id}
//                         className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
//                           selectedStores.includes(store.id)
//                             ? "bg-emerald-50 border-emerald-300"
//                             : "bg-white border-gray-200 hover:bg-gray-50"
//                         }`}
//                         onClick={() => toggleStoreSelection(store.id)}
//                       >
//                         <div className="flex items-center gap-3">
//                           <div
//                             className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
//                               selectedStores.includes(store.id)
//                                 ? "bg-emerald-600 border-emerald-600"
//                                 : "border-gray-300"
//                             }`}
//                           >
//                             {selectedStores.includes(store.id) && (
//                               <FiCheck className="text-white text-xs" />
//                             )}
//                           </div>
//                           <div>
//                             <p className="text-sm font-medium text-gray-900">
//                               {store.name}
//                             </p>
//                             <p className="text-xs text-gray-500">
//                               {store.category} • {store.subcategory}
//                             </p>
//                           </div>
//                         </div>
//                         <FiMapPin className="text-gray-400" />
//                       </div>
//                     ))}
//                   </div>

//                   {filteredStores.length > 20 && (
//                     <p className="text-sm text-gray-500 text-center mt-2">
//                       Showing 20 of {filteredStores.length} stores. Use search
//                       to find more.
//                     </p>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
//             <button
//               onClick={handleClose}
//               className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSave}
//               className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200"
//             >
//               Add Store Tag
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/modules/shop/storeTags/components/AddStoreTagModal.tsx
import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { addStoreTag, StoreTag, Store } from "../storeTagsSlice";
import { FiX, FiPlus, FiTrash2, FiSearch, FiCheck } from "react-icons/fi";

export default function AddStoreTagModal({
  stores,
  onClose,
}: {
  stores: Store[];
  onClose: () => void;
}) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<StoreTag>({
    id: "",
    name: "",
    description: "",
    storeIds: [], // Changed from single store to array of store IDs
    priority: "Medium",
    status: "Active",
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    storeIds: "",
  });

  const [storeSearch, setStoreSearch] = useState("");
  const [selectedStores, setSelectedStores] = useState<Store[]>([]);
  const [showStoreSelector, setShowStoreSelector] = useState(false);
  const [storePage, setStorePage] = useState(1);
  const storesPerPage = 10;

  // Filter stores based on search
  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(storeSearch.toLowerCase()) ||
      store.city.toLowerCase().includes(storeSearch.toLowerCase()) ||
      store.state.toLowerCase().includes(storeSearch.toLowerCase())
  );

  // Calculate pagination values
  const totalStoreItems = filteredStores.length;
  const totalStorePages = Math.ceil(totalStoreItems / storesPerPage);

  // Get current page items
  const indexOfLastStore = storePage * storesPerPage;
  const indexOfFirstStore = indexOfLastStore - storesPerPage;
  const currentStores = filteredStores.slice(
    indexOfFirstStore,
    indexOfLastStore
  );

  // Reset to first page when search changes
  useEffect(() => {
    setStorePage(1);
  }, [storeSearch]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", description: "", storeIds: "" };

    if (!form.name.trim()) {
      newErrors.name = "Tag name is required";
      isValid = false;
    }

    if (!form.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }

    if (form.storeIds.length === 0) {
      newErrors.storeIds = "At least one store is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    dispatch(addStoreTag(form));
    onClose();
    // Reset form
    setForm({
      id: "",
      name: "",
      description: "",
      storeIds: [],
      priority: "Medium",
      status: "Active",
    });
    setErrors({ name: "", description: "", storeIds: "" });
    setSelectedStores([]);
    setStoreSearch("");
  };

  const handleClose = () => {
    setForm({
      id: "",
      name: "",
      description: "",
      storeIds: [],
      priority: "Medium",
      status: "Active",
    });
    setErrors({ name: "", description: "", storeIds: "" });
    setSelectedStores([]);
    setStoreSearch("");
    onClose();
  };

  const addStore = (store: Store) => {
    if (!selectedStores.find((s) => s.id === store.id)) {
      const newSelectedStores = [...selectedStores, store];
      setSelectedStores(newSelectedStores);
      setForm({
        ...form,
        storeIds: newSelectedStores.map((s) => s.id),
      });
    }
  };

  const removeStore = (storeId: string) => {
    const newSelectedStores = selectedStores.filter((s) => s.id !== storeId);
    setSelectedStores(newSelectedStores);
    setForm({
      ...form,
      storeIds: newSelectedStores.map((s) => s.id),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden transform transition-all">
        <div className="bg-[#258440] text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add Store Tag</h2>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-70px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Tag Details */}
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tag Name
                </label>
                <input
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
                    errors.name ? "border-[#D7201A]" : "border-gray-300"
                  }`}
                  placeholder="Enter tag name"
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
                  placeholder="Enter description"
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
                  Priority
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200"
                  value={form.priority}
                  onChange={(e) =>
                    setForm({ ...form, priority: e.target.value as any })
                  }
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
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
            </div>

            {/* Right Column - Store Selection */}
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stores
                </label>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">
                    {selectedStores.length} store(s) selected
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowStoreSelector(!showStoreSelector)}
                    className="px-3 py-1 bg-[#258440] text-white text-sm rounded hover:bg-[#1E803A] transition-colors duration-200 flex items-center gap-1"
                  >
                    <FiPlus className="text-sm" />
                    Select Stores
                  </button>
                </div>

                {errors.storeIds && (
                  <p className="mt-1 text-sm text-[#D7201A]">
                    {errors.storeIds}
                  </p>
                )}

                {selectedStores.length > 0 && (
                  <div className="mt-3 max-h-40 overflow-y-auto space-y-2 border border-gray-200 rounded-lg p-2">
                    {selectedStores.map((store) => (
                      <div
                        key={store.id}
                        className="flex items-center justify-between bg-gray-50 p-2 rounded"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {store.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {store.city}, {store.state}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeStore(store.id)}
                          className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50"
                        >
                          <FiTrash2 className="text-sm" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {showStoreSelector && (
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="mb-3">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiSearch className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search stores..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 text-sm"
                        value={storeSearch}
                        onChange={(e) => setStoreSearch(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="max-h-64 overflow-y-auto space-y-1">
                    {currentStores.map((store) => {
                      const isSelected = selectedStores.some(
                        (s) => s.id === store.id
                      );
                      return (
                        <div
                          key={store.id}
                          className={`border rounded-lg p-2 cursor-pointer transition-all duration-200 ${
                            isSelected
                              ? "border-[#258440] bg-[#258440]/10"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() =>
                            isSelected ? removeStore(store.id) : addStore(store)
                          }
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {store.name}
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                {store.city}, {store.state}
                              </p>
                            </div>
                            {isSelected && (
                              <div className="bg-[#258440] text-white rounded-full p-1">
                                <FiCheck className="text-sm" />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Pagination for stores */}
                  {totalStorePages > 1 && (
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
                      <div className="text-xs text-gray-500">
                        Showing {indexOfFirstStore + 1} to{" "}
                        {Math.min(indexOfLastStore, totalStoreItems)} of{" "}
                        {totalStoreItems} stores
                      </div>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => setStorePage(storePage - 1)}
                          disabled={storePage === 1}
                          className="p-1 rounded border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        <span className="px-2 py-1 text-xs text-gray-700">
                          {storePage} / {totalStorePages}
                        </span>
                        <button
                          onClick={() => setStorePage(storePage + 1)}
                          disabled={storePage === totalStorePages}
                          className="p-1 rounded border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
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
              Add Store Tag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
