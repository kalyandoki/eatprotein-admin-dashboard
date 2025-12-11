import React from "react";
import { FiX, FiTrash2 } from "react-icons/fi";
import { Product } from "../pages/StoreProductsPage";

interface DeleteProductModalProps {
  product: Product;
  onClose: () => void;
  onDeleteProduct: (productId: string) => void;
}

export default function DeleteProductModal({
  product,
  onClose,
  onDeleteProduct,
}: DeleteProductModalProps) {
  const handleDelete = () => {
    onDeleteProduct(product.id);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Confirm Deletion</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX className="text-2xl" />
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="bg-red-100 p-3 rounded-full mr-4">
              <FiTrash2 className="text-red-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-800">
                Are you sure you want to delete this product?
              </p>
              <p className="font-semibold text-gray-900">{product.name}</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <FiTrash2 className="text-lg" />
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
