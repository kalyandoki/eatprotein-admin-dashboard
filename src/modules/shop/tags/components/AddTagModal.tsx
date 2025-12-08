// // src/modules/shop/tags/components/AddTagModal.tsx
// import React, { useState } from "react";
// import { useAppDispatch } from "../../../../store/hooks";
// import { addTag, Tag } from "../tagsSlice";
// import { FiX } from "react-icons/fi";

// export default function AddTagModal({ onClose }: { onClose: () => void }) {
//   const dispatch = useAppDispatch();
//   const [form, setForm] = useState<Tag>({
//     id: "",
//     name: "",
//     description: "",
//     category: "",
//     usageCount: 0,
//     status: "Active",
//   });

//   const [errors, setErrors] = useState({
//     name: "",
//     description: "",
//     category: "",
//   });

//   const validateForm = () => {
//     let isValid = true;
//     const newErrors = { name: "", description: "", category: "" };

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

//     dispatch(addTag(form));
//     onClose();
//     // Reset form
//     setForm({
//       id: "",
//       name: "",
//       description: "",
//       category: "",
//       usageCount: 0,
//       status: "Active",
//     });
//     setErrors({ name: "", description: "", category: "" });
//   };

//   const handleClose = () => {
//     setForm({
//       id: "",
//       name: "",
//       description: "",
//       category: "",
//       usageCount: 0,
//       status: "Active",
//     });
//     setErrors({ name: "", description: "", category: "" });
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all">
//         <div className="bg-[#258440] text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
//           <h2 className="text-xl font-semibold">Add New Tag</h2>
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
//               placeholder="Enter tag name"
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
//               placeholder="Enter description"
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
//               placeholder="Enter category"
//               value={form.category}
//               onChange={(e) => setForm({ ...form, category: e.target.value })}
//             />
//             {errors.category && (
//               <p className="mt-1 text-sm text-[#D7201A]">{errors.category}</p>
//             )}
//           </div>

//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               usescount
//             </label>
//             <input
//               className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
//                 errors.category ? "border-[#D7201A]" : "border-gray-300"
//               }`}
//               placeholder="Enter usage count"
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
//               Add Tag
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // src/modules/shop/tags/components/AddTagModal.tsx
// import React, { useState } from "react";
// import { useAppDispatch } from "../../../../store/hooks";
// import { addTag, Tag, Product } from "../tagsSlice";
// import { FiX, FiPlus, FiTrash2 } from "react-icons/fi";

// // Mock products for selection
// const availableProducts: Product[] = [
//   {
//     id: "p1",
//     name: "Whey Protein",
//     sku: "WP001",
//     price: 29.99,
//     image:
//       "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: "p2",
//     name: "BCAA Powder",
//     sku: "BCAA001",
//     price: 19.99,
//     image:
//       "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: "p3",
//     name: "Creatine",
//     sku: "CR001",
//     price: 24.99,
//     image:
//       "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: "p4",
//     name: "Pre-Workout",
//     sku: "PW001",
//     price: 34.99,
//     image:
//       "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: "p5",
//     name: "Protein Bar",
//     sku: "PB001",
//     price: 2.99,
//     image:
//       "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//   },
// ];

// export default function AddTagModal({ onClose }: { onClose: () => void }) {
//   const dispatch = useAppDispatch();
//   const [form, setForm] = useState<Tag>({
//     id: "",
//     name: "",
//     description: "",
//     products: [], // Changed from category to products array
//     usageCount: 0,
//     status: "Active",
//   });

//   const [errors, setErrors] = useState({
//     name: "",
//     description: "",
//     products: "",
//   });

//   const [showProductSelector, setShowProductSelector] = useState(false);

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

//     dispatch(addTag(form));
//     onClose();
//     // Reset form
//     setForm({
//       id: "",
//       name: "",
//       description: "",
//       products: [],
//       usageCount: 0,
//       status: "Active",
//     });
//     setErrors({ name: "", description: "", products: "" });
//   };

//   const handleClose = () => {
//     setForm({
//       id: "",
//       name: "",
//       description: "",
//       products: [],
//       usageCount: 0,
//       status: "Active",
//     });
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

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden transform transition-all">
//         <div className="bg-[#258440] text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
//           <h2 className="text-xl font-semibold">Add New Tag</h2>
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
//               placeholder="Enter tag name"
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
//               placeholder="Enter description"
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
//                 Add Products
//               </button>
//             </div>

//             {errors.products && (
//               <p className="mt-1 text-sm text-[#D7201A]">{errors.products}</p>
//             )}

//             {form.products.length > 0 && (
//               <div className="mt-3 space-y-2">
//                 {form.products.map((product) => (
//                   <div
//                     key={product.id}
//                     className="flex items-center justify-between bg-gray-50 p-2 rounded-lg"
//                   >
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={product.image}
//                         alt={product.name}
//                         className="h-10 w-10 rounded object-cover"
//                       />
//                       <div>
//                         <p className="font-medium text-gray-900">
//                           {product.name}
//                         </p>
//                         <p className="text-sm text-gray-500">{product.sku}</p>
//                       </div>
//                     </div>
//                     <button
//                       type="button"
//                       onClick={() => removeProduct(product.id)}
//                       className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50"
//                     >
//                       <FiTrash2 className="text-sm" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {showProductSelector && (
//             <div className="mb-4 p-4 border border-gray-200 rounded-lg">
//               <h3 className="font-medium text-gray-900 mb-3">
//                 Select Products
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                 {availableProducts.map((product) => {
//                   const isSelected = form.products.some(
//                     (p) => p.id === product.id
//                   );
//                   return (
//                     <div
//                       key={product.id}
//                       className={`border rounded-lg p-3 cursor-pointer transition-all duration-200 ${
//                         isSelected
//                           ? "border-[#258440] bg-[#258440]/10"
//                           : "border-gray-200 hover:border-gray-300"
//                       }`}
//                       onClick={() =>
//                         isSelected
//                           ? removeProduct(product.id)
//                           : addProduct(product)
//                       }
//                     >
//                       <div className="flex items-center gap-3">
//                         <img
//                           src={product.image}
//                           alt={product.name}
//                           className="h-12 w-12 rounded object-cover"
//                         />
//                         <div className="flex-1">
//                           <p className="font-medium text-gray-900">
//                             {product.name}
//                           </p>
//                           <p className="text-sm text-gray-500">{product.sku}</p>
//                           <p className="text-sm font-medium text-gray-900">
//                             ${product.price.toFixed(2)}
//                           </p>
//                         </div>
//                         {isSelected && (
//                           <div className="bg-[#258440] text-white rounded-full p-1">
//                             <svg
//                               className="h-4 w-4"
//                               fill="currentColor"
//                               viewBox="0 0 20 20"
//                             >
//                               <path
//                                 fillRule="evenodd"
//                                 d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                                 clipRule="evenodd"
//                               />
//                             </svg>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Usage Count
//             </label>
//             <input
//               type="number"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200"
//               placeholder="Enter usage count"
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
//               Add Tag
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/modules/shop/tags/components/AddTagModal.tsx
import React, { useState, useEffect, useMemo } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { addTag, Tag, Product } from "../tagsSlice";
import {
  FiX,
  FiPlus,
  FiTrash2,
  FiSearch,
  FiPackage,
  FiCheck,
} from "react-icons/fi";

// Mock products for selection (in a real app, these would come from an API)
const availableProducts: Product[] = Array.from({ length: 1000 }, (_, i) => ({
  id: `p${i + 1}`,
  name: `Product ${i + 1}`,
  sku: `SKU${String(i + 1).padStart(4, "0")}`,
  price: Math.floor(Math.random() * 100) + 10,
  image: `https://picsum.photos/seed/product${i + 1}/200/200.jpg`,
}));

export default function AddTagModal({ onClose }: { onClose: () => void }) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<Tag>({
    id: "",
    name: "",
    description: "",
    products: [], // Changed from category to products array
    usageCount: 0,
    status: "Active",
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    products: "",
  });
  const [showProductSelector, setShowProductSelector] = useState(false);
  const [productSearch, setProductSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const productsPerPage = 20; // Number of products to show per page

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!productSearch.trim()) return availableProducts;

    const searchLower = productSearch.toLowerCase();
    return availableProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchLower) ||
        product.sku.toLowerCase().includes(searchLower)
    );
  }, [productSearch]);

  // Calculate pagination
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [productSearch]);

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

    dispatch(addTag(form));
    onClose();
    // Reset form
    setForm({
      id: "",
      name: "",
      description: "",
      products: [],
      usageCount: 0,
      status: "Active",
    });
    setErrors({ name: "", description: "", products: "" });
  };

  const handleClose = () => {
    setForm({
      id: "",
      name: "",
      description: "",
      products: [],
      usageCount: 0,
      status: "Active",
    });
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden transform transition-all">
        <div className="bg-[#258440] text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add New Tag</h2>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-70px)]">
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
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentProducts.length === 0 ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="px-4 py-8 text-center text-sm text-gray-500"
                        >
                          No products found matching your search.
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
              placeholder="Enter usage count"
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
              Add Tag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
