// src/modules/products/subCategorySlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface SubCategory {
  id: string;
  name: string;
  nameInTelugu?: string;
  image: string;
  categoryId: string;
  status: "Active" | "Inactive";
}

interface SubCategoryState {
  subCategories: SubCategory[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SubCategoryState = {
  subCategories: [
    {
      id: "1",
      name: "Seeds",
      nameInTelugu: "విత్తనాలు",
      image: "https://picsum.photos/seed/seeds/100/100.jpg",
      categoryId: "1",
      status: "Active",
    },
    {
      id: "2",
      name: "Nuts",
      nameInTelugu: "గింజలు",
      image: "https://picsum.photos/seed/nuts/100/100.jpg",
      categoryId: "1",
      status: "Active",
    },
    {
      id: "3",
      name: "Legumes",
      nameInTelugu: "చిక్కుళ్ళు",
      image: "https://picsum.photos/seed/legumes/100/100.jpg",
      categoryId: "1",
      status: "Active",
    },
    {
      id: "4",
      name: "Lentils/Pulses",
      nameInTelugu: "పప్పులు",
      image: "https://picsum.photos/seed/lentils/100/100.jpg",
      categoryId: "1",
      status: "Active",
    },
    {
      id: "5",
      name: "Grains",
      nameInTelugu: "ధాన్యాలు",
      image: "https://picsum.photos/seed/grains/100/100.jpg",
      categoryId: "1",
      status: "Active",
    },
    {
      id: "6",
      name: "Cerals",
      nameInTelugu: "ధాన్యాలు",
      image: "https://picsum.photos/seed/cerals/100/100.jpg",
      categoryId: "1",
      status: "Active",
    },
    {
      id: "7",
      name: "Millets",
      nameInTelugu: "మిల్లెట్స్",
      image: "https://picsum.photos/seed/millets/100/100.jpg",
      categoryId: "1",
      status: "Active",
    },
    {
      id: "8",
      name: "Dry Fruits",
      nameInTelugu: "డ్రై ఫ్రూప్ట్స్",
      image: "https://picsum.photos/seed/dryfruits/100/100.jpg",
      categoryId: "1",
      status: "Active",
    },
    {
      id: "9",
      name: "Flours & Sooji",
      nameInTelugu: "పిండి & సూజి",
      image: "https://picsum.photos/seed/flours/100/100.jpg",
      categoryId: "1",
      status: "Active",
    },
    {
      id: "10",
      name: "Batters",
      nameInTelugu: "పిండిలు",
      image: "https://picsum.photos/seed/batters/100/100.jpg",
      categoryId: "1",
      status: "Active",
    },
    {
      id: "11",
      name: "Spices & Masalas",
      nameInTelugu: "స్పైసెస్ & మసాలాస్",
      image: "https://picsum.photos/seed/spices/100/100.jpg",
      categoryId: "1",
      status: "Active",
    },
    {
      id: "12",
      name: "Grocery",
      nameInTelugu: "కిరాణా",
      image: "https://picsum.photos/seed/grocery/100/100.jpg",
      categoryId: "1",
      status: "Active",
    },
    {
      id: "13",
      name: "Oils",
      nameInTelugu: "నూనెలు",
      image: "https://picsum.photos/seed/oils/100/100.jpg",
      categoryId: "1",
      status: "Active",
    },
    {
      id: "14",
      name: "Ready to Eat",
      image: "https://picsum.photos/seed/readytoeat/100/100.jpg",
      categoryId: "1",
      status: "Active",
    },
  ],
  status: "idle",
  error: null,
};

export const fetchSubCategories = createAsyncThunk(
  "subCategories/fetchSubCategories",
  async (categoryId: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    return initialState.subCategories.filter(
      (sub) => sub.categoryId === categoryId
    );
  }
);

const subCategorySlice = createSlice({
  name: "subCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.subCategories = action.payload;
      })
      .addCase(fetchSubCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch sub-categories";
      });
  },
});

export default subCategorySlice.reducer;
