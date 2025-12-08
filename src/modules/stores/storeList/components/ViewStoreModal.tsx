// src/modules/shop/storeList/components/ViewStoreModal.tsx
import React from "react";
import { Store } from "../storeListSlice";
import {
  FiX,
  FiMapPin,
  FiPhone,
  FiMail,
  FiCalendar,
  FiStar,
  FiUser,
  FiPackage,
} from "react-icons/fi";

export default function ViewStoreModal({
  store,
  onClose,
}: {
  store: Store;
  onClose: () => void;
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getAvailableColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800";
      case "Unavailable":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400">
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400">
          ☆
        </span>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">
          ☆
        </span>
      );
    }

    return stars;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden transform transition-all">
        <div className="bg-[#258440] text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
          <h2 className="text-xl font-semibold">Store Details</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <FiX className="text-xl" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-70px)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Store Logo and Basic Info */}
            <div className="md:col-span-1">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden mb-4">
                  <img
                    src={store.logo}
                    alt={store.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                  {store.name}
                </h3>
                <p className="text-sm text-gray-500 text-center mb-4">
                  ID: {store.storeId}
                </p>

                <div className="flex justify-center gap-2 mb-4">
                  <span
                    className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      store.status
                    )}`}
                  >
                    {store.status}
                  </span>
                  <span
                    className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getAvailableColor(
                      store.availableStatus
                    )}`}
                  >
                    {store.availableStatus}
                  </span>
                </div>

                <div className="flex items-center justify-center mb-4">
                  <div className="flex">{getRatingStars(store.rating)}</div>
                  <span className="ml-2 text-sm text-gray-600">
                    {store.rating} / 5
                  </span>
                </div>
              </div>
            </div>

            {/* Store Details */}
            <div className="md:col-span-2 space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <FiPackage className="mr-2" />
                  Store Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium text-gray-900">
                      {store.category}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Service Radius</p>
                    <p className="font-medium text-gray-900">
                      {store.radius} km
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Field Officer</p>
                    <p className="font-medium text-gray-900">
                      {store.fieldOfficer}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Created</p>
                    <p className="font-medium text-gray-900">{store.created}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <FiMapPin className="mr-2" />
                  Location
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Area Name</p>
                    <p className="font-medium text-gray-900">
                      {store.areaName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">City</p>
                    <p className="font-medium text-gray-900">{store.city}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <FiUser className="mr-2" />
                  Contact Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Contact Name</p>
                    <p className="font-medium text-gray-900">
                      {store.contactName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contact Number</p>
                    <p className="font-medium text-gray-900">
                      {store.contactNo}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#258440] text-white rounded-lg hover:bg-[#1E803A] transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
