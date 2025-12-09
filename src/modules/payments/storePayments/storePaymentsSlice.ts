// src/modules/payments/storePayments/storePaymentsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface StorePayment {
  sno: number;
  date: string;
  storeName: string;
  totalOrders: number;
  storeAmount: number;
  taxAmount: number;
  totalAmount: number;
  transactionDate: string;
  transactionId: string;
  status: "Completed" | "Pending" | "Failed" | "Refunded";
}

interface StorePaymentsState {
  list: StorePayment[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Function to generate mock store payments data
const generateStorePayments = (): StorePayment[] => {
  const storeNames = [
    "Madhina Chicken & Mutton Center",
    "Rajahamundry Homemade Foods",
    "Branded Store",
    "Yashu Mart",
    "Super Mart",
    "Fresh Foods",
    "Organic Store",
    "Quick Shop",
    "City Market",
    "Local Grocers",
  ];

  const locations = [
    "Hyderabad",
    "Vizag",
    "Rajahmundry",
    "Vijayawada",
    "Bangalore",
    "Chennai",
    "Mumbai",
    "Delhi",
  ];

  const fos = [
    "John Doe",
    "Jane Smith",
    "Michael Johnson",
    "Emily Williams",
    "Robert Brown",
    "Sarah Davis",
    "David Miller",
    "Lisa Wilson",
  ];

  const categories = [
    "Meat & Poultry",
    "Groceries",
    "Dairy Products",
    "Bakery Items",
    "Fresh Produce",
    "Frozen Foods",
    "Beverages",
    "Snacks",
  ];

  const statuses: ("Completed" | "Pending" | "Failed" | "Refunded")[] = [
    "Completed",
    "Pending",
    "Failed",
    "Refunded",
  ];

  const payments: StorePayment[] = [];

  // Generate 20 payment records
  for (let i = 1; i <= 20; i++) {
    // Generate random date within last 3 months
    const daysAgo = Math.floor(Math.random() * 90);
    const paymentDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
    const transactionDate = new Date(
      paymentDate.getTime() + Math.random() * 24 * 60 * 60 * 1000
    );

    const totalOrders = Math.floor(Math.random() * 10) + 1;
    const storeAmount = Math.floor(Math.random() * 1000) + 50;
    const taxAmount = Math.floor(Math.random() * 50);
    const totalAmount = storeAmount + taxAmount;

    payments.push({
      sno: i,
      date: paymentDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      storeName: storeNames[Math.floor(Math.random() * storeNames.length)],
      totalOrders,
      storeAmount,
      taxAmount,
      totalAmount,
      transactionDate: transactionDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      transactionId: `TXN${Date.now()}${i}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
    });
  }

  return payments;
};

const initialState: StorePaymentsState = {
  list: generateStorePayments(),
  status: "idle",
  error: null,
};

// Async thunk for fetching store payments
export const fetchStorePayments = createAsyncThunk(
  "storePayments/fetchStorePayments",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return initialState.list;
  }
);

const storePaymentsSlice = createSlice({
  name: "storePayments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStorePayments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStorePayments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchStorePayments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch store payments";
      });
  },
});

export default storePaymentsSlice.reducer;
