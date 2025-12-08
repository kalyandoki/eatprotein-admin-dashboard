// // import React, { useState, useEffect } from "react";
// // import { ShopProduct } from "../shopSlice";

// // interface Props {
// //   isOpen: boolean;
// //   onClose: () => void;
// //   onSave: (product: ShopProduct) => void;
// //   product?: ShopProduct;
// // }

// // const ShopProductModal: React.FC<Props> = ({
// //   isOpen,
// //   onClose,
// //   onSave,
// //   product,
// // }) => {
// //   const [form, setForm] = useState<ShopProduct>({
// //     id: product?.id || Date.now(),
// //     name: product?.name || "",
// //     description: product?.description || "",
// //     image: product?.image || "",
// //     price: product?.price || "",
// //     stock: product?.stock || 0,
// //     category: product?.category || "",
// //     subCategory: product?.subCategory || "",
// //   });

// //   useEffect(() => {
// //     if (product) setForm(product);
// //   }, [product]);

// //   if (!isOpen) return null;

// //   const handleChange = (
// //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// //   ) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = () => {
// //     onSave(form);
// //     onClose();
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //       <div className="bg-white p-6 rounded-xl w-full max-w-lg">
// //         <h2 className="text-xl font-bold mb-4">
// //           {product ? "Edit Product" : "Add Product"}
// //         </h2>
// //         <div className="grid grid-cols-1 gap-3">
// //           <input
// //             name="name"
// //             value={form.name}
// //             onChange={handleChange}
// //             placeholder="Product Name"
// //             className="border p-2 rounded"
// //           />
// //           <textarea
// //             name="description"
// //             value={form.description}
// //             onChange={handleChange}
// //             placeholder="Description"
// //             className="border p-2 rounded"
// //           />
// //           <input
// //             name="image"
// //             value={form.image}
// //             onChange={handleChange}
// //             placeholder="Image URL"
// //             className="border p-2 rounded"
// //           />
// //           <div className="grid grid-cols-2 gap-2">
// //             <input
// //               name="price"
// //               value={form.price}
// //               onChange={handleChange}
// //               placeholder="Price"
// //               className="border p-2 rounded"
// //             />
// //             <input
// //               name="stock"
// //               type="number"
// //               value={form.stock}
// //               onChange={handleChange}
// //               placeholder="Stock"
// //               className="border p-2 rounded"
// //             />
// //           </div>
// //           <input
// //             name="category"
// //             value={form.category}
// //             onChange={handleChange}
// //             placeholder="Category"
// //             className="border p-2 rounded"
// //           />
// //           <input
// //             name="subCategory"
// //             value={form.subCategory}
// //             onChange={handleChange}
// //             placeholder="Sub Category"
// //             className="border p-2 rounded"
// //           />
// //         </div>
// //         <div className="flex justify-end gap-2 mt-4">
// //           <button onClick={onClose} className="px-4 py-2 border rounded">
// //             Cancel
// //           </button>
// //           <button
// //             onClick={handleSubmit}
// //             className="px-4 py-2 rounded bg-blue-500 text-white"
// //           >
// //             Save
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ShopProductModal;

// // // src/modules/shop/components/ShopProductModal.tsx
// // import React, { useState, useEffect } from "react";
// // import { FaTimes } from "react-icons/fa";
// // import { ShopProduct } from "../shopSlice";

// // interface ShopProductModalProps {
// //   isOpen: boolean;
// //   onClose: () => void;
// //   onSave: (product: ShopProduct) => void;
// //   product?: ShopProduct; // If provided, it's an edit form
// // }

// // const ShopProductModal: React.FC<ShopProductModalProps> = ({
// //   isOpen,
// //   onClose,
// //   onSave,
// //   product,
// // }) => {
// //   const [formData, setFormData] = useState<ShopProduct>({
// //     id: 0,
// //     name: "",
// //     description: "",
// //     image: "",
// //     price: "",
// //     stock: 0,
// //     category: "",
// //     subCategory: "",
// //   });

// //   const isEditMode = !!product;

// //   useEffect(() => {
// //     if (isEditMode && product) {
// //       setFormData(product);
// //     } else {
// //       // Reset form for adding a new product
// //       setFormData({
// //         id: 0,
// //         name: "",
// //         description: "",
// //         image: "",
// //         price: "",
// //         stock: 0,
// //         category: "",
// //         subCategory: "",
// //       });
// //     }
// //   }, [product, isEditMode, isOpen]);

// //   const handleChange = (
// //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// //   ) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     onSave(formData);
// //     onClose();
// //   };

// //   if (!isOpen) return null;

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //       <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
// //         <div className="flex items-center justify-between p-4 border-b">
// //           <h2 className="text-xl font-semibold text-gray-800">
// //             {isEditMode ? "Edit Product" : "Add New Product"}
// //           </h2>
// //           <button
// //             onClick={onClose}
// //             className="text-gray-400 hover:text-gray-600"
// //           >
// //             <FaTimes />
// //           </button>
// //         </div>

// //         <form onSubmit={handleSubmit} className="p-4 space-y-4">
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700">
// //               Product Name
// //             </label>
// //             <input
// //               type="text"
// //               name="name"
// //               value={formData.name}
// //               onChange={handleChange}
// //               required
// //               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
// //             />
// //           </div>
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700">
// //               Description
// //             </label>
// //             <textarea
// //               name="description"
// //               value={formData.description}
// //               onChange={handleChange}
// //               rows={3}
// //               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
// //             />
// //           </div>
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700">
// //               Image URL
// //             </label>
// //             <input
// //               type="text"
// //               name="image"
// //               value={formData.image}
// //               onChange={handleChange}
// //               required
// //               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
// //             />
// //           </div>
// //           <div className="grid grid-cols-2 gap-4">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700">
// //                 Price (₹)
// //               </label>
// //               <input
// //                 type="text"
// //                 name="price"
// //                 value={formData.price}
// //                 onChange={handleChange}
// //                 required
// //                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
// //               />
// //             </div>
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700">
// //                 Stock
// //               </label>
// //               <input
// //                 type="number"
// //                 name="stock"
// //                 value={formData.stock}
// //                 onChange={handleChange}
// //                 required
// //                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
// //               />
// //             </div>
// //           </div>
// //           <div className="grid grid-cols-2 gap-4">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700">
// //                 Category
// //               </label>
// //               <input
// //                 type="text"
// //                 name="category"
// //                 value={formData.category}
// //                 onChange={handleChange}
// //                 required
// //                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
// //               />
// //             </div>
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700">
// //                 Sub-Category
// //               </label>
// //               <input
// //                 type="text"
// //                 name="subCategory"
// //                 value={formData.subCategory}
// //                 onChange={handleChange}
// //                 required
// //                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
// //               />
// //             </div>
// //           </div>

// //           <div className="flex justify-end gap-2 pt-4">
// //             <button
// //               type="button"
// //               onClick={onClose}
// //               className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               type="submit"
// //               className="px-4 py-2 bg-[#258440] text-white rounded-md hover:bg-[#1E803A]"
// //             >
// //               {isEditMode ? "Save Changes" : "Add Product"}
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ShopProductModal;

// // // src/modules/shop/components/ShopProductModal.tsx
// // import React, { useState, useEffect } from "react";
// // import { FaTimes } from "react-icons/fa";
// // import { ShopProduct, Nutrition } from "../../shopSlice";

// // interface ShopProductModalProps {
// //   isOpen: boolean;
// //   onClose: () => void;
// //   onSave: (product: ShopProduct) => void;
// //   product?: ShopProduct; // If provided, it's an edit form
// // }

// // const ShopProductModal: React.FC<ShopProductModalProps> = ({
// //   isOpen,
// //   onClose,
// //   onSave,
// //   product,
// // }) => {
// //   const [formData, setFormData] = useState<ShopProduct>({
// //     id: 0,
// //     name: "",
// //     description: "",
// //     image: "",
// //     price: "",
// //     stock: 0,
// //     category: "",
// //     subCategory: "",
// //     nutrition: { calories: "", fat: "", carb: "", protein: "" },
// //   });

// //   const isEditMode = !!product;

// //   useEffect(() => {
// //     if (isEditMode && product) {
// //       setFormData(product);
// //     } else {
// //       // Reset form for adding a new product
// //       setFormData({
// //         id: 0,
// //         name: "",
// //         description: "",
// //         image: "",
// //         price: "",
// //         stock: 0,
// //         category: "",
// //         subCategory: "",
// //         nutrition: { calories: "", fat: "", carb: "", protein: "", image: "" },
// //       });
// //     }
// //   }, [product, isEditMode, isOpen]);

// //   const handleChange = (
// //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// //   ) => {
// //     const { name, value } = e.target;

// //     // Handle nested nutrition object
// //     if (name.includes("nutrition.")) {
// //       const nutritionKey = name.split(".")[1] as keyof Nutrition;
// //       setFormData((prev) => ({
// //         ...prev,
// //         nutrition: { ...prev.nutrition, [nutritionKey]: value },
// //       }));
// //     } else {
// //       setFormData((prev) => ({ ...prev, [name]: value }));
// //     }
// //   };

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     onSave(formData);
// //     onClose();
// //   };

// //   if (!isOpen) return null;

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //       <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
// //         <div className="flex items-center justify-between p-4 border-b">
// //           <h2 className="text-xl font-semibold text-gray-800">
// //             {isEditMode ? "Edit Product" : "Add New Product"}
// //           </h2>
// //           <button
// //             onClick={onClose}
// //             className="text-gray-400 hover:text-gray-600"
// //           >
// //             <FaTimes />
// //           </button>
// //         </div>

// //         <form onSubmit={handleSubmit} className="p-4 space-y-4">
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700">
// //               Product Name
// //             </label>
// //             <input
// //               type="text"
// //               name="name"
// //               value={formData.name}
// //               onChange={handleChange}
// //               required
// //               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
// //             />
// //           </div>
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700">
// //               Description
// //             </label>
// //             <textarea
// //               name="description"
// //               value={formData.description}
// //               onChange={handleChange}
// //               rows={3}
// //               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
// //             />
// //           </div>
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700">
// //               Image URL
// //             </label>
// //             <input
// //               type="text"
// //               name="image"
// //               value={formData.image}
// //               onChange={handleChange}
// //               required
// //               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
// //             />
// //           </div>
// //           <div className="grid grid-cols-2 gap-4">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700">
// //                 Price (₹)
// //               </label>
// //               <input
// //                 type="text"
// //                 name="price"
// //                 value={formData.price}
// //                 onChange={handleChange}
// //                 required
// //                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
// //               />
// //             </div>
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700">
// //                 Stock
// //               </label>
// //               <input
// //                 type="number"
// //                 name="stock"
// //                 value={formData.stock}
// //                 onChange={handleChange}
// //                 required
// //                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
// //               />
// //             </div>
// //           </div>
// //           <div className="grid grid-cols-2 gap-4">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700">
// //                 Category
// //               </label>
// //               <input
// //                 type="text"
// //                 name="category"
// //                 value={formData.category}
// //                 onChange={handleChange}
// //                 required
// //                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
// //               />
// //             </div>
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700">
// //                 Sub-Category
// //               </label>
// //               <input
// //                 type="text"
// //                 name="subCategory"
// //                 value={formData.subCategory}
// //                 onChange={handleChange}
// //                 required
// //                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
// //               />
// //             </div>
// //           </div>

// //           {/* --- Nutritional Information Section --- */}
// //           <div className="border-t pt-4">
// //             <h3 className="text-lg font-medium text-gray-700 mb-3">
// //               Nutritional Information (per 100g)
// //             </h3>
// //             <div className="grid grid-cols-2 gap-4">
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700">
// //                   Image URL
// //                 </label>
// //                 <input
// //                   type="text"
// //                   name="nutrition.image"
// //                   value={formData.nutrition.image}
// //                   onChange={handleChange}
// //                   required
// //                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700">
// //                   Calories (kcal)
// //                 </label>
// //                 <input
// //                   type="text"
// //                   name="nutrition.calories"
// //                   value={formData.nutrition.calories}
// //                   onChange={handleChange}
// //                   required
// //                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700">
// //                   Fat (g)
// //                 </label>
// //                 <input
// //                   type="text"
// //                   name="nutrition.fat"
// //                   value={formData.nutrition.fat}
// //                   onChange={handleChange}
// //                   required
// //                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700">
// //                   Carbohydrates (g)
// //                 </label>
// //                 <input
// //                   type="text"
// //                   name="nutrition.carb"
// //                   value={formData.nutrition.carb}
// //                   onChange={handleChange}
// //                   required
// //                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700">
// //                   Protein (g)
// //                 </label>
// //                 <input
// //                   type="text"
// //                   name="nutrition.protein"
// //                   value={formData.nutrition.protein}
// //                   onChange={handleChange}
// //                   required
// //                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
// //                 />
// //               </div>
// //             </div>
// //           </div>

// //           <div className="flex justify-end gap-2 pt-4">
// //             <button
// //               type="button"
// //               onClick={onClose}
// //               className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               type="submit"
// //               className="px-4 py-2 bg-[#258440] text-white rounded-md hover:bg-[#1E803A]"
// //             >
// //               {isEditMode ? "Save Changes" : "Add Product"}
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ShopProductModal;

// // // src/modules/shop/components/ShopProductModal.tsx
// // import React, { useState, useEffect } from "react";
// // import { FaTimes } from "react-icons/fa";
// // import { ShopProduct, Nutrition } from "../../shopSlice";

// // interface ShopProductModalProps {
// //   isOpen: boolean;
// //   onClose: () => void;
// //   onSave: (product: ShopProduct) => void;
// //   product?: ShopProduct; // If provided, it's an edit form
// // }

// // const ShopProductModal: React.FC<ShopProductModalProps> = ({
// //   isOpen,
// //   onClose,
// //   onSave,
// //   product,
// // }) => {
// //   const [formData, setFormData] = useState<ShopProduct>({
// //     id: 0,
// //     name: "",
// //     description: "",
// //     image: "",
// //     price: "",
// //     stock: 0,
// //     category: "",
// //     subCategory: "",
// //     nutrition: { calories: "", fat: "", carb: "", protein: "", image: "" },
// //     rating: 4.5,
// //   });

// //   const isEditMode = !!product;

// //   useEffect(() => {
// //     if (isEditMode && product) {
// //       setFormData(product);
// //     } else {
// //       // Reset form for adding a new product
// //       setFormData({
// //         id: 0,
// //         name: "",
// //         description: "",
// //         image: "",
// //         price: "",
// //         stock: 0,
// //         category: "",
// //         subCategory: "",
// //         nutrition: { calories: "", fat: "", carb: "", protein: "", image: "" },
// //         rating: 4.5,
// //       });
// //     }
// //   }, [product, isEditMode, isOpen]);

// //   const handleChange = (
// //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// //   ) => {
// //     const { name, value } = e.target;

// //     // Handle nested nutrition object
// //     if (name.includes("nutrition.")) {
// //       const nutritionKey = name.split(".")[1] as keyof Nutrition;
// //       setFormData((prev) => ({
// //         ...prev,
// //         nutrition: { ...prev.nutrition, [nutritionKey]: value },
// //       }));
// //     } else {
// //       setFormData((prev) => ({ ...prev, [name]: value }));
// //     }
// //   };

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     onSave(formData);
// //     onClose();
// //   };

// //   if (!isOpen) return null;

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //       <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
// //         <div className="flex items-center justify-between p-4 border-b">
// //           <h2 className="text-xl font-semibold text-gray-800">
// //             {isEditMode ? "Edit Product" : "Add New Product"}
// //           </h2>
// //           <button
// //             onClick={onClose}
// //             className="text-gray-400 hover:text-gray-600"
// //           >
// //             <FaTimes />
// //           </button>
// //         </div>

// //         <form onSubmit={handleSubmit} className="p-4 space-y-4">
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700">
// //               Product Name
// //             </label>
// //             <input
// //               type="text"
// //               name="name"
// //               value={formData.name}
// //               onChange={handleChange}
// //               required
// //               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
// //             />
// //           </div>
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700">
// //               Description
// //             </label>
// //             <textarea
// //               name="description"
// //               value={formData.description}
// //               onChange={handleChange}
// //               rows={3}
// //               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
// //             />
// //           </div>
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700">
// //               Image URL
// //             </label>
// //             <input
// //               type="text"
// //               name="image"
// //               value={formData.image}
// //               onChange={handleChange}
// //               required
// //               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
// //             />
// //           </div>
// //           <div className="grid grid-cols-2 gap-4">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700">
// //                 Price (₹)
// //               </label>
// //               <input
// //                 type="text"
// //                 name="price"
// //                 value={formData.price}
// //                 onChange={handleChange}
// //                 required
// //                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
// //               />
// //             </div>
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700">
// //                 Stock
// //               </label>
// //               <input
// //                 type="number"
// //                 name="stock"
// //                 value={formData.stock}
// //                 onChange={handleChange}
// //                 required
// //                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
// //               />
// //             </div>
// //           </div>
// //           <div className="grid grid-cols-2 gap-4">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700">
// //                 Category
// //               </label>
// //               <input
// //                 type="text"
// //                 name="category"
// //                 value={formData.category}
// //                 onChange={handleChange}
// //                 required
// //                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
// //               />
// //             </div>
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700">
// //                 Sub-Category
// //               </label>
// //               <input
// //                 type="text"
// //                 name="subCategory"
// //                 value={formData.subCategory}
// //                 onChange={handleChange}
// //                 required
// //                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
// //               />
// //             </div>
// //           </div>

// //           {/* --- Nutritional Information Section --- */}
// //           <div className="border-t pt-4">
// //             <h3 className="text-lg font-medium text-gray-700 mb-3">
// //               Nutritional Information (per 100g)
// //             </h3>
// //             <div className="grid grid-cols-2 gap-4">
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700">
// //                   Nutrition Icon URL
// //                 </label>
// //                 <input
// //                   type="text"
// //                   name="nutrition.image"
// //                   value={formData.nutrition.image}
// //                   onChange={handleChange}
// //                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
// //                   placeholder="https://example.com/nutrition-icon.png"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700">
// //                   Calories (kcal)
// //                 </label>
// //                 <input
// //                   type="text"
// //                   name="nutrition.calories"
// //                   value={formData.nutrition.calories}
// //                   onChange={handleChange}
// //                   required
// //                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700">
// //                   Fat (g)
// //                 </label>
// //                 <input
// //                   type="text"
// //                   name="nutrition.fat"
// //                   value={formData.nutrition.fat}
// //                   onChange={handleChange}
// //                   required
// //                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700">
// //                   Carbohydrates (g)
// //                 </label>
// //                 <input
// //                   type="text"
// //                   name="nutrition.carb"
// //                   value={formData.nutrition.carb}
// //                   onChange={handleChange}
// //                   required
// //                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700">
// //                   Protein (g)
// //                 </label>
// //                 <input
// //                   type="text"
// //                   name="nutrition.protein"
// //                   value={formData.nutrition.protein}
// //                   onChange={handleChange}
// //                   required
// //                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
// //                 />
// //               </div>
// //             </div>
// //           </div>

// //           <div className="flex justify-end gap-2 pt-4">
// //             <button
// //               type="button"
// //               onClick={onClose}
// //               className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               type="submit"
// //               className="px-4 py-2 bg-[#258440] text-white rounded-md hover:bg-[#1E803A]"
// //             >
// //               {isEditMode ? "Save Changes" : "Add Product"}
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ShopProductModal;

// // src/modules/shop/components/ShopProductModal.tsx
// import React, { useState, useEffect } from "react";
// import { FaTimes, FaImage } from "react-icons/fa";
// import { ShopProduct, Nutrition } from "../../shopSlice";

// interface ShopProductModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (product: ShopProduct) => void;
//   product?: ShopProduct; // If provided, it's an edit form
// }

// const ShopProductModal: React.FC<ShopProductModalProps> = ({
//   isOpen,
//   onClose,
//   onSave,
//   product,
// }) => {
//   const [formData, setFormData] = useState<ShopProduct>({
//     id: 0,
//     name: "",
//     description: "",
//     image: "",
//     price: "",
//     stock: 0,
//     category: "",
//     subCategory: "",
//     nutrition: { calories: "", fat: "", carb: "", protein: "", image: "" },
//     rating: 4.5,
//   });

//   const [imagePreview, setImagePreview] = useState("");
//   const [nutritionImagePreview, setNutritionImagePreview] = useState("");

//   const isEditMode = !!product;

//   useEffect(() => {
//     if (isEditMode && product) {
//       setFormData(product);
//       setImagePreview(product.image);
//       setNutritionImagePreview(product.nutrition.image || "");
//     } else {
//       // Reset form for adding a new product
//       setFormData({
//         id: 0,
//         name: "",
//         description: "",
//         image: "",
//         price: "",
//         stock: 0,
//         category: "",
//         subCategory: "",
//         nutrition: { calories: "", fat: "", carb: "", protein: "", image: "" },
//         rating: 4.5,
//       });
//       setImagePreview("");
//       setNutritionImagePreview("");
//     }
//   }, [product, isEditMode, isOpen]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;

//     // Handle nested nutrition object
//     if (name.includes("nutrition.")) {
//       const nutritionKey = name.split(".")[1] as keyof Nutrition;
//       setFormData((prev) => ({
//         ...prev,
//         nutrition: { ...prev.nutrition, [nutritionKey]: value },
//       }));

//       // Handle nutrition image preview
//       if (nutritionKey === "image") {
//         setNutritionImagePreview(value);
//       }
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));

//       // Handle main image preview
//       if (name === "image") {
//         setImagePreview(value);
//       }
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSave(formData);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//         <div className="flex items-center justify-between p-4 border-b">
//           <h2 className="text-xl font-semibold text-gray-800">
//             {isEditMode ? "Edit Product" : "Add New Product"}
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600"
//           >
//             <FaTimes />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {/* Left Column */}
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Product Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-emerald-500 focus:border-emerald-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Description
//                 </label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   rows={3}
//                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-emerald-500 focus:border-emerald-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Product Image URL
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FaImage className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="text"
//                     name="image"
//                     value={formData.image}
//                     onChange={handleChange}
//                     required
//                     className="mt-1 block w-full pl-10 border-gray-300 rounded-md shadow-sm p-2 border focus:ring-emerald-500 focus:border-emerald-500"
//                   />
//                 </div>
//                 {imagePreview && (
//                   <div className="mt-2 h-32 w-full rounded-lg overflow-hidden bg-gray-100">
//                     <img
//                       src={imagePreview}
//                       alt="Product preview"
//                       className="h-full w-full object-cover"
//                       onError={(e) => {
//                         e.currentTarget.src =
//                           "https://picsum.photos/seed/error/400/200.jpg";
//                       }}
//                     />
//                   </div>
//                 )}
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Price (₹)
//                   </label>
//                   <input
//                     type="text"
//                     name="price"
//                     value={formData.price}
//                     onChange={handleChange}
//                     required
//                     className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-emerald-500 focus:border-emerald-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Stock
//                   </label>
//                   <input
//                     type="number"
//                     name="stock"
//                     value={formData.stock}
//                     onChange={handleChange}
//                     required
//                     className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-emerald-500 focus:border-emerald-500"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Category
//                   </label>
//                   <input
//                     type="text"
//                     name="category"
//                     value={formData.category}
//                     onChange={handleChange}
//                     required
//                     className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-emerald-500 focus:border-emerald-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Sub-Category
//                   </label>
//                   <input
//                     type="text"
//                     name="subCategory"
//                     value={formData.subCategory}
//                     onChange={handleChange}
//                     required
//                     className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-emerald-500 focus:border-emerald-500"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Right Column - Nutrition Information */}
//             <div className="space-y-4">
//               <div className="border-t pt-4 md:border-t-0 md:pt-0">
//                 <h3 className="text-lg font-medium text-gray-700 mb-3">
//                   Nutritional Information (per 100g)
//                 </h3>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Nutrition Image URL
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <FaImage className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type="text"
//                       name="nutrition.image"
//                       value={formData.nutrition.image}
//                       onChange={handleChange}
//                       className="mt-1 block w-full pl-10 border-gray-300 rounded-md shadow-sm p-2 border focus:ring-emerald-500 focus:border-emerald-500"
//                       placeholder="https://example.com/nutrition-image.jpg"
//                     />
//                   </div>
//                   {nutritionImagePreview && (
//                     <div className="mt-2 h-32 w-full rounded-lg overflow-hidden bg-gray-100">
//                       <img
//                         src={nutritionImagePreview}
//                         alt="Nutrition preview"
//                         className="h-full w-full object-cover"
//                         onError={(e) => {
//                           e.currentTarget.src =
//                             "https://picsum.photos/seed/nutrition/400/200.jpg";
//                         }}
//                       />
//                     </div>
//                   )}
//                 </div>

//                 <div className="grid grid-cols-2 gap-4 mt-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Calories (kcal)
//                     </label>
//                     <input
//                       type="text"
//                       name="nutrition.calories"
//                       value={formData.nutrition.calories}
//                       onChange={handleChange}
//                       required
//                       className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-emerald-500 focus:border-emerald-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Fat (g)
//                     </label>
//                     <input
//                       type="text"
//                       name="nutrition.fat"
//                       value={formData.nutrition.fat}
//                       onChange={handleChange}
//                       required
//                       className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-emerald-500 focus:border-emerald-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Carbohydrates (g)
//                     </label>
//                     <input
//                       type="text"
//                       name="nutrition.carb"
//                       value={formData.nutrition.carb}
//                       onChange={handleChange}
//                       required
//                       className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-emerald-500 focus:border-emerald-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Protein (g)
//                     </label>
//                     <input
//                       type="text"
//                       name="nutrition.protein"
//                       value={formData.nutrition.protein}
//                       onChange={handleChange}
//                       required
//                       className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-emerald-500 focus:border-emerald-500"
//                     />
//                   </div>
//                 </div>

//                 {/* Nutrition Preview */}
//                 {formData.nutrition.calories && (
//                   <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//                     <h4 className="text-sm font-medium text-gray-700 mb-2">
//                       Nutrition Preview
//                     </h4>
//                     <div className="grid grid-cols-2 gap-2 text-sm">
//                       <div className="flex items-center">
//                         <span className="text-gray-600">Calories:</span>
//                         <span className="ml-2 font-medium">
//                           {formData.nutrition.calories} kcal
//                         </span>
//                       </div>
//                       <div className="flex items-center">
//                         <span className="text-gray-600">Fat:</span>
//                         <span className="ml-2 font-medium">
//                           {formData.nutrition.fat}g
//                         </span>
//                       </div>
//                       <div className="flex items-center">
//                         <span className="text-gray-600">Carbs:</span>
//                         <span className="ml-2 font-medium">
//                           {formData.nutrition.carb}g
//                         </span>
//                       </div>
//                       <div className="flex items-center">
//                         <span className="text-gray-600">Protein:</span>
//                         <span className="ml-2 font-medium">
//                           {formData.nutrition.protein}g
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-end gap-2 pt-4 border-t mt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
//             >
//               {isEditMode ? "Save Changes" : "Add Product"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ShopProductModal;

// // src/modules/shop/components/ShopProductModal.tsx
// import React, { useState, useEffect } from "react";
// import { FaTimes, FaImage } from "react-icons/fa";
// import { ShopProduct, Nutrition } from "../../shopSlice";

// interface ShopProductModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (product: ShopProduct) => void;
//   product?: ShopProduct;
// }

// const ShopProductModal: React.FC<ShopProductModalProps> = ({
//   isOpen,
//   onClose,
//   onSave,
//   product,
// }) => {
//   const [formData, setFormData] = useState<ShopProduct>({
//     id: 0,
//     name: "",
//     description: "",
//     image: "",
//     price: "",
//     stock: 0,
//     category: "",
//     subCategory: "",
//     nutrition: { calories: "", fat: "", carb: "", protein: "", image: "" },
//     rating: 4.5,
//   });

//   const [imagePreview, setImagePreview] = useState("");
//   const [nutritionImagePreview, setNutritionImagePreview] = useState("");

//   const isEditMode = !!product;

//   useEffect(() => {
//     if (isEditMode && product) {
//       setFormData(product);
//       setImagePreview(product.image);
//       setNutritionImagePreview(product.nutrition.image || "");
//     } else {
//       setFormData({
//         id: 0,
//         name: "",
//         description: "",
//         image: "",
//         price: "",
//         stock: 0,
//         category: "",
//         subCategory: "",
//         nutrition: { calories: "", fat: "", carb: "", protein: "", image: "" },
//         rating: 4.5,
//       });
//       setImagePreview("");
//       setNutritionImagePreview("");
//     }
//   }, [product, isEditMode, isOpen]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;

//     if (name.includes("nutrition.")) {
//       const nutritionKey = name.split(".")[1] as keyof Nutrition;
//       setFormData((prev) => ({
//         ...prev,
//         nutrition: { ...prev.nutrition, [nutritionKey]: value },
//       }));

//       if (nutritionKey === "image") {
//         setNutritionImagePreview(value);
//       }
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));

//       if (name === "image") {
//         setImagePreview(value);
//       }
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSave(formData);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//         <div className="bg-emerald-600 flex items-center justify-between p-4 border-b">
//           <h2 className="text-xl font-semibold text-white">
//             {isEditMode ? "Edit Product" : "Add New Product"}
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-white bg-black p-2 rounded-full"
//           >
//             <FaTimes />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Product Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-emerald-500 focus:border-emerald-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Description
//                 </label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   rows={3}
//                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-emerald-500 focus:border-emerald-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Product Image URL
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FaImage className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="text"
//                     name="image"
//                     value={formData.image}
//                     onChange={handleChange}
//                     required
//                     className="mt-1 block w-full pl-10 border-gray-300 rounded-md shadow-sm p-2 border focus:ring-emerald-500 focus:border-emerald-500"
//                   />
//                 </div>
//                 {imagePreview && (
//                   <div className="mt-2 h-32 w-full rounded-lg overflow-hidden bg-gray-100">
//                     <img
//                       src={imagePreview}
//                       alt="Product preview"
//                       className="h-full w-full object-cover"
//                       onError={(e) => {
//                         e.currentTarget.src =
//                           "https://picsum.photos/seed/error/400/200.jpg";
//                       }}
//                     />
//                   </div>
//                 )}
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Price (₹)
//                   </label>
//                   <input
//                     type="text"
//                     name="price"
//                     value={formData.price}
//                     onChange={handleChange}
//                     required
//                     className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-emerald-500 focus:border-emerald-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Stock
//                   </label>
//                   <input
//                     type="number"
//                     name="stock"
//                     value={formData.stock}
//                     onChange={handleChange}
//                     required
//                     className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-emerald-500 focus:border-emerald-500"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Category
//                   </label>
//                   <input
//                     type="text"
//                     name="category"
//                     value={formData.category}
//                     onChange={handleChange}
//                     required
//                     className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-emerald-500 focus:border-emerald-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Sub-Category
//                   </label>
//                   <input
//                     type="text"
//                     name="subCategory"
//                     value={formData.subCategory}
//                     onChange={handleChange}
//                     required
//                     className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-emerald-500 focus:border-emerald-500"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div className="border-t pt-4 md:border-t-0 md:pt-0">
//                 <h3 className="text-lg font-medium text-gray-700 mb-3">
//                   Nutritional Information (per 100g)
//                 </h3>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Nutrition Image URL
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <FaImage className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type="text"
//                       name="nutrition.image"
//                       value={formData.nutrition.image}
//                       onChange={handleChange}
//                       className="mt-1 block w-full pl-10 border-gray-300 rounded-md shadow-sm p-2 border focus:ring-emerald-500 focus:border-emerald-500"
//                       placeholder="https://example.com/nutrition-image.jpg"
//                     />
//                   </div>
//                   {nutritionImagePreview && (
//                     <div className="mt-2 h-32 w-full rounded-lg overflow-hidden bg-gray-100">
//                       <img
//                         src={nutritionImagePreview}
//                         alt="Nutrition preview"
//                         className="h-full w-full object-cover"
//                         onError={(e) => {
//                           e.currentTarget.src =
//                             "https://picsum.photos/seed/nutrition/400/200.jpg";
//                         }}
//                       />
//                     </div>
//                   )}
//                 </div>

//                 <div className="grid grid-cols-2 gap-4 mt-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Calories (kcal)
//                     </label>
//                     <input
//                       type="text"
//                       name="nutrition.calories"
//                       value={formData.nutrition.calories}
//                       onChange={handleChange}
//                       required
//                       className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-emerald-500 focus:border-emerald-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Fat (g)
//                     </label>
//                     <input
//                       type="text"
//                       name="nutrition.fat"
//                       value={formData.nutrition.fat}
//                       onChange={handleChange}
//                       required
//                       className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-emerald-500 focus:border-emerald-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Carbohydrates (g)
//                     </label>
//                     <input
//                       type="text"
//                       name="nutrition.carb"
//                       value={formData.nutrition.carb}
//                       onChange={handleChange}
//                       required
//                       className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-emerald-500 focus:border-emerald-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Protein (g)
//                     </label>
//                     <input
//                       type="text"
//                       name="nutrition.protein"
//                       value={formData.nutrition.protein}
//                       onChange={handleChange}
//                       required
//                       className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-emerald-500 focus:border-emerald-500"
//                     />
//                   </div>
//                 </div>

//                 {formData.nutrition.calories && (
//                   <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//                     <h4 className="text-sm font-medium text-gray-700 mb-2">
//                       Nutrition Preview
//                     </h4>
//                     <div className="grid grid-cols-2 gap-2 text-sm">
//                       <div className="flex items-center">
//                         <span className="text-gray-600">Calories:</span>
//                         <span className="ml-2 font-medium">
//                           {formData.nutrition.calories} kcal
//                         </span>
//                       </div>
//                       <div className="flex items-center">
//                         <span className="text-gray-600">Fat:</span>
//                         <span className="ml-2 font-medium">
//                           {formData.nutrition.fat}g
//                         </span>
//                       </div>
//                       <div className="flex items-center">
//                         <span className="text-gray-600">Carbs:</span>
//                         <span className="ml-2 font-medium">
//                           {formData.nutrition.carb}g
//                         </span>
//                       </div>
//                       <div className="flex items-center">
//                         <span className="text-gray-600">Protein:</span>
//                         <span className="ml-2 font-medium">
//                           {formData.nutrition.protein}g
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-end gap-2 pt-4 border-t mt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
//             >
//               {isEditMode ? "Save Changes" : "Add Product"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ShopProductModal;

// src/modules/shop/components/ShopProductModal.tsx
import React, { useState, useEffect } from "react";
import { FaTimes, FaImage } from "react-icons/fa";
import { ShopProduct, Nutrition } from "../../shopSlice";

interface ShopProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: ShopProduct) => void;
  product?: ShopProduct;
}

const ShopProductModal: React.FC<ShopProductModalProps> = ({
  isOpen,
  onClose,
  onSave,
  product,
}) => {
  const [formData, setFormData] = useState<ShopProduct>({
    id: 0,
    name: "",
    description: "",
    image: "", // This will now hold a Base64 string
    price: "",
    stock: 0,
    category: "",
    subCategory: "",
    nutrition: { calories: "", fat: "", carb: "", protein: "", image: "" }, // nutrition.image will also be Base64
    rating: 4.5,
  });

  const [imagePreview, setImagePreview] = useState("");
  const [nutritionImagePreview, setNutritionImagePreview] = useState("");

  // State to hold the actual File objects, useful for direct upload to a server
  const [productImageFile, setProductImageFile] = useState<File | null>(null);
  const [nutritionImageFile, setNutritionImageFile] = useState<File | null>(
    null
  );

  const isEditMode = !!product;

  useEffect(() => {
    if (isEditMode && product) {
      // In edit mode, if the image is a URL, it will be set as the preview.
      // If it's a Base64 string from a previous save, it will also work.
      setFormData(product);
      setImagePreview(product.image);
      setNutritionImagePreview(product.nutrition.image || "");
    } else {
      // Reset form for adding a new product
      setFormData({
        id: 0,
        name: "",
        description: "",
        image: "",
        price: "",
        stock: 0,
        category: "",
        subCategory: "",
        nutrition: { calories: "", fat: "", carb: "", protein: "", image: "" },
        rating: 4.5,
      });
      setImagePreview("");
      setNutritionImagePreview("");
      setProductImageFile(null);
      setNutritionImageFile(null);
    }
  }, [product, isEditMode, isOpen]);

  // Handler for text and number inputs
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name.includes("nutrition.")) {
      const nutritionKey = name.split(".")[1] as keyof Nutrition;
      setFormData((prev) => ({
        ...prev,
        nutrition: { ...prev.nutrition, [nutritionKey]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handler for the main product image file input
  const handleProductImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProductImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setFormData((prev) => ({ ...prev, image: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handler for the nutrition image file input
  const handleNutritionImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setNutritionImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setNutritionImagePreview(base64String);
        setFormData((prev) => ({
          ...prev,
          nutrition: { ...prev.nutrition, image: base64String },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // The `formData` object now contains Base64 strings for images.
    // You can save this directly to state or a database.
    onSave(formData);

    // If you need to upload the actual files to a server, you would do it here.
    // Example using FormData for multipart/form-data request:
    /*
    const apiFormData = new FormData();
    apiFormData.append('productData', JSON.stringify(formData));
    if (productImageFile) {
      apiFormData.append('productImage', productImageFile);
    }
    if (nutritionImageFile) {
      apiFormData.append('nutritionImage', nutritionImageFile);
    }
    // Then you would send `apiFormData` using fetch or axios
    */

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="bg-emerald-600 flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-white">
            {isEditMode ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            onClick={onClose}
            className="text-white bg-black p-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              {/* ... (Name, Description inputs remain the same) ... */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Image
                </label>
                <div className="mt-1 flex items-center space-x-3">
                  <input
                    type="file"
                    id="product-image-upload"
                    accept="image/*"
                    onChange={handleProductImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="product-image-upload"
                    className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                  >
                    <FaImage className="mr-2" />
                    Choose File
                  </label>
                  <span className="text-sm text-gray-500">
                    {productImageFile
                      ? productImageFile.name
                      : "No file chosen"}
                  </span>
                </div>
                {imagePreview && (
                  <div className="mt-2 h-32 w-full rounded-lg overflow-hidden bg-gray-100 border">
                    <img
                      src={imagePreview}
                      alt="Product preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* ... (Price, Stock, Category inputs remain the same) ... */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Price (₹)
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Sub-Category
                  </label>
                  <input
                    type="text"
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-t pt-4 md:border-t-0 md:pt-0">
                <h3 className="text-lg font-medium text-gray-700 mb-3">
                  Nutritional Information (per 100g)
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nutrition Image
                  </label>
                  <div className="mt-1 flex items-center space-x-3">
                    <input
                      type="file"
                      id="nutrition-image-upload"
                      accept="image/*"
                      onChange={handleNutritionImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="nutrition-image-upload"
                      className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    >
                      <FaImage className="mr-2" />
                      Choose File
                    </label>
                    <span className="text-sm text-gray-500">
                      {nutritionImageFile
                        ? nutritionImageFile.name
                        : "No file chosen"}
                    </span>
                  </div>
                  {nutritionImagePreview && (
                    <div className="mt-2 h-32 w-full rounded-lg overflow-hidden bg-gray-100 border">
                      <img
                        src={nutritionImagePreview}
                        alt="Nutrition preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* ... (Nutrition inputs and preview remain the same) ... */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Calories (kcal)
                    </label>
                    <input
                      type="text"
                      name="nutrition.calories"
                      value={formData.nutrition.calories}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Fat (g)
                    </label>
                    <input
                      type="text"
                      name="nutrition.fat"
                      value={formData.nutrition.fat}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Carbohydrates (g)
                    </label>
                    <input
                      type="text"
                      name="nutrition.carb"
                      value={formData.nutrition.carb}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Protein (g)
                    </label>
                    <input
                      type="text"
                      name="nutrition.protein"
                      value={formData.nutrition.protein}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                {formData.nutrition.calories && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Nutrition Preview
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center">
                        <span className="text-gray-600">Calories:</span>
                        <span className="ml-2 font-medium">
                          {formData.nutrition.calories} kcal
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-600">Fat:</span>
                        <span className="ml-2 font-medium">
                          {formData.nutrition.fat}g
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-600">Carbs:</span>
                        <span className="ml-2 font-medium">
                          {formData.nutrition.carb}g
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-600">Protein:</span>
                        <span className="ml-2 font-medium">
                          {formData.nutrition.protein}g
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
            >
              {isEditMode ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopProductModal;
