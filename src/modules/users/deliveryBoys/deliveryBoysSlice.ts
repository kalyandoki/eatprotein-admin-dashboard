// src/modules/users/deliveryBoys/deliveryBoysSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface DeliveryBoy {
  id: string;
  sno: number;
  userId: string;
  name: string;
  contactNo: string;
  franchiseOwner: string;
  location: string;
  available: boolean;
  accountStatus: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}

interface DeliveryBoysState {
  deliveryBoys: DeliveryBoy[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Function to generate mock delivery boys
const generateDeliveryBoys = (): DeliveryBoy[] => {
  const deliveryBoyNames = [
    "Test DB",
    "Yedu Kondalu",
    "Babu",
    "Vivek Bandlamudi",
    "Immanuel",
    "Bharth",
    "DB Thirupathi",
    "P. Anandh Kumar",
    "J Praveen",
    "Test",
    "sam",
    "Test 2",
  ];

  const franchiseOwners = [
    "Test DB",
    "Yedu Kondalu",
    "Babu",
    "Vivek Bandlamudi",
    "Immanuel",
    "Bharth",
    "DB Thirupathi",
    "P. Anandh Kumar",
    "J Praveen",
    "Test",
    "sam",
    "Test 2",
  ];

  const locations = [
    "rebala",
    "Kavali",
    "Visakhapatnam",
    "Secunderabad",
    "Rebala",
  ];

  const deliveryBoys: DeliveryBoy[] = [];

  // Generate 12 delivery boys based on the provided data
  for (let i = 1; i <= 12; i++) {
    const name = deliveryBoyNames[i - 1] || `Delivery Boy ${i}`;
    const franchiseOwner = franchiseOwners[i - 1] || `Owner ${i}`;
    const location = locations[Math.floor(Math.random() * locations.length)];

    // Generate random date within last 2 years
    const daysAgo = Math.floor(Math.random() * 730);
    const createdDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);

    // Random status
    const accountStatus = Math.random() > 0.2 ? "Active" : "Inactive";
    const available = Math.random() > 0.3;

    deliveryBoys.push({
      id: `deliveryBoy-${i}`,
      sno: i,
      userId: `DB${1000 + i}`,
      name,
      contactNo:
        i < 11
          ? [
              "1234567832",
              "8341952473",
              "7659226946",
              "6303356411",
              "7780695555",
              "7416931842",
              "9014998865",
              "9502051078",
              "6305566740",
              "8309716802",
              "8309716809",
            ][i - 1]
          : Math.floor(Math.random() * 9000000000) + 1000000000 + "",
      franchiseOwner,
      location,
      available,
      accountStatus,
      createdAt: createdDate.toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  return deliveryBoys;
};

const initialState: DeliveryBoysState = {
  deliveryBoys: generateDeliveryBoys(),
  status: "idle",
  error: null,
};

// Async thunk for fetching delivery boys
export const fetchDeliveryBoys = createAsyncThunk(
  "deliveryBoys/fetchDeliveryBoys",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return generateDeliveryBoys();
  }
);

const deliveryBoysSlice = createSlice({
  name: "deliveryBoys",
  initialState,
  reducers: {
    addDeliveryBoy: (
      state,
      action: PayloadAction<
        Omit<DeliveryBoy, "id" | "sno" | "createdAt" | "updatedAt">
      >
    ) => {
      const newDeliveryBoy: DeliveryBoy = {
        ...action.payload,
        id: Date.now().toString(),
        sno: state.deliveryBoys.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.deliveryBoys.push(newDeliveryBoy);
    },
    editDeliveryBoy: (state, action: PayloadAction<DeliveryBoy>) => {
      const index = state.deliveryBoys.findIndex(
        (d) => d.id === action.payload.id
      );
      if (index !== -1) {
        state.deliveryBoys[index] = {
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    deleteDeliveryBoy: (state, action: PayloadAction<string>) => {
      state.deliveryBoys = state.deliveryBoys.filter(
        (d) => d.id !== action.payload
      );
      // Renumber sno
      state.deliveryBoys.forEach((deliveryBoy, index) => {
        deliveryBoy.sno = index + 1;
      });
    },
    toggleAvailability: (state, action: PayloadAction<string>) => {
      const deliveryBoy = state.deliveryBoys.find(
        (d) => d.id === action.payload
      );
      if (deliveryBoy) {
        deliveryBoy.available = !deliveryBoy.available;
        deliveryBoy.updatedAt = new Date().toISOString();
      }
    },
    toggleStatus: (state, action: PayloadAction<string>) => {
      const index = state.deliveryBoys.findIndex(
        (s) => s.id === action.payload
      );
      if (index !== -1) {
        state.deliveryBoys[index].accountStatus =
          state.deliveryBoys[index].accountStatus === "Active"
            ? "Inactive"
            : "Active";
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeliveryBoys.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDeliveryBoys.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.deliveryBoys = action.payload;
      })
      .addCase(fetchDeliveryBoys.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch delivery boys";
      });
  },
});

export const {
  addDeliveryBoy,
  editDeliveryBoy,
  deleteDeliveryBoy,
  toggleAvailability,
  toggleStatus,
} = deliveryBoysSlice.actions;

export default deliveryBoysSlice.reducer;
