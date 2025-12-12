// src/modules/masterStore/components/ProductTable.tsx
import React, { useState } from "react";
import { Product } from "../productsSlice";
import {
  FiEdit2,
  FiTrash2,
  FiPackage,
  FiDollarSign,
  FiActivity,
  FiTrendingUp,
  FiTrendingDown,
  FiMinus,
} from "react-icons/fi";
import Pagination from "../../../components/common/Pagination";

interface ProductTableProps {
  data: Product[];
  isLoading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onUpdateStock: (product: Product, stocks: number) => void;
}

export default function ProductTable({
  data,
  isLoading,
  onEdit,
  onDelete,
  onUpdateStock,
}: ProductTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [stockInput, setStockInput] = useState<{ [key: string]: string }>({});

  // Calculate pagination values
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleStockChange = (productId: string, value: string) => {
    setStockInput({ ...stockInput, [productId]: value });
  };

  const handleStockUpdate = (product: Product) => {
    const newStock = parseInt(stockInput[product.id] || "0", 10);
    if (!isNaN(newStock) && newStock >= 0) {
      onUpdateStock(product, newStock);
      setStockInput({ ...stockInput, [product.id]: "" });
    }
  };

  const getNutritionIcon = (type: string, value: number) => {
    if (type === "calories") {
      if (value > 200) return <FiTrendingUp className="text-red-500" />;
      if (value < 100) return <FiTrendingDown className="text-green-500" />;
      return <FiMinus className="text-yellow-500" />;
    }
    if (type === "fat") {
      if (value > 15) return <FiTrendingUp className="text-red-500" />;
      if (value < 5) return <FiTrendingDown className="text-green-500" />;
      return <FiMinus className="text-yellow-500" />;
    }
    if (type === "carb") {
      if (value > 30) return <FiTrendingUp className="text-red-500" />;
      if (value < 10) return <FiTrendingDown className="text-green-500" />;
      return <FiMinus className="text-yellow-500" />;
    }
    if (type === "protein") {
      if (value > 20) return <FiTrendingUp className="text-green-500" />;
      if (value < 5) return <FiTrendingDown className="text-yellow-500" />;
      return <FiMinus className="text-yellow-500" />;
    }
    return <FiActivity className="text-gray-500" />;
  };

  const getStockStatus = (stocks: number) => {
    if (stocks < 20)
      return { color: "text-red-600", bg: "bg-red-100", label: "Low" };
    if (stocks < 50)
      return { color: "text-yellow-600", bg: "bg-yellow-100", label: "Medium" };
    return { color: "text-green-600", bg: "bg-green-100", label: "High" };
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20 bg-white rounded-xl shadow-lg">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Master Store Products ({data.length})
          </h2>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>
              Showing {indexOfFirstItem + 1}-
              {Math.min(indexOfLastItem, totalItems)} of {totalItems}
            </span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Id
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Images
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price/Stocks
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nutrition Index
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center">
                    <div className="bg-gray-100 p-4 rounded-full mb-4">
                      <FiPackage className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">
                      No products found
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto">
                      Get started by adding a new product
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              currentItems.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {product.id.split("-")[1]}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-4">
                      <div className="flex flex-col items-center">
                        <div className="h-20 w-20 rounded-lg overflow-hidden shadow-md border border-gray-200">
                          <img
                            className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
                            src={product.image}
                            alt={product.name}
                          />
                        </div>
                        <span className="text-xs text-gray-500 mt-1">
                          Product
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="h-20 w-20 rounded-lg overflow-hidden shadow-md border border-gray-200">
                          <img
                            className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
                            src={product.nxImage}
                            alt={`${product.name} NX`}
                          />
                        </div>
                        <span className="text-xs text-gray-500 mt-1">NX</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {product.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {product.category} / {product.subCategory}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center text-sm text-gray-900">
                        <FiDollarSign className="mr-1 h-4 w-4 text-gray-400" />
                        <span className="font-medium">
                          {product.price.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-900 mr-2">
                            Stock: {product.stocks}
                          </span>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              getStockStatus(product.stocks).bg
                            } ${getStockStatus(product.stocks).color}`}
                          >
                            {getStockStatus(product.stocks).label}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="number"
                          className="w-20 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="New stock"
                          value={stockInput[product.id] || ""}
                          onChange={(e) =>
                            handleStockChange(product.id, e.target.value)
                          }
                          min="0"
                        />
                        <button
                          onClick={() => handleStockUpdate(product)}
                          className="ml-2 px-3 py-1 bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-xs rounded hover:from-emerald-700 hover:to-teal-800 transition-all duration-200"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center p-2 bg-gray-50 rounded">
                        {getNutritionIcon("calories", product.calories)}
                        <span className="ml-1">Cal: {product.calories}</span>
                      </div>
                      <div className="flex items-center p-2 bg-gray-50 rounded">
                        {getNutritionIcon("fat", product.fat)}
                        <span className="ml-1">Fat: {product.fat}g</span>
                      </div>
                      <div className="flex items-center p-2 bg-gray-50 rounded">
                        {getNutritionIcon("carb", product.carb)}
                        <span className="ml-1">Carb: {product.carb}g</span>
                      </div>
                      <div className="flex items-center p-2 bg-gray-50 rounded">
                        {getNutritionIcon("protein", product.protein)}
                        <span className="ml-1">Pro: {product.protein}g</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => onEdit(product)}
                        className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-blue-200 transition-colors duration-150"
                        title="Edit"
                      >
                        <FiEdit2 className="text-lg" />
                      </button>
                      <button
                        onClick={() => onDelete(product)}
                        className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors duration-150"
                        title="Delete"
                      >
                        <FiTrash2 className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={totalItems}
            perPage={itemsPerPage}
          />
        </div>
      )}
    </div>
  );
}
