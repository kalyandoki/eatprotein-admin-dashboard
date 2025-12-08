// // src/modules/shop/uom/components/EditUOMModal.tsx
// import React, { useState } from "react";
// import { useAppDispatch } from "../../../../store/hooks";
// import { editUOM, UOM } from "../uomSlice";

// export default function EditUOMModal({
//   onClose,
//   uom,
// }: {
//   onClose: () => void;
//   uom: UOM;
// }) {
//   const dispatch = useAppDispatch();
//   const [form, setForm] = useState(uom);

//   const handleSave = () => {
//     dispatch(editUOM(form));
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
//       <div className="bg-white p-5 rounded shadow-lg w-96">
//         <h2 className="text-lg font-semibold mb-4">Edit Unit</h2>

//         <input
//           className="border w-full p-2 mb-2"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />

//         <input
//           className="border w-full p-2 mb-2"
//           value={form.abbreviation}
//           onChange={(e) => setForm({ ...form, abbreviation: e.target.value })}
//         />

//         <select
//           className="border w-full p-2 mb-2"
//           value={form.type}
//           onChange={(e) => setForm({ ...form, type: e.target.value as any })}
//         >
//           <option>Quantity</option>
//           <option>Length</option>
//           <option>Weight</option>
//           <option>Volume</option>
//         </select>

//         <label className="text-sm">
//           <input
//             type="checkbox"
//             checked={form.baseUnit}
//             onChange={(e) => setForm({ ...form, baseUnit: e.target.checked })}
//           />{" "}
//           Base Unit
//         </label>

//         <input
//           type="number"
//           className="border w-full p-2 mb-2 mt-2"
//           value={form.conversion}
//           onChange={(e) =>
//             setForm({ ...form, conversion: Number(e.target.value) })
//           }
//         />

//         <button
//           onClick={handleSave}
//           className="bg-blue-600 text-white px-4 py-2 rounded w-full mt-3"
//         >
//           Update
//         </button>

//         <button onClick={onClose} className="mt-2 text-gray-600 w-full">
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { editUOM, UOM } from "../uomSlice";
import { FiX } from "react-icons/fi";

export default function EditUOMModal({
  onClose,
  uom,
}: {
  onClose: () => void;
  uom: UOM;
}) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState(uom);
  const [errors, setErrors] = useState({
    name: "",
    abbreviation: "",
    conversion: "",
  });

  useEffect(() => {
    setForm(uom);
    setErrors({ name: "", abbreviation: "", conversion: "" });
  }, [uom]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", abbreviation: "", conversion: "" };

    if (!form.name.trim()) {
      newErrors.name = "Unit name is required";
      isValid = false;
    }

    if (!form.abbreviation.trim()) {
      newErrors.abbreviation = "Abbreviation is required";
      isValid = false;
    }

    if (form.conversion <= 0) {
      newErrors.conversion = "Conversion must be greater than 0";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    dispatch(editUOM(form));
    onClose();
  };

  const handleClose = () => {
    setForm(uom);
    setErrors({ name: "", abbreviation: "", conversion: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all">
        <div className="bg-[#258440] text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
          <h2 className="text-xl font-semibold">Edit Unit</h2>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unit Name
            </label>
            <input
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
                errors.name ? "border-[#D7201A]" : "border-gray-300"
              }`}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-[#D7201A]">{errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Abbreviation
            </label>
            <input
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
                errors.abbreviation ? "border-[#D7201A]" : "border-gray-300"
              }`}
              value={form.abbreviation}
              onChange={(e) =>
                setForm({ ...form, abbreviation: e.target.value })
              }
            />
            {errors.abbreviation && (
              <p className="mt-1 text-sm text-[#D7201A]">
                {errors.abbreviation}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200"
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value as any })
              }
            >
              <option value="Quantity">Quantity</option>
              <option value="Length">Length</option>
              <option value="Weight">Weight</option>
              <option value="Volume">Volume</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={form.baseUnit}
                onChange={(e) =>
                  setForm({ ...form, baseUnit: e.target.checked })
                }
                className="h-4 w-4 text-[#258440] focus:ring-[#258440] border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Base Unit</span>
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Conversion Factor
            </label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200 ${
                errors.conversion ? "border-[#D7201A]" : "border-gray-300"
              }`}
              value={form.conversion}
              onChange={(e) =>
                setForm({ ...form, conversion: Number(e.target.value) })
              }
            />
            {errors.conversion && (
              <p className="mt-1 text-sm text-[#D7201A]">{errors.conversion}</p>
            )}
          </div>

          <div className="mb-6">
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
                    setForm({ ...form, status: e.target.value as any })
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
                    setForm({ ...form, status: e.target.value as any })
                  }
                  className="h-4 w-4 text-[#258440] focus:ring-[#258440] border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Inactive</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3">
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
              Update Unit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
