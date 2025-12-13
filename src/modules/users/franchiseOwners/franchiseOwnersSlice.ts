// src/modules/users/franchiseOwners/franchiseOwnersSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface FranchiseOwner {
  id: string;
  sno: number;
  profileImage: string;
  userName: string;
  contactNo: string;
  location: string;
  radius: number;
  percentage: number;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}

interface FranchiseOwnersState {
  owners: FranchiseOwner[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Function to generate mock franchise owners
const generateFranchiseOwners = (): FranchiseOwner[] => {
  const userNames = [
    "TEST FO 1",
    "Venkata Lakshmi Myluru",
    "Bhaskar Rao",
    "R Sai Kiran",
    "Testing",
    "Test FO 2",
    "abc",
    "Test",
    "John Smith",
    "Sarah Johnson",
    "Michael Brown",
    "Emily Davis",
    "Robert Wilson",
    "Jessica Martinez",
    "David Anderson",
  ];

  const locations = [
    "Rebala",
    "mvp",
    "Kavali",
    "Secunderabad",
    "Hyderabad",
    "Bangalore",
    "Chennai",
    "Mumbai",
    "Delhi",
    "Kolkata",
  ];

  const owners: FranchiseOwner[] = [];

  // Generate 15 franchise owners
  for (let i = 1; i <= 15; i++) {
    const userName = userNames[Math.floor(Math.random() * userNames.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const radius = Math.floor(Math.random() * 10) + 1;
    const percentage = Math.floor(Math.random() * 50) + 1;

    // Generate random date within last 2 years
    const daysAgo = Math.floor(Math.random() * 730);
    const createdDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);

    // Random status
    const status = Math.random() > 0.3 ? "Active" : "Inactive";

    owners.push({
      id: `owner-${i}`,
      sno: i,
      profileImage: `https://picsum.photos/seed/owner${i}/200/200.jpg`,
      userName,
      contactNo: Math.floor(Math.random() * 9000000000) + 1000000000 + "",
      location,
      radius,
      percentage,
      status,
      createdAt: createdDate.toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  return owners;
};

const initialState: FranchiseOwnersState = {
  owners: generateFranchiseOwners(),
  status: "idle",
  error: null,
};

// Async thunk for fetching franchise owners
export const fetchFranchiseOwners = createAsyncThunk(
  "franchiseOwners/fetchFranchiseOwners",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return initialState.owners;
  }
);

const franchiseOwnersSlice = createSlice({
  name: "franchiseOwners",
  initialState,
  reducers: {
    addFranchiseOwner: (
      state,
      action: PayloadAction<
        Omit<FranchiseOwner, "id" | "sno" | "createdAt" | "updatedAt">
      >
    ) => {
      const newOwner: FranchiseOwner = {
        ...action.payload,
        id: Date.now().toString(),
        sno: state.owners.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.owners.push(newOwner);
    },
    editFranchiseOwner: (state, action: PayloadAction<FranchiseOwner>) => {
      const index = state.owners.findIndex((o) => o.id === action.payload.id);
      if (index !== -1) {
        state.owners[index] = {
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    deleteFranchiseOwner: (state, action: PayloadAction<string>) => {
      state.owners = state.owners.filter((o) => o.id !== action.payload);
      // Renumber sno
      state.owners.forEach((owner, index) => {
        owner.sno = index + 1;
      });
    },
    toggleStatus: (state, action: PayloadAction<string>) => {
      const index = state.owners.findIndex((s) => s.id === action.payload);
      if (index !== -1) {
        state.owners[index].status =
          state.owners[index].status === "Active" ? "Inactive" : "Active";
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFranchiseOwners.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFranchiseOwners.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.owners = action.payload;
      })
      .addCase(fetchFranchiseOwners.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Failed to fetch franchise owners";
      });
  },
});

export const {
  addFranchiseOwner,
  editFranchiseOwner,
  deleteFranchiseOwner,
  toggleStatus,
} = franchiseOwnersSlice.actions;

export default franchiseOwnersSlice.reducer;
