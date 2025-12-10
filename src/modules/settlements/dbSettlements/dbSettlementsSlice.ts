// src/modules/settlements/dbSettlements/dbSettlementsSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface DBSettlement {
  id: string;
  sno: number;
  date: string;
  dbId: string;
  dbName: string;
  totalOrders: number;
  totalAmount: number;
  dbAmount: number;
  settlementDate: string;
  settlementId: string;
  status: "COD" | "ONLINE";
  createdAt: string;
  updatedAt: string;
}

interface DBSettlementsState {
  settlements: DBSettlement[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Function to generate mock settlements
const generateSettlements = (): DBSettlement[] => {
  const dbNames = [
    "yashu",
    "kavitha",
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

  const settlements: DBSettlement[] = [];

  // Generate 30 settlements
  for (let i = 1; i <= 30; i++) {
    const dbName = dbNames[Math.floor(Math.random() * dbNames.length)];
    const totalOrders = Math.floor(Math.random() * 100) + 10;
    const totalAmount = totalOrders * Math.floor(Math.random() * 1000) + 100;
    const dbAmount = totalAmount * 0.8; // 80% of total amount
    const status = Math.random() > 0.5 ? "COD" : "ONLINE";

    // Generate random date within last 3 months
    const daysAgo = Math.floor(Math.random() * 90);
    const createdDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);

    // Settlement date is 5-10 days after creation
    const settlementDaysAgo = Math.floor(Math.random() * 5) + 5;
    const settlementDate = new Date(
      Date.now() - settlementDaysAgo * 24 * 60 * 60 * 1000
    );

    settlements.push({
      id: `settlement-${i}`,
      sno: i,
      date: createdDate.toISOString().split("T")[0],
      dbId: `DB${1000 + i}`,
      dbName,
      totalOrders,
      totalAmount,
      dbAmount,
      settlementDate: settlementDate.toISOString().split("T")[0],
      settlementId: `SET${Math.floor(Math.random() * 10000) + 1000}`,
      status,
      createdAt: createdDate.toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  return settlements;
};

const initialState: DBSettlementsState = {
  settlements: generateSettlements(),
  status: "idle",
  error: null,
};

// Async thunk for fetching settlements
export const fetchDBSettlements = createAsyncThunk(
  "dbSettlements/fetchDBSettlements",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return generateSettlements();
  }
);

const dbSettlementsSlice = createSlice({
  name: "dbSettlements",
  initialState,
  reducers: {
    addDBSettlement: (
      state,
      action: PayloadAction<
        Omit<DBSettlement, "id" | "sno" | "createdAt" | "updatedAt">
      >
    ) => {
      const newSettlement: DBSettlement = {
        ...action.payload,
        id: Date.now().toString(),
        sno: state.settlements.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.settlements.unshift(newSettlement);
    },
    editDBSettlement: (state, action: PayloadAction<DBSettlement>) => {
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
    deleteDBSettlement: (state, action: PayloadAction<string>) => {
      state.settlements = state.settlements.filter(
        (s) => s.id !== action.payload
      );
      // Renumber sno
      state.settlements.forEach((settlement, index) => {
        settlement.sno = index + 1;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDBSettlements.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDBSettlements.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.settlements = action.payload;
      })
      .addCase(fetchDBSettlements.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch settlements";
      });
  },
});

export const { addDBSettlement, editDBSettlement, deleteDBSettlement } =
  dbSettlementsSlice.actions;

export default dbSettlementsSlice.reducer;
