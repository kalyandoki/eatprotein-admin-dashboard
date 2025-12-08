// src/modules/shop/storePayouts/components/ViewPayoutModal.tsx
import React, { useState } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { updatePayoutStatus, Payout } from "../storePayoutsSlice";
import {
  FiX,
  FiDollarSign,
  FiCalendar,
  FiCreditCard,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiEdit,
  FiTruck,
} from "react-icons/fi";

export default function ViewPayoutModal({
  payout,
  onClose,
}: {
  payout: Payout;
  onClose: () => void;
}) {
  const dispatch = useAppDispatch();
  const [showStatusUpdate, setShowStatusUpdate] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Payout["status"]>(
    payout.status
  );
  const [notes, setNotes] = useState(payout.notes || "");

  const handleStatusUpdate = () => {
    dispatch(
      updatePayoutStatus({
        id: payout.id,
        status: selectedStatus,
        processedDate:
          selectedStatus === "Completed" || selectedStatus === "Failed"
            ? new Date().toISOString().slice(0, 10)
            : undefined,
        transactionId:
          selectedStatus === "Completed"
            ? `TXN${Math.floor(Math.random() * 1000000)}`
            : payout.transactionId,
        notes: selectedStatus === "Failed" ? notes : undefined,
      })
    );

    setShowStatusUpdate(false);
    onClose();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <FiCheckCircle className="text-green-600" />;
      case "Processing":
        return <FiClock className="text-blue-600" />;
      case "Pending":
        return <FiClock className="text-yellow-600" />;
      case "Failed":
        return <FiXCircle className="text-red-600" />;
      default:
        return <FiClock className="text-gray-600" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden transform transition-all">
        <div className="bg-[#258440] text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
          <h2 className="text-xl font-semibold">Payout Details</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <FiX className="text-xl" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-70px)]">
          {/* Payout Header */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {payout.storeName}
                </h3>
                <p className="text-sm text-gray-500">
                  Store ID: {payout.storeId}
                </p>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  payout.status
                )}`}
              >
                {payout.status}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center text-sm text-gray-600">
                <FiDollarSign className="mr-2" />
                Amount:{" "}
                <span className="ml-1 font-semibold text-gray-900">
                  ${payout.amount.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <FiCreditCard className="mr-2" />
                Method:{" "}
                <span className="ml-1 font-semibold text-gray-900">
                  {payout.paymentMethod}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <FiCalendar className="mr-2" />
                Requested:{" "}
                <span className="ml-1 font-semibold text-gray-900">
                  {payout.requestDate}
                </span>
              </div>
              {payout.processedDate && (
                <div className="flex items-center text-sm text-gray-600">
                  <FiCalendar className="mr-2" />
                  Processed:{" "}
                  <span className="ml-1 font-semibold text-gray-900">
                    {payout.processedDate}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Transaction Details */}
          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">
              Transaction Details
            </h4>
            <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
              {payout.transactionId && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Transaction ID</span>
                  <span className="text-sm font-medium text-gray-900">
                    {payout.transactionId}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Payment Method</span>
                <span className="text-sm font-medium text-gray-900">
                  {payout.paymentMethod}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Status</span>
                <div className="flex items-center gap-2">
                  {getStatusIcon(payout.status)}
                  <span className="text-sm font-medium text-gray-900">
                    {payout.status}
                  </span>
                </div>
              </div>
              {payout.notes && (
                <div className="flex justify-between items-start">
                  <span className="text-sm text-gray-600">Notes</span>
                  <span className="text-sm font-medium text-gray-900 text-right max-w-xs">
                    {payout.notes}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Status Update Section */}
          {payout.status === "Pending" || payout.status === "Processing" ? (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-gray-900">
                  Update Status
                </h4>
                <button
                  onClick={() => setShowStatusUpdate(!showStatusUpdate)}
                  className="text-[#258440] hover:text-[#1E803A] text-sm font-medium flex items-center gap-1"
                >
                  <FiEdit className="text-sm" />
                  {showStatusUpdate ? "Cancel" : "Update"}
                </button>
              </div>

              {showStatusUpdate && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Status
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent"
                      value={selectedStatus}
                      onChange={(e) =>
                        setSelectedStatus(e.target.value as Payout["status"])
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Completed">Completed</option>
                      <option value="Failed">Failed</option>
                    </select>
                  </div>

                  {selectedStatus === "Failed" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Failure Reason
                      </label>
                      <textarea
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#258440] focus:border-transparent"
                        rows={3}
                        placeholder="Enter reason for failure..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </div>
                  )}

                  <button
                    onClick={handleStatusUpdate}
                    className="w-full px-4 py-2 bg-[#258440] text-white rounded-lg hover:bg-[#1E803A] transition-colors duration-200"
                  >
                    Update Status
                  </button>
                </div>
              )}
            </div>
          ) : null}

          {/* Status Timeline */}
          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">
              Status Timeline
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <FiClock className="text-yellow-600 text-sm" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">
                      Requested
                    </span>
                    <span className="text-xs text-gray-500">
                      {payout.requestDate}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Payout request submitted
                  </p>
                </div>
              </div>

              {payout.status !== "Pending" && (
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiTruck className="text-blue-600 text-sm" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">
                        Processing
                      </span>
                      <span className="text-xs text-gray-500">
                        {payout.processedDate || "In Progress"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Payout is being processed
                    </p>
                  </div>
                </div>
              )}

              {(payout.status === "Completed" ||
                payout.status === "Failed") && (
                <div className="flex items-start gap-3">
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      payout.status === "Completed"
                        ? "bg-green-100"
                        : "bg-red-100"
                    }`}
                  >
                    {getStatusIcon(payout.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">
                        {payout.status === "Completed" ? "Completed" : "Failed"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {payout.processedDate}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {payout.status === "Completed"
                        ? "Payout successfully processed"
                        : "Payout processing failed"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Close
            </button>
            {payout.status === "Completed" && (
              <button className="px-4 py-2 bg-[#258440] text-white rounded-lg hover:bg-[#1E803A] transition-colors duration-200">
                Download Receipt
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
