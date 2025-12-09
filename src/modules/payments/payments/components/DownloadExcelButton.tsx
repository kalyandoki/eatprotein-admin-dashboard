// // src/modules/payments/components/DownloadExcelButton.tsx
// import React from "react";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// import { useAppSelector } from "../../../../store/hooks";

// export default function DownloadExcelButton() {
//   const rows = useAppSelector((s) => s.payments.list);

//   const downloadExcel = () => {
//     const formatted = rows.map((r, index) => ({
//       Sno: index + 1,
//       Date: r.date,
//       "Store Name": r.storeName,
//       "Total Orders": r.totalOrders,
//       "Total Amount": r.totalAmount,
//       "Store Amount": r.storeAmount,
//       "D Boy Amount": r.dBoyAmount,
//       "FO Amount": r.foAmount,
//       "App Amount": r.appAmount,
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(formatted);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Payments");

//     const excelBuffer = XLSX.write(workbook, {
//       bookType: "xlsx",
//       type: "array",
//     });

//     const file = new Blob([excelBuffer], {
//       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//     });

//     saveAs(file, "Payments_Report.xlsx");
//   };

//   return (
//     <button
//       onClick={downloadExcel}
//       className="bg-green-600 text-white px-4 py-2 rounded shadow"
//     >
//       Download Excel
//     </button>
//   );
// }

// // src/modules/payments/components/DownloadExcelButton.tsx
// import React from "react";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// import { PaymentRow } from "../paymentsSlice";
// import { FiDownload } from "react-icons/fi";

// interface DownloadExcelButtonProps {
//   data: PaymentRow[];
// }

// export default function DownloadExcelButton({
//   data,
// }: DownloadExcelButtonProps) {
//   const downloadExcel = () => {
//     // Format data for Excel
//     const formatted = data.map((row, index) => ({
//       Sno: index + 1,
//       Date: row.date,
//       "Store Name": row.storeName,
//       "Total Orders": row.totalOrders,
//       "Total Amount": row.totalAmount.toFixed(2),
//       "Store Amount": row.storeAmount.toFixed(2),
//       "D Boy Amount": row.dBoyAmount.toFixed(2),
//       "FO Amount": row.foAmount.toFixed(2),
//       "App Amount": row.appAmount.toFixed(2),
//     }));

//     // Calculate totals
//     const totals = data.reduce(
//       (acc, row) => {
//         acc.totalOrders += row.totalOrders;
//         acc.totalAmount += row.totalAmount;
//         acc.storeAmount += row.storeAmount;
//         acc.dBoyAmount += row.dBoyAmount;
//         acc.foAmount += row.foAmount;
//         acc.appAmount += row.appAmount;
//         return acc;
//       },
//       {
//         Sno: "Total",
//         Date: "",
//         "Store Name": "",
//         "Total Orders": 0,
//         "Total Amount": 0,
//         "Store Amount": 0,
//         "D Boy Amount": 0,
//         "FO Amount": 0,
//         "App Amount": 0,
//       }
//     );

//     // Format totals
//     totals.totalAmount = totals.totalAmount.toFixed(2);
//     totals.storeAmount = totals.storeAmount.toFixed(2);
//     totals.dBoyAmount = totals.dBoyAmount.toFixed(2);
//     totals.foAmount = totals.foAmount.toFixed(2);
//     totals.appAmount = totals.appAmount.toFixed(2);

//     // Add totals row to data
//     formatted.push(totals);

//     // Create worksheet
//     const worksheet = XLSX.utils.json_to_sheet(formatted);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Payments");

//     // Style the totals row
//     const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1:I1");
//     for (let C = range.s.c; C <= range.e.c; ++C) {
//       const address = XLSX.utils.encode_cell({ r: formatted.length - 1, c: C });
//       if (!worksheet[address]) continue;
//       worksheet[address].s = {
//         font: { bold: true },
//         fill: { fgColor: { rgb: "FFD7E4BC" } },
//       };
//     }

//     // Generate Excel file
//     const excelBuffer = XLSX.write(workbook, {
//       bookType: "xlsx",
//       type: "array",
//     });

//     const file = new Blob([excelBuffer], {
//       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//     });

//     // Get current date for filename
//     const today = new Date().toISOString().split("T")[0];
//     saveAs(file, `Payments_Report_${today}.xlsx`);
//   };

//   return (
//     <button
//       onClick={downloadExcel}
//       className="px-4 py-2 bg-white text-emerald-700 font-medium rounded-lg hover:bg-emerald-50 transition-all duration-200 shadow-md flex items-center gap-2"
//     >
//       <FiDownload className="text-lg" />
//       <span>Download Excel</span>
//     </button>
//   );
// }

// src/modules/payments/components/DownloadExcelButton.tsx
import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { PaymentRow } from "../paymentsSlice";
import { FiDownload } from "react-icons/fi";

interface DownloadExcelButtonProps {
  data: PaymentRow[];
}

export default function DownloadExcelButton({
  data,
}: DownloadExcelButtonProps) {
  const downloadExcel = () => {
    // Format data for Excel
    const formatted = data.map((row, index) => ({
      Sno: index + 1,
      Date: row.date,
      "Store Name": row.storeName,
      "Total Orders": row.totalOrders,
      "Total Amount": row.totalAmount.toFixed(2),
      "Store Amount": row.storeAmount.toFixed(2),
      "D Boy Amount": row.dBoyAmount.toFixed(2),
      "FO Amount": row.foAmount.toFixed(2),
      "App Amount": row.appAmount.toFixed(2),
    }));

    // Calculate totals
    const totals = data.reduce(
      (acc, row) => {
        acc["Total Orders"] += row.totalOrders;
        acc["Total Amount"] += row.totalAmount;
        acc["Store Amount"] += row.storeAmount;
        acc["D Boy Amount"] += row.dBoyAmount;
        acc["FO Amount"] += row.foAmount;
        acc["App Amount"] += row.appAmount;
        return acc;
      },
      {
        Sno: "Total",
        Date: "",
        "Store Name": "",
        "Total Orders": 0,
        "Total Amount": 0,
        "Store Amount": 0,
        "D Boy Amount": 0,
        "FO Amount": 0,
        "App Amount": 0,
      }
    );

    // Format totals to 2 decimal places
    totals["Total Amount"] = parseFloat(totals["Total Amount"].toFixed(2));
    totals["Store Amount"] = parseFloat(totals["Store Amount"].toFixed(2));
    totals["D Boy Amount"] = parseFloat(totals["D Boy Amount"].toFixed(2));
    totals["FO Amount"] = parseFloat(totals["FO Amount"].toFixed(2));
    totals["App Amount"] = parseFloat(totals["App Amount"].toFixed(2));

    // Add totals row to data
    formatted.push(totals);

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(formatted);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payments");

    // Style the totals row
    const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1:I1");
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
    saveAs(file, `Payments_Report_${today}.xlsx`);
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
