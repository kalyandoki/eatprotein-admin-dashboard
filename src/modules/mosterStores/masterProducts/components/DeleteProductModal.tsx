// // src/modules/shop/masterProducts/components/DeleteProductModal.tsx
// import React from "react";
// import { useAppDispatch } from "../../../../store/hooks";
// import { deleteProduct, MasterProduct } from "../masterProductsSlice";
// import { FiX, FiTrash2 } from "react-icons/fi";

// export default function DeleteProductModal({
//   product,
//   onClose,
// }: {
//   product: MasterProduct;
//   onClose: () => void;
// }) {
//   const dispatch = useAppDispatch();

//   const handleDelete = () => {
//     dispatch(deleteProduct(product.id));
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all">
//         <div className="bg-red-600 text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
//           <h2 className="text-xl font-semibold">Delete Product</h2>
//           <button onClick={onClose} className="text-white hover:text-gray-200">
//             <FiX className="text-xl" />
//           </button>
//         </div>

//         <div className="p-6">
//           <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
//             <FiTrash2 className="text-red-600 h-6 w-6" />
//           </div>

//           <p className="text-center text-gray-700 mb-6">
//             Are you sure you want to delete{" "}
//             <span className="font-semibold">{product.name}</span>?
//           </p>
//           <p className="text-center text-sm text-gray-500 mb-6">
//             This action cannot be undone.
//           </p>
//         </div>

//         <div className="flex justify-center gap-3 px-6 pb-6">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleDelete}
//             className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/modules/shop/masterProducts/components/DeleteProductModal.tsx
import React from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { deleteProduct, MasterProduct } from "../masterProductsSlice";
import { FiX, FiTrash2 } from "react-icons/fi";

export default function DeleteProductModal({
  product,
  onClose,
}: {
  product: MasterProduct;
  onClose: () => void;
}) {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteProduct(product.id));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all">
        <div className="bg-red-600 text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
          <h2 className="text-xl font-semibold">Delete Product</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <FiX className="text-xl" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
            <FiTrash2 className="text-red-600 h-6 w-6" />
          </div>

          <p className="text-center text-gray-700 mb-6">
            Are you sure you want to delete{" "}
            <span className="font-semibold">{product.name}</span>?
          </p>
          <p className="text-center text-sm text-gray-500 mb-6">
            This action cannot be undone.
          </p>
        </div>

        <div className="flex justify-center gap-3 px-6 pb-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
