// // src/modules/categories/components/AddCategoryModal.tsx
// import React, { useState } from "react";
// import { useAppDispatch } from "../../../../store/hooks";
// import { addCategory } from "../categorySlice";
// import { FiImage } from "react-icons/fi";

// const AddCategoryModal = ({ open, onClose }) => {
//   if (!open) return null;

//   const dispatch = useAppDispatch();
//   const [name, setName] = useState("");
//   const [desc, setDesc] = useState("");
//   const [image, setImage] = useState("");
//   const [items, setItems] = useState("0");
//   const [errors, setErrors] = useState({
//     name: "",
//     description: "",
//     items: "",
//     image: "",
//   });

//   const validateForm = () => {
//     let isValid = true;
//     const newErrors = { name: "", description: "", items: "", image: "" };

//     if (!name.trim()) {
//       newErrors.name = "Category name is required";
//       isValid = false;
//     }

//     if (!desc.trim()) {
//       newErrors.description = "Description is required";
//       isValid = false;
//     }

//     if (!image.trim()) {
//       newErrors.image = "Image URL is required";
//       isValid = false;
//     }

//     const itemsNum = parseInt(items, 10);
//     if (isNaN(itemsNum) || itemsNum < 0) {
//       newErrors.items = "Items must be a non-negative number";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const submit = () => {
//     if (!validateForm()) return;

//     dispatch(
//       addCategory({
//         id: Date.now().toString(),
//         name,
//         description: desc,
//         image,
//         status: "Active",
//         items: parseInt(items, 10),
//         createdDate: new Date().toISOString().slice(0, 10),
//       })
//     );

//     // Reset form
//     setName("");
//     setDesc("");
//     setImage("");
//     setItems("0");
//     setErrors({ name: "", description: "", items: "", image: "" });
//     onClose();
//   };

//   const handleClose = () => {
//     setName("");
//     setDesc("");
//     setImage("");
//     setItems("0");
//     setErrors({ name: "", description: "", items: "", image: "" });
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all">
//         <div className="bg-[#258440] text-white px-6 py-4 rounded-t-xl">
//           <h2 className="text-xl font-semibold">Add New Category</h2>
//         </div>

//         <div className="p-6">
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Category Name
//             </label>
//             <input
//               placeholder="Enter category name"
//               className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
//                 errors.name ? "border-[#D7201A]" : "border-gray-300"
//               }`}
//               value={name}
//               onChange={(e) => setName(e.target.value)}
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
//               placeholder="Enter category description"
//               rows={3}
//               className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
//                 errors.description ? "border-[#D7201A]" : "border-gray-300"
//               }`}
//               value={desc}
//               onChange={(e) => setDesc(e.target.value)}
//             />
//             {errors.description && (
//               <p className="mt-1 text-sm text-[#D7201A]">
//                 {errors.description}
//               </p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Image URL
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FiImage className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="https://example.com/image.jpg"
//                 className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
//                   errors.image ? "border-[#D7201A]" : "border-gray-300"
//                 }`}
//                 value={image}
//                 onChange={(e) => setImage(e.target.value)}
//               />
//             </div>
//             {errors.image && (
//               <p className="mt-1 text-sm text-[#D7201A]">{errors.image}</p>
//             )}
//             {image && (
//               <div className="mt-2 h-24 w-full rounded-lg overflow-hidden bg-gray-100">
//                 <img
//                   src={image}
//                   alt="Category preview"
//                   className="h-full w-full object-cover"
//                   onError={(e) => {
//                     e.currentTarget.src =
//                       "https://picsum.photos/seed/error/400/200.jpg";
//                   }}
//                 />
//               </div>
//             )}
//           </div>

//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Initial Items Count
//             </label>
//             <input
//               type="number"
//               min="0"
//               placeholder="0"
//               className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
//                 errors.items ? "border-[#D7201A]" : "border-gray-300"
//               }`}
//               value={items}
//               onChange={(e) => setItems(e.target.value)}
//             />
//             {errors.items && (
//               <p className="mt-1 text-sm text-[#D7201A]">{errors.items}</p>
//             )}
//           </div>

//           <div className="flex justify-end gap-3">
//             <button
//               className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
//               onClick={handleClose}
//             >
//               Cancel
//             </button>
//             <button
//               onClick={submit}
//               className="px-4 py-2 bg-[#258440] text-white rounded-lg hover:bg-[#1E803A] transition-colors duration-200"
//             >
//               Add Category
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddCategoryModal;

// src/modules/categories/components/AddCategoryModal.tsx
import React, { useState } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { addCategory } from "../categorySlice";
import { FiImage } from "react-icons/fi";

const AddCategoryModal = ({ open, onClose }) => {
  if (!open) return null;

  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [items, setItems] = useState("0");
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    items: "",
    image: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", description: "", items: "", image: "" };

    if (!name.trim()) {
      newErrors.name = "Category name is required";
      isValid = false;
    }

    if (!desc.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }

    if (!imageFile) {
      newErrors.image = "Category image is required";
      isValid = false;
    }

    const itemsNum = parseInt(items, 10);
    if (isNaN(itemsNum) || itemsNum < 0) {
      newErrors.items = "Items must be a non-negative number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submit = () => {
    if (!validateForm()) return;

    // Convert image to base64 for storage
    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(
        addCategory({
          id: Date.now().toString(),
          name,
          description: desc,
          image: reader.result, // Store base64 string
          status: "Active",
          items: parseInt(items, 10),
          createdDate: new Date().toISOString().slice(0, 10),
        })
      );
    };
    reader.readAsDataURL(imageFile);

    // Reset form
    setName("");
    setDesc("");
    setImage("");
    setImageFile(null);
    setItems("0");
    setErrors({ name: "", description: "", items: "", image: "" });
    onClose();
  };

  const handleClose = () => {
    setName("");
    setDesc("");
    setImage("");
    setImageFile(null);
    setItems("0");
    setErrors({ name: "", description: "", items: "", image: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all">
        <div className="bg-[#258440] text-white px-6 py-4 rounded-t-xl">
          <h2 className="text-xl font-semibold">Add New Category</h2>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name
            </label>
            <input
              placeholder="Enter category name"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
                errors.name ? "border-[#D7201A]" : "border-gray-300"
              }`}
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              placeholder="Enter category description"
              rows={3}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
                errors.description ? "border-[#D7201A]" : "border-gray-300"
              }`}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-[#D7201A]">
                {errors.description}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Image
            </label>
            <div className="relative">
              <input
                type="file"
                id="category-image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="category-image"
                className={`w-full px-4 py-2 border rounded-lg flex items-center cursor-pointer ${
                  errors.image ? "border-[#D7201A]" : "border-gray-300"
                }`}
              >
                <FiImage className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-700">
                  {imageFile ? imageFile.name : "Choose an image"}
                </span>
              </label>
            </div>
            {errors.image && (
              <p className="mt-1 text-sm text-[#D7201A]">{errors.image}</p>
            )}
            {image && (
              <div className="mt-2 h-24 w-full rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={image}
                  alt="Category preview"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Initial Items Count
            </label>
            <input
              type="number"
              min="0"
              placeholder="0"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
                errors.items ? "border-[#D7201A]" : "border-gray-300"
              }`}
              value={items}
              onChange={(e) => setItems(e.target.value)}
            />
            {errors.items && (
              <p className="mt-1 text-sm text-[#D7201A]">{errors.items}</p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              onClick={submit}
              className="px-4 py-2 bg-[#258440] text-white rounded-lg hover:bg-[#1E803A] transition-colors duration-200"
            >
              Add Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;
