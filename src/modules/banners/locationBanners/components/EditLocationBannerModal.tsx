// src/modules/banners/locationBanners/components/EditLocationBannerModal.tsx
import React, { useState, useEffect, useRef } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { editLocationBanner, LocationBanner } from "../locationBannersSlice";
import { FiX, FiSave, FiUpload, FiEdit3 } from "react-icons/fi";

export default function EditLocationBannerModal({
  banner,
  onClose,
}: {
  banner: LocationBanner;
  onClose: () => void;
}) {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    id: banner.id,
    sno: banner.sno,
    areaName: banner.areaName,
    city: banner.city,
    bannerName: banner.bannerName,
    bannerImage: banner.bannerImage,
    status: banner.status as "Active" | "Inactive",
  });

  const [errors, setErrors] = useState({
    areaName: "",
    city: "",
    bannerName: "",
    bannerImage: "",
  });

  const [imagePreview, setImagePreview] = useState<string>(banner.bannerImage);

  // Mock data for dropdowns
  const areas = [
    "A. S. Rao Nagar",
    "A.S. Rao, Nagar",
    "Bapuji Nagar",
    "Christian Peta",
    "Dammaiguda",
    "Ramanthapur",
    "Janathapet",
    "Kacherimitta",
    "Kapra",
    "Kavali",
    "Kavali Bit - II Rural",
    "Kundanpally",
    "Kushaiguda",
  ];

  const cities = [
    "Hyderabad",
    "Secunderabad",
    "Kavali",
    "Vijayawada",
    "Guntur",
    "Nellore",
    "Tirupati",
    "Visakhapatnam",
  ];

  useEffect(() => {
    setForm({
      id: banner.id,
      sno: banner.sno,
      areaName: banner.areaName,
      city: banner.city,
      bannerName: banner.bannerName,
      bannerImage: banner.bannerImage,
      status: banner.status,
    });
    setImagePreview(banner.bannerImage);
    setErrors({
      areaName: "",
      city: "",
      bannerName: "",
      bannerImage: "",
    });
  }, [banner]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      areaName: "",
      city: "",
      bannerName: "",
      bannerImage: "",
    };

    if (!form.areaName) {
      newErrors.areaName = "Area name is required";
      isValid = false;
    }

    if (!form.city) {
      newErrors.city = "City is required";
      isValid = false;
    }

    if (!form.bannerName.trim()) {
      newErrors.bannerName = "Banner name is required";
      isValid = false;
    }

    if (!form.bannerImage) {
      newErrors.bannerImage = "Banner image is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    dispatch(editLocationBanner(form));
    onClose();
  };

  const handleClose = () => {
    setForm({
      id: banner.id,
      sno: banner.sno,
      areaName: banner.areaName,
      city: banner.city,
      bannerName: banner.bannerName,
      bannerImage: banner.bannerImage,
      status: banner.status,
    });
    setImagePreview(banner.bannerImage);
    setErrors({
      areaName: "",
      city: "",
      bannerName: "",
      bannerImage: "",
    });
    onClose();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImagePreview(result);
        setForm({ ...form, bannerImage: result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden transform transition-all">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
          <h2 className="text-xl font-semibold">Edit Location Banner</h2>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Area Name
                </label>
                <select
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                    errors.areaName ? "border-red-500" : "border-gray-300"
                  }`}
                  value={form.areaName}
                  onChange={(e) =>
                    setForm({ ...form, areaName: e.target.value })
                  }
                >
                  <option value="">Select Area</option>
                  {areas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
                {errors.areaName && (
                  <p className="mt-1 text-sm text-red-600">{errors.areaName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <select
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                    errors.city ? "border-red-500" : "border-gray-300"
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
                  <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banner Name
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                    errors.bannerName ? "border-red-500" : "border-gray-300"
                  }`}
                  value={form.bannerName}
                  onChange={(e) =>
                    setForm({ ...form, bannerName: e.target.value })
                  }
                  placeholder="Enter banner name"
                />
                {errors.bannerName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.bannerName}
                  </p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banner Image
                </label>
                <div className="relative">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="relative group">
                        <img
                          src={imagePreview}
                          alt="Banner preview"
                          className="h-32 w-full object-cover rounded-lg"
                        />
                        <div
                          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg cursor-pointer"
                          onClick={triggerFileInput}
                        >
                          <div className="bg-white text-gray-800 p-2 rounded-full">
                            <FiEdit3 className="h-5 w-5" />
                          </div>
                        </div>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    className="mt-2 w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <FiUpload className="text-sm" />
                    Change Image
                  </button>
                </div>
                {errors.bannerImage && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.bannerImage}
                  </p>
                )}
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
                          status: e.target.value as "Active" | "Inactive",
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
                          status: e.target.value as "Active" | "Inactive",
                        })
                      }
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Inactive</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 px-6 py-4 mt-4 border-t border-gray-200 bg-gray-50">
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
              Update Banner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
