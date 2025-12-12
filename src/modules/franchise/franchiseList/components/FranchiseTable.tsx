// src/modules/franchise/franchise-list/components/FranchiseTable.tsx
import React, { useState } from "react";
import { Franchise } from "../franchiseSlice";
import {
  FiEdit2,
  FiTrash2,
  FiCheck,
  FiX,
  FiClock,
  FiMapPin,
  FiPhone,
  FiUser,
} from "react-icons/fi";
import Pagination from "../../../../components/common/Pagination";

interface FranchiseTableProps {
  data: Franchise[];
  isLoading: boolean;
  onEdit: (franchise: Franchise) => void;
  onDelete: (franchise: Franchise) => void;
  onUpdateStatus: (franchise: Franchise, status: Franchise["status"]) => void;
}

export default function FranchiseTable({
  data,
  isLoading,
  onEdit,
  onDelete,
  onUpdateStatus,
}: FranchiseTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <FiCheck className="text-xs" />;
      case "Inactive":
        return <FiX className="text-xs" />;
      case "Pending":
        return <FiClock className="text-xs" />;
      default:
        return "?";
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20 bg-white rounded-xl shadow-lg">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          <p className="mt-4 text-gray-600">Loading franchises...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Franchise List ({data.length})
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
                Store Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Manager
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hours
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center">
                    <div className="bg-gray-100 p-4 rounded-full mb-4">
                      <FiMapPin className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">
                      No franchises found
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto">
                      Get started by adding a new franchise
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              currentItems.map((franchise) => (
                <tr
                  key={franchise.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {franchise.storeName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <FiMapPin className="mr-2 h-4 w-4 text-gray-400" />
                      {franchise.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <FiUser className="mr-2 h-4 w-4 text-gray-400" />
                      {franchise.manager}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <FiPhone className="mr-2 h-4 w-4 text-gray-400" />
                      {franchise.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        franchise.status
                      )}`}
                    >
                      <span className="mr-1">
                        {getStatusIcon(franchise.status)}
                      </span>
                      {franchise.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <FiClock className="mr-2 h-4 w-4 text-gray-400" />
                      {franchise.hours}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      {franchise.status === "Pending" && (
                        <button
                          onClick={() => onUpdateStatus(franchise, "Active")}
                          className="text-emerald-600 hover:text-emerald-900 p-1 rounded-full hover:bg-emerald-50 transition-colors duration-150"
                          title="Approve"
                        >
                          <FiCheck className="text-lg" />
                        </button>
                      )}
                      <button
                        onClick={() => onEdit(franchise)}
                        className="text-green-600 hover:text-green-900 p-1 rounded-full hover:bg-blue-50 transition-colors duration-150"
                        title="Edit"
                      >
                        <FiEdit2 className="text-lg" />
                      </button>
                      <button
                        onClick={() => onDelete(franchise)}
                        className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition-colors duration-150"
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
