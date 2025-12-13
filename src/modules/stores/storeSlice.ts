// // src/modules/stores/storeSlice.ts
// import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

// export interface Store {
//   id: string;
//   storeId: number;
//   category: string;
//   name: string;
//   logo: string;
//   areaName: string;
//   city: string;
//   contactName: string;
//   contactNo: string;
//   fieldOfficer: string;
//   radius: number;
//   rating: number;
//   status: "Active" | "Inactive";
//   availableStatus: "Available" | "Unavailable";
//   created: string;
// }

// interface StoreState {
//   stores: Store[];
//   status: "idle" | "loading" | "succeeded" | "failed";
//   error: string | null;
// }

// // Function to generate stores with provided data
// const generateStores = (): Store[] => {
//   const stores: Store[] = [];

//   // Add provided sample data
//   stores.push({
//     id: "1",
//     storeId: 1,
//     category: "Veg",
//     name: "Yashu Mart",
//     logo: "https://picsum.photos/seed/store1/100/100.jpg",
//     areaName: "Rebala",
//     city: "Rebala",
//     contactName: "yashu",
//     contactNo: "7358362811",
//     fieldOfficer: "TEST FO 1",
//     radius: 5,
//     rating: 5,
//     status: "Active",
//     availableStatus: "Available",
//     created: "2024-08-10 17:39:43",
//   });

//   stores.push({
//     id: "2",
//     storeId: 2,
//     category: "Veg",
//     name: "Mohanmart",
//     logo: "https://picsum.photos/seed/store2/100/100.jpg",
//     areaName: "Rebala",
//     city: "Rebala",
//     contactName: "RammohanaRao",
//     contactNo: "8897948789",
//     fieldOfficer: "TEST FO 1",
//     radius: 5,
//     rating: 4,
//     status: "Active",
//     availableStatus: "Available",
//     created: "2024-08-17 12:58:20",
//   });

//   stores.push({
//     id: "3",
//     storeId: 3,
//     category: "Restaurants",
//     name: "Test Store 3",
//     logo: "https://picsum.photos/seed/store3/100/100.jpg",
//     areaName: "Rebala",
//     city: "Rebala",
//     contactName: "ABC",
//     contactNo: "1234567890",
//     fieldOfficer: "TEST FO 1",
//     radius: 5,
//     rating: 2.5,
//     status: "Active",
//     availableStatus: "Available",
//     created: "2024-09-29 10:17:31",
//   });

//   // Add more stores (as requested)
//   for (let i = 4; i <= 100; i++) {
//     const categories = ["Veg", "Non-Veg", "Restaurants", "Grocery", "Dairy"];
//     const areas = [
//       "Rebala",
//       "Kavali",
//       "Nellore",
//       "Gudur",
//       "Kavali",
//       "Vijayawada",
//       "Guntur",
//       "Tirupati",
//     ];
//     const cities = [
//       "Rebala",
//       "Kavali",
//       "Nellore",
//       "Gudur",
//       "Kavali",
//       "Vijayawada",
//       "Guntur",
//       "Tirupati",
//     ];
//     const statuses: ("Active" | "Inactive")[] = ["Active", "Inactive"];
//     const availableStatuses: ("Available" | "Unavailable")[] = [
//       "Available",
//       "Unavailable",
//     ];

//     stores.push({
//       id: i.toString(),
//       storeId: i,
//       category: categories[Math.floor(Math.random() * categories.length)],
//       name: `Store ${i}`,
//       logo: `https://picsum.photos/seed/store${i}/100/100.jpg`,
//       areaName: areas[Math.floor(Math.random() * areas.length)],
//       city: cities[Math.floor(Math.random() * cities.length)],
//       contactName: `Contact Person ${i}`,
//       contactNo: `9876543${i.toString().padStart(4, "0")}`,
//       fieldOfficer: `Field Officer ${Math.floor(Math.random() * 10) + 1}`,
//       radius: Math.floor(Math.random() * 10) + 1,
//       rating: Math.round(Math.random() * 5 * 10) / 10,
//       status: statuses[Math.floor(Math.random() * statuses.length)],
//       availableStatus:
//         availableStatuses[Math.floor(Math.random() * availableStatuses.length)],
//       created: `2024-${Math.floor(Math.random() * 12) + 1}-${
//         Math.floor(Math.random() * 28) + 1
//       } ${Math.floor(Math.random() * 24)}:${Math.floor(
//         Math.random() * 60
//       )}:${Math.floor(Math.random() * 60)}`,
//     });
//   }

//   return stores;
// };

// const initialState: StoreState = {
//   stores: generateStores(),
//   status: "idle",
//   error: null,
// };

// // Async thunk for fetching stores
// export const fetchStores = createAsyncThunk("stores/fetchStores", async () => {
//   await new Promise((resolve) => setTimeout(resolve, 500));
//   return initialState.stores;
// });

// const storeSlice = createSlice({
//   name: "stores",
//   initialState,
//   reducers: {
//     addStore: (state, action: PayloadAction<Store>) => {
//       state.stores.push({ ...action.payload, id: Date.now().toString() });
//     },
//     editStore: (state, action: PayloadAction<Store>) => {
//       const index = state.stores.findIndex((s) => s.id === action.payload.id);
//       if (index !== -1) state.stores[index] = action.payload;
//     },
//     deleteStore: (state, action: PayloadAction<string>) => {
//       state.stores = state.stores.filter((s) => s.id !== action.payload);
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchStores.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchStores.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.stores = action.payload;
//       })
//       .addCase(fetchStores.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message || "Failed to fetch stores";
//       });
//   },
// });

// export const { addStore, editStore, deleteStore } = storeSlice.actions;
// export default storeSlice.reducer;

// src/modules/stores/storeSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface Store {
  id: string;
  storeId: number;
  category: string;
  name: string;
  logo: string;
  areaName: string;
  city: string;
  district: string;
  state: string;
  contactName: string;
  contactNo: string;
  fieldOfficer: string;
  radius: number;
  rating: number;
  status: "Active" | "Inactive";
  availableStatus: "Available" | "Unavailable";
  created: string;
}

interface StoreState {
  stores: Store[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Function to generate stores with provided data
const generateStores = (): Store[] => {
  const stores: Store[] = [];

  // Add provided sample data
  stores.push({
    id: "1",
    storeId: 1,
    category: "Veg",
    name: "Yashu Mart",
    logo: "https://picsum.photos/seed/store1/100/100.jpg",
    areaName: "Rebala",
    city: "Rebala",
    district: "Nellore",
    state: "Andhra Pradesh",
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
    district: "Nellore",
    state: "Andhra Pradesh",
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
    district: "Nellore",
    state: "Andhra Pradesh",
    contactName: "ABC",
    contactNo: "1234567890",
    fieldOfficer: "TEST FO 1",
    radius: 5,
    rating: 2.5,
    status: "Active",
    availableStatus: "Available",
    created: "2024-09-29 10:17:31",
  });

  // Add more stores (as requested)
  for (let i = 4; i <= 100; i++) {
    const categories = ["Veg", "Non-Veg", "Restaurants", "Grocery", "Dairy"];
    const areas = [
      "Rebala",
      "Kavali",
      "Nellore",
      "Gudur",
      "Kavali",
      "Vijayawada",
      "Guntur",
      "Tirupati",
      "Visakhapatnam",
    ];
    const cities = [
      "Rebala",
      "Kavali",
      "Nellore",
      "Gudur",
      "Kavali",
      "Vijayawada",
      "Guntur",
      "Tirupati",
      "Visakhapatnam",
    ];
    const districts = [
      "Nellore",
      "Gudur",
      "Kavali",
      "Vijayawada",
      "Guntur",
      "Tirupati",
      "Visakhapatnam",
    ];
    const states = ["Andhra Pradesh", "Telangana", "Karnataka"];
    const statuses: ("Active" | "Inactive")[] = ["Active", "Inactive"];
    const availableStatuses: ("Available" | "Unavailable")[] = [
      "Available",
      "Unavailable",
    ];

    stores.push({
      id: i.toString(),
      storeId: i,
      category: categories[Math.floor(Math.random() * categories.length)],
      name: `Store ${i}`,
      logo: `https://picsum.photos/seed/store${i}/100/100.jpg`,
      areaName: areas[Math.floor(Math.random() * areas.length)],
      city: cities[Math.floor(Math.random() * cities.length)],
      district: districts[Math.floor(Math.random() * districts.length)],
      state: states[Math.floor(Math.random() * states.length)],
      contactName: `Contact Person ${i}`,
      contactNo: `9876543${i.toString().padStart(4, "0")}`,
      fieldOfficer: `Field Officer ${Math.floor(Math.random() * 10) + 1}`,
      radius: Math.floor(Math.random() * 10) + 1,
      rating: Math.round(Math.random() * 5 * 10) / 10,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      availableStatus:
        availableStatuses[Math.floor(Math.random() * availableStatuses.length)],
      created: `2024-${Math.floor(Math.random() * 12) + 1}-${
        Math.floor(Math.random() * 28) + 1
      } ${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60)}`,
    });
  }

  return stores;
};

const initialState: StoreState = {
  stores: generateStores(),
  status: "idle",
  error: null,
};

// Async thunk for fetching stores
export const fetchStores = createAsyncThunk("stores/fetchStores", async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return initialState.stores;
});

const storeSlice = createSlice({
  name: "stores",
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
    toggleStoreStatus: (state, action: PayloadAction<string>) => {
      const index = state.stores.findIndex((s) => s.id === action.payload);
      if (index !== -1) {
        state.stores[index].status =
          state.stores[index].status === "Active" ? "Inactive" : "Active";
      }
    },
    updateStoreLogo: (
      state,
      action: PayloadAction<{ storeId: string; logoUrl: string }>
    ) => {
      const { storeId, logoUrl } = action.payload;
      const store = state.stores.find((s) => s.id === storeId);
      if (store) {
        store.logo = logoUrl;
      }
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

export const {
  addStore,
  editStore,
  deleteStore,
  toggleStoreStatus,
  updateStoreLogo,
} = storeSlice.actions;
export default storeSlice.reducer;
