// // import React, { useState } from "react";
// // import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
// // import { addSubCategory } from "../subCategoriesSlice";

// // export default function AddSubCategoryModal({ open, onClose }: any) {
// //   const dispatch = useAppDispatch();
// //   const { categories } = useAppSelector((state) => state.categories);

// //   const [form, setForm] = useState({
// //     name: "",
// //     mainCategory: "",
// //     description: "",
// //     status: "Active",
// //     order: 1,
// //     items: 0,
// //   });

// //   const handleSubmit = () => {
// //     if (!form.name || !form.mainCategory) return;

// //     dispatch(
// //       addSubCategory({
// //         ...form,
// //       })
// //     );

// //     onClose();
// //   };

// //   if (!open) return null;

// //   return (
// //     <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
// //       <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
// //         <h2 className="text-xl font-bold mb-4">Add Sub Category</h2>

// //         <input
// //           className="w-full border p-2 rounded mb-3"
// //           placeholder="Sub Category Name"
// //           value={form.name}
// //           onChange={(e) => setForm({ ...form, name: e.target.value })}
// //         />

// //         <select
// //           className="w-full border p-2 rounded mb-3"
// //           value={form.mainCategory}
// //           onChange={(e) => setForm({ ...form, mainCategory: e.target.value })}
// //         >
// //           <option value="">Select Main Category</option>
// //           {categories.map((c) => (
// //             <option key={c.id}>{c.name}</option>
// //           ))}
// //         </select>

// //         <textarea
// //           className="w-full border p-2 rounded mb-3"
// //           placeholder="Description"
// //           value={form.description}
// //           onChange={(e) => setForm({ ...form, description: e.target.value })}
// //         />

// //         <input
// //           type="number"
// //           className="w-full border p-2 rounded mb-3"
// //           placeholder="Order"
// //           value={form.order}
// //           onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
// //         />

// //         <select
// //           className="w-full border p-2 rounded mb-3"
// //           value={form.status}
// //           onChange={(e) => setForm({ ...form, status: e.target.value })}
// //         >
// //           <option>Active</option>
// //           <option>Inactive</option>
// //         </select>

// //         <button
// //           className="bg-blue-600 text-white px-4 py-2 rounded w-full"
// //           onClick={handleSubmit}
// //         >
// //           Save
// //         </button>

// //         <button className="mt-2 text-gray-500" onClick={onClose}>
// //           Cancel
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useState } from "react";
// import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
// import { addSubCategory } from "../subCategoriesSlice";

// export default function AddSubCategoryModal({ open, onClose }: any) {
//   const dispatch = useAppDispatch();
//   const { categories } = useAppSelector((state) => state.categories);

//   const [form, setForm] = useState({
//     name: "",
//     mainCategory: "",
//     description: "",
//     status: "Active",
//     order: 1,
//     items: 0,
//   });

//   const [errors, setErrors] = useState({
//     name: "",
//     mainCategory: "",
//   });

//   const validateForm = () => {
//     let isValid = true;
//     const newErrors = { name: "", mainCategory: "" };

//     if (!form.name.trim()) {
//       newErrors.name = "Subcategory name is required";
//       isValid = false;
//     }

//     if (!form.mainCategory.trim()) {
//       newErrors.mainCategory = "Main category is required";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSubmit = () => {
//     if (!validateForm()) return;

//     dispatch(
//       addSubCategory({
//         ...form,
//       })
//     );

//     // Reset form
//     setForm({
//       name: "",
//       mainCategory: "",
//       description: "",
//       status: "Active",
//       order: 1,
//       items: 0,
//     });
//     onClose();
//   };

//   const handleClose = () => {
//     setForm({
//       name: "",
//       mainCategory: "",
//       description: "",
//       status: "Active",
//       order: 1,
//       items: 0,
//     });
//     setErrors({ name: "", mainCategory: "" });
//     onClose();
//   };

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all">
//         <div className="bg-[#258440] text-white px-6 py-4 rounded-t-xl">
//           <h2 className="text-xl font-semibold">Add New Sub Category</h2>
//         </div>

//         <div className="p-6">
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Sub Category Name
//             </label>
//             <input
//               className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
//                 errors.name ? "border-[#D7201A]" : "border-gray-300"
//               }`}
//               placeholder="Enter subcategory name"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//             />
//             {errors.name && (
//               <p className="mt-1 text-sm text-[#D7201A]">{errors.name}</p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Main Category
//             </label>
//             <select
//               className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
//                 errors.mainCategory ? "border-[#D7201A]" : "border-gray-300"
//               }`}
//               value={form.mainCategory}
//               onChange={(e) =>
//                 setForm({ ...form, mainCategory: e.target.value })
//               }
//             >
//               <option value="">Select Main Category</option>
//               {categories.map((c) => (
//                 <option key={c.id} value={c.name}>
//                   {c.name}
//                 </option>
//               ))}
//             </select>
//             {errors.mainCategory && (
//               <p className="mt-1 text-sm text-[#D7201A]">
//                 {errors.mainCategory}
//               </p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Description
//             </label>
//             <textarea
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200"
//               rows={3}
//               placeholder="Enter description"
//               value={form.description}
//               onChange={(e) =>
//                 setForm({ ...form, description: e.target.value })
//               }
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Order
//             </label>
//             <input
//               type="number"
//               min="1"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200"
//               value={form.order}
//               onChange={(e) =>
//                 setForm({ ...form, order: Number(e.target.value) })
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
//                   onChange={(e) => setForm({ ...form, status: e.target.value })}
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
//                   onChange={(e) => setForm({ ...form, status: e.target.value })}
//                   className="h-4 w-4 text-[#258440] focus:ring-[#258440] border-gray-300"
//                 />
//                 <span className="ml-2 text-sm text-gray-700">Inactive</span>
//               </label>
//             </div>
//           </div>

//           <div className="flex justify-end gap-3">
//             <button
//               className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
//               onClick={handleClose}
//             >
//               Cancel
//             </button>
//             <button
//               className="px-4 py-2 bg-[#258440] text-white rounded-lg hover:bg-[#1E803A] transition-colors duration-200"
//               onClick={handleSubmit}
//             >
//               Add Sub Category
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/modules/subcategories/components/AddSubCategoryModal.tsx
import React, { useState } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { addSubCategory } from "../subCategoriesSlice";
import { FiX, FiImage, FiPackage } from "react-icons/fi";

const AddSubCategoryModal = ({ open, onClose }) => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    name: "",
    mainCategory: "",
    description: "",
    status: "Active",
    items: 0,
    order: 1,
  });

  const [errors, setErrors] = useState({
    name: "",
    mainCategory: "",
    description: "",
    items: "",
    order: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "items" || name === "order" ? Number(value) : value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.name.trim()) {
      newErrors.name = "Subcategory name is required";
      isValid = false;
    }

    if (!formData.mainCategory.trim()) {
      newErrors.mainCategory = "Main category is required";
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }

    if (isNaN(formData.items) || formData.items < 0) {
      newErrors.items = "Items must be a non-negative number";
      isValid = false;
    }

    if (isNaN(formData.order) || formData.order < 1) {
      newErrors.order = "Order must be a positive number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      dispatch(addSubCategory(formData));
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      mainCategory: "",
      description: "",
      status: "Active",
      items: 0,
      order: 1,
    });
    setErrors({
      name: "",
      mainCategory: "",
      description: "",
      items: "",
      order: "",
    });
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all">
        <div className="bg-emerald-600 text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add New Sub Category</h2>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subcategory Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Category
            </label>
            <input
              type="text"
              name="mainCategory"
              value={formData.mainCategory}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${
                errors.mainCategory ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.mainCategory && (
              <p className="mt-1 text-sm text-red-500">{errors.mainCategory}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Items Count
              </label>
              <input
                type="number"
                min="0"
                name="items"
                value={formData.items}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${
                  errors.items ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.items && (
                <p className="mt-1 text-sm text-red-500">{errors.items}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order
              </label>
              <input
                type="number"
                min="1"
                name="order"
                value={formData.order}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${
                  errors.order ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.order && (
                <p className="mt-1 text-sm text-red-500">{errors.order}</p>
              )}
            </div>
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
                  checked={formData.status === "Active"}
                  onChange={handleChange}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Active</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="Inactive"
                  checked={formData.status === "Inactive"}
                  onChange={handleChange}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Inactive</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200"
            >
              Add Subcategory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSubCategoryModal;
