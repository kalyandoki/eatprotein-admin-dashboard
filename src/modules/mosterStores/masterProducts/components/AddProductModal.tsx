// // src/modules/shop/masterProducts/components/AddProductModal.tsx
// import React, { useState } from "react";
// import { useAppDispatch } from "../../../../store/hooks";
// import { addProduct, MasterProduct } from "../masterProductsSlice";
// import { FiX, FiSave, FiUpload } from "react-icons/fi";

// export default function AddProductModal({ onClose }: { onClose: () => void }) {
//   const dispatch = useAppDispatch();
//   const [form, setForm] = useState<MasterProduct>({
//     id: "",
//     name: "",
//     sku: "",
//     category: "",
//     subcategory: "",
//     brand: "",
//     unit: "",
//     price: 0,
//     commission: 0,
//     description: "",
//     image: "",
//     status: "Active",
//     tags: [],
//   });

//   const [errors, setErrors] = useState({
//     name: "",
//     sku: "",
//     category: "",
//     subcategory: "",
//     brand: "",
//     unit: "",
//     price: "",
//     commission: "",
//     description: "",
//   });

//   const [imagePreview, setImagePreview] = useState<string>("");
//   const [selectedTags, setSelectedTags] = useState<string[]>([]);

//   // Mock data for dropdowns
//   const categories = [
//     "Food",
//     "Beverages",
//     "Dairy",
//     "Snacks",
//     "Personal Care",
//     "Household",
//   ];
//   const subcategories = [
//     "Breakfast",
//     "Lunch",
//     "Dinner",
//     "Snacks",
//     "Desserts",
//     "Organic",
//     "Soft Drinks",
//     "Juices",
//     "Tea",
//     "Coffee",
//     "Energy Drinks",
//     "Milk",
//     "Cheese",
//     "Yogurt",
//     "Butter",
//     "Ice Cream",
//     "Chips",
//     "Cookies",
//     "Nuts",
//     "Candies",
//     "Popcorn",
//     "Shampoo",
//     "Soap",
//     "Toothpaste",
//     "Deodorant",
//     "Lotion",
//     "Cleaning",
//     "Laundry",
//     "Dishwashing",
//     "Paper",
//     "Trash Bags",
//   ];
//   const brands = ["Brand A", "Brand B", "Brand C", "Brand D", "Brand E"];
//   const units = ["kg", "g", "l", "ml", "pcs", "pack", "bottle", "box"];
//   const tags = ["Popular", "New", "Sale", "Organic", "Premium", "Eco-friendly"];

//   const validateForm = () => {
//     let isValid = true;
//     const newErrors = {
//       name: "",
//       sku: "",
//       category: "",
//       subcategory: "",
//       brand: "",
//       unit: "",
//       price: "",
//       commission: "",
//       description: "",
//     };

//     if (!form.name.trim()) {
//       newErrors.name = "Product name is required";
//       isValid = false;
//     }

//     if (!form.sku.trim()) {
//       newErrors.sku = "SKU is required";
//       isValid = false;
//     }

//     if (!form.category) {
//       newErrors.category = "Category is required";
//       isValid = false;
//     }

//     if (!form.subcategory) {
//       newErrors.subcategory = "Subcategory is required";
//       isValid = false;
//     }

//     if (!form.brand) {
//       newErrors.brand = "Brand is required";
//       isValid = false;
//     }

//     if (!form.unit) {
//       newErrors.unit = "Unit is required";
//       isValid = false;
//     }

//     if (form.price <= 0) {
//       newErrors.price = "Price must be greater than 0";
//       isValid = false;
//     }

//     if (form.commission < 0 || form.commission > 100) {
//       newErrors.commission = "Commission must be between 0 and 100";
//       isValid = false;
//     }

//     if (!form.description.trim()) {
//       newErrors.description = "Description is required";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSave = () => {
//     if (!validateForm()) return;

//     const productToSave = {
//       ...form,
//       tags: selectedTags,
//     };

//     dispatch(addProduct(productToSave));
//     onClose();
//   };

//   const handleClose = () => {
//     setForm({
//       id: "",
//       name: "",
//       sku: "",
//       category: "",
//       subcategory: "",
//       brand: "",
//       unit: "",
//       price: 0,
//       commission: 0,
//       description: "",
//       image: "",
//       status: "Active",
//       tags: [],
//     });
//     setErrors({
//       name: "",
//       sku: "",
//       category: "",
//       subcategory: "",
//       brand: "",
//       unit: "",
//       price: "",
//       commission: "",
//       description: "",
//     });
//     setImagePreview("");
//     setSelectedTags([]);
//     onClose();
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const result = event.target?.result as string;
//         setImagePreview(result);
//         setForm({ ...form, image: result });
//       };
//       reader.readAsDataURL(e.target.files[0]);
//     }
//   };

//   const handleTagToggle = (tag: string) => {
//     if (selectedTags.includes(tag)) {
//       setSelectedTags(selectedTags.filter((t) => t !== tag));
//     } else {
//       setSelectedTags([...selectedTags, tag]);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden transform transition-all">
//         <div className="bg-[#258440] text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
//           <h2 className="text-xl font-semibold">Add New Product</h2>
//           <button
//             onClick={handleClose}
//             className="text-white hover:text-gray-200"
//           >
//             <FiX className="text-xl" />
//           </button>
//         </div>

//         <div className="p-6 overflow-y-auto max-h-[calc(90vh-70px)]">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Left Column */}
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Product Name
//                 </label>
//                 <input
//                   className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
//                     errors.name ? "border-[#D7201A]" : "border-gray-300"
//                   }`}
//                   value={form.name}
//                   onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 />
//                 {errors.name && (
//                   <p className="mt-1 text-sm text-[#D7201A]">{errors.name}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   SKU
//                 </label>
//                 <input
//                   className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
//                     errors.sku ? "border-[#D7201A]" : "border-gray-300"
//                   }`}
//                   value={form.sku}
//                   onChange={(e) => setForm({ ...form, sku: e.target.value })}
//                 />
//                 {errors.sku && (
//                   <p className="mt-1 text-sm text-[#D7201A]">{errors.sku}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Category
//                 </label>
//                 <select
//                   className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
//                     errors.category ? "border-[#D7201A]" : "border-gray-300"
//                   }`}
//                   value={form.category}
//                   onChange={(e) =>
//                     setForm({ ...form, category: e.target.value })
//                   }
//                 >
//                   <option value="">Select Category</option>
//                   {categories.map((category) => (
//                     <option key={category} value={category}>
//                       {category}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.category && (
//                   <p className="mt-1 text-sm text-[#D7201A]">
//                     {errors.category}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Subcategory
//                 </label>
//                 <select
//                   className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
//                     errors.subcategory ? "border-[#D7201A]" : "border-gray-300"
//                   }`}
//                   value={form.subcategory}
//                   onChange={(e) =>
//                     setForm({ ...form, subcategory: e.target.value })
//                   }
//                 >
//                   <option value="">Select Subcategory</option>
//                   {subcategories.map((subcategory) => (
//                     <option key={subcategory} value={subcategory}>
//                       {subcategory}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.subcategory && (
//                   <p className="mt-1 text-sm text-[#D7201A]">
//                     {errors.subcategory}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Brand
//                 </label>
//                 <select
//                   className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
//                     errors.brand ? "border-[#D7201A]" : "border-gray-300"
//                   }`}
//                   value={form.brand}
//                   onChange={(e) => setForm({ ...form, brand: e.target.value })}
//                 >
//                   <option value="">Select Brand</option>
//                   {brands.map((brand) => (
//                     <option key={brand} value={brand}>
//                       {brand}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.brand && (
//                   <p className="mt-1 text-sm text-[#D7201A]">{errors.brand}</p>
//                 )}
//               </div>
//             </div>

//             {/* Right Column */}
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Unit
//                 </label>
//                 <select
//                   className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
//                     errors.unit ? "border-[#D7201A]" : "border-gray-300"
//                   }`}
//                   value={form.unit}
//                   onChange={(e) => setForm({ ...form, unit: e.target.value })}
//                 >
//                   <option value="">Select Unit</option>
//                   {units.map((unit) => (
//                     <option key={unit} value={unit}>
//                       {unit}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.unit && (
//                   <p className="mt-1 text-sm text-[#D7201A]">{errors.unit}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Price ($)
//                 </label>
//                 <input
//                   type="number"
//                   step="0.01"
//                   className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
//                     errors.price ? "border-[#D7201A]" : "border-gray-300"
//                   }`}
//                   value={form.price}
//                   onChange={(e) =>
//                     setForm({ ...form, price: parseFloat(e.target.value) || 0 })
//                   }
//                 />
//                 {errors.price && (
//                   <p className="mt-1 text-sm text-[#D7201A]">{errors.price}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Commission (%)
//                 </label>
//                 <input
//                   type="number"
//                   min="0"
//                   max="100"
//                   className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
//                     errors.commission ? "border-[#D7201A]" : "border-gray-300"
//                   }`}
//                   value={form.commission}
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       commission: parseInt(e.target.value) || 0,
//                     })
//                   }
//                 />
//                 {errors.commission && (
//                   <p className="mt-1 text-sm text-[#D7201A]">
//                     {errors.commission}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Status
//                 </label>
//                 <div className="flex space-x-4">
//                   <label className="flex items-center">
//                     <input
//                       type="radio"
//                       name="status"
//                       value="Active"
//                       checked={form.status === "Active"}
//                       onChange={(e) =>
//                         setForm({
//                           ...form,
//                           status: e.target.value as "Active" | "Inactive",
//                         })
//                       }
//                       className="h-4 w-4 text-[#258440] focus:ring-[#258440] border-gray-300"
//                     />
//                     <span className="ml-2 text-sm text-gray-700">Active</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input
//                       type="radio"
//                       name="status"
//                       value="Inactive"
//                       checked={form.status === "Inactive"}
//                       onChange={(e) =>
//                         setForm({
//                           ...form,
//                           status: e.target.value as "Active" | "Inactive",
//                         })
//                       }
//                       className="h-4 w-4 text-[#258440] focus:ring-[#258440] border-gray-300"
//                     />
//                     <span className="ml-2 text-sm text-gray-700">Inactive</span>
//                   </label>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Description */}
//           <div className="mt-4">
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

//           {/* Product Image */}
//           <div className="mt-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Product Image
//             </label>
//             <div className="flex items-center space-x-4">
//               <div className="flex-1">
//                 <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     className="hidden"
//                   />
//                   <div className="text-center">
//                     {imagePreview ? (
//                       <img
//                         src={imagePreview}
//                         alt="Product preview"
//                         className="h-full w-full object-cover rounded"
//                       />
//                     ) : (
//                       <div className="flex flex-col items-center justify-center h-full">
//                         <FiUpload className="text-gray-400 mb-2" />
//                         <span className="text-sm text-gray-500">
//                           Click to upload image
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                 </label>
//               </div>
//             </div>
//           </div>

//           {/* Tags */}
//           <div className="mt-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Tags
//             </label>
//             <div className="flex flex-wrap gap-2">
//               {tags.map((tag) => (
//                 <button
//                   key={tag}
//                   type="button"
//                   onClick={() => handleTagToggle(tag)}
//                   className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
//                     selectedTags.includes(tag)
//                       ? "bg-[#258440] text-white"
//                       : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                   }`}
//                 >
//                   {tag}
//                 </button>
//               ))}
//             </div>
//           </div>
//           <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
//             <button
//               onClick={handleClose}
//               className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSave}
//               className="px-4 py-2 bg-[#258440] text-white rounded-lg hover:bg-[#1E803A] transition-colors duration-200 flex items-center gap-2"
//             >
//               <FiSave className="text-sm" />
//               Add Product
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/modules/shop/masterProducts/components/AddProductModal.tsx
import React, { useState } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { addProduct, MasterProduct } from "../masterProductsSlice";
import { FiX, FiSave, FiUpload } from "react-icons/fi";

export default function AddProductModal({ onClose }: { onClose: () => void }) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<MasterProduct>({
    id: "",
    name: "",
    sku: "",
    category: "",
    subcategory: "",
    brand: "",
    unit: "",
    price: 0,
    commission: 0,
    description: "",
    image: "",
    status: "Active",
    tags: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    sku: "",
    category: "",
    subcategory: "",
    brand: "",
    unit: "",
    price: "",
    commission: "",
    description: "",
  });

  const [imagePreview, setImagePreview] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Mock data for dropdowns
  const categories = [
    "Food",
    "Beverages",
    "Dairy",
    "Snacks",
    "Personal Care",
    "Household",
  ];
  const subcategories = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snacks",
    "Desserts",
    "Organic",
    "Soft Drinks",
    "Juices",
    "Tea",
    "Coffee",
    "Energy Drinks",
    "Milk",
    "Cheese",
    "Yogurt",
    "Butter",
    "Ice Cream",
    "Chips",
    "Cookies",
    "Nuts",
    "Candies",
    "Popcorn",
    "Shampoo",
    "Soap",
    "Toothpaste",
    "Deodorant",
    "Lotion",
    "Cleaning",
    "Laundry",
    "Dishwashing",
    "Paper",
    "Trash Bags",
  ];
  const brands = ["Brand A", "Brand B", "Brand C", "Brand D", "Brand E"];
  const units = ["kg", "g", "l", "ml", "pcs", "pack", "bottle", "box"];
  const tags = ["Popular", "New", "Sale", "Organic", "Premium", "Eco-friendly"];

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      sku: "",
      category: "",
      subcategory: "",
      brand: "",
      unit: "",
      price: "",
      commission: "",
      description: "",
    };

    if (!form.name.trim()) {
      newErrors.name = "Product name is required";
      isValid = false;
    }

    if (!form.sku.trim()) {
      newErrors.sku = "SKU is required";
      isValid = false;
    }

    if (!form.category) {
      newErrors.category = "Category is required";
      isValid = false;
    }

    if (!form.subcategory) {
      newErrors.subcategory = "Subcategory is required";
      isValid = false;
    }

    if (!form.brand) {
      newErrors.brand = "Brand is required";
      isValid = false;
    }

    if (!form.unit) {
      newErrors.unit = "Unit is required";
      isValid = false;
    }

    if (form.price <= 0) {
      newErrors.price = "Price must be greater than 0";
      isValid = false;
    }

    if (form.commission < 0 || form.commission > 100) {
      newErrors.commission = "Commission must be between 0 and 100";
      isValid = false;
    }

    if (!form.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const productToSave = {
      ...form,
      tags: selectedTags,
    };

    dispatch(addProduct(productToSave));
    onClose();
  };

  const handleClose = () => {
    setForm({
      id: "",
      name: "",
      sku: "",
      category: "",
      subcategory: "",
      brand: "",
      unit: "",
      price: 0,
      commission: 0,
      description: "",
      image: "",
      status: "Active",
      tags: [],
    });
    setErrors({
      name: "",
      sku: "",
      category: "",
      subcategory: "",
      brand: "",
      unit: "",
      price: "",
      commission: "",
      description: "",
    });
    setImagePreview("");
    setSelectedTags([]);
    onClose();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImagePreview(result);
        setForm({ ...form, image: result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden transform transition-all">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add New Product</h2>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-70px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SKU
                </label>
                <input
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                    errors.sku ? "border-red-500" : "border-gray-300"
                  }`}
                  value={form.sku}
                  onChange={(e) => setForm({ ...form, sku: e.target.value })}
                />
                {errors.sku && (
                  <p className="mt-1 text-sm text-red-600">{errors.sku}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  }`}
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subcategory
                </label>
                <select
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                    errors.subcategory ? "border-red-500" : "border-gray-300"
                  }`}
                  value={form.subcategory}
                  onChange={(e) =>
                    setForm({ ...form, subcategory: e.target.value })
                  }
                >
                  <option value="">Select Subcategory</option>
                  {subcategories.map((subcategory) => (
                    <option key={subcategory} value={subcategory}>
                      {subcategory}
                    </option>
                  ))}
                </select>
                {errors.subcategory && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.subcategory}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand
                </label>
                <select
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                    errors.brand ? "border-red-500" : "border-gray-300"
                  }`}
                  value={form.brand}
                  onChange={(e) => setForm({ ...form, brand: e.target.value })}
                >
                  <option value="">Select Brand</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
                {errors.brand && (
                  <p className="mt-1 text-sm text-red-600">{errors.brand}</p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit
                </label>
                <select
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                    errors.unit ? "border-red-500" : "border-gray-300"
                  }`}
                  value={form.unit}
                  onChange={(e) => setForm({ ...form, unit: e.target.value })}
                >
                  <option value="">Select Unit</option>
                  {units.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
                {errors.unit && (
                  <p className="mt-1 text-sm text-red-600">{errors.unit}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  }`}
                  value={form.price}
                  onChange={(e) =>
                    setForm({ ...form, price: parseFloat(e.target.value) || 0 })
                  }
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Commission (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                    errors.commission ? "border-red-500" : "border-gray-300"
                  }`}
                  value={form.commission}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      commission: parseInt(e.target.value) || 0,
                    })
                  }
                />
                {errors.commission && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.commission}
                  </p>
                )}
              </div>

              <div>
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
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
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
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Inactive</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Product Image */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <div className="text-center">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Product preview"
                        className="h-full w-full object-cover rounded"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full">
                        <FiUpload className="text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">
                          Click to upload image
                        </span>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedTags.includes(tag)
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={handleClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-2"
            >
              <FiSave className="text-sm" />
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
