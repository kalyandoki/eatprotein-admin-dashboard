// src/modules/monsterStores/components/DeleteMonsterModal.tsx
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  deleteMonsterStore,
  setSelectedMonsterStore,
} from "../monsterStoreSlice";
import { FaTrash, FaTimes, FaDragon } from "react-icons/fa";

interface DeleteMonsterModalProps {
  open: boolean;
  onClose: () => void;
}

const DeleteMonsterModal: React.FC<DeleteMonsterModalProps> = ({
  open,
  onClose,
}) => {
  const product = useAppSelector((s) => s.monsterStores.selectedProduct);
  const dispatch = useAppDispatch();

  if (!open) return null;

  const handleDelete = () => {
    if (product) {
      dispatch(deleteMonsterStore(product.id));
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all">
        <div className="bg-red-600 text-white px-6 py-4 rounded-t-xl flex items-center justify-between">
          <h2 className="text-xl font-semibold">Delete Monster</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-6">
          {product && (
            <>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-100 rounded-full mb-4">
                <FaTrash className="text-red-600 text-xl" />
              </div>

              <div className="flex justify-center mb-4">
                <div className="h-24 w-24 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://picsum.photos/seed/error/400/200.jpg";
                    }}
                  />
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">
                {product.name}
              </h3>

              <p className="text-sm text-gray-600 text-center mb-4 line-clamp-2">
                {product.description}
              </p>

              <div className="bg-gray-50 rounded-lg p-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Price:</span>
                  <span className="font-semibold text-purple-600">
                    ₹{product.price}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm text-gray-600">Stock:</span>
                  <span className="font-semibold">{product.stock} units</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm text-gray-600">Category:</span>
                  <span className="font-semibold">{product.category}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm text-gray-600">Rarity:</span>
                  <span className="font-semibold">{product.rarity}</span>
                </div>
              </div>

              <p className="text-center text-gray-700 mb-6">
                Are you sure you want to delete this monster? This action cannot
                be undone.
              </p>

              <div className="flex justify-center gap-3">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center gap-2"
                >
                  <FaTrash />
                  Delete Monster
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteMonsterModal;
