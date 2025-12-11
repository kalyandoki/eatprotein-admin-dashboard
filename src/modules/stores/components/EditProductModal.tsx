import React, { useState, useEffect } from "react";
import { FiX, FiUpload, FiDollarSign, FiPercent } from "react-icons/fi";
import { Product } from "../pages/StoreProductsPage";

interface EditProductModalProps {
  product: Product;
  onClose: () => void;
  onEditProduct: (product: Product) => void;
}

export default function EditProductModal({
  product,
  onClose,
  onEditProduct,
}: EditProductModalProps) {
  const [formData, setFormData] = useState<Omit<Product, "id">>(product);
  const [imagePreview, setImagePreview] = useState<string | null>(
    product.image as string
  );

  useEffect(() => {
    setFormData(product);
    setImagePreview(product.image as string);
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number" ? (value === "" ? 0 : parseFloat(value)) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEditProduct({ ...formData, id: product.id });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-emerald-600 text-white p-6 rounded-t-xl">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Edit Product</h2>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              <FiX className="text-xl" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Image Upload Section */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Product Image
            </label>
            <div className="flex items-center gap-4">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Product preview"
                  className="h-24 w-24 object-cover rounded-lg border-2 border-gray-200"
                />
              )}
              <div>
                <input
                  type="file"
                  id="image-upload"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                <label
                  htmlFor="image-upload"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors"
                >
                  <FiUpload />
                  <span>Choose Image</span>
                </label>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
              Basic Information
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pricing Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
              <FiDollarSign className="text-emerald-600" />
              Pricing
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Wholesale Price
                </label>
                <input
                  type="number"
                  name="wholesalePrice"
                  value={formData.wholesalePrice}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sale Price
                </label>
                <input
                  type="number"
                  name="salePrice"
                  value={formData.salePrice}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Offer Price
                </label>
                <input
                  type="number"
                  name="offerPrice"
                  value={formData.offerPrice}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Tax Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
              <FiPercent className="text-emerald-600" />
              Tax Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CGST (%)
                </label>
                <input
                  type="number"
                  name="cgst"
                  value={formData.cgst}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SGST (%)
                </label>
                <input
                  type="number"
                  name="sgst"
                  value={formData.sgst}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  APP (%)
                </label>
                <input
                  type="number"
                  name="appPercentage"
                  value={formData.appPercentage}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
              Additional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating (0-5)
                </label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  min="0"
                  max="5"
                  step="0.1"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
