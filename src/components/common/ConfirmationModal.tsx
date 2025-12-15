// src/components/common/ConfirmationModal.tsx
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { hideConfirmationModal } from "../../store/slices/uiSlice";
import { FiX, FiCheck } from "react-icons/fi";

export default function ConfirmationModal() {
  const dispatch = useAppDispatch();
  const { isVisible, title, message, confirmButtonText, onConfirm, onCancel } =
    useAppSelector((state) => state.ui.confirmationModal);

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    dispatch(hideConfirmationModal());
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    dispatch(hideConfirmationModal());
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all">
        <div className="bg-emerald-600 px-6 py-4 rounded-t-xl flex justify-between items-center border-b">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <button
            onClick={handleCancel}
            className="text-white hover:text-gray-200"
          >
            <FiX className="text-xl" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-center text-gray-800 font">{message}</p>
        </div>
        <div className="flex justify-center gap-3 px-6 pb-6">
          <button
            onClick={handleCancel}
            className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-5 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-2"
          >
            <FiCheck className="text-lg" />
            {confirmButtonText || "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
