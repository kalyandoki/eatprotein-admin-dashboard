// src/modules/users/storeAdmins/storeAdminsSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface StoreAdmin {
  id: string;
  sno: number;
  name: string;
  contactNo: string;
  storeName: string;
  city: string;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}

interface StoreAdminsState {
  admins: StoreAdmin[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Function to generate mock store admins
const generateStoreAdmins = (): StoreAdmin[] => {
  const adminNames = [
    "yashu2",
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

  const storeNames = [
    "Yashu Mart",
    "Mohanmart",
    "Test Store 3",
    "Test Store 5",
    "Test Store 66",
    "Test Store 7",
    "Test Store 8",
    "SVR Tiffins And Fast Foods",
    "Pradhan General Store",
    "VR Traders",
    "ABR Milk Parlour",
    "Sri Lakshmi Jerrsy Parlour",
    "Munna Bhai Biriyani",
    "Sri Vasavi Kirana Merchants",
    "Ratna Vari Vantillu",
    "Healthy Hub",
    "Madhina Chicken & Mutton Center",
    "Nagesh Fish Market",
    "Vijaya Durga Restaurant",
  ];

  const cities = ["rebala", "Not Updated"];

  const admins: StoreAdmin[] = [];

  // Generate 20 store admins
  for (let i = 1; i <= 20; i++) {
    const name = adminNames[i - 1] || `Admin ${i}`;
    const storeName = storeNames[i - 1] || `Store ${i}`;
    const city = cities[Math.floor(Math.random() * cities.length)];

    // Generate random date within last 2 years
    const daysAgo = Math.floor(Math.random() * 730);
    const createdDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);

    // Random status
    const status = Math.random() > 0.3 ? "Active" : "Inactive";

    admins.push({
      id: `admin-${i}`,
      sno: i,
      name,
      contactNo:
        i < 8
          ? [
              "7358362811",
              "2342342342",
              "1234567",
              "123456",
              "1234567893",
              "1234567897",
              "1234567898",
            ][i - 1] || "9876543210"
          : Math.floor(Math.random() * 9000000000) + 1000000000 + "",
      storeName,
      city,
      status,
      createdAt: createdDate.toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  return admins;
};

const initialState: StoreAdminsState = {
  admins: generateStoreAdmins(),
  status: "idle",
  error: null,
};

// Async thunk for fetching store admins
export const fetchStoreAdmins = createAsyncThunk(
  "storeAdmins/fetchStoreAdmins",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return initialState.admins;
  }
);

const storeAdminsSlice = createSlice({
  name: "storeAdmins",
  initialState,
  reducers: {
    addStoreAdmin: (
      state,
      action: PayloadAction<
        Omit<StoreAdmin, "id" | "sno" | "createdAt" | "updatedAt">
      >
    ) => {
      const newAdmin: StoreAdmin = {
        ...action.payload,
        id: Date.now().toString(),
        sno: state.admins.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.admins.push(newAdmin);
    },
    editStoreAdmin: (state, action: PayloadAction<StoreAdmin>) => {
      const index = state.admins.findIndex((a) => a.id === action.payload.id);
      if (index !== -1) {
        state.admins[index] = {
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    deleteStoreAdmin: (state, action: PayloadAction<string>) => {
      state.admins = state.admins.filter((a) => a.id !== action.payload);
      // Renumber sno
      state.admins.forEach((admin, index) => {
        admin.sno = index + 1;
      });
    },
    toggleStatus: (state, action: PayloadAction<string>) => {
      const index = state.admins.findIndex((c) => c.id === action.payload);
      if (index !== -1) {
        const currentStatus = state.admins[index].status;
        state.admins[index].status =
          currentStatus === "Active" ? "Inactive" : "Active";
        state.admins[index].updatedAt = new Date().toISOString();
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoreAdmins.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStoreAdmins.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.admins = action.payload;
      })
      .addCase(fetchStoreAdmins.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch store admins";
      });
  },
});

export const { addStoreAdmin, editStoreAdmin, deleteStoreAdmin, toggleStatus } =
  storeAdminsSlice.actions;

export default storeAdminsSlice.reducer;
