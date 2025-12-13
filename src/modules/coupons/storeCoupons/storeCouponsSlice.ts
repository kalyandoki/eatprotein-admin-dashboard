// src/modules/coupons/storeCoupons/storeCouponsSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface StoreCoupon {
  id: string;
  sno: number;
  date: string;
  couponCode: string;
  couponPercentage: number;
  couponImage: string;
  validity: string;
  status: "Active" | "Inactive" | "In Progress" | "Expired";
  totalOrders: number;
  createdAt: string;
  updatedAt: string;
}

interface StoreCouponsState {
  coupons: StoreCoupon[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Function to generate mock store coupons
const generateStoreCoupons = (): StoreCoupon[] => {
  const couponCodes = [
    "REB20",
    "REBALA10",
    "WELCOME50",
    "SUMMER20",
    "FLASH30",
    "FIRST10",
    "SPECIAL15",
    "FESTIVAL40",
    "MEGA50",
    "EXTRA25",
    "SUPER20",
    "DEAL35",
    "BONUS15",
    "OFFER20",
    "NEWYEAR25",
    "SALE30",
    "DISCOUNT40",
    "HOLIDAY50",
    "CLEARANCE50",
  ];

  const couponNames = [
    "Rebala Test",
    "Rebala Special",
    "Welcome Discount",
    "Summer Sale",
    "Flash Sale",
    "First Time User",
    "Special Promotion",
    "Festival Offer",
    "Mega Discount",
    "Extra Savings",
    "Super Deal",
    "Deal of the Day",
    "Bonus Reward",
    "Limited Time Offer",
    "Holiday Special",
  ];

  const coupons: StoreCoupon[] = [];

  // Generate 15 coupons
  for (let i = 1; i <= 15; i++) {
    const couponCode =
      couponCodes[Math.floor(Math.random() * couponCodes.length)];
    const couponName =
      couponNames[Math.floor(Math.random() * couponNames.length)];
    const percentage = Math.floor(Math.random() * 50) + 5;
    const totalOrders = Math.floor(Math.random() * 100) + 10;

    // Generate random date within last 2 years
    const daysAgo = Math.floor(Math.random() * 730);
    const createdDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);

    // Random validity between 30-365 days
    const validityDays = Math.floor(Math.random() * 335) + 30;
    const validityDate = new Date(
      Date.now() + validityDays * 24 * 60 * 60 * 1000
    );

    // Determine status based on validity
    let status: StoreCoupon["status"];
    if (validityDate < new Date()) {
      status = "Expired";
    } else if (validityDate.getTime() - Date.now() < 30 * 24 * 60 * 60 * 1000) {
      status = "In Progress";
    } else {
      status = Math.random() > 0.3 ? "Active" : "Inactive";
    }

    coupons.push({
      id: `store-coupon-${i}`,
      sno: i,
      date: createdDate.toISOString().split("T")[0],
      couponCode,
      couponPercentage: percentage,
      couponImage: `https://picsum.photos/seed/store${i}/200/200.jpg`,
      validity: validityDate.toISOString().split("T")[0],
      status,
      totalOrders,
      createdAt: createdDate.toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  return coupons;
};

const initialState: StoreCouponsState = {
  coupons: generateStoreCoupons(),
  status: "idle",
  error: null,
};

// Async thunk for fetching store coupons
export const fetchStoreCoupons = createAsyncThunk(
  "storeCoupons/fetchStoreCoupons",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return initialState.coupons;
  }
);

const storeCouponsSlice = createSlice({
  name: "storeCoupons",
  initialState,
  reducers: {
    addStoreCoupon: (
      state,
      action: PayloadAction<
        Omit<StoreCoupon, "id" | "sno" | "createdAt" | "updatedAt">
      >
    ) => {
      const newCoupon: StoreCoupon = {
        ...action.payload,
        id: Date.now().toString(),
        sno: state.coupons.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.coupons.push(newCoupon);
    },
    editStoreCoupon: (state, action: PayloadAction<StoreCoupon>) => {
      const index = state.coupons.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.coupons[index] = {
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    deleteStoreCoupon: (state, action: PayloadAction<string>) => {
      state.coupons = state.coupons.filter((c) => c.id !== action.payload);
      // Renumber sno
      state.coupons.forEach((coupon, index) => {
        coupon.sno = index + 1;
      });
    },
    duplicateStoreCoupon: (state, action: PayloadAction<string>) => {
      const couponToDuplicate = state.coupons.find(
        (c) => c.id === action.payload
      );
      if (couponToDuplicate) {
        const duplicatedCoupon: StoreCoupon = {
          ...couponToDuplicate,
          id: Date.now().toString(),
          sno: state.coupons.length + 1,
          couponCode: `${couponToDuplicate.couponCode}_COPY`,
          // couponName: `${couponToDuplicate.couponName} (Copy)`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        state.coupons.push(duplicatedCoupon);
      }
    },
    updateStoreCouponImage: (
      state,
      action: PayloadAction<{ couponId: string; imageUrl: string }>
    ) => {
      const { couponId, imageUrl } = action.payload;
      const coupon = state.coupons.find((c) => c.id === couponId);
      if (coupon) {
        coupon.couponImage = imageUrl;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoreCoupons.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStoreCoupons.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coupons = action.payload;
      })
      .addCase(fetchStoreCoupons.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch store coupons";
      });
  },
});

export const {
  addStoreCoupon,
  editStoreCoupon,
  deleteStoreCoupon,
  duplicateStoreCoupon,
  updateStoreCouponImage,
} = storeCouponsSlice.actions;
export default storeCouponsSlice.reducer;
