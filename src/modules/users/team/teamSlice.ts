// src/modules/users/team/teamSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface TeamMember {
  id: string;
  sno: number;
  name: string;
  contactNo: string;
  email?: string;
  role:
    | "SUPER_ADMIN"
    | "STORE"
    | "FRANCHISE"
    | "MARKETING_EXECUTIVE"
    | "DELIVERY_BOY"
    | "CMS_EMPLOYEE"
    | "CUSTOMER"
    | "CUSTOMER_SUPPORT";
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}

interface TeamState {
  members: TeamMember[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Function to generate mock team members
const generateTeamMembers = (): TeamMember[] => {
  const teamMembers: TeamMember[] = [
    {
      id: "member-1",
      sno: 1,
      name: "SuperAdmin2",
      contactNo: "7036356760/7036356760@mail.com",
      email: "7036356760@mail.com",
      role: "SUPER_ADMIN",
      status: "Active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "member-2",
      sno: 2,
      name: "DevAdmin",
      contactNo: "6281176386/6281176386@mail.com",
      email: "6281176386@mail.com",
      role: "SUPER_ADMIN",
      status: "Active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "member-3",
      sno: 3,
      name: "yashu2",
      contactNo: "7358362811/",
      role: "STORE",
      status: "Active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "member-4",
      sno: 4,
      name: "Kavitha",
      contactNo: "2342342342/",
      role: "STORE",
      status: "Active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "member-5",
      sno: 5,
      name: "bca",
      contactNo: "1234567/",
      role: "STORE",
      status: "Active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "member-6",
      sno: 6,
      name: "abc",
      contactNo: "123456/",
      role: "STORE",
      status: "Active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "member-7",
      sno: 7,
      name: "abc",
      contactNo: "1234567893/",
      role: "STORE",
      status: "Active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "member-8",
      sno: 8,
      name: "Test",
      contactNo: "1234567897/",
      role: "STORE",
      status: "Active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "member-9",
      sno: 9,
      name: "aabc",
      contactNo: "1234567898/",
      role: "STORE",
      status: "Active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "member-10",
      sno: 10,
      name: "TEST FO 1",
      contactNo: "1234543121/123@gmail.com",
      email: "123@gmail.com",
      role: "FRANCHISE",
      status: "Active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "member-11",
      sno: 11,
      name: "Venkata Lakshmi Myluru",
      contactNo: "8465844389/venky.myluru@gmail.com",
      email: "venky.myluru@gmail.com",
      role: "FRANCHISE",
      status: "Active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "member-12",
      sno: 12,
      name: "Manoj Kumar P",
      contactNo: "9160729141/abc@gmail.com",
      email: "abc@gmail.com",
      role: "MARKETING_EXECUTIVE",
      status: "Active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "member-13",
      sno: 13,
      name: "M Venkata Ramaniah",
      contactNo: "9652890858/",
      role: "STORE",
      status: "Active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "member-14",
      sno: 14,
      name: "khusi",
      contactNo: "9870113414/9870113414@eatprotien.in",
      email: "9870113414@eatprotien.in",
      role: "CUSTOMER",
      status: "Active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "member-15",
      sno: 15,
      name: "saurabh pal",
      contactNo: "8874777886/8874777886@eatprotien.in",
      email: "8874777886@eatprotien.in",
      role: "CUSTOMER",
      status: "Active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "member-16",
      sno: 16,
      name: "Test DB",
      contactNo: "1234567832/1234@gmail.com",
      email: "1234@gmail.com",
      role: "DELIVERY_BOY",
      status: "Active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "member-17",
      sno: 17,
      name: "Immanuel",
      contactNo: "7780695554/immanuel.d@mannschaftit.com",
      email: "immanuel.d@mannschaftit.com",
      role: "CMS_EMPLOYEE",
      status: "Active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "member-18",
      sno: 18,
      name: "Diwakar",
      contactNo: "9491271386/",
      role: "STORE",
      status: "Active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "member-19",
      sno: 19,
      name: "Vijay Kumar",
      contactNo: "9704247318/",
      role: "STORE",
      status: "Active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "member-20",
      sno: 20,
      name: "Babu",
      contactNo: "9640404990/",
      role: "STORE",
      status: "Active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "member-21",
      sno: 21,
      name: "Naidu",
      contactNo: "6303009916/",
      role: "STORE",
      status: "Active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "member-22",
      sno: 22,
      name: "Munna",
      contactNo: "9912854661/",
      role: "STORE",
      status: "Active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "member-23",
      sno: 23,
      name: "Naveen",
      contactNo: "9866458742/",
      role: "STORE",
      status: "Active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "member-24",
      sno: 24,
      name: "Ratna",
      contactNo: "8978772756/",
      role: "STORE",
      status: "Active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "member-25",
      sno: 25,
      name: "Manikanta Acharya",
      contactNo: "9182249490/",
      role: "STORE",
      status: "Active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "member-26",
      sno: 26,
      name: "SK Sultan",
      contactNo: "9700020225/",
      role: "STORE",
      status: "Active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "member-27",
      sno: 27,
      name: "Nageswara Rao",
      contactNo: "898111580/",
      role: "STORE",
      status: "Active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "member-28",
      sno: 28,
      name: "Nagarjuna",
      contactNo: "8919678565/",
      role: "STORE",
      status: "Active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "member-29",
      sno: 29,
      name: "Yedu Kondalu",
      contactNo: "8341952473/kondauppala2@gmail.com",
      email: "kondauppala2@gmail.com",
      role: "DELIVERY_BOY",
      status: "Active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "member-30",
      sno: 30,
      name: "Babu",
      contactNo: "7659226946/babluyadav.indian@gmail.com",
      email: "babluyadav.indian@gmail.com",
      role: "DELIVERY_BOY",
      status: "Active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "member-31",
      sno: 31,
      name: "Madelyn Kiernan",
      contactNo: "7057370123/7057370123@eatprotien.in",
      email: "7057370123@eatprotien.in",
      role: "CUSTOMER",
      status: "Active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "member-32",
      sno: 32,
      name: "Danaiah",
      contactNo: "6301669492/anushadavuluri83@gmail.com",
      email: "anushadavuluri83@gmail.com",
      role: "CUSTOMER_SUPPORT",
      status: "Active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  return teamMembers;
};

const initialState: TeamState = {
  members: generateTeamMembers(),
  status: "idle",
  error: null,
};

// Async thunk for fetching team members
export const fetchTeamMembers = createAsyncThunk(
  "team/fetchTeamMembers",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return generateTeamMembers();
  }
);

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    addTeamMember: (
      state,
      action: PayloadAction<
        Omit<TeamMember, "id" | "sno" | "createdAt" | "updatedAt">
      >
    ) => {
      const newMember: TeamMember = {
        ...action.payload,
        id: Date.now().toString(),
        sno: state.members.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.members.push(newMember);
    },
    editTeamMember: (state, action: PayloadAction<TeamMember>) => {
      const index = state.members.findIndex((m) => m.id === action.payload.id);
      if (index !== -1) {
        state.members[index] = {
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    deleteTeamMember: (state, action: PayloadAction<string>) => {
      state.members = state.members.filter((m) => m.id !== action.payload);
      // Renumber sno
      state.members.forEach((member, index) => {
        member.sno = index + 1;
      });
    },
    toggleStatus: (state, action: PayloadAction<string>) => {
      const index = state.members.findIndex((s) => s.id === action.payload);
      if (index !== -1) {
        state.members[index].status =
          state.members[index].status === "Active" ? "Inactive" : "Active";
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamMembers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTeamMembers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.members = action.payload;
      })
      .addCase(fetchTeamMembers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch team members";
      });
  },
});

export const { addTeamMember, editTeamMember, deleteTeamMember, toggleStatus } =
  teamSlice.actions;

export default teamSlice.reducer;
