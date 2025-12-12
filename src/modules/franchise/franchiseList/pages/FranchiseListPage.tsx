// src/modules/franchise/franchise-list/pages/FranchiseListPage.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  fetchFranchises,
  Franchise,
  editFranchise,
  deleteFranchise,
  updateFranchiseStatus,
} from "../franchiseSlice";
import {
  FiPlus,
  FiSearch,
  FiRefreshCw,
  FiMapPin,
  FiFilter,
} from "react-icons/fi";
import FranchiseTable from "../components/FranchiseTable";
import AddFranchiseModal from "../components/AddFranchiseModal";
import EditFranchiseModal from "../components/EditFranchiseModal";
import DeleteFranchiseModal from "../components/DeleteFranchiseModal";

export default function FranchiseListPage() {
  const dispatch = useAppDispatch();
  const { franchises, status } = useAppSelector((state) => state.franchises);
  const [searchStore, setSearchStore] = useState("");
  const [selectedFranchise, setSelectedFranchise] = useState<Franchise | null>(
    null
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    if (status === "idle") dispatch(fetchFranchises());
  }, [status, dispatch]);

  // Filter franchises based on search and filters
  const filteredFranchises = franchises.filter((franchise) => {
    const matchesStore = franchise.storeName
      .toLowerCase()
      .includes(searchStore.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || franchise.status === statusFilter;

    return matchesStore && matchesStatus;
  });

  const handleRefresh = () => {
    dispatch(fetchFranchises());
  };

  const handleEdit = (franchise: Franchise) => {
    setSelectedFranchise(franchise);
    setShowEditModal(true);
  };

  const handleDelete = (franchise: Franchise) => {
    setSelectedFranchise(franchise);
    setShowDeleteModal(true);
  };

  const handleUpdateStatus = (
    franchise: Franchise,
    newStatus: Franchise["status"]
  ) => {
    dispatch(updateFranchiseStatus({ id: franchise.id, status: newStatus }));
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
                Franchise List
              </h1>
              <p className="text-emerald-100 text-lg">
                Manage franchise stores and their information
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
                <span>Add Franchise</span>
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
                  Total Franchises
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {franchises.length}
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
                  {franchises.filter((f) => f.status === "Active").length}
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <FiFilter className="text-emerald-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Pending</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {franchises.filter((f) => f.status === "Pending").length}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <FiFilter className="text-yellow-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Inactive</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {franchises.filter((f) => f.status === "Inactive").length}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <FiFilter className="text-red-600 text-xl" />
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
                  placeholder="Search by Store Name"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  value={searchStore}
                  onChange={(e) => setSearchStore(e.target.value)}
                />
              </div>
            </div>
            <div className="relative">
              <select
                className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <FiFilter className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Franchises Table */}
        <FranchiseTable
          data={filteredFranchises}
          isLoading={status === "loading"}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onUpdateStatus={handleUpdateStatus}
        />

        {/* Modals */}
        {showAddModal && (
          <AddFranchiseModal onClose={() => setShowAddModal(false)} />
        )}
        {showEditModal && selectedFranchise && (
          <EditFranchiseModal
            franchise={selectedFranchise}
            onClose={() => {
              setSelectedFranchise(null);
              setShowEditModal(false);
            }}
          />
        )}
        {showDeleteModal && selectedFranchise && (
          <DeleteFranchiseModal
            franchise={selectedFranchise}
            onClose={() => {
              setSelectedFranchise(null);
              setShowDeleteModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
