import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
};

const initialState: { profile: UserProfile | null } = {
  profile: {
    id: "u-001",
    name: "Pavan Kalyan",
    email: "kalyan@example.com",
    avatarUrl:
      "https://tse2.mm.bing.net/th/id/OIP.EVzsDAGKTlHAe_smlWdziAHaHa?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload;
    },
    signOut(state) {
      state.profile = null;
    },
  },
});

export const { setProfile, signOut } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
