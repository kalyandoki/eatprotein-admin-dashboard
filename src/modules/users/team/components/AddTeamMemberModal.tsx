// src/modules/users/team/components/AddTeamMemberModal.tsx
import React, { useState } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { addTeamMember, TeamMember } from "../teamSlice";
import { FiX, FiSave } from "react-icons/fi";

export default function AddTeamMemberModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    name: "",
    contactNo: "",
    email: "",
    role: "STORE" as TeamMember["role"],
    status: "Active" as TeamMember["status"],
  });

  const [errors, setErrors] = useState({
    name: "",
    contactNo: "",
    email: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      contactNo: "",
      email: "",
    };

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!form.contactNo.trim()) {
      newErrors.contactNo = "Contact number is required";
      isValid = false;
    }

    if (
      form.email &&
      !form.email.trim() &&
      !/^\S+@\S+\.\S+$/.test(form.email)
    ) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    dispatch(addTeamMember(form));
    onClose();
  };

  const handleClose = () => {
    setForm({
      name: "",
      contactNo: "",
      email: "",
      role: "STORE",
      status: "Active",
    });
    setErrors({
      name: "",
      contactNo: "",
      email: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden transform transition-all">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add New Team Member</h2>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-70px)]">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Enter name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Number
              </label>
              <input
                type="text"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                  errors.contactNo ? "border-red-500" : "border-gray-300"
                }`}
                value={form.contactNo}
                onChange={(e) =>
                  setForm({ ...form, contactNo: e.target.value })
                }
                placeholder="Enter contact number"
              />
              {errors.contactNo && (
                <p className="mt-1 text-sm text-red-600">{errors.contactNo}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Enter email (optional)"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 appearance-none bg-white"
                value={form.role}
                onChange={(e) =>
                  setForm({
                    ...form,
                    role: e.target.value as TeamMember["role"],
                  })
                }
              >
                <option value="SUPER_ADMIN">Super Admin</option>
                <option value="STORE">Store</option>
                <option value="FRANCHISE">Franchise</option>
                <option value="MARKETING_EXECUTIVE">Marketing Executive</option>
                <option value="DELIVERY_BOY">Delivery Boy</option>
                <option value="CMS_EMPLOYEE">CMS Employee</option>
                <option value="CUSTOMER">Customer</option>
                <option value="CUSTOMER_SUPPORT">Customer Support</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="Active"
                    checked={form.status === "Active"}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        status: e.target.value as TeamMember["status"],
                      })
                    }
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Active</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="Inactive"
                    checked={form.status === "Inactive"}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        status: e.target.value as TeamMember["status"],
                      })
                    }
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Inactive</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={handleClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-2"
            >
              <FiSave className="text-sm" />
              Add Member
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
