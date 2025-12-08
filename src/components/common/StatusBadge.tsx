import React from "react";
import clsx from "clsx";

interface StatusBadgeProps {
  status: "Active" | "Inactive" | "Pending" | string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const badgeClass = clsx(
    "px-3 py-1 rounded-full text-xs font-semibold inline-block",
    {
      "bg-green-100 text-green-700": status === "Active",
      "bg-red-100 text-red-700": status === "Inactive",
      "bg-yellow-100 text-yellow-800": status === "Pending",
      "bg-gray-100 text-gray-600": !["Active", "Inactive", "Pending"].includes(
        status
      ),
    }
  );

  return <span className={badgeClass}>{status}</span>;
};

export default StatusBadge;
