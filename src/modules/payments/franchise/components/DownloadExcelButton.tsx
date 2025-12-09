// src/modules/payments/franchise/components/DownloadExcelButton.tsx
import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FranchisePayment } from "../franchisePaymentsSlice";
import { FiDownload } from "react-icons/fi";

interface DownloadExcelButtonProps {
  data: FranchisePayment[];
  totals: {
    foAmount: number;
    pendingAmount: number;
    settledAmount: number;
  };
}

export default function DownloadExcelButton({
  data,
  totals,
}: DownloadExcelButtonProps) {
  const downloadExcel = () => {
    // Format data for Excel
    const formatted = data.map((row) => ({
      Month: row.month,
      Area: row.area,
      "FO Name": row.foName,
      "FO Amount": row.foAmount.toFixed(2),
      "Pending Amount": row.pendingAmount.toFixed(2),
      "Settled Amount": row.settledAmount.toFixed(2),
      "Transaction Date": row.transactionDate,
      "Transaction Id": row.transactionId,
      Status: row.status,
    }));

    // Add totals row
    formatted.push({
      Month: "Total",
      Area: "",
      "FO Name": "",
      "FO Amount": totals.foAmount.toFixed(2),
      "Pending Amount": totals.pendingAmount.toFixed(2),
      "Settled Amount": totals.settledAmount.toFixed(2),
      "Transaction Date": "",
      "Transaction Id": "",
      Status: "",
    });

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(formatted);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Franchise Payments");

    // Style the header row
    const headerRange = XLSX.utils.decode_range(worksheet["!ref"] || "A1:J1");
    for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
      const address = XLSX.utils.encode_cell({ r: 0, c: C });
      if (!worksheet[address]) continue;

      worksheet[address].s = {
        font: { bold: true },
        fill: { fgColor: { rgb: "FFD7E4BC" } },
      };
    }

    // Style the totals row
    const totalsRowIndex = formatted.length - 1;
    const totalsRange = XLSX.utils.decode_range(worksheet["!ref"] || "A1:J1");
    for (let C = totalsRange.s.c; C <= totalsRange.e.c; ++C) {
      const address = XLSX.utils.encode_cell({ r: totalsRowIndex, c: C });
      if (!worksheet[address]) continue;

      worksheet[address].s = {
        font: { bold: true },
        fill: { fgColor: { rgb: "FFD7E4BC" } },
        alignment: { horizontal: "right" },
      };
    }

    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Get current date for filename
    const today = new Date().toISOString().split("T")[0];
    saveAs(file, `Franchise_Payments_Report_${today}.xlsx`);
  };

  return (
    <button
      onClick={downloadExcel}
      className="px-4 py-2 bg-white text-emerald-700 font-medium rounded-lg hover:bg-emerald-50 transition-all duration-200 shadow-md flex items-center gap-2"
    >
      <FiDownload className="text-lg" />
      <span>Download Excel</span>
    </button>
  );
}
