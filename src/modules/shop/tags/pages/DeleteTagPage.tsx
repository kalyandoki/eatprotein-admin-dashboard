// // src/modules/shop/tags/pages/DeleteTagPage.tsx
// import React, { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
// import { deleteTag, Tag } from "../tagsSlice";
// import { FiX, FiTrash2, FiAlertCircle } from "react-icons/fi";
// import { useNavigate, useParams } from "react-router-dom";

// export default function DeleteTagPage() {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const { id } = useParams<{ id: string }>();
//   const { tags } = useAppSelector((state) => state.tags);

//   const [tag, setTag] = useState<Tag | null>(null);
//   const [isDeleting, setIsDeleting] = useState(false);

//   useEffect(() => {
//     if (id && tags.length > 0) {
//       const foundTag = tags.find((t) => t.id === id);
//       if (foundTag) {
//         setTag(foundTag);
//       }
//     }
//   }, [id, tags]);

//   const handleDelete = () => {
//     if (!tag) return;

//     setIsDeleting(true);

//     // Simulate API call
//     setTimeout(() => {
//       dispatch(deleteTag(tag.id));
//       navigate("/tags");
//     }, 1000);
//   };

//   const handleCancel = () => {
//     navigate("/tags");
//   };

//   if (!tag) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#258440]"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 flex items-center justify-center">
//       <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden transform transition-all">
//         <div className="bg-[#D7201A] text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
//           <h2 className="text-xl font-semibold flex items-center gap-2">
//             <FiTrash2 className="text-xl" />
//             Delete Tag
//           </h2>
//           <button
//             onClick={handleCancel}
//             className="text-white hover:text-gray-200"
//           >
//             <FiX className="text-xl" />
//           </button>
//         </div>

//         <div className="p-6">
//           <div className="flex justify-center mb-6">
//             <div className="bg-red-100 p-4 rounded-full inline-flex">
//               <FiAlertCircle className="h-12 w-12 text-red-600" />
//             </div>
//           </div>

//           <h3 className="text-lg font-medium text-gray-900 mb-2 text-center">
//             Are you sure you want to delete{" "}
//             <span className="text-[#D7201A] font-semibold">{tag.name}</span>?
//           </h3>
//           <p className="text-sm text-gray-500 text-center mb-6">
//             This action cannot be undone. All products associated with this tag
//             will remain unaffected.
//           </p>

//           <div className="flex justify-center gap-3">
//             <button
//               onClick={handleCancel}
//               disabled={isDeleting}
//               className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleDelete}
//               disabled={isDeleting}
//               className="px-4 py-2 bg-[#D7201A] text-white rounded-lg hover:bg-[#D51711] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//             >
//               {isDeleting ? (
//                 <>
//                   <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
//                   <span>Deleting...</span>
//                 </>
//               ) : (
//                 <>
//                   <FiTrash2 className="text-lg" />
//                   <span>Delete Tag</span>
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
