// src/modules/banners/categoryBanners/components/AddCategoryBannerModal.tsx
import React, { useState } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { addCategoryBanner, CategoryBanner } from "../categoryBannersSlice";
import { FiX, FiSave, FiUpload } from "react-icons/fi";

export default function AddCategoryBannerModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    bannerType: "",
    selectedStore: "",
    bannerName: "",
    categoryName: "",
    bannerImage: "",
    status: "Active" as "Active" | "Inactive",
  });

  const [errors, setErrors] = useState({
    bannerType: "",
    selectedStore: "",
    bannerName: "",
    categoryName: "",
    bannerImage: "",
  });

  const [imagePreview, setImagePreview] = useState<string>("");

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      bannerType: "",
      selectedStore: "",
      bannerName: "",
      categoryName: "",
      bannerImage: "",
    };

    if (!form.bannerType) {
      newErrors.bannerType = "Banner type is required";
      isValid = false;
    }

    if (!form.selectedStore) {
      newErrors.selectedStore = "Store selection is required";
      isValid = false;
    }

    if (!form.bannerName.trim()) {
      newErrors.bannerName = "Banner name is required";
      isValid = false;
    }

    if (!form.categoryName) {
      newErrors.categoryName = "Category name is required";
      isValid = false;
    }

    if (!form.bannerImage) {
      newErrors.bannerImage = "Banner image is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    dispatch(addCategoryBanner(form));
    onClose();
  };

  const handleClose = () => {
    setForm({
      bannerType: "",
      selectedStore: "",
      bannerName: "",
      categoryName: "",
      bannerImage: "",
      status: "Active",
    });
    setErrors({
      bannerType: "",
      selectedStore: "",
      bannerName: "",
      categoryName: "",
      bannerImage: "",
    });
    setImagePreview("");
    onClose();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImagePreview(result);
        setForm({ ...form, bannerImage: result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden transform transition-all">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add New Category Banner</h2>
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
                  Banner Type
                </label>
                <select
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                    errors.bannerType ? "border-red-500" : "border-gray-300"
                  }`}
                  value={form.bannerType}
                  onChange={(e) =>
                    setForm({ ...form, bannerType: e.target.value })
                  }
                >
                  <option value="">Select Banner Type</option>
                  <option value="Category Banner">Category Banner</option>
                  <option value="Subcategory Banner">Subcategory Banner</option>
                  <option value="Store Banner">Store Banner</option>
                  <option value="Brand Banner">Brand Banner</option>
                </select>
                {errors.bannerType && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.bannerType}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selected Store
                </label>
                <select
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                    errors.selectedStore ? "border-red-500" : "border-gray-300"
                  }`}
                  value={form.selectedStore}
                  onChange={(e) =>
                    setForm({ ...form, selectedStore: e.target.value })
                  }
                >
                  <option value="">Select Store</option>
                  <option value="Main Store">Main Store</option>
                  <option value="Electronics Store">Electronics Store</option>
                  <option value="Fashion Store">Fashion Store</option>
                  <option value="Home Store">Home Store</option>
                  <option value="Sports Store">Sports Store</option>
                  <option value="Books Store">Books Store</option>
                </select>
                {errors.selectedStore && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.selectedStore}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banner Name
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                    errors.bannerName ? "border-red-500" : "border-gray-300"
                  }`}
                  value={form.bannerName}
                  onChange={(e) =>
                    setForm({ ...form, bannerName: e.target.value })
                  }
                  placeholder="Enter banner name"
                />
                {errors.bannerName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.bannerName}
                  </p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name
                </label>
                <select
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                    errors.categoryName ? "border-red-500" : "border-gray-300"
                  }`}
                  value={form.categoryName}
                  onChange={(e) =>
                    setForm({ ...form, categoryName: e.target.value })
                  }
                >
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Home & Kitchen">Home & Kitchen</option>
                  <option value="Sports">Sports</option>
                  <option value="Books">Books</option>
                  <option value="Toys">Toys</option>
                  <option value="Beauty">Beauty</option>
                  <option value="Automotive">Automotive</option>
                </select>
                {errors.categoryName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.categoryName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banner Image
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
                            alt="Banner preview"
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
                {errors.bannerImage && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.bannerImage}
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

          <div className="flex justify-end gap-3 px-6 py-4 mt-4 border-t border-gray-200 bg-gray-50">
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
              Add Banner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
