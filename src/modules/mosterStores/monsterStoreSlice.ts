// src/modules/monsterStores/monsterStoreSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface MonsterStats {
  health: string;
  attack: string;
  defense: string;
  speed: string;
  image?: string;
}

export interface MonsterStore {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
  stock: number;
  category: string;
  subCategory: string;
  stats: MonsterStats;
  rating?: number;
  element: string;
  rarity: string;
  abilities: string[];
}

interface MonsterStoreState {
  products: MonsterStore[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  selectedProduct: MonsterStore | null;
}

// Generate 100 food products
const generateFoodProducts = (): MonsterStore[] => {
  const categories = [
    "Fruits",
    "Vegetables",
    "Grains",
    "Dairy",
    "Meat",
    "Seafood",
    "Beverages",
    "Snacks",
    "Herbs & Spices",
    "Condiments",
  ];

  const subCategories = {
    Fruits: ["Tropical", "Berries", "Citrus", "Stone Fruits", "Melons"],
    Vegetables: [
      "Leafy Greens",
      "Root Vegetables",
      "Cruciferous",
      "Nightshade",
      "Podded",
    ],
    Grains: ["Cereals", "Pasta", "Rice", "Bread", "Flour"],
    Dairy: ["Milk", "Cheese", "Yogurt", "Butter", "Cream"],
    Meat: ["Beef", "Poultry", "Pork", "Lamb", "Processed"],
    Seafood: ["Fish", "Shellfish", "Crustaceans", "Mollusks", "Caviar"],
    Beverages: ["Juices", "Tea", "Coffee", "Soda", "Water"],
    Snacks: ["Chips", "Nuts", "Crackers", "Cookies", "Candy"],
    "Herbs & Spices": ["Herbs", "Spices", "Seasonings", "Extracts", "Salts"],
    Condiments: ["Sauces", "Dressings", "Spreads", "Pickles", "Relishes"],
  };

  const elements = [
    "Fire",
    "Water",
    "Earth",
    "Ice",
    "Lightning",
    "Dark",
    "Light",
  ];
  const rarities = [
    "Common",
    "Uncommon",
    "Rare",
    "Epic",
    "Legendary",
    "Mythic",
  ];

  const products: MonsterStore[] = [];

  // Generate 100 products
  for (let i = 1; i <= 100; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const subCategoryList =
      subCategories[category as keyof typeof subCategories];
    const subCategory =
      subCategoryList[Math.floor(Math.random() * subCategoryList.length)];
    const element = elements[Math.floor(Math.random() * elements.length)];
    const rarity = rarities[Math.floor(Math.random() * rarities.length)];

    // Generate random stats based on rarity
    const getStatsForRarity = (rarity: string) => {
      switch (rarity) {
        case "Mythic":
          return {
            health: Math.floor(Math.random() * 30) + 120,
            attack: Math.floor(Math.random() * 30) + 120,
            defense: Math.floor(Math.random() * 30) + 120,
            speed: Math.floor(Math.random() * 30) + 120,
          };
        case "Legendary":
          return {
            health: Math.floor(Math.random() * 25) + 100,
            attack: Math.floor(Math.random() * 25) + 100,
            defense: Math.floor(Math.random() * 25) + 100,
            speed: Math.floor(Math.random() * 25) + 100,
          };
        case "Epic":
          return {
            health: Math.floor(Math.random() * 20) + 80,
            attack: Math.floor(Math.random() * 20) + 80,
            defense: Math.floor(Math.random() * 20) + 80,
            speed: Math.floor(Math.random() * 20) + 80,
          };
        case "Rare":
          return {
            health: Math.floor(Math.random() * 15) + 60,
            attack: Math.floor(Math.random() * 15) + 60,
            defense: Math.floor(Math.random() * 15) + 60,
            speed: Math.floor(Math.random() * 15) + 60,
          };
        case "Uncommon":
          return {
            health: Math.floor(Math.random() * 10) + 40,
            attack: Math.floor(Math.random() * 10) + 40,
            defense: Math.floor(Math.random() * 10) + 40,
            speed: Math.floor(Math.random() * 10) + 40,
          };
        default: // Common
          return {
            health: Math.floor(Math.random() * 10) + 20,
            attack: Math.floor(Math.random() * 10) + 20,
            defense: Math.floor(Math.random() * 10) + 20,
            speed: Math.floor(Math.random() * 10) + 20,
          };
      }
    };

    const stats = getStatsForRarity(rarity);

    // Generate price based on rarity
    const getPriceForRarity = (rarity: string) => {
      switch (rarity) {
        case "Mythic":
          return Math.floor(Math.random() * 5000) + 5000;
        case "Legendary":
          return Math.floor(Math.random() * 3000) + 3000;
        case "Epic":
          return Math.floor(Math.random() * 2000) + 1500;
        case "Rare":
          return Math.floor(Math.random() * 1000) + 800;
        case "Uncommon":
          return Math.floor(Math.random() * 500) + 400;
        default:
          return Math.floor(Math.random() * 300) + 100;
      }
    };

    // Generate stock based on rarity (rarer items have less stock)
    const getStockForRarity = (rarity: string) => {
      switch (rarity) {
        case "Mythic":
          return Math.floor(Math.random() * 3) + 1;
        case "Legendary":
          return Math.floor(Math.random() * 5) + 2;
        case "Epic":
          return Math.floor(Math.random() * 10) + 5;
        case "Rare":
          return Math.floor(Math.random() * 20) + 10;
        case "Uncommon":
          return Math.floor(Math.random() * 30) + 20;
        default:
          return Math.floor(Math.random() * 50) + 30;
      }
    };

    // Generate random abilities
    const abilityPool = [
      "Freshness Boost",
      "Nutrient Rich",
      "Flavor Explosion",
      "Energy Boost",
      "Immunity Support",
      "Digestive Aid",
      "Antioxidant Power",
      "Protein Source",
      "Vitamin C",
      "Fiber Rich",
      "Heart Healthy",
      "Brain Food",
      "Muscle Builder",
      "Bone Strengthener",
      "Skin Enhancer",
      "Stress Reliever",
      "Metabolism Booster",
      "Hydration Plus",
      "Detoxifier",
      "Anti-inflammatory",
      "Blood Sugar Regulator",
    ];

    const numAbilities =
      rarity === "Mythic"
        ? 4
        : rarity === "Legendary"
        ? 3
        : rarity === "Epic"
        ? 2
        : rarity === "Rare"
        ? 2
        : 1;

    const abilities: string[] = [];
    const tempAbilityPool = [...abilityPool];

    for (let j = 0; j < numAbilities; j++) {
      const index = Math.floor(Math.random() * tempAbilityPool.length);
      abilities.push(tempAbilityPool[index]);
      tempAbilityPool.splice(index, 1);
    }

    // Generate random rating
    const rating = Math.round((Math.random() * 2 + 3) * 10) / 10;

    products.push({
      id: 200 + i,
      name: `${category} ${subCategory} ${i}`,
      description: `Premium quality ${category.toLowerCase()} ${subCategory.toLowerCase()} with exceptional taste and nutritional value.`,
      image: `https://picsum.photos/seed/food${i}/300/200.jpg`,
      price: getPriceForRarity(rarity).toString(),
      stock: getStockForRarity(rarity),
      category,
      subCategory,
      stats: {
        health: stats.health.toString(),
        attack: stats.attack.toString(),
        defense: stats.defense.toString(),
        speed: stats.speed.toString(),
        image: `https://picsum.photos/seed/nutrition${i}/300/200.jpg`,
      },
      rating,
      element,
      rarity,
      abilities,
    });
  }

  return products;
};

const initialState: MonsterStoreState = {
  products: generateFoodProducts(),
  status: "idle",
  error: null,
  selectedProduct: null,
};

export const fetchMonsterStores = createAsyncThunk(
  "monsterStores/fetchProducts",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return initialState.products;
  }
);

const monsterStoreSlice = createSlice({
  name: "monsterStores",
  initialState,
  reducers: {
    addMonsterStore: (state, action: PayloadAction<MonsterStore>) => {
      state.products.push({ ...action.payload, id: Date.now() });
    },
    editMonsterStore: (state, action: PayloadAction<MonsterStore>) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteMonsterStore: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    setSelectedMonsterStore: (
      state,
      action: PayloadAction<MonsterStore | null>
    ) => {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMonsterStores.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMonsterStores.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchMonsterStores.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const {
  addMonsterStore,
  editMonsterStore,
  deleteMonsterStore,
  setSelectedMonsterStore,
} = monsterStoreSlice.actions;

export default monsterStoreSlice.reducer;
