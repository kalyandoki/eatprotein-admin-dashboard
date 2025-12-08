// src/modules/shop/storeAnalytics/storeAnalyticsSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface AnalyticsData {
  storeId: string;
  storeName: string;
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  topProducts: Array<{
    name: string;
    quantity: number;
    revenue: number;
  }>;
  monthlyData: Array<{
    month: string;
    orders: number;
    revenue: number;
  }>;
  customerMetrics: {
    newCustomers: number;
    returningCustomers: number;
    totalCustomers: number;
  };
  performanceMetrics: {
    onTimeDelivery: number;
    customerSatisfaction: number;
    orderCompletionRate: number;
  };
}

interface StoreAnalyticsState {
  analytics: AnalyticsData[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Function to generate mock analytics data
const generateAnalyticsData = (): AnalyticsData[] => {
  const analytics: AnalyticsData[] = [];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const products = [
    "Product A",
    "Product B",
    "Product C",
    "Product D",
    "Product E",
  ];

  // Generate analytics for 20 stores
  for (let i = 1; i <= 20; i++) {
    const totalOrders = Math.floor(Math.random() * 500) + 100;
    const totalRevenue = totalOrders * (Math.random() * 50 + 20);
    const averageOrderValue = totalRevenue / totalOrders;

    // Generate top products
    const topProducts = products
      .map((product) => ({
        name: product,
        quantity: Math.floor(Math.random() * 100) + 10,
        revenue: Math.floor(Math.random() * 1000) + 100,
      }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);

    // Generate monthly data
    const monthlyData = months.map((month) => ({
      month,
      orders: Math.floor(Math.random() * 50) + 10,
      revenue: Math.floor(Math.random() * 2000) + 500,
    }));

    // Generate customer metrics
    const totalCustomers = Math.floor(Math.random() * 200) + 50;
    const newCustomers = Math.floor(totalCustomers * 0.3);
    const returningCustomers = totalCustomers - newCustomers;

    // Generate performance metrics
    const performanceMetrics = {
      onTimeDelivery: Math.floor(Math.random() * 30) + 70, // 70-100%
      customerSatisfaction: Math.floor(Math.random() * 20) + 80, // 80-100%
      orderCompletionRate: Math.floor(Math.random() * 15) + 85, // 85-100%
    };

    analytics.push({
      storeId: i.toString(),
      storeName: `Store ${i}`,
      totalOrders,
      totalRevenue,
      averageOrderValue,
      topProducts,
      monthlyData,
      customerMetrics: {
        newCustomers,
        returningCustomers,
        totalCustomers,
      },
      performanceMetrics,
    });
  }

  return analytics;
};

const initialState: StoreAnalyticsState = {
  analytics: generateAnalyticsData(),
  status: "idle",
  error: null,
};

// Async thunk for fetching analytics
export const fetchStoreAnalytics = createAsyncThunk(
  "storeAnalytics/fetchStoreAnalytics",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return initialState.analytics;
  }
);

const storeAnalyticsSlice = createSlice({
  name: "storeAnalytics",
  initialState,
  reducers: {
    updateAnalytics: (state, action: PayloadAction<AnalyticsData>) => {
      const index = state.analytics.findIndex(
        (a) => a.storeId === action.payload.storeId
      );
      if (index !== -1) {
        state.analytics[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoreAnalytics.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStoreAnalytics.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.analytics = action.payload;
      })
      .addCase(fetchStoreAnalytics.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch analytics";
      });
  },
});

export const { updateAnalytics } = storeAnalyticsSlice.actions;
export default storeAnalyticsSlice.reducer;
