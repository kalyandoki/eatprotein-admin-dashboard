// src/modules/shop/storePayouts/storePayoutsSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface Payout {
  id: string;
  storeId: string;
  storeName: string;
  amount: number;
  status: "Pending" | "Processing" | "Completed" | "Failed";
  requestDate: string;
  processedDate?: string;
  paymentMethod: string;
  transactionId?: string;
  notes?: string;
}

interface StorePayoutsState {
  payouts: Payout[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Function to generate mock payout data
const generatePayouts = (): Payout[] => {
  const payouts: Payout[] = [];
  const stores = Array.from({ length: 20 }, (_, i) => `Store ${i + 1}`);
  const paymentMethods = ["Bank Transfer", "UPI", "PayPal", "Check"];
  const statuses: Payout["status"][] = [
    "Pending",
    "Processing",
    "Completed",
    "Failed",
  ];

  // Generate 50 payouts
  for (let i = 1; i <= 50; i++) {
    const storeId = (Math.floor(Math.random() * 20) + 1).toString();
    const storeName = stores[parseInt(storeId) - 1];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const requestDate = new Date(
      Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
    )
      .toISOString()
      .slice(0, 10);

    let processedDate;
    if (status === "Completed" || status === "Failed") {
      processedDate = new Date(
        new Date(requestDate).getTime() +
          Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .slice(0, 10);
    }

    payouts.push({
      id: `payout-${i}`,
      storeId,
      storeName,
      amount: Math.floor(Math.random() * 5000) + 500,
      status,
      requestDate,
      processedDate,
      paymentMethod:
        paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      transactionId:
        status === "Completed"
          ? `TXN${Math.floor(Math.random() * 1000000)}`
          : undefined,
      notes: status === "Failed" ? "Insufficient funds" : undefined,
    });
  }

  // Sort by request date (newest first)
  payouts.sort(
    (a, b) =>
      new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime()
  );

  return payouts;
};

const initialState: StorePayoutsState = {
  payouts: generatePayouts(),
  status: "idle",
  error: null,
};

// Async thunk for fetching payouts
export const fetchPayouts = createAsyncThunk(
  "storePayouts/fetchPayouts",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return initialState.payouts;
  }
);

const storePayoutsSlice = createSlice({
  name: "storePayouts",
  initialState,
  reducers: {
    addPayout: (state, action: PayloadAction<Payout>) => {
      state.payouts.unshift({ ...action.payload, id: Date.now().toString() });
    },
    updatePayoutStatus: (
      state,
      action: PayloadAction<{
        id: string;
        status: Payout["status"];
        processedDate?: string;
        transactionId?: string;
        notes?: string;
      }>
    ) => {
      const { id, status, processedDate, transactionId, notes } =
        action.payload;
      const payout = state.payouts.find((p) => p.id === id);
      if (payout) {
        payout.status = status;
        if (processedDate) payout.processedDate = processedDate;
        if (transactionId) payout.transactionId = transactionId;
        if (notes) payout.notes = notes;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayouts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPayouts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.payouts = action.payload;
      })
      .addCase(fetchPayouts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch payouts";
      });
  },
});

export const { addPayout, updatePayoutStatus } = storePayoutsSlice.actions;
export default storePayoutsSlice.reducer;
