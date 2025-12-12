// src/modules/franchise/franchise-list/franchiseSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface Franchise {
  id: string;
  storeName: string;
  location: string;
  manager: string;
  phone: string;
  status: "Active" | "Inactive" | "Pending";
  hours: string;
  createdAt: string;
  updatedAt: string;
}

interface FranchiseState {
  franchises: Franchise[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Function to generate mock franchise data
const generateFranchises = (): Franchise[] => {
  const storeNames = [
    "Green Grocer",
    "Fresh Market",
    "City Mart",
    "Super Store",
    "Quick Shop",
    "Value Plus",
    "Corner Store",
    "Local Market",
    "Food Express",
    "Neighborhood Grocer",
  ];

  const locations = [
    "Downtown, New York",
    "Midtown, Manhattan",
    "Brooklyn Heights",
    "Queens Center",
    "Bronx Plaza",
    "Staten Island Mall",
    "Upper East Side",
    "Financial District",
    "Chelsea Market",
    "Times Square",
  ];

  const managers = [
    "John Smith",
    "Emily Johnson",
    "Michael Brown",
    "Sarah Davis",
    "Robert Wilson",
    "Jessica Martinez",
    "David Anderson",
    "Lisa Taylor",
    "James Thomas",
    "Jennifer Garcia",
  ];

  const franchises: Franchise[] = [];

  // Generate 15 franchises
  for (let i = 1; i <= 15; i++) {
    const storeName = storeNames[Math.floor(Math.random() * storeNames.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const manager = managers[Math.floor(Math.random() * managers.length)];
    const phone = `+1 ${Math.floor(Math.random() * 900) + 100}-${
      Math.floor(Math.random() * 900) + 100
    }-${Math.floor(Math.random() * 9000) + 1000}`;
    const status =
      Math.random() > 0.2
        ? "Active"
        : Math.random() > 0.5
        ? "Pending"
        : "Inactive";
    const hours = `${Math.floor(Math.random() * 2) + 6}:00 AM - ${
      Math.floor(Math.random() * 4) + 8
    }:00 PM`;

    franchises.push({
      id: `franchise-${i}`,
      storeName,
      location,
      manager,
      phone,
      status,
      hours,
      createdAt: new Date(
        Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
      ).toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  return franchises;
};

const initialState: FranchiseState = {
  franchises: generateFranchises(),
  status: "idle",
  error: null,
};

// Async thunk for fetching franchises
export const fetchFranchises = createAsyncThunk(
  "franchises/fetchFranchises",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return generateFranchises();
  }
);

const franchiseSlice = createSlice({
  name: "franchises",
  initialState,
  reducers: {
    addFranchise: (
      state,
      action: PayloadAction<Omit<Franchise, "id" | "createdAt" | "updatedAt">>
    ) => {
      const newFranchise: Franchise = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.franchises.unshift(newFranchise);
    },
    editFranchise: (state, action: PayloadAction<Franchise>) => {
      const index = state.franchises.findIndex(
        (f) => f.id === action.payload.id
      );
      if (index !== -1) {
        state.franchises[index] = {
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    deleteFranchise: (state, action: PayloadAction<string>) => {
      state.franchises = state.franchises.filter(
        (f) => f.id !== action.payload
      );
    },
    updateFranchiseStatus: (
      state,
      action: PayloadAction<{ id: string; status: Franchise["status"] }>
    ) => {
      const franchise = state.franchises.find(
        (f) => f.id === action.payload.id
      );
      if (franchise) {
        franchise.status = action.payload.status;
        franchise.updatedAt = new Date().toISOString();
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFranchises.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFranchises.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.franchises = action.payload;
      })
      .addCase(fetchFranchises.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch franchises";
      });
  },
});

export const {
  addFranchise,
  editFranchise,
  deleteFranchise,
  updateFranchiseStatus,
} = franchiseSlice.actions;

export default franchiseSlice.reducer;
