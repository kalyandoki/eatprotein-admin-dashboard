// src/modules/settlements/storeSettlementDetails/storeSettlementDetailsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface StoreSettlementDetail {
  sno: number;
  date: string;
  totalOrders: number;
  totalAmount: number;
  paymentStatus: "Pending" | "Completed" | "Failed";
  transactionDate: string;
  transactionId: string;
}

interface StoreSettlementDetailsState {
  list: StoreSettlementDetail[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  storeName: string;
  storeLocation: string;
}

const initialState: StoreSettlementDetailsState = {
  list: [],
  status: "idle",
  error: null,
  storeName: "",
  storeLocation: "",
};

// Mock data for demonstration
const generateMockDetails = (storeName: string): StoreSettlementDetail[] => {
  const details: StoreSettlementDetail[] = [];
  const count = Math.floor(Math.random() * 10) + 5; // 5-15 records

  for (let i = 1; i <= count; i++) {
    const totalOrders = Math.floor(Math.random() * 50) + 5;
    const totalAmount = Math.floor(Math.random() * 5000) + 500;
    const paymentStatus =
      Math.random() > 0.2
        ? "Completed"
        : Math.random() > 0.5
        ? "Pending"
        : "Failed";

    // Generate random date within last 30 days
    const daysAgo = Math.floor(Math.random() * 30);
    const date = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
    const transactionDate = new Date(
      date.getTime() + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000
    );

    details.push({
      sno: i,
      date: date.toISOString().split("T")[0],
      totalOrders,
      totalAmount,
      paymentStatus,
      transactionDate: transactionDate.toISOString().split("T")[0],
      transactionId: `TXN${100000 + Math.floor(Math.random() * 900000)}`,
    });
  }

  return details;
};

const getStoreLocation = (storeName: string): string => {
  // Mock location data based on store name
  const locations: { [key: string]: string } = {
    yashu: "Rebala, gudlur(m),Nellore(d),Andhrapradesh",
    Kavitha: "Miyapur, Hyderabad, Telangana",
    bca: "Banjara Hills, Hyderabad, Telangana",
    abc: "Jubilee Hills, Hyderabad, Telangana",
    Test: "Kukatpally, Hyderabad, Telangana",
    aabc: "Gachibowli, Hyderabad, Telangana",
    "M Venkata Ramaniah": "Secunderabad, Telangana",
    Diwakar: "Madhapur, Hyderabad, Telangana",
    "Vijay Kumar": "Hitech City, Hyderabad, Telangana",
    Babu: "Kondapur, Hyderabad, Telangana",
    Naidu: "Begumpet, Hyderabad, Telangana",
    Munna: "Dilsukhnagar, Hyderabad, Telangana",
    Naveen: "Lakdikapul, Hyderabad, Telangana",
    Ratna: "Ameerpet, Hyderabad, Telangana",
    "Manikanta Acharya": "Punjagutta, Hyderabad, Telangana",
    "SK Sultan": "Tarnaka, Hyderabad, Telangana",
    "Nageswara Rao": "Nampally, Hyderabad, Telangana",
    Nagarjuna: "Abids, Hyderabad, Telangana",
  };

  return locations[storeName] || "Hyderabad, Telangana";
};

// Async thunk for fetching store settlement details
export const fetchStoreSettlementDetails = createAsyncThunk(
  "storeSettlementDetails/fetchStoreSettlementDetails",
  async (storeName: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Return mock data based on storeName
    return {
      storeName,
      storeLocation: getStoreLocation(storeName),
      data: generateMockDetails(storeName),
    };
  }
);

const storeSettlementDetailsSlice = createSlice({
  name: "storeSettlementDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoreSettlementDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStoreSettlementDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.storeName = action.payload.storeName;
        state.storeLocation = action.payload.storeLocation;
        state.list = action.payload.data;
      })
      .addCase(fetchStoreSettlementDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Failed to fetch store settlement details";
      });
  },
});

export default storeSettlementDetailsSlice.reducer;
