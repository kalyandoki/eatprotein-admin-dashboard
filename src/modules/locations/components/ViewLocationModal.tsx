// src/modules/shop/locations/components/ViewLocationModal.tsx
import React from "react";
import { Location } from "../locationsSlice";
import { FiX, FiMapPin, FiEdit2, FiCalendar, FiClock } from "react-icons/fi";

export default function ViewLocationModal({
  location,
  onClose,
  onEdit,
}: {
  location: Location;
  onClose: () => void;
  onEdit?: (location: Location) => void;
}) {
  const handleEdit = () => {
    if (onEdit) {
      onEdit(location);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden transform transition-all">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
          <h2 className="text-xl font-semibold">Location Details</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <FiX className="text-xl" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Location Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center">
                  <FiMapPin className="text-emerald-600 text-2xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {location.areaName}
                  </h3>
                  <p className="text-sm text-gray-500">S.No: {location.sno}</p>
                  <div className="flex items-center mt-2">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        location.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {location.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">City</p>
                  <p className="text-sm font-medium text-gray-900">
                    {location.city}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Area Name</p>
                  <p className="text-sm font-medium text-gray-900">
                    {location.areaName}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Additional Info */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Location Information
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Location ID:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {location.id}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">
                      Serial Number:
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {location.sno}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Timestamps
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <FiCalendar className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">Created:</span>
                    <span className="text-sm font-medium text-gray-900 ml-auto">
                      {new Date(location.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FiClock className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">Updated:</span>
                    <span className="text-sm font-medium text-gray-900 ml-auto">
                      {new Date(location.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Status
                </h4>
                <div className="flex items-center">
                  <div
                    className={`h-3 w-3 rounded-full mr-2 ${
                      location.status === "Active"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  ></div>
                  <span className="text-sm font-medium text-gray-900">
                    {location.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end px-6 py-4 bg-gray-50 border-t border-gray-200">
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 mr-3 flex items-center gap-2"
          >
            <FiEdit2 className="h-4 w-4" />
            Edit Location
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
