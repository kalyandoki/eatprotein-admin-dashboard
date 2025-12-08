// import React, { useState, useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
// import { editSubCategory, SubCategory } from "../subCategoriesSlice";

// export default function EditSubCategoryModal({ open, onClose, data }: any) {
//   const dispatch = useAppDispatch();
//   const { categories } = useAppSelector((state) => state.categories);

//   const [form, setForm] = useState<SubCategory | null>(null);

//   useEffect(() => {
//     setForm(data);
//   }, [data]);

//   const handleSubmit = () => {
//     if (form) {
//       dispatch(editSubCategory(form));
//       onClose();
//     }
//   };

//   if (!open || !form) return null;

//   return (
//     <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
//       <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
//         <h2 className="text-xl font-bold mb-4">Edit Sub Category</h2>

//         <input
//           className="w-full border p-2 rounded mb-3"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />

//         <select
//           className="w-full border p-2 rounded mb-3"
//           value={form.mainCategory}
//           onChange={(e) => setForm({ ...form, mainCategory: e.target.value })}
//         >
//           {categories.map((c) => (
//             <option key={c.id}>{c.name}</option>
//           ))}
//         </select>

//         <textarea
//           className="w-full border p-2 rounded mb-3"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//         />

//         <input
//           type="number"
//           className="w-full border p-2 rounded mb-3"
//           value={form.order}
//           onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
//         />

//         <select
//           className="w-full border p-2 rounded mb-3"
//           value={form.status}
//           onChange={(e) => setForm({ ...form, status: e.target.value as any })}
//         >
//           <option>Active</option>
//           <option>Inactive</option>
//         </select>

//         <button
//           className="bg-blue-600 text-white px-4 py-2 rounded w-full"
//           onClick={handleSubmit}
//         >
//           Update
//         </button>

//         <button className="mt-2 text-gray-500" onClick={onClose}>
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { editSubCategory, SubCategory } from "../subCategoriesSlice";

export default function EditSubCategoryModal({ open, onClose, data }: any) {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.categories);

  const [form, setForm] = useState<SubCategory | null>(null);
  const [errors, setErrors] = useState({
    name: "",
    mainCategory: "",
  });

  useEffect(() => {
    setForm(data);
    setErrors({ name: "", mainCategory: "" });
  }, [data]);

  const validateForm = () => {
    if (!form) return false;

    let isValid = true;
    const newErrors = { name: "", mainCategory: "" };

    if (!form.name.trim()) {
      newErrors.name = "Subcategory name is required";
      isValid = false;
    }

    if (!form.mainCategory.trim()) {
      newErrors.mainCategory = "Main category is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!form || !validateForm()) return;

    dispatch(editSubCategory(form));
    onClose();
  };

  const handleClose = () => {
    setForm(data);
    setErrors({ name: "", mainCategory: "" });
    onClose();
  };

  if (!open || !form) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all">
        <div className="bg-[#258440] text-white px-6 py-4 rounded-t-xl">
          <h2 className="text-xl font-semibold">Edit Sub Category</h2>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sub Category Name
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
              Main Category
            </label>
            <select
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
                errors.mainCategory ? "border-[#D7201A]" : "border-gray-300"
              }`}
              value={form.mainCategory}
              onChange={(e) =>
                setForm({ ...form, mainCategory: e.target.value })
              }
            >
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.mainCategory && (
              <p className="mt-1 text-sm text-[#D7201A]">
                {errors.mainCategory}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200"
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Order
            </label>
            <input
              type="number"
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200"
              value={form.order}
              onChange={(e) =>
                setForm({ ...form, order: Number(e.target.value) })
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
                    setForm({ ...form, status: e.target.value as any })
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
                    setForm({ ...form, status: e.target.value as any })
                  }
                  className="h-4 w-4 text-[#258440] focus:ring-[#258440] border-gray-300"
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
              className="px-4 py-2 bg-[#258440] text-white rounded-lg hover:bg-[#1E803A] transition-colors duration-200"
              onClick={handleSubmit}
            >
              Update Sub Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
