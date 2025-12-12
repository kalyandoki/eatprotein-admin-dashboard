// src/modules/franchise/franchise-location/components/ViewLocationModal.tsx
import React from "react";
import { FranchiseLocation } from "../franchiseLocationSlice";
import {
  FiX,
  FiMapPin,
  FiPhone,
  FiMail,
  FiCalendar,
  FiUsers,
  FiDollarSign,
  FiTrendingUp,
} from "react-icons/fi";

interface ViewLocationModalProps {
  location: FranchiseLocation;
  onClose: () => void;
}

export default function ViewLocationModal({
  location,
  onClose,
}: ViewLocationModalProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-emerald-100 text-emerald-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      case "Maintenance":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Owned":
        return "bg-teal-100 text-teal-800";
      case "Rented":
        return "bg-blue-100 text-blue-800";
      case "Leased":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-emerald-600 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white flex items-center">
            <FiMapPin className="mr-2 text-white" />
            Franchise Location Details
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-400 transition-colors"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              {location.name}
            </h3>
            <div className="flex gap-2">
              <span
                className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
                  location.status
                )}`}
              >
                {location.status}
              </span>
              <span
                className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full ${getTypeColor(
                  location.type
                )}`}
              >
                {location.type}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">
                Location Information
              </h4>
              <div className="space-y-3">
                <div className="flex items-start">
                  <FiMapPin className="mt-1 mr-3 h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Address</p>
                    <p className="text-sm text-gray-600">
                      {location.address}, {location.city}, {location.state}{" "}
                      {location.zipCode}, {location.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FiMapPin className="mt-1 mr-3 h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Coordinates
                    </p>
                    <p className="text-sm text-gray-600">
                      {location.latitude}, {location.longitude}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FiCalendar className="mt-1 mr-3 h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Opening Date
                    </p>
                    <p className="text-sm text-gray-600">
                      {location.openingDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FiMapPin className="mt-1 mr-3 h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Area</p>
                    <p className="text-sm text-gray-600">
                      {location.area.toLocaleString()} sq ft
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">
                Manager Information
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Manager Name
                  </p>
                  <p className="text-sm text-gray-600">{location.manager}</p>
                </div>

                <div className="flex items-start">
                  <FiPhone className="mt-1 mr-3 h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Phone</p>
                    <p className="text-sm text-gray-600">{location.phone}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FiMail className="mt-1 mr-3 h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="text-sm text-gray-600">{location.email}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">
                Staff Information
              </h4>
              <div className="space-y-3">
                <div className="flex items-start">
                  <FiUsers className="mt-1 mr-3 h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Number of Employees
                    </p>
                    <p className="text-sm text-gray-600">
                      {location.employees}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">
                Sales Information
              </h4>
              <div className="space-y-3">
                <div className="flex items-start">
                  <FiDollarSign className="mt-1 mr-3 h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Daily Average Sales
                    </p>
                    <p className="text-sm text-gray-600">
                      ${location.dailyAverageSales.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FiTrendingUp className="mt-1 mr-3 h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Monthly Average Sales
                    </p>
                    <p className="text-sm text-gray-600">
                      ${location.monthlyAverageSales.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
