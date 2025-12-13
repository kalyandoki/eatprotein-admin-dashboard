// src/modules/categories/components/EditCategoryModal.tsx
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { updateCategory } from "../categorySlice";
import { FiImage } from "react-icons/fi";

const EditCategoryModal = ({ open, onClose }) => {
  const cat = useAppSelector((s) => s.categories.selectedCategory);
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [status, setStatus] = useState("Active");
  const [items, setItems] = useState("0");
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    image: "",
    items: "",
  });

  useEffect(() => {
    if (cat) {
      setName(cat.name);
      setDesc(cat.description);
      setImage(cat.image);
      setStatus(cat.status);
      setItems(cat.items.toString());
      setErrors({ name: "", description: "", image: "", items: "" });
    }
  }, [cat]);

  if (!open || !cat) return null;

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", description: "", image: "", items: "" };

    if (!name.trim()) {
      newErrors.name = "Category name is required";
      isValid = false;
    }

    if (!desc.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }

    if (!imageFile && !image) {
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

    // If a new image file was selected, convert it to base64
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(
          updateCategory({
            ...cat,
            name,
            description: desc,
            image: reader.result, // Store base64 string
            status,
            items: parseInt(items, 10),
          })
        );
      };
      reader.readAsDataURL(imageFile);
    } else {
      // Use existing image
      dispatch(
        updateCategory({
          ...cat,
          name,
          description: desc,
          image,
          status,
          items: parseInt(items, 10),
        })
      );
    }
    onClose();
  };

  const handleClose = () => {
    if (cat) {
      setName(cat.name);
      setDesc(cat.description);
      setImage(cat.image);
      setStatus(cat.status);
      setItems(cat.items.toString());
    }
    setImageFile(null);
    setErrors({ name: "", description: "", image: "", items: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all">
        <div className="bg-[#258440] text-white px-6 py-4 rounded-t-xl">
          <h2 className="text-xl font-semibold">Edit Category</h2>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name
            </label>
            <input
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
                  {imageFile
                    ? imageFile.name
                    : image
                    ? "Change image"
                    : "Choose an image"}
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
              Items Count
            </label>
            <input
              type="number"
              min="0"
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
                  checked={status === "Active"}
                  onChange={(e) => setStatus(e.target.value)}
                  className="h-4 w-4 text-[#258440] focus:ring-[#258440] border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Active</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="Inactive"
                  checked={status === "Inactive"}
                  onChange={(e) => setStatus(e.target.value)}
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
              onClick={submit}
              className="px-4 py-2 bg-[#258440] text-white rounded-lg hover:bg-[#1E803A] transition-colors duration-200"
            >
              Update Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryModal;
