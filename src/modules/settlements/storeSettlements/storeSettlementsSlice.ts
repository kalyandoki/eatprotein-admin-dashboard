// src/modules/settlements/storeSettlements/storeSettlementsSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface StoreSettlement {
  id: string;
  sno: number;
  date: string;
  storeName: string;
  totalOrders: number;
  storeAmount: number;
  tax: number;
  totalAmount: number;
  settlementDate: string;
  settlementId: string;
  paymentType: "COD" | "ONLINE";
  status: "Pending" | "Completed" | "Failed";
  createdAt: string;
  updatedAt: string;
}

interface StoreSettlementsState {
  settlements: StoreSettlement[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Function to generate mock store settlements
const generateStoreSettlements = (): StoreSettlement[] => {
  const storeNames = [
    "yashu",
    "Kavitha",
    "bca",
    "abc",
    "Test",
    "aabc",
    "M Venkata Ramaniah",
    "Diwakar",
    "Vijay Kumar",
    "Babu",
    "Naidu",
    "Munna",
    "Naveen",
    "Ratna",
    "Manikanta Acharya",
    "SK Sultan",
    "Nageswara Rao",
    "Nagarjuna",
  ];

  const settlements: StoreSettlement[] = [];

  // Generate 30 settlements with both COD and ONLINE payment types
  for (let i = 1; i <= 30; i++) {
    const storeName = storeNames[Math.floor(Math.random() * storeNames.length)];
    const totalOrders = Math.floor(Math.random() * 100) + 10;
    const storeAmount = Math.floor(Math.random() * 10000) + 1000;
    const taxPercentage = Math.floor(Math.random() * 10) + 5; // 5-15%
    const tax = Math.floor(storeAmount * (taxPercentage / 100));
    const totalAmount = storeAmount + tax;
    const paymentType = Math.random() > 0.5 ? "COD" : "ONLINE";
    const status =
      Math.random() > 0.2
        ? "Completed"
        : Math.random() > 0.5
        ? "Pending"
        : "Failed";

    // Generate random date within last 30 days
    const daysAgo = Math.floor(Math.random() * 30);
    const settlementDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);

    settlements.push({
      id: `settlement-${i}`,
      sno: i,
      date: settlementDate.toISOString().split("T")[0],
      storeName,
      totalOrders,
      storeAmount,
      tax,
      totalAmount,
      settlementDate: settlementDate.toISOString().split("T")[0],
      settlementId: `ST${1000 + i}`,
      paymentType,
      status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  return settlements;
};

const initialState: StoreSettlementsState = {
  settlements: generateStoreSettlements(),
  status: "idle",
  error: null,
};

// Async thunk for fetching store settlements
export const fetchStoreSettlements = createAsyncThunk(
  "storeSettlements/fetchStoreSettlements",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return generateStoreSettlements();
  }
);

const storeSettlementsSlice = createSlice({
  name: "storeSettlements",
  initialState,
  reducers: {
    addStoreSettlement: (
      state,
      action: PayloadAction<
        Omit<StoreSettlement, "id" | "sno" | "createdAt" | "updatedAt">
      >
    ) => {
      const newSettlement: StoreSettlement = {
        ...action.payload,
        id: Date.now().toString(),
        sno: state.settlements.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.settlements.unshift(newSettlement);
    },
    editStoreSettlement: (state, action: PayloadAction<StoreSettlement>) => {
      const index = state.settlements.findIndex(
        (s) => s.id === action.payload.id
      );
      if (index !== -1) {
        state.settlements[index] = {
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    deleteStoreSettlement: (state, action: PayloadAction<string>) => {
      state.settlements = state.settlements.filter(
        (s) => s.id !== action.payload
      );
      // Renumber sno
      state.settlements.forEach((settlement, index) => {
        settlement.sno = index + 1;
      });
    },
    updateSettlementStatus: (
      state,
      action: PayloadAction<{ id: string; status: StoreSettlement["status"] }>
    ) => {
      const settlement = state.settlements.find(
        (s) => s.id === action.payload.id
      );
      if (settlement) {
        settlement.status = action.payload.status;
        settlement.updatedAt = new Date().toISOString();
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoreSettlements.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStoreSettlements.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.settlements = action.payload;
      })
      .addCase(fetchStoreSettlements.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Failed to fetch store settlements";
      });
  },
});

export const {
  addStoreSettlement,
  editStoreSettlement,
  deleteStoreSettlement,
  updateSettlementStatus,
} = storeSettlementsSlice.actions;

export default storeSettlementsSlice.reducer;
