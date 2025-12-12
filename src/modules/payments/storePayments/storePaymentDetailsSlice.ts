// src/modules/payments/storePaymentDetails/storePaymentDetailsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface StorePaymentDetail {
  date: string;
  orderId: string;
  orderAmount: number;
  storeAmount: number;
  taxAmount: number;
  appShare: number;
  deliveryCharges: number;
  packageCharges: number;
  platformFee: number;
  couponCost: number;
  balancedAppAmount: number;
  status: string;
  foAmount: number;
}

interface StorePaymentDetailsState {
  list: StorePaymentDetail[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  storeName: string;
}

const initialState: StorePaymentDetailsState = {
  list: [],
  status: "idle",
  error: null,
  storeName: "",
};

// Mock data for demonstration
const mockData: { [key: string]: StorePaymentDetail[] } = {
  "Madhina Chicken & Mutton Center": [
    {
      date: "30 November, 2025",
      orderId: "#EP0429",
      orderAmount: 223,
      storeAmount: 157.42343758325,
      taxAmount: 0,
      appShare: 67.605390537589,
      deliveryCharges: 25,
      packageCharges: 1,
      platformFee: 1,
      couponCost: 0,
      balancedAppAmount: 40.605390537589,
      status: "Completed",
      foAmount: 12.172968725025,
    },
    {
      date: "19 September, 2025",
      orderId: "#EP0397",
      orderAmount: 157,
      storeAmount: 104.92343758325,
      taxAmount: 0,
      appShare: 53.430390537589,
      deliveryCharges: 25,
      packageCharges: 1,
      platformFee: 1,
      couponCost: 0,
      balancedAppAmount: 26.430390537589,
      status: "Completed",
      foAmount: 8.1229687250255,
    },
  ],
  "Rajahamundry Homemade Foods": [
    {
      date: "16 September, 2025",
      orderId: "#EP0396",
      orderAmount: 153,
      storeAmount: 99.758,
      taxAmount: 0,
      appShare: 53.242,
      deliveryCharges: 25,
      packageCharges: 1,
      platformFee: 1,
      couponCost: 0,
      balancedAppAmount: 26.242,
      status: "Completed",
      foAmount: 8.4726,
    },
  ],
  "Branded Store": [
    {
      date: "26 August, 2025",
      orderId: "#EP0395",
      orderAmount: 256,
      storeAmount: 199.516,
      taxAmount: 0,
      appShare: 56.484,
      deliveryCharges: 50,
      packageCharges: 2,
      platformFee: 2,
      couponCost: 0,
      balancedAppAmount: 2.484,
      status: "Completed",
      foAmount: 16.9452,
    },
    {
      date: "26 August, 2025",
      orderId: "#EP0394",
      orderAmount: 256,
      storeAmount: 199.516,
      taxAmount: 0,
      appShare: 56.484,
      deliveryCharges: 50,
      packageCharges: 2,
      platformFee: 2,
      couponCost: 0,
      balancedAppAmount: 2.484,
      status: "Completed",
      foAmount: 16.9452,
    },
  ],
  "Yashu Mart": [
    {
      date: "25 August, 2025",
      orderId: "#EP0393",
      orderAmount: 86,
      storeAmount: 60,
      taxAmount: 0,
      appShare: 26,
      deliveryCharges: 10,
      packageCharges: 1,
      platformFee: 1,
      couponCost: 0,
      balancedAppAmount: 14,
      status: "Completed",
      foAmount: 4.8,
    },
  ],
  "Super Mart": [
    {
      date: "15 July, 2025",
      orderId: "#EP0392",
      orderAmount: 162,
      storeAmount: 127.44,
      taxAmount: 0,
      appShare: 34.56,
      deliveryCharges: 25,
      packageCharges: 1,
      platformFee: 1,
      couponCost: 0,
      balancedAppAmount: 7.56,
      status: "Completed",
      foAmount: 8.1,
    },
    {
      date: "15 July, 2025",
      orderId: "#EP0391",
      orderAmount: 162,
      storeAmount: 127.44,
      taxAmount: 0,
      appShare: 34.56,
      deliveryCharges: 25,
      packageCharges: 1,
      platformFee: 1,
      couponCost: 0,
      balancedAppAmount: 7.56,
      status: "Completed",
      foAmount: 8.1,
    },
  ],
  "Fresh Foods": [
    {
      date: "28 June, 2025",
      orderId: "#EP0390",
      orderAmount: 178,
      storeAmount: 140.22,
      taxAmount: 0,
      appShare: 37.78,
      deliveryCharges: 25,
      packageCharges: 1,
      platformFee: 1,
      couponCost: 0,
      balancedAppAmount: 10.78,
      status: "Completed",
      foAmount: 8.9,
    },
  ],
  "Organic Store": [
    {
      date: "14 June, 2025",
      orderId: "#EP0389",
      orderAmount: 163,
      storeAmount: 127.76,
      taxAmount: 0,
      appShare: 35.24,
      deliveryCharges: 25,
      packageCharges: 1,
      platformFee: 1,
      couponCost: 0,
      balancedAppAmount: 8.24,
      status: "Completed",
      foAmount: 8.15,
    },
    {
      date: "14 June, 2025",
      orderId: "#EP0388",
      orderAmount: 163,
      storeAmount: 127.76,
      taxAmount: 0,
      appShare: 35.24,
      deliveryCharges: 25,
      packageCharges: 1,
      platformFee: 1,
      couponCost: 0,
      balancedAppAmount: 8.24,
      status: "Completed",
      foAmount: 8.15,
    },
    {
      date: "14 June, 2025",
      orderId: "#EP0387",
      orderAmount: 163,
      storeAmount: 127.76,
      taxAmount: 0,
      appShare: 35.24,
      deliveryCharges: 25,
      packageCharges: 1,
      platformFee: 1,
      couponCost: 0,
      balancedAppAmount: 8.24,
      status: "Completed",
      foAmount: 8.15,
    },
    {
      date: "14 June, 2025",
      orderId: "#EP0386",
      orderAmount: 163,
      storeAmount: 127.76,
      taxAmount: 0,
      appShare: 35.24,
      deliveryCharges: 25,
      packageCharges: 1,
      platformFee: 1,
      couponCost: 0,
      balancedAppAmount: 8.24,
      status: "Completed",
      foAmount: 8.15,
    },
  ],
  "Quick Shop": [
    {
      date: "30 May, 2025",
      orderId: "#EP0385",
      orderAmount: 95,
      storeAmount: 74.1,
      taxAmount: 0,
      appShare: 20.9,
      deliveryCharges: 15,
      packageCharges: 1,
      platformFee: 1,
      couponCost: 0,
      balancedAppAmount: 3.9,
      status: "Completed",
      foAmount: 4.75,
    },
  ],
  "City Market": [
    {
      date: "18 May, 2025",
      orderId: "#EP0384",
      orderAmount: 140.33,
      storeAmount: 110.13,
      taxAmount: 0,
      appShare: 30.2,
      deliveryCharges: 25,
      packageCharges: 1,
      platformFee: 1,
      couponCost: 0,
      balancedAppAmount: 3.2,
      status: "Completed",
      foAmount: 7.0166666666667,
    },
    {
      date: "18 May, 2025",
      orderId: "#EP0383",
      orderAmount: 140.33,
      storeAmount: 110.13,
      taxAmount: 0,
      appShare: 30.2,
      deliveryCharges: 25,
      packageCharges: 1,
      platformFee: 1,
      couponCost: 0,
      balancedAppAmount: 3.2,
      status: "Completed",
      foAmount: 7.0166666666667,
    },
    {
      date: "18 May, 2025",
      orderId: "#EP0382",
      orderAmount: 140.33,
      storeAmount: 110.13,
      taxAmount: 0,
      appShare: 30.2,
      deliveryCharges: 25,
      packageCharges: 1,
      platformFee: 1,
      couponCost: 0,
      balancedAppAmount: 3.2,
      status: "Completed",
      foAmount: 7.0166666666667,
    },
  ],
};

// Async thunk for fetching store payment details
export const fetchStorePaymentDetails = createAsyncThunk(
  "storePaymentDetails/fetchStorePaymentDetails",
  async (storeName: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Return mock data based on storeName
    return {
      storeName,
      data: mockData[storeName] || [],
    };
  }
);

const storePaymentDetailsSlice = createSlice({
  name: "storePaymentDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStorePaymentDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStorePaymentDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.storeName = action.payload.storeName;
        state.list = action.payload.data;
      })
      .addCase(fetchStorePaymentDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Failed to fetch store payment details";
      });
  },
});

export default storePaymentDetailsSlice.reducer;
