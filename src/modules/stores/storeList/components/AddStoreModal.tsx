// src/modules/shop/storeList/components/AddStoreModal.tsx
import React, { useState } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { addStore, Store } from "../storeListSlice";
import { FiX, FiUpload, FiCamera } from "react-icons/fi";

export default function AddStoreModal({ onClose }: { onClose: () => void }) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<Partial<Store>>({
    storeId: 0,
    category: "",
    name: "",
    logo: "",
    areaName: "",
    city: "",
    contactName: "",
    contactNo: "",
    fieldOfficer: "",
    radius: 5,
    rating: 0,
    status: "Active",
    availableStatus: "Available",
    created: new Date().toISOString().slice(0, 19).replace("T", " "),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [logoPreview, setLogoPreview] = useState<string>("");

  const categories = [
    "Veg",
    "Restaurants",
    "Eggs",
    "Dairy Foods",
    "Bakery & Sweets",
    "Home Foods",
    "Grocery",
    "Electronics",
  ];

  const areaNames = [
    "Rebala",
    "Downtown",
    "Uptown",
    "Midtown",
    "Westside",
    "Eastside",
    "Northside",
    "Southside",
    "Central",
    "Suburbs",
  ];

  const cities = [
    "Rebala",
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
  ];

  const fieldOfficers = [
    "TEST FO 1",
    "TEST FO 2",
    "TEST FO 3",
    "TEST FO 4",
    "TEST FO 5",
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.category?.trim()) {
      newErrors.category = "Category is required";
    }

    if (!form.name?.trim()) {
      newErrors.name = "Store name is required";
    }

    if (!form.areaName?.trim()) {
      newErrors.areaName = "Area name is required";
    }

    if (!form.city?.trim()) {
      newErrors.city = "City is required";
    }

    if (!form.contactName?.trim()) {
      newErrors.contactName = "Contact name is required";
    }

    if (!form.contactNo?.trim()) {
      newErrors.contactNo = "Contact number is required";
    } else if (!/^\d{10}$/.test(form.contactNo.replace(/\D/g, ""))) {
      newErrors.contactNo = "Please enter a valid 10-digit phone number";
    }

    if (!form.fieldOfficer?.trim()) {
      newErrors.fieldOfficer = "Field officer is required";
    }

    if (!form.radius || form.radius < 1) {
      newErrors.radius = "Radius must be at least 1 km";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const newStore: Store = {
      id: Date.now().toString(),
      storeId: Math.max(...Array.from({ length: 100 }, (_, i) => i + 1)) + 1,
      category: form.category!,
      name: form.name!,
      logo: logoPreview || "https://picsum.photos/seed/store/100/100.jpg",
      areaName: form.areaName!,
      city: form.city!,
      contactName: form.contactName!,
      contactNo: form.contactNo!,
      fieldOfficer: form.fieldOfficer!,
      radius: form.radius!,
      rating: form.rating!,
      status: form.status as "Active" | "Inactive",
      availableStatus: form.availableStatus as "Available" | "Unavailable",
      created: form.created!,
    };

    dispatch(addStore(newStore));
    onClose();
  };

  const handleClose = () => {
    setForm({
      storeId: 0,
      category: "",
      name: "",
      logo: "",
      areaName: "",
      city: "",
      contactName: "",
      contactNo: "",
      fieldOfficer: "",
      radius: 5,
      rating: 0,
      status: "Active",
      availableStatus: "Available",
      created: new Date().toISOString().slice(0, 19).replace("T", " "),
    });
    setErrors({});
    setLogoPreview("");
    onClose();
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden transform transition-all">
        <div className="bg-[#258440] text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add New Store</h2>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-70px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Store Logo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Store Logo
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Store logo"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FiCamera className="text-gray-400 text-2xl" />
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="hidden"
                      id="logo-upload"
                    />
                    <label
                      htmlFor="logo-upload"
                      className="cursor-pointer inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#258440]"
                    >
                      <FiUpload className="mr-2" />
                      Upload Logo
                    </label>
                  </div>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
                    errors.category ? "border-[#D7201A]" : "border-gray-300"
                  }`}
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-[#D7201A]">
                    {errors.category}
                  </p>
                )}
              </div>

              {/* Store Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Store Name *
                </label>
                <input
                  type="text"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
                    errors.name ? "border-[#D7201A]" : "border-gray-300"
                  }`}
                  placeholder="Enter store name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-[#D7201A]">{errors.name}</p>
                )}
              </div>

              {/* Area Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Area Name *
                </label>
                <select
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
                    errors.areaName ? "border-[#D7201A]" : "border-gray-300"
                  }`}
                  value={form.areaName}
                  onChange={(e) =>
                    setForm({ ...form, areaName: e.target.value })
                  }
                >
                  <option value="">Select Area</option>
                  {areaNames.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
                {errors.areaName && (
                  <p className="mt-1 text-sm text-[#D7201A]">
                    {errors.areaName}
                  </p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <select
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
                    errors.city ? "border-[#D7201A]" : "border-gray-300"
                  }`}
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                {errors.city && (
                  <p className="mt-1 text-sm text-[#D7201A]">{errors.city}</p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Contact Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Name *
                </label>
                <input
                  type="text"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
                    errors.contactName ? "border-[#D7201A]" : "border-gray-300"
                  }`}
                  placeholder="Enter contact name"
                  value={form.contactName}
                  onChange={(e) =>
                    setForm({ ...form, contactName: e.target.value })
                  }
                />
                {errors.contactName && (
                  <p className="mt-1 text-sm text-[#D7201A]">
                    {errors.contactName}
                  </p>
                )}
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
                    errors.contactNo ? "border-[#D7201A]" : "border-gray-300"
                  }`}
                  placeholder="Enter contact number"
                  value={form.contactNo}
                  onChange={(e) =>
                    setForm({ ...form, contactNo: e.target.value })
                  }
                />
                {errors.contactNo && (
                  <p className="mt-1 text-sm text-[#D7201A]">
                    {errors.contactNo}
                  </p>
                )}
              </div>

              {/* Field Officer */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Field Officer *
                </label>
                <select
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
                    errors.fieldOfficer ? "border-[#D7201A]" : "border-gray-300"
                  }`}
                  value={form.fieldOfficer}
                  onChange={(e) =>
                    setForm({ ...form, fieldOfficer: e.target.value })
                  }
                >
                  <option value="">Select Field Officer</option>
                  {fieldOfficers.map((fo) => (
                    <option key={fo} value={fo}>
                      {fo}
                    </option>
                  ))}
                </select>
                {errors.fieldOfficer && (
                  <p className="mt-1 text-sm text-[#D7201A]">
                    {errors.fieldOfficer}
                  </p>
                )}
              </div>

              {/* Radius */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Radius (km) *
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
                    errors.radius ? "border-[#D7201A]" : "border-gray-300"
                  }`}
                  placeholder="Enter service radius"
                  value={form.radius}
                  onChange={(e) =>
                    setForm({ ...form, radius: Number(e.target.value) })
                  }
                />
                {errors.radius && (
                  <p className="mt-1 text-sm text-[#D7201A]">{errors.radius}</p>
                )}
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Initial Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setForm({ ...form, rating: star })}
                      className="text-2xl transition-colors duration-200"
                    >
                      <span
                        className={
                          star <= (form.rating || 0)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      >
                        ★
                      </span>
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {form.rating || 0} / 5
                  </span>
                </div>
              </div>

              {/* Status */}
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
                          status: e.target.value as "Active" | "Inactive",
                        })
                      }
                      className="h-4 w-4 text-[#258440] focus:ring-[#258440] border-gray-300"
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
                          status: e.target.value as "Active" | "Inactive",
                        })
                      }
                      className="h-4 w-4 text-[#258440] focus:ring-[#258440] border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Inactive</span>
                  </label>
                </div>
              </div>

              {/* Available Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Status
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="availableStatus"
                      value="Available"
                      checked={form.availableStatus === "Available"}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          availableStatus: e.target.value as
                            | "Available"
                            | "Unavailable",
                        })
                      }
                      className="h-4 w-4 text-[#258440] focus:ring-[#258440] border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Available
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="availableStatus"
                      value="Unavailable"
                      checked={form.availableStatus === "Unavailable"}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          availableStatus: e.target.value as
                            | "Available"
                            | "Unavailable",
                        })
                      }
                      className="h-4 w-4 text-[#258440] focus:ring-[#258440] border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Unavailable
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={handleClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#258440] text-white rounded-lg hover:bg-[#1E803A] transition-colors duration-200"
            >
              Add Store
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
