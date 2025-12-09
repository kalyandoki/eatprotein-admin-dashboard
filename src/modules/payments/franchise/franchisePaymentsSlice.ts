// src/modules/payments/franchise/franchisePaymentsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface FranchisePayment {
  sno: number;
  month: string;
  area: string;
  foName: string;
  foAmount: number;
  pendingAmount: number;
  settledAmount: number;
  transactionDate: string;
  transactionId: string;
  status: "Completed" | "Pending" | "Failed" | "Refunded";
}

interface FranchisePaymentsState {
  list: FranchisePayment[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Function to generate mock franchise payments data
const generateFranchisePayments = (): FranchisePayment[] => {
  const areas = [
    "Bhaskar Rao",
    "TEST FO 1",
    "BUCHIREDDIPALEM, Rebala",
    "Buchireddipalem, Sri Potti Sriramulu Nellore",
  ];

  const foNames = ["Bhaskar Rao", "TEST FO 1", "BUCHIREDDIPALEM", "Rebala"];

  const months = [
    "September 2025",
    "August 2025",
    "July 2025",
    "June 2025",
    "May 2025",
  ];

  const payments: FranchisePayment[] = [];

  // Generate payment records based on your sample data
  payments.push({
    sno: 1,
    month: "September 2025",
    area: "Bhaskar Rao",
    foName: "Bhaskar Rao",
    foAmount: 16.5955687250255,
    pendingAmount: 0,
    settledAmount: 0,
    transactionDate: "",
    transactionId: "",
    status: "Completed",
  });

  payments.push({
    sno: 2,
    month: "August 2025",
    area: "TEST FO 1",
    foName: "TEST FO 1",
    foAmount: 38.6904,
    pendingAmount: 0,
    settledAmount: 0,
    transactionDate: "",
    transactionId: "",
    status: "Completed",
  });

  payments.push({
    sno: 3,
    month: "July 2025",
    area: "TEST FO 1",
    foName: "TEST FO 1",
    foAmount: 49.41,
    pendingAmount: 0,
    settledAmount: 0,
    transactionDate: "",
    transactionId: "",
    status: "Completed",
  });

  payments.push({
    sno: 4,
    month: "June 2025",
    area: "BUCHIREDDIPALEM, Rebala",
    foName: "Bhaskar Rao",
    foAmount: 129.55712752066222,
    pendingAmount: 0,
    settledAmount: 0,
    transactionDate: "",
    transactionId: "",
    status: "Completed",
  });

  payments.push({
    sno: 5,
    month: "June 2025",
    area: "TEST FO 1",
    foName: "TEST FO 1",
    foAmount: 258.8328,
    pendingAmount: 0,
    settledAmount: 0,
    transactionDate: "",
    transactionId: "",
    status: "Completed",
  });

  payments.push({
    sno: 6,
    month: "May 2025",
    area: "Buchireddipalem, Sri Potti Sriramulu Nellore",
    foName: "TEST FO 1",
    foAmount: 138.3719764416,
    pendingAmount: 0,
    settledAmount: 0,
    transactionDate: "",
    transactionId: "",
    status: "Completed",
  });

  payments.push({
    sno: 7,
    month: "May 2025",
    area: "Bhaskar Rao",
    foName: "Bhaskar Rao",
    foAmount: 7.68,
    pendingAmount: 0,
    settledAmount: 0,
    transactionDate: "",
    transactionId: "",
    status: "Completed",
  });

  return payments;
};

const initialState: FranchisePaymentsState = {
  list: generateFranchisePayments(),
  status: "idle",
  error: null,
};

// Async thunk for fetching franchise payments
export const fetchFranchisePayments = createAsyncThunk(
  "franchisePayments/fetchFranchisePayments",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return initialState.list;
  }
);

const franchisePaymentsSlice = createSlice({
  name: "franchisePayments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFranchisePayments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFranchisePayments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchFranchisePayments.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Failed to fetch franchise payments";
      });
  },
});

export default franchisePaymentsSlice.reducer;
