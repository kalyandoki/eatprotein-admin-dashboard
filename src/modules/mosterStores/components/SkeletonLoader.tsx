// src/modules/monsterStores/components/SkeletonLoader.tsx
import React from "react";
import { FaDragon } from "react-icons/fa";

const SkeletonLoader: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-100 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6 animate-pulse">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
            <div className="h-8 w-64 bg-white/30 rounded-md mb-2"></div>
            <div className="h-4 w-96 bg-white/20 rounded-md"></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 animate-pulse">
          <div className="h-6 w-48 bg-gray-200 rounded-md mb-4"></div>
          <div className="flex gap-4">
            <div className="h-10 flex-1 bg-gray-200 rounded-md"></div>
            <div className="h-10 w-40 bg-gray-200 rounded-md"></div>
            <div className="h-10 w-40 bg-gray-200 rounded-md"></div>
            <div className="h-10 w-40 bg-gray-200 rounded-md"></div>
            <div className="h-10 w-40 bg-gray-200 rounded-md"></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-4 border-b bg-gray-50 flex items-center justify-between animate-pulse">
            <div className="h-6 w-32 bg-gray-200 rounded-md"></div>
            <div className="flex gap-2">
              <div className="h-8 w-8 bg-gray-200 rounded-md"></div>
              <div className="h-8 w-8 bg-gray-200 rounded-md"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 w-full bg-gray-200 rounded-md mb-2"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded-md mb-2"></div>
                <div className="h-6 w-1/2 bg-gray-200 rounded-md mb-2"></div>
                <div className="h-4 w-1/3 bg-gray-200 rounded-md"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
