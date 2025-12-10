// src/modules/payments/deliveryBoys/deliveryBoysSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface DeliveryBoy {
  sno: number;
  location: string;
  franchiseOwner: string;
  name: string;
  fo: string;
  db: string;
}

interface DeliveryBoysState {
  list: DeliveryBoy[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Function to generate mock delivery boys data
const generateDeliveryBoys = (): DeliveryBoy[] => {
  const locations = [
    "rebala",
    "Kavali",
    "Visakhapatnam",
    "Kavali",
    "Secunderabad",
  ];

  const franchiseOwners = [
    "Test DB",
    "Yedu Kondalu",
    "Babu",
    "Vivek Bandlamudi",
    "Immanuel",
    "Bharth",
    "P. Anandh Kumar",
    "J Praveen",
    "DB Thirupathi",
  ];

  const names = [
    "Test DB",
    "Yedu Kondalu",
    "Babu",
    "Vivek Bandlamudi",
    "Immanuel",
    "Bharth",
    "P. Anandh Kumar",
    "J Praveen",
    "DB Thirupathi",
  ];

  const fos = [
    "Test DB",
    "Yedu Kondalu",
    "Babu",
    "Vivek Bandlamudi",
    "Immanuel",
    "Bharth",
    "P. Anandh Kumar",
    "J Praveen",
    "DB Thirupathi",
  ];

  const dbs = [
    "Test DB",
    "Yedu Kondalu",
    "Babu",
    "Vivek Bandlamudi",
    "Immanuel",
    "Bharth",
    "P. Anandh Kumar",
    "J Praveen",
    "DB Thirupathi",
  ];

  const deliveryBoys: DeliveryBoy[] = [];

  // Generate delivery boys based on your sample data
  deliveryBoys.push({
    sno: 1,
    location: "rebala",
    franchiseOwner: "Test DB",
    name: "Test DB",
    fo: "Test DB",
    db: "Test DB",
  });

  deliveryBoys.push({
    sno: 2,
    location: "Kavali",
    franchiseOwner: "Yedu Kondalu",
    name: "Yedu Kondalu",
    fo: "Yedu Kondalu",
    db: "Yedu Kondalu",
  });

  deliveryBoys.push({
    sno: 3,
    location: "Visakhapatnam",
    franchiseOwner: "Babu",
    name: "Babu",
    fo: "Babu",
    db: "Babu",
  });

  deliveryBoys.push({
    sno: 4,
    location: "Kavali",
    franchiseOwner: "Vivek Bandlamudi",
    name: "Vivek Bandlamudi",
    fo: "Vivek Bandlamudi",
    db: "Vivek Bandlamudi",
  });

  deliveryBoys.push({
    sno: 5,
    location: "Kavali",
    franchiseOwner: "Immanuel",
    name: "Immanuel",
    fo: "Immanuel",
    db: "Immanuel",
  });

  deliveryBoys.push({
    sno: 6,
    location: "Kavali",
    franchiseOwner: "Bharth",
    name: "Bharth",
    fo: "Bharth",
    db: "Bharth",
  });

  deliveryBoys.push({
    sno: 7,
    location: "Secunderabad",
    franchiseOwner: "P. Anandh Kumar",
    name: "P. Anandh Kumar",
    fo: "P. Anandh Kumar",
    db: "P. Anandh Kumar",
  });

  deliveryBoys.push({
    sno: 8,
    location: "Secunderabad",
    franchiseOwner: "J Praveen",
    name: "J Praveen",
    fo: "J Praveen",
    db: "J Praveen",
  });

  deliveryBoys.push({
    sno: 9,
    location: "Secunderabad",
    franchiseOwner: "DB Thirupathi",
    name: "DB Thirupathi",
    fo: "DB Thirupathi",
    db: "DB Thirupathi",
  });

  deliveryBoys.push({
    sno: 10,
    location: "Kavali",
    franchiseOwner: "Test",
    name: "Test",
    fo: "Test",
    db: "Test",
  });

  return deliveryBoys;
};

const initialState: DeliveryBoysState = {
  list: generateDeliveryBoys(),
  status: "idle",
  error: null,
};

// Async thunk for fetching delivery boys
export const fetchDeliveryBoys = createAsyncThunk(
  "deliveryBoys/fetchDeliveryBoys",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return initialState.list;
  }
);

const deliveryBoysSlice = createSlice({
  name: "deliveryBoys",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeliveryBoys.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDeliveryBoys.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchDeliveryBoys.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch delivery boys";
      });
  },
});

export default deliveryBoysSlice.reducer;
