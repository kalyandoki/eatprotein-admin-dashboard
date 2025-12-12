// src/modules/franchise/franchise-location/components/DeleteLocationModal.tsx
import React from "react";
import { useAppDispatch } from "../../../../store/hooks";
import {
  deleteFranchiseLocation,
  FranchiseLocation,
} from "../franchiseLocationSlice";
import { FiX, FiTrash2, FiMapPin } from "react-icons/fi";

interface DeleteLocationModalProps {
  location: FranchiseLocation;
  onClose: () => void;
}

export default function DeleteLocationModal({
  location,
  onClose,
}: DeleteLocationModalProps) {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteFranchiseLocation(location.id));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
            <FiTrash2 className="text-red-600 text-xl" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 text-center mb-2 flex items-center justify-center">
            <FiMapPin className="mr-2 text-emerald-600" />
            Delete Franchise Location
          </h3>
          <p className="text-sm text-gray-500 text-center mb-6">
            Are you sure you want to delete "{location.name}"? This action
            cannot be undone.
          </p>
          <div className="flex justify-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <FiTrash2 />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
