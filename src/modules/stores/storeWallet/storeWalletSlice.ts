// src/modules/shop/storeWallet/storeWalletSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface WalletTransaction {
  id: string;
  storeId: string;
  storeName: string;
  type: "Credit" | "Debit";
  amount: number;
  description: string;
  date: string;
  balance: number;
}

export interface StoreWallet {
  id: string;
  storeId: string;
  storeName: string;
  currentBalance: number;
  totalEarnings: number;
  totalWithdrawals: number;
  lastUpdated: string;
  transactions: WalletTransaction[];
}

interface StoreWalletState {
  wallets: StoreWallet[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Function to generate mock wallet data
const generateWalletData = (): StoreWallet[] => {
  const wallets: StoreWallet[] = [];

  // Generate 20 wallets with transactions
  for (let i = 1; i <= 20; i++) {
    const currentBalance = Math.floor(Math.random() * 10000) + 1000;
    const totalEarnings = currentBalance + Math.floor(Math.random() * 5000);
    const totalWithdrawals = totalEarnings - currentBalance;

    // Generate transactions for this wallet
    const transactions: WalletTransaction[] = [];
    let runningBalance = 0;

    // Generate 10-20 transactions per wallet
    const transactionCount = Math.floor(Math.random() * 10) + 10;

    for (let j = 1; j <= transactionCount; j++) {
      const isCredit = Math.random() > 0.3; // 70% chance of credit
      const amount = Math.floor(Math.random() * 1000) + 100;

      if (isCredit) {
        runningBalance += amount;
      } else {
        runningBalance -= amount;
      }

      transactions.push({
        id: `tx-${i}-${j}`,
        storeId: i.toString(),
        storeName: `Store ${i}`,
        type: isCredit ? "Credit" : "Debit",
        amount,
        description: isCredit
          ? `Order #${1000 + j} payment`
          : `Withdrawal #${j}`,
        date: new Date(Date.now() - j * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10),
        balance: runningBalance,
      });
    }

    // Sort transactions by date (newest first)
    transactions.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    wallets.push({
      id: `wallet-${i}`,
      storeId: i.toString(),
      storeName: `Store ${i}`,
      currentBalance,
      totalEarnings,
      totalWithdrawals,
      lastUpdated: new Date().toISOString().slice(0, 10),
      transactions,
    });
  }

  return wallets;
};

const initialState: StoreWalletState = {
  wallets: generateWalletData(),
  status: "idle",
  error: null,
};

// Async thunk for fetching wallets
export const fetchStoreWallets = createAsyncThunk(
  "storeWallet/fetchStoreWallets",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return initialState.wallets;
  }
);

const storeWalletSlice = createSlice({
  name: "storeWallet",
  initialState,
  reducers: {
    addTransaction: (
      state,
      action: PayloadAction<{
        walletId: string;
        transaction: WalletTransaction;
      }>
    ) => {
      const { walletId, transaction } = action.payload;
      const wallet = state.wallets.find((w) => w.id === walletId);
      if (wallet) {
        wallet.transactions.unshift(transaction);
        wallet.currentBalance = transaction.balance;

        if (transaction.type === "Credit") {
          wallet.totalEarnings += transaction.amount;
        } else {
          wallet.totalWithdrawals += transaction.amount;
        }

        wallet.lastUpdated = transaction.date;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoreWallets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStoreWallets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.wallets = action.payload;
      })
      .addCase(fetchStoreWallets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch store wallets";
      });
  },
});

export const { addTransaction } = storeWalletSlice.actions;
export default storeWalletSlice.reducer;
