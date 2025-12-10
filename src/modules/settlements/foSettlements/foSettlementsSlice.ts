// src/modules/settlements/foSettlements/foSettlementsSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface FOSettlement {
  id: string;
  sno: number;
  date: string;
  foName: string;
  totalStores: number;
  totalAmount: number;
  totalBalAppAmount: number;
  totalFoAmount: number;
  settlementDate: string;
  settlementId: string;
  status: "COD" | "ONLINE";
  createdAt: string;
  updatedAt: string;
}

interface FOSettlementsState {
  settlements: FOSettlement[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Function to generate mock FO settlements
const generateFOSettlements = (): FOSettlement[] => {
  const foNames = [
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

  const settlements: FOSettlement[] = [];

  // Generate 20 settlements
  for (let i = 1; i <= 20; i++) {
    const foName = foNames[Math.floor(Math.random() * foNames.length)];
    const totalStores = Math.floor(Math.random() * 10) + 1;
    const totalAmount = totalStores * Math.floor(Math.random() * 1000) + 500;
    const totalBalAppAmount = totalAmount * 0.2; // 20% of total amount
    const totalFoAmount = totalAmount * 0.8; // 80% of total amount
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
      id: `fo-settlement-${i}`,
      sno: i,
      date: createdDate.toISOString().split("T")[0],
      foName,
      totalStores,
      totalAmount,
      totalBalAppAmount,
      totalFoAmount,
      settlementDate: settlementDate.toISOString().split("T")[0],
      settlementId: `SET${Math.floor(Math.random() * 10000) + 1000}`,
      status,
      createdAt: createdDate.toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  return settlements;
};

const initialState: FOSettlementsState = {
  settlements: generateFOSettlements(),
  status: "idle",
  error: null,
};

// Async thunk for fetching FO settlements
export const fetchFOSettlements = createAsyncThunk(
  "foSettlements/fetchFOSettlements",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return generateFOSettlements();
  }
);

const foSettlementsSlice = createSlice({
  name: "foSettlements",
  initialState,
  reducers: {
    addFOSettlement: (
      state,
      action: PayloadAction<
        Omit<FOSettlement, "id" | "sno" | "createdAt" | "updatedAt">
      >
    ) => {
      const newSettlement: FOSettlement = {
        ...action.payload,
        id: Date.now().toString(),
        sno: state.settlements.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.settlements.unshift(newSettlement);
    },
    editFOSettlement: (state, action: PayloadAction<FOSettlement>) => {
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
    deleteFOSettlement: (state, action: PayloadAction<string>) => {
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
      .addCase(fetchFOSettlements.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFOSettlements.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.settlements = action.payload;
      })
      .addCase(fetchFOSettlements.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch FO settlements";
      });
  },
});

export const { addFOSettlement, editFOSettlement, deleteFOSettlement } =
  foSettlementsSlice.actions;

export default foSettlementsSlice.reducer;
