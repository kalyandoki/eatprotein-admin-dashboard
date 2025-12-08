// // src/modules/shop/storeTags/components/ViewStoreDetailsModal.tsx
// import React from "react";
// import {
//   FiX,
//   FiMapPin,
//   FiPhone,
//   FiMail,
//   FiUser,
//   FiCalendar,
//   FiPackage,
// } from "react-icons/fi";
// import { StoreTag, Store } from "../storeTagsSlice";

// export default function ViewStoreDetailsModal({
//   tag,
//   onClose,
// }: {
//   tag?: StoreTag;
//   onClose: () => void;
// }) {
//   if (!tag) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden transform transition-all">
//         <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
//           <h2 className="text-xl font-semibold flex items-center gap-2">
//             <FiPackage className="text-lg" />
//             Stores for "{tag.name}" Tag
//           </h2>
//           <button onClick={onClose} className="text-white hover:text-gray-200">
//             <FiX className="text-xl" />
//           </button>
//         </div>

//         <div className="p-6 overflow-y-auto max-h-[calc(90vh-70px)]">
//           <div className="mb-6">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold text-gray-900">
//                 Tag Information
//               </h3>
//               <span
//                 className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
//                   tag.status === "Active"
//                     ? "bg-green-100 text-green-800"
//                     : "bg-red-100 text-red-800"
//                 }`}
//               >
//                 {tag.status}
//               </span>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <p className="text-sm font-medium text-gray-900 mb-1">
//                   Tag Name
//                 </p>
//                 <p className="text-sm text-gray-600">{tag.name}</p>
//               </div>
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <p className="text-sm font-medium text-gray-900 mb-1">
//                   Priority
//                 </p>
//                 <span
//                   className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                     tag.priority === "High"
//                       ? "bg-red-100 text-red-800"
//                       : tag.priority === "Medium"
//                       ? "bg-yellow-100 text-yellow-800"
//                       : "bg-green-100 text-green-800"
//                   }`}
//                 >
//                   {tag.priority}
//                 </span>
//               </div>
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <p className="text-sm font-medium text-gray-900 mb-1">
//                   Description
//                 </p>
//                 <p className="text-sm text-gray-600">{tag.description}</p>
//               </div>
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <p className="text-sm font-medium text-gray-900 mb-1">
//                   Products Count
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   {tag.productsCount || 0}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">
//               Associated Stores ({tag.stores.length})
//             </h3>

//             {tag.storeDetails && tag.storeDetails.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {tag.storeDetails.map((store) => (
//                   <div
//                     key={store.id}
//                     className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
//                   >
//                     <div className="h-32 overflow-hidden">
//                       <img
//                         src={store.image}
//                         alt={store.name}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                     <div className="p-4">
//                       <h4 className="font-medium text-gray-900 mb-2">
//                         {store.name}
//                       </h4>
//                       <div className="space-y-2">
//                         <div className="flex items-center gap-2">
//                           <FiMapPin className="text-gray-400 text-sm" />
//                           <p className="text-sm text-gray-600">
//                             {store.address}, {store.city}
//                           </p>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <FiPhone className="text-gray-400 text-sm" />
//                           <p className="text-sm text-gray-600">{store.phone}</p>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <FiUser className="text-gray-400 text-sm" />
//                           <p className="text-sm text-gray-600">
//                             {store.manager}
//                           </p>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
//                             {store.category}
//                           </span>
//                           <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
//                             {store.subcategory}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-8">
//                 <div className="bg-gray-100 p-4 rounded-full inline-flex mb-4">
//                   <FiPackage className="h-12 w-12 text-gray-400" />
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">
//                   No stores associated
//                 </h3>
//                 <p className="text-gray-500">
//                   This tag doesn't have any stores associated with it.
//                 </p>
//               </div>
//             )}
//           </div>

//           <div className="mt-6 pt-6 border-t border-gray-200">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <p className="text-sm font-medium text-gray-900 mb-1">
//                   Created At
//                 </p>
//                 <p className="text-sm text-gray-600">{tag.createdAt}</p>
//               </div>
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <p className="text-sm font-medium text-gray-900 mb-1">
//                   Updated At
//                 </p>
//                 <p className="text-sm text-gray-600">{tag.updatedAt}</p>
//               </div>
//             </div>
//           </div>

//           <div className="mt-6 flex justify-end gap-3">
//             <button
//               onClick={onClose}
//               className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
//             >
//               Close
//             </button>
//             <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200">
//               Edit Tag
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/modules/shop/storeTags/components/ViewStoresModal.tsx
import React, { useState, useEffect } from "react";
import {
  FiX,
  FiShoppingBag,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { StoreTag, Store } from "../storeTagsSlice";

export default function ViewStoresModal({
  tag,
  stores,
  onClose,
}: {
  tag: StoreTag;
  stores: Store[];
  onClose: () => void;
}) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Get stores for this tag
  const tagStores = stores.filter((store) => tag.storeIds.includes(store.id));

  // Filter stores based on search
  const filteredStores = tagStores.filter(
    (store) =>
      store.name.toLowerCase().includes(search.toLowerCase()) ||
      store.city.toLowerCase().includes(search.toLowerCase()) ||
      store.state.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate pagination values
  const totalItems = filteredStores.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStores = filteredStores.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden transform transition-all">
        <div className="bg-[#258440] text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FiShoppingBag className="text-xl" />
            Stores for "{tag.name}" Tag ({tagStores.length})
          </h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <FiX className="text-xl" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-70px)]">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search stores..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent transition-all duration-200"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {filteredStores.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-100 p-4 rounded-full inline-flex mb-4">
                <FiShoppingBag className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {search
                  ? "No stores found"
                  : "No stores associated with this tag"}
              </h3>
              <p className="text-gray-500">
                {search
                  ? "Try adjusting your search to find what you're looking for"
                  : "This tag doesn't have any stores associated with it."}
              </p>
            </div>
          ) : (
            <>
              {/* Store Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {currentStores.map((store) => (
                  <div
                    key={store.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">
                        {store.name}
                      </h3>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          store.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {store.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 space-y-1">
                      <p>{store.address}</p>
                      <p>
                        {store.city}, {store.state} {store.zipCode}
                      </p>
                      <p>{store.phone}</p>
                      <p>Manager: {store.manager}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-700">
                    Showing {indexOfFirstItem + 1} to{" "}
                    {Math.min(indexOfLastItem, totalItems)} of {totalItems}{" "}
                    stores
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FiChevronLeft className="h-5 w-5" />
                    </button>
                    <span className="px-3 py-1 text-sm text-gray-700">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FiChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
