import React, { useState } from "react";
import {
  FiX,
  FiUpload,
  FiPackage,
  FiDollarSign,
  FiPercent,
  FiStar,
} from "react-icons/fi";
import { Product } from "../pages/StoreProductsPage";

interface AddProductModalProps {
  onClose: () => void;
  onAddProduct: (product: Omit<Product, "id" | "productId">) => void;
}

export default function AddProductModal({
  onClose,
  onAddProduct,
}: AddProductModalProps) {
  const [formData, setFormData] = useState<Omit<Product, "id" | "productId">>({
    category: "",
    name: "",
    image: "",
    quantity: "",
    wholesalePrice: 0,
    salePrice: 0,
    offerPrice: 0,
    cgst: 0,
    sgst: 0,
    appPercentage: 0,
    rating: 0,
    status: "Active",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number" ? (value === "" ? 0 : parseFloat(value)) : value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.quantity.trim()) newErrors.quantity = "Quantity is required";
    if (formData.wholesalePrice <= 0)
      newErrors.wholesalePrice = "Wholesale price must be greater than 0";
    if (formData.salePrice <= 0)
      newErrors.salePrice = "Sale price must be greater than 0";
    if (formData.offerPrice < 0)
      newErrors.offerPrice = "Offer price cannot be negative";
    if (formData.cgst < 0) newErrors.cgst = "CGST cannot be negative";
    if (formData.sgst < 0) newErrors.sgst = "SGST cannot be negative";
    if (formData.appPercentage < 0)
      newErrors.appPercentage = "APP percentage cannot be negative";
    if (formData.rating < 0 || formData.rating > 5)
      newErrors.rating = "Rating must be between 0 and 5";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onAddProduct(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <FiPackage className="text-white text-xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Add New Product
                </h2>
                <p className="text-emerald-100 text-sm">
                  Fill in the details below
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all duration-200"
            >
              <FiX className="text-xl" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Product Details Section */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiPackage className="text-emerald-600" />
              Product Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.category && (
                  <p className="text-red-500 text-xs mt-1">{errors.category}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${
                    errors.quantity ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.quantity && (
                  <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiDollarSign className="text-emerald-600" />
              Pricing Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Wholesale Price
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiDollarSign className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="wholesalePrice"
                    value={formData.wholesalePrice}
                    onChange={handleChange}
                    required
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${
                      errors.wholesalePrice
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.wholesalePrice && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.wholesalePrice}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sale Price
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiDollarSign className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="salePrice"
                    value={formData.salePrice}
                    onChange={handleChange}
                    required
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${
                      errors.salePrice ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.salePrice && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.salePrice}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Offer Price
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiDollarSign className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="offerPrice"
                    value={formData.offerPrice}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${
                      errors.offerPrice ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.offerPrice && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.offerPrice}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Tax and Rating Section */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiPercent className="text-emerald-600" />
              Tax & Rating
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CGST (%)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPercent className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="cgst"
                    value={formData.cgst}
                    onChange={handleChange}
                    required
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${
                      errors.cgst ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.cgst && (
                  <p className="text-red-500 text-xs mt-1">{errors.cgst}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SGST (%)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPercent className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="sgst"
                    value={formData.sgst}
                    onChange={handleChange}
                    required
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${
                      errors.sgst ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.sgst && (
                  <p className="text-red-500 text-xs mt-1">{errors.sgst}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  APP (%)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPercent className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="appPercentage"
                    value={formData.appPercentage}
                    onChange={handleChange}
                    required
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${
                      errors.appPercentage
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.appPercentage && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.appPercentage}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating (0-5)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiStar className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    min="0"
                    max="5"
                    step="0.1"
                    required
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${
                      errors.rating ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.rating && (
                  <p className="text-red-500 text-xs mt-1">{errors.rating}</p>
                )}
              </div>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiUpload className="text-emerald-600" />
              Product Image
            </h3>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-500 transition-colors cursor-pointer bg-white">
                  <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <FiUpload className="mx-auto text-4xl text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      Click to upload image
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </label>
                </div>
              </div>
              {imagePreview && (
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Image Preview:
                  </p>
                  <div className="relative rounded-lg overflow-hidden shadow-md border">
                    <img
                      src={imagePreview}
                      alt="Product preview"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                      <p className="text-white text-sm">Product Image</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all font-medium shadow-md"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
