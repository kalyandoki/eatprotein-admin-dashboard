// import React, { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
// import { editBrand } from "../brandsSlice";
// import { Brand } from "../types";

// interface Props {
//   open: boolean;
//   onClose: () => void;
//   data: Brand | null;
// }

// export default function EditBrandModal({ open, onClose, data }: Props) {
//   const dispatch = useAppDispatch();
//   const { categories } = useAppSelector((s) => s.categories);
//   const { subCategories } = useAppSelector((s) => s.subCategories);

//   const [form, setForm] = useState<Brand | null>(null);
//   const [filePreview, setFilePreview] = useState<string | undefined>(undefined);

//   useEffect(() => {
//     if (data) {
//       setForm(data);
//       setFilePreview(data.logo);
//     } else {
//       setForm(null);
//       setFilePreview(undefined);
//     }
//   }, [data]);

//   const handleFile = (file?: File) => {
//     if (!file) {
//       setFilePreview(undefined);
//       if (form) setForm({ ...form, logo: undefined });
//       return;
//     }
//     const reader = new FileReader();
//     reader.onload = () => {
//       setFilePreview(String(reader.result));
//       if (form) setForm({ ...form, logo: String(reader.result) });
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleSubmit = () => {
//     if (!form) return;
//     dispatch(editBrand(form));
//     onClose();
//   };

//   if (!open || !form) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
//       <div className="bg-white w-full max-w-lg rounded-lg shadow p-6">
//         <h3 className="text-lg font-semibold mb-4">Edit Brand</h3>

//         <div className="grid grid-cols-1 gap-3">
//           <input
//             value={form.name}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//             className="border p-2 rounded"
//           />

//           <select
//             value={form.category}
//             onChange={(e) => setForm({ ...form, category: e.target.value })}
//             className="border p-2 rounded"
//           >
//             <option value="">Select Main Category</option>
//             {categories?.map((c) => (
//               <option key={c.id} value={c.name}>
//                 {c.name}
//               </option>
//             ))}
//           </select>

//           <select
//             value={form.subCategory}
//             onChange={(e) => setForm({ ...form, subCategory: e.target.value })}
//             className="border p-2 rounded"
//           >
//             <option value="">Select Sub Category</option>
//             {subCategories?.map((s) => (
//               <option key={s.id} value={s.name}>
//                 {s.name}
//               </option>
//             ))}
//           </select>

//           <div>
//             <label className="block text-sm mb-1">Logo (PNG/JPG)</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => handleFile(e.target.files?.[0])}
//             />
//             {filePreview && (
//               <img
//                 src={filePreview}
//                 alt="logo"
//                 className="h-20 w-20 object-cover rounded mt-2 border"
//               />
//             )}
//           </div>

//           <select
//             value={form.status}
//             onChange={(e) =>
//               setForm({ ...form, status: e.target.value as any })
//             }
//             className="border p-2 rounded"
//           >
//             <option>Active</option>
//             <option>Inactive</option>
//           </select>
//         </div>

//         <div className="flex justify-end gap-2 mt-4">
//           <button onClick={onClose} className="px-4 py-2 border rounded">
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             className="px-4 py-2 bg-blue-600 text-white rounded"
//           >
//             Update
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { editBrand } from "../brandsSlice";
import { Brand } from "../types";
import { FiUpload, FiX } from "react-icons/fi";

interface Props {
  open: boolean;
  onClose: () => void;
  data: Brand | null;
}

export default function EditBrandModal({ open, onClose, data }: Props) {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((s) => s.categories);
  const { subCategories } = useAppSelector((s) => s.subCategories);

  const [form, setForm] = useState<Brand | null>(null);
  const [filePreview, setFilePreview] = useState<string | undefined>(undefined);
  const [errors, setErrors] = useState({
    name: "",
    category: "",
    subCategory: "",
  });

  useEffect(() => {
    if (data) {
      setForm(data);
      setFilePreview(data.logo);
      setErrors({ name: "", category: "", subCategory: "" });
    } else {
      setForm(null);
      setFilePreview(undefined);
    }
  }, [data]);

  const handleFile = (file?: File) => {
    if (!file) {
      setFilePreview(undefined);
      if (form) setForm({ ...form, logo: undefined });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setFilePreview(String(reader.result));
      if (form) setForm({ ...form, logo: String(reader.result) });
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    if (!form) return false;

    let isValid = true;
    const newErrors = { name: "", category: "", subCategory: "" };

    if (!form.name.trim()) {
      newErrors.name = "Brand name is required";
      isValid = false;
    }

    if (!form.category.trim()) {
      newErrors.category = "Category is required";
      isValid = false;
    }

    if (!form.subCategory.trim()) {
      newErrors.subCategory = "Subcategory is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!form || !validateForm()) return;
    dispatch(editBrand(form));
    onClose();
  };

  const handleClose = () => {
    if (data) {
      setForm(data);
      setFilePreview(data.logo);
    }
    setErrors({ name: "", category: "", subCategory: "" });
    onClose();
  };

  if (!open || !form) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all">
        <div className="bg-[#258440] text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
          <h2 className="text-xl font-semibold">Edit Brand</h2>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand Name
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
              Category
            </label>
            <select
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
                errors.category ? "border-[#D7201A]" : "border-gray-300"
              }`}
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {categories?.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-[#D7201A]">{errors.category}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sub Category
            </label>
            <select
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
                errors.subCategory ? "border-[#D7201A]" : "border-gray-300"
              }`}
              value={form.subCategory}
              onChange={(e) =>
                setForm({ ...form, subCategory: e.target.value })
              }
            >
              {subCategories?.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
            {errors.subCategory && (
              <p className="mt-1 text-sm text-[#D7201A]">
                {errors.subCategory}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand Logo
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {filePreview ? (
                    <img
                      src={filePreview}
                      alt="logo preview"
                      className="h-20 w-20 object-cover rounded"
                    />
                  ) : (
                    <>
                      <FiUpload className="w-8 h-8 mb-2 text-gray-400" />
                      <p className="text-xs text-gray-500">
                        Click to upload logo
                      </p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleFile(e.target.files?.[0])}
                />
              </label>
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
              onClick={handleClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-[#258440] text-white rounded-lg hover:bg-[#1E803A] transition-colors duration-200"
            >
              Update Brand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
