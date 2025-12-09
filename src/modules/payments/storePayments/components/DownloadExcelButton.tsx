// src/modules/payments/storePayments/components/DownloadExcelButton.tsx
import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { StorePayment } from "../storePaymentsSlice";
import { FiDownload } from "react-icons/fi";

interface DownloadExcelButtonProps {
  data: StorePayment[];
  totals: {
    totalOrders: number;
    storeAmount: number;
    taxAmount: number;
    totalAmount: number;
  };
}

export default function DownloadExcelButton({
  data,
  totals,
}: DownloadExcelButtonProps) {
  const downloadExcel = () => {
    // Format data for Excel
    const formatted = data.map((row) => ({
      Sno: row.sno,
      Date: row.date,
      "Store Name": row.storeName,
      "Total Orders": row.totalOrders,
      "Store Amount": row.storeAmount.toFixed(2),
      "Tax Amount": row.taxAmount.toFixed(2),
      "Total Amount": row.totalAmount.toFixed(2),
      "Transaction Date": row.transactionDate,
      "Transaction ID": row.transactionId,
      Status: row.status,
    }));

    // Add totals row
    formatted.push({
      Sno: "Total",
      Date: "",
      "Store Name": "",
      "Total Orders": totals.totalOrders,
      "Store Amount": totals.storeAmount.toFixed(2),
      "Tax Amount": totals.taxAmount.toFixed(2),
      "Total Amount": totals.totalAmount.toFixed(2),
      "Transaction Date": "",
      "Transaction ID": "",
      Status: "",
    });

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(formatted);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Store Payments");

    // Style the totals row
    const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1:J1");
    const totalsRowIndex = formatted.length - 1;

    for (let C = range.s.c; C <= range.e.c; ++C) {
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
    saveAs(file, `Store_Payments_Report_${today}.xlsx`);
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
