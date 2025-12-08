// src/modules/shop/components/SummaryStats.tsx
import React from "react";
import { FaBox, FaExclamationTriangle, FaTimesCircle } from "react-icons/fa";

interface SummaryStatsProps {
  products: any[]; // Using 'any' for simplicity, replace with your ShopProduct type
}

const SummaryStats: React.FC<SummaryStatsProps> = ({ products }) => {
  const totalProducts = products.length;
  const lowStockItems = products.filter(
    (p) => p.stock < 10 && p.stock > 0
  ).length;
  const outOfStockItems = products.filter((p) => p.stock === 0).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
            <FaBox />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Products</p>
            <p className="text-2xl font-bold text-gray-800">{totalProducts}</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
            <FaExclamationTriangle />
          </div>
          <div>
            <p className="text-sm text-gray-500">Low Stock Items</p>
            <p className="text-2xl font-bold text-gray-800">{lowStockItems}</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
            <FaTimesCircle />
          </div>
          <div>
            <p className="text-sm text-gray-500">Out of Stock</p>
            <p className="text-2xl font-bold text-gray-800">
              {outOfStockItems}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryStats;
