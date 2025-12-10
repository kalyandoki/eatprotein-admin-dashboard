// src/modules/users/customers/components/DeleteCustomerModal.tsx
import React from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { deleteCustomer, Customer } from "../customersSlice";
import { FiX, FiTrash2 } from "react-icons/fi";

export default function DeleteCustomerModal({
  customer,
  onClose,
}: {
  customer: Customer;
  onClose: () => void;
}) {
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(deleteCustomer(customer.id));
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
          <FiTrash2 className="text-red-600 h-6 w-6" />
        </div>
        <p className="text-center text-gray-700 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{customer.name}</span>?
        </p>
        <p className="text-center text-sm text-gray-500 mb-6">
          This action cannot be undone.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
