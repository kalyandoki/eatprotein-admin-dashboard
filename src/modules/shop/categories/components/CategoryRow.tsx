// src/modules/categories/components/CategoryRow.tsx
import React, { useState } from "react";
import {
  Category,
  setSelectedCategory,
  updateCategory,
} from "../categorySlice";
import { useAppDispatch } from "../../../../store/hooks";
import EditCategoryModal from "./EditCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";
import { FiEdit2, FiTrash2, FiPackage } from "react-icons/fi";

const CategoryRow = ({ cat }: { cat: Category }) => {
  const dispatch = useAppDispatch();

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const openEditModal = () => {
    dispatch(setSelectedCategory(cat));
    setOpenEdit(true);
  };

  const openDeleteModal = () => {
    dispatch(setSelectedCategory(cat));
    setOpenDelete(true);
  };

  const handleToggleStatus = () => {
    const newStatus = cat.status === "Active" ? "Inactive" : "Active";
    dispatch(
      updateCategory({
        ...cat,
        status: newStatus,
      })
    );
  };

  return (
    <>
      <tr className="border-t hover:bg-gray-50 transition-colors duration-150">
        <td className="p-4">
          <div className="h-12 w-12 rounded-lg overflow-hidden bg-gray-100">
            {cat.image ? (
              <img
                src={cat.image}
                alt={cat.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <FiPackage className="text-gray-400" />
              </div>
            )}
          </div>
        </td>
        <td className="p-4 font-medium">{cat.name}</td>
        <td className="p-4">
          <div className="max-w-xs truncate" title={cat.description}>
            {cat.description}
          </div>
        </td>
        <td className="p-4">
          <button
            onClick={handleToggleStatus}
            className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            style={{
              backgroundColor: cat.status === "Active" ? "#10b981" : "#ef4444",
            }}
          >
            <span
              className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
              style={{
                transform:
                  cat.status === "Active"
                    ? "translateX(1.25rem)"
                    : "translateX(0.25rem)",
              }}
            />
          </button>
          {/* <span
            className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              cat.status === "Active"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {cat.status}
          </span> */}
        </td>
        <td className="p-4">
          <div className="flex items-center">
            <span className="mr-2">{cat.items}</span>
            <div className="flex flex-col">
              <button
                className="text-xs text-gray-500 hover:text-gray-700"
                title="Increase items"
                onClick={() =>
                  dispatch({
                    type: "categories/incrementItems",
                    payload: cat.id,
                  })
                }
              >
                ▲
              </button>
              <button
                className="text-xs text-gray-500 hover:text-gray-700"
                title="Decrease items"
                onClick={() =>
                  dispatch({
                    type: "categories/decrementItems",
                    payload: cat.id,
                  })
                }
              >
                ▼
              </button>
            </div>
          </div>
        </td>
        <td className="p-4">{cat.createdDate}</td>
        <td className="p-4">
          <div className="flex gap-2">
            <button
              onClick={openEditModal}
              className="p-2 rounded-lg bg-[#258440] text-white hover:bg-[#1E803A] transition-colors duration-150"
              title="Edit"
            >
              <FiEdit2 className="text-sm" />
            </button>
            <button
              onClick={openDeleteModal}
              className="p-2 rounded-lg bg-[#D7201A] text-white hover:bg-[#D51711] transition-colors duration-150"
              title="Delete"
            >
              <FiTrash2 className="text-sm" />
            </button>
          </div>
        </td>
      </tr>

      <EditCategoryModal open={openEdit} onClose={() => setOpenEdit(false)} />
      <DeleteCategoryModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
      />
    </>
  );
};

export default CategoryRow;
