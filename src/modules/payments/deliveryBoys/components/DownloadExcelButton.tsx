// src/modules/payments/deliveryBoys/components/DownloadExcelButton.tsx
import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { DeliveryBoy } from "../deliveryBoysSlice";
import { FiDownload } from "react-icons/fi";

interface DownloadExcelButtonProps {
  data: DeliveryBoy[];
}

export default function DownloadExcelButton({
  data,
}: DownloadExcelButtonProps) {
  const downloadExcel = () => {
    // Format data for Excel
    const formatted = data.map((row) => ({
      Sno: row.sno,
      Location: row.location,
      "Franchise Owner": row.franchiseOwner,
      Name: row.name,
      FO: row.fo,
      DB: row.db,
    }));

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(formatted);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Delivery Boys");

    // Style the header row
    const headerRange = XLSX.utils.decode_range(worksheet["!ref"] || "A1:F1");
    for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
      const address = XLSX.utils.encode_cell({ r: 0, c: C });
      if (!worksheet[address]) continue;

      worksheet[address].s = {
        font: { bold: true },
        fill: { fgColor: { rgb: "FFD7E4BC" } },
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
    saveAs(file, `Delivery_Boys_Report_${today}.xlsx`);
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
