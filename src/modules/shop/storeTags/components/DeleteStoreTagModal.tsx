// // src/modules/shop/storeTags/components/DeleteStoreTagModal.tsx
// import React from "react";
// import { useAppDispatch } from "../../../../store/hooks";
// import { deleteStoreTag, StoreTag } from "../storeTagsSlice";
// import { FiX } from "react-icons/fi";

// export default function DeleteStoreTagModal({
//   tag,
//   onClose,
// }: {
//   tag: StoreTag;
//   onClose: () => void;
// }) {
//   const dispatch = useAppDispatch();

//   const handleDelete = () => {
//     dispatch(deleteStoreTag(tag.id));
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all">
//         <div className="bg-[#D7201A] text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
//           <h2 className="text-xl font-semibold">Delete Store Tag</h2>
//           <button onClick={onClose} className="text-white hover:text-gray-200">
//             <FiX className="text-xl" />
//           </button>
//         </div>

//         <div className="p-6">
//           <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
//             <svg
//               className="w-6 h-6 text-[#D7201A]"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
//               ></path>
//             </svg>
//           </div>

//           <p className="text-center text-gray-700 mb-6">
//             Are you sure you want to delete <b>{tag.name}</b>? This action
//             cannot be undone.
//           </p>

//           <div className="flex justify-center gap-3">
//             <button
//               onClick={onClose}
//               className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleDelete}
//               className="px-4 py-2 bg-[#D7201A] text-white rounded-lg hover:bg-[#D51711] transition-colors duration-200"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/modules/shop/storeTags/components/DeleteStoreTagModal.tsx
import React from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { deleteStoreTag, StoreTag } from "../storeTagsSlice";
import { FiX } from "react-icons/fi";

export default function DeleteStoreTagModal({
  tag,
  onClose,
}: {
  tag: StoreTag;
  onClose: () => void;
}) {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteStoreTag(tag.id));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all">
        <div className="bg-[#D7201A] text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
          <h2 className="text-xl font-semibold">Delete Store Tag</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <FiX className="text-xl" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
            <svg
              className="w-6 h-6 text-[#D7201A]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              ></path>
            </svg>
          </div>

          <p className="text-center text-gray-700 mb-6">
            Are you sure you want to delete <b>{tag.name}</b>? This action
            cannot be undone.
          </p>

          <div className="flex justify-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-[#D7201A] text-white rounded-lg hover:bg-[#D51711] transition-colors duration-200"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
