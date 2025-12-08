// // src/components/common/Pagination.tsx
// import React from "react";

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
//   totalItems: number;
//   perPage: number;
// }

// const Pagination: React.FC<PaginationProps> = ({
//   currentPage,
//   totalPages,
//   onPageChange,
//   totalItems,
//   perPage,
// }) => {
//   const pageNumbers = [];
//   const maxVisiblePages = 5; // Show max 5 page numbers at a time

//   let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
//   let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

//   if (endPage - startPage + 1 < maxVisiblePages) {
//     startPage = Math.max(1, endPage - maxVisiblePages + 1);
//   }

//   for (let i = startPage; i <= endPage; i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between border-t">
//       <div className="text-sm text-gray-700">
//         Showing {(currentPage - 1) * perPage + 1} to{" "}
//         {Math.min(currentPage * perPage, totalItems)} of {totalItems} results
//       </div>
//       <div className="flex items-center space-x-1">
//         <button
//           onClick={() => onPageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="p-2 rounded-md border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
//         >
//           <svg
//             className="w-5 h-5"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M15 19l-7-7 7-7"
//             />
//           </svg>
//         </button>

//         {startPage > 1 && (
//           <>
//             <button
//               onClick={() => onPageChange(1)}
//               className="px-3 py-1 rounded-md border hover:bg-gray-50 transition-colors"
//             >
//               1
//             </button>
//             {startPage > 2 && <span className="px-2">...</span>}
//           </>
//         )}

//         {pageNumbers.map((page) => (
//           <button
//             key={page}
//             onClick={() => onPageChange(page)}
//             className={`px-3 py-1 rounded-md border transition-colors ${
//               currentPage === page
//                 ? "bg-[#258440] text-white border-[#258440]"
//                 : "hover:bg-gray-50"
//             }`}
//           >
//             {page}
//           </button>
//         ))}

//         {endPage < totalPages && (
//           <>
//             {endPage < totalPages - 1 && <span className="px-2">...</span>}
//             <button
//               onClick={() => onPageChange(totalPages)}
//               className="px-3 py-1 rounded-md border hover:bg-gray-50 transition-colors"
//             >
//               {totalPages}
//             </button>
//           </>
//         )}

//         <button
//           onClick={() => onPageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="p-2 rounded-md border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
//         >
//           <svg
//             className="w-5 h-5"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M9 5l7 7-7 7"
//             />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Pagination;

// src/components/common/Pagination.tsx
import React, { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaList,
} from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  perPage: number;
  onPerPageChange?: (perPage: number) => void;
  perPageOptions?: number[];
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  perPage,
  onPerPageChange,
  perPageOptions = [8, 16, 24, 32],
}) => {
  const [showPerPageDropdown, setShowPerPageDropdown] = useState(false);

  const pageNumbers = [];
  const maxVisiblePages = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePerPageChange = (newPerPage: number) => {
    setShowPerPageDropdown(false);
    if (onPerPageChange) {
      onPerPageChange(newPerPage);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border-t border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Items info */}
        <div className="flex items-center text-sm text-gray-700">
          <span className="hidden sm:inline">Showing</span>
          <span className="font-medium mx-1">
            {(currentPage - 1) * perPage + 1}
          </span>
          <span className="hidden sm:inline">to</span>
          <span className="font-medium mx-1">
            {Math.min(currentPage * perPage, totalItems)}
          </span>
          <span className="hidden sm:inline">of</span>
          <span className="font-medium mx-1">{totalItems}</span>
          <span className="hidden sm:inline">results</span>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
          {/* Per page selector */}
          {onPerPageChange && (
            <div className="relative">
              <button
                onClick={() => setShowPerPageDropdown(!showPerPageDropdown)}
                className="flex items-center gap-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <FaList className="text-gray-500" />
                <span>{perPage} / page</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    showPerPageDropdown ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showPerPageDropdown && (
                <div className="absolute bottom-full mb-2 right-0 z-10 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[120px]">
                  {perPageOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handlePerPageChange(option)}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-emerald-50 transition-colors ${
                        perPage === option
                          ? "bg-emerald-50 text-emerald-600 font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      {option} / page
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Page navigation */}
          <div className="flex items-center">
            {/* First page button */}
            <button
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
              className="p-2 mr-1 text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="First page"
            >
              <FaAngleDoubleLeft />
            </button>

            {/* Previous page button */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 text-gray-500 bg-white border-t border-b border-r border-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Previous page"
            >
              <FaChevronLeft />
            </button>

            {/* Page numbers */}
            <div className="hidden sm:flex">
              {startPage > 1 && (
                <>
                  <button
                    onClick={() => goToPage(1)}
                    className="px-3 py-2 text-sm text-gray-700 bg-white border-t border-b border-r border-gray-300 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-300 transition-colors"
                  >
                    1
                  </button>
                  {startPage > 2 && (
                    <span className="px-2 py-2 text-sm text-gray-500 bg-white border-t border-b border-r border-gray-300">
                      ...
                    </span>
                  )}
                </>
              )}

              {pageNumbers.map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-3 py-2 text-sm font-medium border-t border-b border-r border-gray-300 transition-colors ${
                    currentPage === page
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "text-gray-700 bg-white hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-300"
                  }`}
                >
                  {page}
                </button>
              ))}

              {endPage < totalPages && (
                <>
                  {endPage < totalPages - 1 && (
                    <span className="px-2 py-2 text-sm text-gray-500 bg-white border-t border-b border-r border-gray-300">
                      ...
                    </span>
                  )}
                  <button
                    onClick={() => goToPage(totalPages)}
                    className="px-3 py-2 text-sm text-gray-700 bg-white border-t border-b border-r border-gray-300 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-300 transition-colors"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            {/* Mobile page indicator */}
            <div className="sm:hidden px-3 py-2 text-sm text-gray-700 bg-white border-t border-b border-r border-gray-300">
              {currentPage} / {totalPages}
            </div>

            {/* Next page button */}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 text-gray-500 bg-white border-t border-b border-r border-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Next page"
            >
              <FaChevronRight />
            </button>

            {/* Last page button */}
            <button
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
              className="p-2 ml-1 text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Last page"
            >
              <FaAngleDoubleRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
