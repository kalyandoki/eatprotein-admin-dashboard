// src/modules/stores/storeList/storeListSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface Store {
  id: string;
  storeId: number;
  category: string;
  name: string;
  logo: string;
  areaName: string;
  city: string;
  contactName: string;
  contactNo: string;
  fieldOfficer: string;
  radius: number;
  rating: number;
  status: "Active" | "Inactive";
  availableStatus: "Available" | "Unavailable";
  created: string;
}

interface StoreListState {
  stores: Store[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Function to generate mock stores
const generateStores = (): Store[] => {
  const categories = [
    "Veg",
    "Restaurants",
    "Eggs",
    "Dairy Foods",
    "Bakery & Sweets",
    "Home Foods",
  ];
  const areaNames = [
    "Rebala",
    "Downtown",
    "Uptown",
    "Midtown",
    "Westside",
    "Eastside",
  ];
  const cities = ["Rebala", "New York", "Los Angeles", "Chicago", "Houston"];
  const fieldOfficers = ["TEST FO 1", "TEST FO 2", "TEST FO 3"];
  const contactNames = ["yashu", "RammohanaRao", "ABC", "Test", "aabc"];

  const stores: Store[] = [];

  // Add the provided sample data
  stores.push({
    id: "1",
    storeId: 1,
    category: "Veg",
    name: "Yashu Mart",
    logo: "https://picsum.photos/seed/store1/100/100.jpg",
    areaName: "Rebala",
    city: "Rebala",
    contactName: "yashu",
    contactNo: "7358362811",
    fieldOfficer: "TEST FO 1",
    radius: 5,
    rating: 5,
    status: "Active",
    availableStatus: "Available",
    created: "2024-08-10 17:39:43",
  });

  stores.push({
    id: "2",
    storeId: 2,
    category: "Veg",
    name: "Mohanmart",
    logo: "https://picsum.photos/seed/store2/100/100.jpg",
    areaName: "Rebala",
    city: "Rebala",
    contactName: "RammohanaRao",
    contactNo: "8897948789",
    fieldOfficer: "TEST FO 1",
    radius: 5,
    rating: 4,
    status: "Active",
    availableStatus: "Available",
    created: "2024-08-17 12:58:20",
  });

  stores.push({
    id: "3",
    storeId: 3,
    category: "Restaurants",
    name: "Test Store 3",
    logo: "https://picsum.photos/seed/store3/100/100.jpg",
    areaName: "Rebala",
    city: "Rebala",
    contactName: "ABC",
    contactNo: "1234567890",
    fieldOfficer: "TEST FO 1",
    radius: 5,
    rating: 2.5,
    status: "Active",
    availableStatus: "Available",
    created: "2024-09-29 10:17:31",
  });

  stores.push({
    id: "4",
    storeId: 4,
    category: "Eggs",
    name: "Test Store 4",
    logo: "https://picsum.photos/seed/store4/100/100.jpg",
    areaName: "Rebala",
    city: "Rebala",
    contactName: "abc",
    contactNo: "1234567891",
    fieldOfficer: "TEST FO 1",
    radius: 5,
    rating: 4,
    status: "Active",
    availableStatus: "Available",
    created: "2024-09-29 10:18:10",
  });

  stores.push({
    id: "5",
    storeId: 5,
    category: "Dairy Foods",
    name: "Test Store 5",
    logo: "https://picsum.photos/seed/store5/100/100.jpg",
    areaName: "Rebala",
    city: "Rebala",
    contactName: "abc",
    contactNo: "1234567892",
    fieldOfficer: "TEST FO 1",
    radius: 5,
    rating: 4,
    status: "Active",
    availableStatus: "Available",
    created: "2024-09-29 10:18:57",
  });

  stores.push({
    id: "6",
    storeId: 6,
    category: "Veg",
    name: "Test Store 66",
    logo: "https://picsum.photos/seed/store6/100/100.jpg",
    areaName: "Rebala",
    city: "Rebala",
    contactName: "abc",
    contactNo: "1234567893",
    fieldOfficer: "TEST FO 1",
    radius: 5,
    rating: 4,
    status: "Active",
    availableStatus: "Available",
    created: "2024-09-29 10:21:02",
  });

  stores.push({
    id: "7",
    storeId: 7,
    category: "Bakery & Sweets",
    name: "Test Store 7",
    logo: "https://picsum.photos/seed/store7/100/100.jpg",
    areaName: "Rebala",
    city: "Rebala",
    contactName: "Test",
    contactNo: "1234567897",
    fieldOfficer: "TEST FO 1",
    radius: 5,
    rating: 4,
    status: "Active",
    availableStatus: "Available",
    created: "2024-10-21 16:10:16",
  });

  stores.push({
    id: "8",
    storeId: 8,
    category: "Home Foods",
    name: "Test Store 8",
    logo: "https://picsum.photos/seed/store8/100/100.jpg",
    areaName: "Rebala",
    city: "Rebala",
    contactName: "aabc",
    contactNo: "1234567898",
    fieldOfficer: "TEST FO 1",
    radius: 3,
    rating: 4,
    status: "Active",
    availableStatus: "Unavailable",
    created: "2024-09-29 10:22:00",
  });

  // Generate additional mock data
  for (let i = 9; i <= 100; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const areaName = areaNames[Math.floor(Math.random() * areaNames.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const fieldOfficer =
      fieldOfficers[Math.floor(Math.random() * fieldOfficers.length)];
    const contactName =
      contactNames[Math.floor(Math.random() * contactNames.length)];
    const rating = Math.floor(Math.random() * 5) + 1;
    const radius = Math.floor(Math.random() * 10) + 1;

    stores.push({
      id: i.toString(),
      storeId: i,
      category,
      name: `Store ${i}`,
      logo: `https://picsum.photos/seed/store${i}/100/100.jpg`,
      areaName,
      city,
      contactName,
      contactNo: `${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      fieldOfficer,
      radius,
      rating,
      status: Math.random() > 0.2 ? "Active" : "Inactive",
      availableStatus: Math.random() > 0.3 ? "Available" : "Unavailable",
      created: new Date(
        Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
    });
  }

  return stores;
};

const initialState: StoreListState = {
  stores: generateStores(),
  status: "idle",
  error: null,
};

// Async thunk for fetching stores
export const fetchStores = createAsyncThunk(
  "storeList/fetchStores",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return initialState.stores;
  }
);

const storeListSlice = createSlice({
  name: "storeList",
  initialState,
  reducers: {
    addStore: (state, action: PayloadAction<Store>) => {
      state.stores.push({ ...action.payload, id: Date.now().toString() });
    },
    editStore: (state, action: PayloadAction<Store>) => {
      const index = state.stores.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) state.stores[index] = action.payload;
    },
    deleteStore: (state, action: PayloadAction<string>) => {
      state.stores = state.stores.filter((s) => s.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStores.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.stores = action.payload;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch stores";
      });
  },
});

export const { addStore, editStore, deleteStore } = storeListSlice.actions;
export default storeListSlice.reducer;
