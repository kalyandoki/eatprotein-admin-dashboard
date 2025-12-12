// src/modules/franchise/franchise-location/pages/FranchiseLocationPage.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  fetchFranchiseLocations,
  FranchiseLocation,
  editFranchiseLocation,
  deleteFranchiseLocation,
  updateLocationStatus,
} from "../franchiseLocationSlice";
import {
  FiPlus,
  FiSearch,
  FiRefreshCw,
  FiEdit2,
  FiTrash2,
  FiFilter,
  FiEye,
  FiDownload,
  FiMapPin,
  FiPhone,
  FiMail,
  FiCalendar,
  FiUsers,
  FiTrendingUp,
  FiDollarSign,
  FiCheck,
  FiX,
  FiTool,
} from "react-icons/fi";
import AddLocationModal from "../components/AddLocationModal";
import EditLocationModal from "../components/EditLocationModal";
import DeleteLocationModal from "../components/DeleteLocationModal";
import ViewLocationModal from "../components/ViewLocationModal";
import Pagination from "../../../../components/common/Pagination";

export default function FranchiseLocationPage() {
  const dispatch = useAppDispatch();
  const { locations, status } = useAppSelector(
    (state) => state.franchiseLocations
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] =
    useState<FranchiseLocation | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (status === "idle") dispatch(fetchFranchiseLocations());
  }, [status, dispatch]);

  // Filter and sort locations
  const filteredAndSortedLocations = locations
    .filter((location) => {
      const matchesSearch =
        location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.manager.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.phone.includes(searchTerm);

      const matchesStatus =
        statusFilter === "all" || location.status === statusFilter;
      const matchesType = typeFilter === "all" || location.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      let aValue: string | number = a[sortBy as keyof FranchiseLocation] as
        | string
        | number;
      let bValue: string | number = b[sortBy as keyof FranchiseLocation] as
        | string
        | number;

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  // Calculate pagination values
  const totalItems = filteredAndSortedLocations.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLocations = filteredAndSortedLocations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Reset to first page when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, typeFilter, sortBy, sortOrder]);

  const handleRefresh = () => {
    dispatch(fetchFranchiseLocations());
  };

  const handleEdit = (location: FranchiseLocation) => {
    setSelectedLocation(location);
    setShowEditModal(true);
  };

  const handleDelete = (location: FranchiseLocation) => {
    setSelectedLocation(location);
    setShowDeleteModal(true);
  };

  const handleView = (location: FranchiseLocation) => {
    setSelectedLocation(location);
    setShowViewModal(true);
  };

  const handleUpdateStatus = (
    location: FranchiseLocation,
    newStatus: FranchiseLocation["status"]
  ) => {
    dispatch(updateLocationStatus({ id: location.id, status: newStatus }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handleExport = () => {
    // Create CSV content
    const headers = [
      "Name",
      "Address",
      "City",
      "State",
      "Zip Code",
      "Country",
      "Manager",
      "Email",
      "Phone",
      "Status",
      "Opening Date",
      "Area (sq ft)",
      "Type",
      "Employees",
      "Daily Average Sales",
      "Monthly Average Sales",
    ];

    const csvContent = [
      headers.join(","),
      ...filteredAndSortedLocations.map((location) =>
        [
          location.name,
          location.address,
          location.city,
          location.state,
          location.zipCode,
          location.country,
          location.manager,
          location.email,
          location.phone,
          location.status,
          location.openingDate,
          location.area,
          location.type,
          location.employees,
          location.dailyAverageSales,
          location.monthlyAverageSales,
        ]
          .map((field) => `"${field}"`)
          .join(",")
      ),
    ].join("\n");

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "franchise-locations.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-emerald-100 text-emerald-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      case "Maintenance":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <FiCheck className="text-xs" />;
      case "Inactive":
        return <FiX className="text-xs" />;
      case "Maintenance":
        return <FiTool className="text-xs" />;
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Owned":
        return "bg-teal-100 text-teal-800";
      case "Rented":
        return "bg-blue-100 text-blue-800";
      case "Leased":
        return "bg-purple-100 text-purple-800";
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
              <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center">
                <FiMapPin className="mr-3" />
                Franchise Locations
              </h1>
              <p className="text-emerald-100 text-lg">
                Manage franchise locations and their information
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
                onClick={handleExport}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg hover:bg-white/30 transition-all duration-200 flex items-center gap-2"
                title="Export to CSV"
              >
                <FiDownload className="text-lg" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-white text-emerald-700 font-medium rounded-lg hover:bg-emerald-50 transition-all duration-200 shadow-md flex items-center gap-2"
              >
                <FiPlus className="text-lg" />
                <span>Add Location</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-emerald-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Locations
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {locations.length}
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <FiMapPin className="text-emerald-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-emerald-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Active</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {locations.filter((l) => l.status === "Active").length}
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <FiCheck className="text-emerald-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-teal-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Employees
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {locations.reduce((sum, l) => sum + l.employees, 0)}
                </p>
              </div>
              <div className="bg-teal-100 p-3 rounded-full">
                <FiUsers className="text-teal-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-teal-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Avg. Monthly Sales
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  $
                  {Math.round(
                    locations.reduce(
                      (sum, l) => sum + l.monthlyAverageSales,
                      0
                    ) / locations.length
                  ).toLocaleString()}
                </p>
              </div>
              <div className="bg-teal-100 p-3 rounded-full">
                <FiDollarSign className="text-teal-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name, address, city, manager, or phone"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FiFilter className="h-4 w-4" />
                </div>
              </div>
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="Owned">Owned</option>
                  <option value="Rented">Rented</option>
                  <option value="Leased">Leased</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FiFilter className="h-4 w-4" />
                </div>
              </div>
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="name">Sort by Name</option>
                  <option value="city">Sort by City</option>
                  <option value="state">Sort by State</option>
                  <option value="manager">Sort by Manager</option>
                  <option value="status">Sort by Status</option>
                  <option value="openingDate">Sort by Opening Date</option>
                  <option value="monthlyAverageSales">
                    Sort by Monthly Sales
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FiFilter className="h-4 w-4" />
                </div>
              </div>
              <button
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200"
              >
                {sortOrder === "asc" ? "↑" : "↓"}
              </button>
            </div>
          </div>
        </div>

        {/* Locations Table */}
        {status === "loading" ? (
          <div className="flex justify-center items-center py-20 bg-white rounded-xl shadow-lg">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
              <p className="mt-4 text-gray-600">Loading locations...</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-800">
                Franchise Locations ({filteredAndSortedLocations.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("name")}
                    >
                      Name
                      {sortBy === "name" && (
                        <span className="ml-1">
                          {sortOrder === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Address
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("city")}
                    >
                      City
                      {sortBy === "city" && (
                        <span className="ml-1">
                          {sortOrder === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("manager")}
                    >
                      Manager
                      {sortBy === "manager" && (
                        <span className="ml-1">
                          {sortOrder === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("status")}
                    >
                      Status
                      {sortBy === "status" && (
                        <span className="ml-1">
                          {sortOrder === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sales
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentLocations.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center">
                          <div className="bg-gray-100 p-4 rounded-full mb-4">
                            <FiMapPin className="h-12 w-12 text-gray-400" />
                          </div>
                          <h3 className="mt-2 text-lg font-medium text-gray-900">
                            {filteredAndSortedLocations.length === 0
                              ? "No locations found"
                              : "No locations on this page"}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto">
                            {searchTerm ||
                            statusFilter !== "all" ||
                            typeFilter !== "all"
                              ? "Try adjusting your search to find what you're looking for"
                              : filteredAndSortedLocations.length === 0
                              ? "Get started by adding a new location"
                              : "Try a different page"}
                          </p>
                          {!searchTerm &&
                            statusFilter === "all" &&
                            typeFilter === "all" &&
                            filteredAndSortedLocations.length === 0 && (
                              <button
                                onClick={() => setShowAddModal(true)}
                                className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-2 mx-auto"
                              >
                                <FiPlus className="text-lg" />
                                <span>Add Location</span>
                              </button>
                            )}
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentLocations.map((location) => (
                      <tr
                        key={location.id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {location.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {location.address}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {location.city}, {location.state}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {location.manager}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            <div className="flex items-center">
                              <FiPhone className="mr-2 h-4 w-4 text-gray-400" />
                              {location.phone}
                            </div>
                            <div className="flex items-center mt-1">
                              <FiMail className="mr-2 h-4 w-4 text-gray-400" />
                              <span className="truncate max-w-xs">
                                {location.email}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                              location.status
                            )}`}
                          >
                            <span className="mr-1">
                              {getStatusIcon(location.status)}
                            </span>
                            {location.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(
                              location.type
                            )}`}
                          >
                            {location.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            <div className="flex items-center">
                              <FiTrendingUp className="mr-2 h-4 w-4 text-gray-400" />
                              <span>
                                ${location.monthlyAverageSales.toLocaleString()}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Daily: $
                              {location.dailyAverageSales.toLocaleString()}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end">
                            <button
                              onClick={() => handleView(location)}
                              className="text-emerald-600 hover:text-emerald-900 mr-3 transition-colors duration-150 p-1 rounded-full hover:bg-emerald-50"
                              title="View Details"
                            >
                              <FiEye className="text-lg" />
                            </button>
                            {location.status === "Maintenance" && (
                              <button
                                onClick={() =>
                                  handleUpdateStatus(location, "Active")
                                }
                                className="text-emerald-600 hover:text-emerald-900 mr-3 transition-colors duration-150 p-1 rounded-full hover:bg-emerald-50"
                                title="Activate"
                              >
                                <FiCheck className="text-lg" />
                              </button>
                            )}
                            {location.status === "Active" && (
                              <button
                                onClick={() =>
                                  handleUpdateStatus(location, "Maintenance")
                                }
                                className="text-yellow-600 hover:text-yellow-900 mr-3 transition-colors duration-150 p-1 rounded-full hover:bg-yellow-50"
                                title="Set to Maintenance"
                              >
                                <FiTool className="text-lg" />
                              </button>
                            )}
                            <button
                              onClick={() => handleEdit(location)}
                              className="text-emerald-600 hover:text-emerald-900 mr-3 transition-colors duration-150 p-1 rounded-full hover:bg-emerald-50"
                              title="Edit"
                            >
                              <FiEdit2 className="text-lg" />
                            </button>
                            <button
                              onClick={() => handleDelete(location)}
                              className="text-red-600 hover:text-red-900 transition-colors duration-150 p-1 rounded-full hover:bg-red-50"
                              title="Delete"
                            >
                              <FiTrash2 className="text-lg" />
                            </button>
                          </div>
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
        {showAddModal && (
          <AddLocationModal onClose={() => setShowAddModal(false)} />
        )}
        {showEditModal && selectedLocation && (
          <EditLocationModal
            location={selectedLocation}
            onClose={() => {
              setSelectedLocation(null);
              setShowEditModal(false);
            }}
          />
        )}
        {showDeleteModal && selectedLocation && (
          <DeleteLocationModal
            location={selectedLocation}
            onClose={() => {
              setSelectedLocation(null);
              setShowDeleteModal(false);
            }}
          />
        )}
        {showViewModal && selectedLocation && (
          <ViewLocationModal
            location={selectedLocation}
            onClose={() => {
              setSelectedLocation(null);
              setShowViewModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
