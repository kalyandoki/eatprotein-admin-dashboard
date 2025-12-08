// // // src/modules/shop/tags/pages/TagsPage.tsx
// // import React, { useEffect, useState } from "react";
// // import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
// // import { fetchTags, Tag } from "../tagsSlice";
// // import {
// //   FiPlus,
// //   FiSearch,
// //   FiRefreshCw,
// //   FiEdit2,
// //   FiTrash2,
// // } from "react-icons/fi";
// // import AddTagModal from "../components/AddTagModal";
// // import EditTagModal from "../components/EditTagModal";
// // import DeleteTagModal from "../components/DeleteTagModal";

// // export default function TagsPage() {
// //   const dispatch = useAppDispatch();
// //   const { tags, status } = useAppSelector((state) => state.tags);
// //   const [search, setSearch] = useState("");
// //   const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
// //   const [showAddModal, setShowAddModal] = useState(false);
// //   const [showEditModal, setShowEditModal] = useState(false);
// //   const [showDeleteModal, setShowDeleteModal] = useState(false);

// //   useEffect(() => {
// //     if (status === "idle") dispatch(fetchTags());
// //   }, [status, dispatch]);

// //   const filteredTags = tags.filter(
// //     (t) =>
// //       t.name.toLowerCase().includes(search.toLowerCase()) ||
// //       t.description.toLowerCase().includes(search.toLowerCase()) ||
// //       t.category.toLowerCase().includes(search.toLowerCase())
// //   );

// //   const handleRefresh = () => {
// //     dispatch(fetchTags());
// //   };

// //   const handleEdit = (tag: Tag) => {
// //     setSelectedTag(tag);
// //     setShowEditModal(true);
// //   };

// //   const handleDelete = (tag: Tag) => {
// //     setSelectedTag(tag);
// //     setShowDeleteModal(true);
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 p-6">
// //       <div className="max-w-7xl mx-auto">
// //         {/* Header */}
// //         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
// //           <div>
// //             <h1 className="text-3xl font-bold text-gray-800">Product Tags</h1>
// //             <p className="text-gray-600 mt-1">
// //               Manage tags for product categorization
// //             </p>
// //           </div>
// //           <div className="flex gap-3 mt-4 md:mt-0">
// //             <button
// //               onClick={handleRefresh}
// //               className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2"
// //               title="Refresh"
// //             >
// //               <FiRefreshCw className="text-lg" />
// //               <span className="hidden sm:inline">Refresh</span>
// //             </button>
// //             <button
// //               onClick={() => setShowAddModal(true)}
// //               className="px-4 py-2 bg-[#258440] text-white font-medium rounded-lg hover:bg-[#1E803A] transition-colors duration-200 shadow-md flex items-center gap-2"
// //             >
// //               <FiPlus className="text-lg" />
// //               <span>Add Tag</span>
// //             </button>
// //           </div>
// //         </div>

// //         {/* Search and Stats */}
// //         <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
// //           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
// //             <div className="relative flex-1 max-w-md">
// //               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                 <FiSearch className="h-5 w-5 text-gray-400" />
// //               </div>
// //               <input
// //                 type="text"
// //                 placeholder="Search tags..."
// //                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200"
// //                 value={search}
// //                 onChange={(e) => setSearch(e.target.value)}
// //               />
// //             </div>
// //             <div className="flex gap-4">
// //               <div className="text-center">
// //                 <p className="text-2xl font-bold text-[#258440]">
// //                   {tags.length}
// //                 </p>
// //                 <p className="text-sm text-gray-500">Total</p>
// //               </div>
// //               <div className="text-center">
// //                 <p className="text-2xl font-bold text-[#258440]">
// //                   {tags.filter((t) => t.status === "Active").length}
// //                 </p>
// //                 <p className="text-sm text-gray-500">Active</p>
// //               </div>
// //               <div className="text-center">
// //                 <p className="text-2xl font-bold text-[#D7201A]">
// //                   {tags.filter((t) => t.status === "Inactive").length}
// //                 </p>
// //                 <p className="text-sm text-gray-500">Inactive</p>
// //               </div>
// //               <div className="text-center">
// //                 <p className="text-2xl font-bold text-gray-700">
// //                   {tags.reduce((sum, tag) => sum + tag.usageCount, 0)}
// //                 </p>
// //                 <p className="text-sm text-gray-500">Total Usage</p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Table */}
// //         {status === "loading" ? (
// //           <div className="flex justify-center items-center py-12">
// //             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#258440]"></div>
// //           </div>
// //         ) : (
// //           <div className="bg-white rounded-xl shadow-sm overflow-hidden">
// //             <div className="overflow-x-auto">
// //               <table className="min-w-full">
// //                 <thead className="bg-gray-50 border-b border-gray-200">
// //                   <tr>
// //                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                       Tag Name
// //                     </th>
// //                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                       Description
// //                     </th>
// //                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                       Category
// //                     </th>
// //                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                       Usage Count
// //                     </th>
// //                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                       Status
// //                     </th>
// //                     <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                       Actions
// //                     </th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="bg-white divide-y divide-gray-200">
// //                   {filteredTags.length === 0 ? (
// //                     <tr>
// //                       <td colSpan={6} className="px-6 py-12 text-center">
// //                         <div className="flex flex-col items-center">
// //                           <svg
// //                             className="mx-auto h-12 w-12 text-gray-400"
// //                             fill="none"
// //                             viewBox="0 0 24 24"
// //                             stroke="currentColor"
// //                             aria-hidden="true"
// //                           >
// //                             <path
// //                               strokeLinecap="round"
// //                               strokeLinejoin="round"
// //                               strokeWidth={2}
// //                               d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
// //                             />
// //                           </svg>
// //                           <h3 className="mt-2 text-sm font-medium text-gray-900">
// //                             No tags found
// //                           </h3>
// //                           <p className="mt-1 text-sm text-gray-500">
// //                             {search
// //                               ? "Try adjusting your search"
// //                               : "Get started by adding a new tag"}
// //                           </p>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   ) : (
// //                     filteredTags.map((tag) => (
// //                       <tr
// //                         key={tag.id}
// //                         className="hover:bg-gray-50 transition-colors duration-150"
// //                       >
// //                         <td className="px-6 py-4 whitespace-nowrap">
// //                           <div className="text-sm font-medium text-gray-900">
// //                             {tag.name}
// //                           </div>
// //                         </td>
// //                         <td className="px-6 py-4">
// //                           <div className="text-sm text-gray-500 line-clamp-2">
// //                             {tag.description}
// //                           </div>
// //                         </td>
// //                         <td className="px-6 py-4 whitespace-nowrap">
// //                           <div className="text-sm text-gray-500">
// //                             {tag.category}
// //                           </div>
// //                         </td>
// //                         <td className="px-6 py-4 whitespace-nowrap">
// //                           <div className="text-sm text-gray-500">
// //                             {tag.usageCount}
// //                           </div>
// //                         </td>
// //                         <td className="px-6 py-4 whitespace-nowrap">
// //                           <span
// //                             className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
// //                               tag.status === "Active"
// //                                 ? "bg-green-100 text-green-800"
// //                                 : "bg-red-100 text-red-800"
// //                             }`}
// //                           >
// //                             {tag.status}
// //                           </span>
// //                         </td>
// //                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
// //                           <button
// //                             onClick={() => handleEdit(tag)}
// //                             className="text-[#258440] hover:text-[#1E803A] mr-3 transition-colors duration-150"
// //                             title="Edit"
// //                           >
// //                             <FiEdit2 className="text-lg" />
// //                           </button>
// //                           <button
// //                             onClick={() => handleDelete(tag)}
// //                             className="text-[#D7201A] hover:text-[#D51711] transition-colors duration-150"
// //                             title="Delete"
// //                           >
// //                             <FiTrash2 className="text-lg" />
// //                           </button>
// //                         </td>
// //                       </tr>
// //                     ))
// //                   )}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>
// //         )}

// //         {/* Modals */}
// //         {showAddModal && <AddTagModal onClose={() => setShowAddModal(false)} />}
// //         {showEditModal && selectedTag && (
// //           <EditTagModal
// //             tag={selectedTag}
// //             onClose={() => {
// //               setSelectedTag(null);
// //               setShowEditModal(false);
// //             }}
// //           />
// //         )}
// //         {showDeleteModal && selectedTag && (
// //           <DeleteTagModal
// //             tag={selectedTag}
// //             onClose={() => {
// //               setSelectedTag(null);
// //               setShowDeleteModal(false);
// //             }}
// //           />
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // // src/modules/shop/tags/pages/TagsPage.tsx
// // import React, { useEffect, useState } from "react";
// // import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
// // import { fetchTags, Tag } from "../tagsSlice";
// // import {
// //   FiPlus,
// //   FiSearch,
// //   FiRefreshCw,
// //   FiEdit2,
// //   FiTrash2,
// // } from "react-icons/fi";
// // import AddTagModal from "../components/AddTagModal";
// // import EditTagModal from "../components/EditTagModal";
// // import DeleteTagModal from "../components/DeleteTagModal";
// // import Pagination from "../../../../components/common/Pagination";

// // export default function TagsPage() {
// //   const dispatch = useAppDispatch();
// //   const { tags, status } = useAppSelector((state) => state.tags);
// //   const [search, setSearch] = useState("");
// //   const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
// //   const [showAddModal, setShowAddModal] = useState(false);
// //   const [showEditModal, setShowEditModal] = useState(false);
// //   const [showDeleteModal, setShowDeleteModal] = useState(false);

// //   // Pagination state
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const itemsPerPage = 10; // Number of items per page

// //   useEffect(() => {
// //     if (status === "idle") dispatch(fetchTags());
// //   }, [status, dispatch]);

// //   const filteredTags = tags.filter(
// //     (t) =>
// //       t.name.toLowerCase().includes(search.toLowerCase()) ||
// //       t.description.toLowerCase().includes(search.toLowerCase()) ||
// //       t.category.toLowerCase().includes(search.toLowerCase())
// //   );

// //   // Calculate pagination values
// //   const totalItems = filteredTags.length;
// //   const totalPages = Math.ceil(totalItems / itemsPerPage);

// //   // Get current page items
// //   const indexOfLastItem = currentPage * itemsPerPage;
// //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// //   const currentTags = filteredTags.slice(indexOfFirstItem, indexOfLastItem);

// //   // Reset to first page when search changes
// //   useEffect(() => {
// //     setCurrentPage(1);
// //   }, [search]);

// //   const handleRefresh = () => {
// //     dispatch(fetchTags());
// //   };

// //   const handleEdit = (tag: Tag) => {
// //     setSelectedTag(tag);
// //     setShowEditModal(true);
// //   };

// //   const handleDelete = (tag: Tag) => {
// //     setSelectedTag(tag);
// //     setShowDeleteModal(true);
// //   };

// //   const handlePageChange = (page: number) => {
// //     setCurrentPage(page);
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 p-6">
// //       <div className="max-w-7xl mx-auto">
// //         {/* Header */}
// //         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
// //           <div>
// //             <h1 className="text-3xl font-bold text-gray-800">Product Tags</h1>
// //             <p className="text-gray-600 mt-1">
// //               Manage tags for product categorization
// //             </p>
// //           </div>
// //           <div className="flex gap-3 mt-4 md:mt-0">
// //             <button
// //               onClick={handleRefresh}
// //               className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2"
// //               title="Refresh"
// //             >
// //               <FiRefreshCw className="text-lg" />
// //               <span className="hidden sm:inline">Refresh</span>
// //             </button>
// //             <button
// //               onClick={() => setShowAddModal(true)}
// //               className="px-4 py-2 bg-[#258440] text-white font-medium rounded-lg hover:bg-[#1E803A] transition-colors duration-200 shadow-md flex items-center gap-2"
// //             >
// //               <FiPlus className="text-lg" />
// //               <span>Add Tag</span>
// //             </button>
// //           </div>
// //         </div>

// //         {/* Search and Stats */}
// //         <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
// //           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
// //             <div className="relative flex-1 max-w-md">
// //               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                 <FiSearch className="h-5 w-5 text-gray-400" />
// //               </div>
// //               <input
// //                 type="text"
// //                 placeholder="Search tags..."
// //                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200"
// //                 value={search}
// //                 onChange={(e) => setSearch(e.target.value)}
// //               />
// //             </div>
// //             <div className="flex gap-4">
// //               <div className="text-center">
// //                 <p className="text-2xl font-bold text-[#258440]">
// //                   {tags.length}
// //                 </p>
// //                 <p className="text-sm text-gray-500">Total</p>
// //               </div>
// //               <div className="text-center">
// //                 <p className="text-2xl font-bold text-[#258440]">
// //                   {tags.filter((t) => t.status === "Active").length}
// //                 </p>
// //                 <p className="text-sm text-gray-500">Active</p>
// //               </div>
// //               <div className="text-center">
// //                 <p className="text-2xl font-bold text-[#D7201A]">
// //                   {tags.filter((t) => t.status === "Inactive").length}
// //                 </p>
// //                 <p className="text-sm text-gray-500">Inactive</p>
// //               </div>
// //               <div className="text-center">
// //                 <p className="text-2xl font-bold text-gray-700">
// //                   {tags.reduce((sum, tag) => sum + tag.usageCount, 0)}
// //                 </p>
// //                 <p className="text-sm text-gray-500">Total Usage</p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Table */}
// //         {status === "loading" ? (
// //           <div className="flex justify-center items-center py-12">
// //             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#258440]"></div>
// //           </div>
// //         ) : (
// //           <div className="bg-white rounded-xl shadow-sm overflow-hidden">
// //             <div className="overflow-x-auto">
// //               <table className="min-w-full">
// //                 <thead className="bg-gray-50 border-b border-gray-200">
// //                   <tr>
// //                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                       Tag Name
// //                     </th>
// //                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                       Description
// //                     </th>
// //                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                       Category
// //                     </th>
// //                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                       Usage Count
// //                     </th>
// //                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                       Status
// //                     </th>
// //                     <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                       Actions
// //                     </th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="bg-white divide-y divide-gray-200">
// //                   {currentTags.length === 0 ? (
// //                     <tr>
// //                       <td colSpan={6} className="px-6 py-12 text-center">
// //                         <div className="flex flex-col items-center">
// //                           <svg
// //                             className="mx-auto h-12 w-12 text-gray-400"
// //                             fill="none"
// //                             viewBox="0 0 24 24"
// //                             stroke="currentColor"
// //                             aria-hidden="true"
// //                           >
// //                             <path
// //                               strokeLinecap="round"
// //                               strokeLinejoin="round"
// //                               strokeWidth={2}
// //                               d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
// //                             />
// //                           </svg>
// //                           <h3 className="mt-2 text-sm font-medium text-gray-900">
// //                             {filteredTags.length === 0
// //                               ? "No tags found"
// //                               : "No tags on this page"}
// //                           </h3>
// //                           <p className="mt-1 text-sm text-gray-500">
// //                             {search
// //                               ? "Try adjusting your search"
// //                               : filteredTags.length === 0
// //                               ? "Get started by adding a new tag"
// //                               : "Try a different page"}
// //                           </p>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   ) : (
// //                     currentTags.map((tag) => (
// //                       <tr
// //                         key={tag.id}
// //                         className="hover:bg-gray-50 transition-colors duration-150"
// //                       >
// //                         <td className="px-6 py-4 whitespace-nowrap">
// //                           <div className="text-sm font-medium text-gray-900">
// //                             {tag.name}
// //                           </div>
// //                         </td>
// //                         <td className="px-6 py-4">
// //                           <div className="text-sm text-gray-500 line-clamp-2">
// //                             {tag.description}
// //                           </div>
// //                         </td>
// //                         <td className="px-6 py-4 whitespace-nowrap">
// //                           <div className="text-sm text-gray-500">
// //                             {tag.category}
// //                           </div>
// //                         </td>
// //                         <td className="px-6 py-4 whitespace-nowrap">
// //                           <div className="text-sm text-gray-500">
// //                             {tag.usageCount}
// //                           </div>
// //                         </td>
// //                         <td className="px-6 py-4 whitespace-nowrap">
// //                           <span
// //                             className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
// //                               tag.status === "Active"
// //                                 ? "bg-green-100 text-green-800"
// //                                 : "bg-red-100 text-red-800"
// //                             }`}
// //                           >
// //                             {tag.status}
// //                           </span>
// //                         </td>
// //                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
// //                           <button
// //                             onClick={() => handleEdit(tag)}
// //                             className="text-[#258440] hover:text-[#1E803A] mr-3 transition-colors duration-150"
// //                             title="Edit"
// //                           >
// //                             <FiEdit2 className="text-lg" />
// //                           </button>
// //                           <button
// //                             onClick={() => handleDelete(tag)}
// //                             className="text-[#D7201A] hover:text-[#D51711] transition-colors duration-150"
// //                             title="Delete"
// //                           >
// //                             <FiTrash2 className="text-lg" />
// //                           </button>
// //                         </td>
// //                       </tr>
// //                     ))
// //                   )}
// //                 </tbody>
// //               </table>
// //             </div>

// //             {/* Pagination */}
// //             {totalPages > 1 && (
// //               <Pagination
// //                 currentPage={currentPage}
// //                 totalPages={totalPages}
// //                 onPageChange={handlePageChange}
// //                 totalItems={totalItems}
// //                 perPage={itemsPerPage}
// //               />
// //             )}
// //           </div>
// //         )}

// //         {/* Modals */}
// //         {showAddModal && <AddTagModal onClose={() => setShowAddModal(false)} />}
// //         {showEditModal && selectedTag && (
// //           <EditTagModal
// //             tag={selectedTag}
// //             onClose={() => {
// //               setSelectedTag(null);
// //               setShowEditModal(false);
// //             }}
// //           />
// //         )}
// //         {showDeleteModal && selectedTag && (
// //           <DeleteTagModal
// //             tag={selectedTag}
// //             onClose={() => {
// //               setSelectedTag(null);
// //               setShowDeleteModal(false);
// //             }}
// //           />
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // src/modules/shop/tags/pages/TagsPage.tsx
// import React, { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
// import { fetchTags, Tag } from "../tagsSlice";
// import {
//   FiPlus,
//   FiSearch,
//   FiRefreshCw,
//   FiEdit2,
//   FiTrash2,
//   FiTag,
//   FiCheckCircle,
//   FiXCircle,
//   FiTrendingUp,
// } from "react-icons/fi";
// import AddTagModal from "../components/AddTagModal";
// import EditTagModal from "../components/EditTagModal";
// import DeleteTagModal from "../components/DeleteTagModal";
// import Pagination from "../../../../components/common/Pagination";

// export default function TagsPage() {
//   const dispatch = useAppDispatch();
//   const { tags, status } = useAppSelector((state) => state.tags);
//   const [search, setSearch] = useState("");
//   const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6; // Number of items per page

//   useEffect(() => {
//     if (status === "idle") dispatch(fetchTags());
//   }, [status, dispatch]);

//   const filteredTags = tags.filter(
//     (t) =>
//       t.name.toLowerCase().includes(search.toLowerCase()) ||
//       t.description.toLowerCase().includes(search.toLowerCase()) ||
//       t.category.toLowerCase().includes(search.toLowerCase())
//   );

//   // Calculate pagination values
//   const totalItems = filteredTags.length;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   // Get current page items
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentTags = filteredTags.slice(indexOfFirstItem, indexOfLastItem);

//   // Reset to first page when search changes
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [search]);

//   const handleRefresh = () => {
//     dispatch(fetchTags());
//   };

//   const handleEdit = (tag: Tag) => {
//     setSelectedTag(tag);
//     setShowEditModal(true);
//   };

//   const handleDelete = (tag: Tag) => {
//     setSelectedTag(tag);
//     setShowDeleteModal(true);
//   };

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "Active":
//         return "bg-green-100 text-green-800";
//       case "Inactive":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header with gradient background */}
//         <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//             <div className="mb-4 md:mb-0">
//               <h1 className="text-3xl md:text-4xl font-bold mb-2">
//                 Product Tags
//               </h1>
//               <p className="text-emerald-100 text-lg">
//                 Manage tags for product categorization
//               </p>
//             </div>
//             <div className="flex gap-3">
//               <button
//                 onClick={handleRefresh}
//                 className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg hover:bg-white/30 transition-all duration-200 flex items-center gap-2"
//                 title="Refresh"
//               >
//                 <FiRefreshCw className="text-lg" />
//                 <span className="hidden sm:inline">Refresh</span>
//               </button>
//               <button
//                 onClick={() => setShowAddModal(true)}
//                 className="px-4 py-2 bg-white text-emerald-700 font-medium rounded-lg hover:bg-emerald-50 transition-all duration-200 shadow-md flex items-center gap-2"
//               >
//                 <FiPlus className="text-lg" />
//                 <span>Add Tag</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-emerald-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 text-sm font-medium">Total Tags</p>
//                 <p className="text-3xl font-bold text-gray-800 mt-1">
//                   {tags.length}
//                 </p>
//               </div>
//               <div className="bg-emerald-100 p-3 rounded-full">
//                 <FiTag className="text-emerald-600 text-xl" />
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-emerald-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 text-sm font-medium">Active</p>
//                 <p className="text-3xl font-bold text-gray-800 mt-1">
//                   {tags.filter((t) => t.status === "Active").length}
//                 </p>
//               </div>
//               <div className="bg-emerald-100 p-3 rounded-full">
//                 <FiCheckCircle className="text-emerald-600 text-xl" />
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 text-sm font-medium">Inactive</p>
//                 <p className="text-3xl font-bold text-gray-800 mt-1">
//                   {tags.filter((t) => t.status === "Inactive").length}
//                 </p>
//               </div>
//               <div className="bg-red-100 p-3 rounded-full">
//                 <FiXCircle className="text-red-600 text-xl" />
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 text-sm font-medium">Total Usage</p>
//                 <p className="text-3xl font-bold text-gray-800 mt-1">
//                   {tags.reduce((sum, tag) => sum + tag.usageCount, 0)}
//                 </p>
//               </div>
//               <div className="bg-blue-100 p-3 rounded-full">
//                 <FiTrendingUp className="text-blue-600 text-xl" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Search Bar */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//           <div className="relative max-w-md">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <FiSearch className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               placeholder="Search tags..."
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Table */}
//         {status === "loading" ? (
//           <div className="flex justify-center items-center py-20 bg-white rounded-xl shadow-lg">
//             <div className="flex flex-col items-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
//               <p className="mt-4 text-gray-600">Loading tags...</p>
//             </div>
//           </div>
//         ) : (
//           <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//             <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
//               <h2 className="text-lg font-semibold text-gray-800">
//                 Tags ({filteredTags.length})
//               </h2>
//             </div>
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Tag Name
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Description
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Category
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Usage Count
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                     <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {currentTags.length === 0 ? (
//                     <tr>
//                       <td colSpan={6} className="px-6 py-16 text-center">
//                         <div className="flex flex-col items-center">
//                           <div className="bg-gray-100 p-4 rounded-full mb-4">
//                             <FiTag className="h-12 w-12 text-gray-400" />
//                           </div>
//                           <h3 className="mt-2 text-lg font-medium text-gray-900">
//                             {filteredTags.length === 0
//                               ? "No tags found"
//                               : "No tags on this page"}
//                           </h3>
//                           <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto">
//                             {search
//                               ? "Try adjusting your search to find what you're looking for"
//                               : filteredTags.length === 0
//                               ? "Get started by adding a new tag"
//                               : "Try a different page"}
//                           </p>
//                           {!search && filteredTags.length === 0 && (
//                             <button
//                               onClick={() => setShowAddModal(true)}
//                               className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-2 mx-auto"
//                             >
//                               <FiPlus className="text-lg" />
//                               <span>Add Tag</span>
//                             </button>
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   ) : (
//                     currentTags.map((tag) => (
//                       <tr
//                         key={tag.id}
//                         className="hover:bg-gray-50 transition-colors duration-150"
//                       >
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm font-medium text-gray-900">
//                             {tag.name}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="text-sm text-gray-500 line-clamp-2 max-w-xs">
//                             {tag.description}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-500">
//                             {tag.category}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-500">
//                             {tag.usageCount}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span
//                             className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
//                               tag.status
//                             )}`}
//                           >
//                             {tag.status}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                           <button
//                             onClick={() => handleEdit(tag)}
//                             className="text-emerald-600 hover:text-emerald-900 mr-3 transition-colors duration-150 p-1 rounded-full hover:bg-emerald-50"
//                             title="Edit"
//                           >
//                             <FiEdit2 className="text-lg" />
//                           </button>
//                           <button
//                             onClick={() => handleDelete(tag)}
//                             className="text-red-600 hover:text-red-900 transition-colors duration-150 p-1 rounded-full hover:bg-red-50"
//                             title="Delete"
//                           >
//                             <FiTrash2 className="text-lg" />
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
//                 <Pagination
//                   currentPage={currentPage}
//                   totalPages={totalPages}
//                   onPageChange={handlePageChange}
//                   totalItems={totalItems}
//                   perPage={itemsPerPage}
//                 />
//               </div>
//             )}
//           </div>
//         )}

//         {/* Modals */}
//         {showAddModal && <AddTagModal onClose={() => setShowAddModal(false)} />}
//         {showEditModal && selectedTag && (
//           <EditTagModal
//             tag={selectedTag}
//             onClose={() => {
//               setSelectedTag(null);
//               setShowEditModal(false);
//             }}
//           />
//         )}
//         {showDeleteModal && selectedTag && (
//           <DeleteTagModal
//             tag={selectedTag}
//             onClose={() => {
//               setSelectedTag(null);
//               setShowDeleteModal(false);
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// src/modules/shop/tags/pages/TagsPage.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { fetchTags, Tag } from "../tagsSlice";
import {
  FiPlus,
  FiSearch,
  FiRefreshCw,
  FiEdit2,
  FiTrash2,
  FiTag,
  FiCheckCircle,
  FiXCircle,
  FiTrendingUp,
  FiPackage,
  FiEye,
} from "react-icons/fi";
import AddTagModal from "../components/AddTagModal";
import EditTagModal from "../components/EditTagModal";
import DeleteTagModal from "../components/DeleteTagModal";
import ViewProductsModal from "../components/ViewProductsModal"; // Added this import
import Pagination from "../../../../components/common/Pagination";

export default function TagsPage() {
  const dispatch = useAppDispatch();
  const { tags, status } = useAppSelector((state) => state.tags);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showProductsModal, setShowProductsModal] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items per page

  useEffect(() => {
    if (status === "idle") dispatch(fetchTags());
  }, [status, dispatch]);

  const filteredTags = tags.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate pagination values
  const totalItems = filteredTags.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTags = filteredTags.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handleRefresh = () => {
    dispatch(fetchTags());
  };

  const handleEdit = (tag: Tag) => {
    setSelectedTag(tag);
    setShowEditModal(true);
  };

  const handleDelete = (tag: Tag) => {
    setSelectedTag(tag);
    setShowDeleteModal(true);
  };

  const handleViewProducts = (tag: Tag) => {
    setSelectedTag(tag);
    setShowProductsModal(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Product Tags
              </h1>
              <p className="text-emerald-100 text-lg">
                Manage tags for product categorization
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleRefresh}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg hover:bg-white/30 transition-all duration-200 flex items-center gap-2"
                title="Refresh"
              >
                <FiRefreshCw className="text-lg" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-white text-emerald-700 font-medium rounded-lg hover:bg-emerald-50 transition-all duration-200 shadow-md flex items-center gap-2"
              >
                <FiPlus className="text-lg" />
                <span>Add Tag</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-emerald-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Tags</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {tags.length}
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <FiTag className="text-emerald-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-emerald-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Active</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {tags.filter((t) => t.status === "Active").length}
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <FiCheckCircle className="text-emerald-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Inactive</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {tags.filter((t) => t.status === "Inactive").length}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <FiXCircle className="text-red-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Usage</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {tags.reduce((sum, tag) => sum + tag.usageCount, 0)}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FiTrendingUp className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search tags..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        {status === "loading" ? (
          <div className="flex justify-center items-center py-20 bg-white rounded-xl shadow-lg">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
              <p className="mt-4 text-gray-600">Loading tags...</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-800">
                Tags ({filteredTags.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tag Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Products
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usage Count
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentTags.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center">
                          <div className="bg-gray-100 p-4 rounded-full mb-4">
                            <FiTag className="h-12 w-12 text-gray-400" />
                          </div>
                          <h3 className="mt-2 text-lg font-medium text-gray-900">
                            {filteredTags.length === 0
                              ? "No tags found"
                              : "No tags on this page"}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto">
                            {search
                              ? "Try adjusting your search to find what you're looking for"
                              : filteredTags.length === 0
                              ? "Get started by adding a new tag"
                              : "Try a different page"}
                          </p>
                          {!search && filteredTags.length === 0 && (
                            <button
                              onClick={() => setShowAddModal(true)}
                              className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-2 mx-auto"
                            >
                              <FiPlus className="text-lg" />
                              <span>Add Tag</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentTags.map((tag) => (
                      <tr
                        key={tag.id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {tag.name}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500 line-clamp-2 max-w-xs">
                            {tag.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex -space-x-2">
                              {tag.products
                                .slice(0, 3)
                                .map((product, index) => (
                                  <img
                                    key={index}
                                    className="h-8 w-8 rounded-full border-2 border-white object-cover"
                                    src={product.image}
                                    alt={product.name}
                                  />
                                ))}
                            </div>
                            <div className="ml-2 text-sm text-gray-500">
                              {tag.products.length} products
                            </div>
                            <button
                              onClick={() => handleViewProducts(tag)}
                              className="ml-2 text-emerald-600 hover:text-emerald-900 p-1 rounded-full hover:bg-emerald-50"
                              title="View Products"
                            >
                              <FiEye className="text-lg" />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {tag.usageCount}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                              tag.status
                            )}`}
                          >
                            {tag.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEdit(tag)}
                            className="text-emerald-600 hover:text-emerald-900 mr-3 transition-colors duration-150 p-1 rounded-full hover:bg-emerald-50"
                            title="Edit"
                          >
                            <FiEdit2 className="text-lg" />
                          </button>
                          <button
                            onClick={() => handleDelete(tag)}
                            className="text-red-600 hover:text-red-900 transition-colors duration-150 p-1 rounded-full hover:bg-red-50"
                            title="Delete"
                          >
                            <FiTrash2 className="text-lg" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalItems={totalItems}
                  perPage={itemsPerPage}
                />
              </div>
            )}
          </div>
        )}

        {/* Modals */}
        {showAddModal && <AddTagModal onClose={() => setShowAddModal(false)} />}
        {showEditModal && selectedTag && (
          <EditTagModal
            tag={selectedTag}
            onClose={() => {
              setSelectedTag(null);
              setShowEditModal(false);
            }}
          />
        )}
        {showDeleteModal && selectedTag && (
          <DeleteTagModal
            tag={selectedTag}
            onClose={() => {
              setSelectedTag(null);
              setShowDeleteModal(false);
            }}
          />
        )}
        {showProductsModal && selectedTag && (
          <ViewProductsModal
            tag={selectedTag}
            onClose={() => {
              setSelectedTag(null);
              setShowProductsModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
