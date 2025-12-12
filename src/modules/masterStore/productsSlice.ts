// src/modules/masterStore/productsSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface Product {
  id: string;
  image: string; // Will store base64 string or URL
  nxImage: string; // Will store base64 string or URL
  name: string;
  price: number;
  stocks: number;
  calories: number;
  fat: number;
  carb: number;
  protein: number;
  section: string;
  category: string;
  subCategory: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductsState {
  products: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// ----------------------
// FIXED CATEGORY MAPPING
// ----------------------

const sections = ["Food", "Beverages", "Dairy", "Snacks", "Frozen"];

const categories = {
  Food: ["Vegetables", "Fruits", "Grains", "Meat", "Seafood"],
  Beverages: ["Juices", "Sodas", "Tea", "Coffee", "Water"],
  Dairy: ["Milk", "Cheese", "Yogurt", "Butter", "Cream"],
  Snacks: ["Chips", "Cookies", "Nuts", "Candy", "Crackers"],
  Frozen: ["Meals", "FrozenVegetables", "FrozenFruits", "Desserts", "Pizza"],
};

const subCategories = {
  Vegetables: [
    "Leafy Greens",
    "Root Vegetables",
    "Cruciferous",
    "Allium",
    "Podded",
  ],
  Fruits: ["Citrus", "Berries", "Tropical", "Stone Fruits", "Pomes"],
  Grains: ["Wheat", "Rice", "Corn", "Barley", "Oats"],
  Meat: ["Beef", "Pork", "Chicken", "Lamb", "Turkey"],
  Seafood: ["Fish", "Shellfish", "Crustaceans", "Mollusks", "Echinoderms"],

  Juices: [
    "Fruit Juice",
    "Vegetable Juice",
    "Smoothies",
    "Concentrates",
    "Fresh",
  ],
  Sodas: ["Cola", "Lemon-Lime", "Orange", "Ginger Ale", "Root Beer"],
  Tea: ["Black", "Green", "Herbal", "Oolong", "White"],
  Coffee: ["Espresso", "Cappuccino", "Latte", "Americano", "Cold Brew"],
  Water: ["Mineral", "Spring", "Sparkling", "Distilled", "Flavored"],

  Milk: ["Whole", "Skim", "Low-Fat", "Lactose-Free", "Organic"],
  Cheese: ["Cheddar", "Mozzarella", "Swiss", "Blue", "Feta"],
  Yogurt: ["Greek", "Regular", "Flavored", "Frozen", "Drinkable"],
  Butter: ["Salted", "Unsalted", "Whipped", "Clarified", "Plant-Based"],
  Cream: ["Heavy", "Light", "Whipping", "Sour", "Half-and-Half"],

  Chips: ["Potato", "Tortilla", "Veggie", "Kale", "Pita"],
  Cookies: [
    "Chocolate Chip",
    "Oatmeal",
    "Sugar",
    "Peanut Butter",
    "Shortbread",
  ],
  Nuts: ["Almonds", "Walnuts", "Cashews", "Peanuts", "Pistachios"],
  Candy: ["Chocolate", "Gummies", "Hard Candy", "Chewy", "Sour"],
  Crackers: ["Cheese", "Whole Wheat", "Rice", "Water", "Animal"],

  Meals: ["Dinners", "Lunches", "Breakfast", "Appetizers", "Side Dishes"],
  FrozenVegetables: ["Mixed", "Single", "Steamed", "Seasoned", "Plain"],
  FrozenFruits: [
    "Mixed Berries",
    "Tropical",
    "Melon",
    "Citrus",
    "Stone Fruits",
  ],
  Desserts: ["Ice Cream", "Pies", "Cakes", "Pastries", "Pudding"],
  Pizza: ["Cheese", "Pepperoni", "Veggie", "Meat Lovers", "Supreme"],
};

const productNames = {
  Vegetables: ["Spinach", "Carrots", "Broccoli", "Onions", "Peas"],
  Fruits: ["Oranges", "Strawberries", "Pineapple", "Peaches", "Apples"],
  Grains: ["Whole Wheat", "Basmati Rice", "Cornmeal", "Barley", "Rolled Oats"],
  Meat: [
    "Sirloin Steak",
    "Pork Chops",
    "Chicken Breast",
    "Lamb Chops",
    "Turkey Breast",
  ],
  Seafood: ["Salmon", "Shrimp", "Lobster", "Clams", "Sea Urchin"],

  Juices: [
    "Orange Juice",
    "Carrot Juice",
    "Berry Smoothie",
    "Apple Concentrate",
    "Fresh Grapefruit",
  ],
  Sodas: ["Cola", "Lemon-Lime", "Orange Soda", "Ginger Ale", "Root Beer"],
  Tea: ["Earl Grey", "Green Tea", "Chamomile", "Oolong", "White Tea"],
  Coffee: ["Espresso", "Cappuccino", "Latte", "Americano", "Cold Brew"],
  Water: [
    "Mineral Water",
    "Spring Water",
    "Sparkling Water",
    "Distilled Water",
    "Lemon Water",
  ],

  Milk: [
    "Whole Milk",
    "Skim Milk",
    "Low-Fat Milk",
    "Lactose-Free Milk",
    "Organic Milk",
  ],
  Cheese: [
    "Cheddar Cheese",
    "Mozzarella",
    "Swiss Cheese",
    "Blue Cheese",
    "Feta",
  ],
  Yogurt: [
    "Greek Yogurt",
    "Plain Yogurt",
    "Strawberry Yogurt",
    "Frozen Yogurt",
    "Drinkable Yogurt",
  ],
  Butter: [
    "Salted Butter",
    "Unsalted Butter",
    "Whipped Butter",
    "Clarified Butter",
    "Almond Butter",
  ],
  Cream: [
    "Heavy Cream",
    "Light Cream",
    "Whipping Cream",
    "Sour Cream",
    "Half-and-Half",
  ],

  Chips: [
    "Potato Chips",
    "Tortilla Chips",
    "Veggie Chips",
    "Kale Chips",
    "Pita Chips",
  ],
  Cookies: [
    "Chocolate Chip Cookies",
    "Oatmeal Cookies",
    "Sugar Cookies",
    "Peanut Butter Cookies",
    "Shortbread",
  ],
  Nuts: ["Almonds", "Walnuts", "Cashews", "Peanuts", "Pistachios"],
  Candy: [
    "Chocolate Bar",
    "Gummy Bears",
    "Lollipop",
    "Taffy",
    "Sour Patch Kids",
  ],
  Crackers: [
    "Cheese Crackers",
    "Whole Wheat Crackers",
    "Rice Crackers",
    "Water Crackers",
    "Animal Crackers",
  ],

  Meals: [
    "Chicken Dinner",
    "Beef Lunch",
    "Pancake Breakfast",
    "Spring Rolls",
    "Garlic Bread",
  ],
  FrozenVegetablesNames: [
    "Mixed Vegetables",
    "Frozen Peas",
    "Steamed Broccoli",
    "Seasoned Corn",
    "Plain Carrots",
  ],
  FrozenFruitsNames: [
    "Mixed Berries",
    "Tropical Mix",
    "Melon Cubes",
    "Citrus Slices",
    "Peach Halves",
  ],
  Desserts: [
    "Vanilla Ice Cream",
    "Apple Pie",
    "Chocolate Cake",
    "Croissants",
    "Rice Pudding",
  ],
  Pizza: [
    "Cheese Pizza",
    "Pepperoni Pizza",
    "Veggie Pizza",
    "Meat Lovers Pizza",
    "Supreme Pizza",
  ],
};

// ----------------------
// FIXED PRODUCT GENERATOR
// ----------------------

const generateProducts = (): Product[] => {
  const products: Product[] = [];

  for (let i = 1; i <= 100; i++) {
    const section = sections[Math.floor(Math.random() * sections.length)];

    const catList = categories[section] || [];
    const category = catList[Math.floor(Math.random() * catList.length)];

    const subList = subCategories[category] || [];
    const subCategory = subList[Math.floor(Math.random() * subList.length)];

    const nameList = productNames[subCategory] ||
      productNames[category] || ["Product"];
    const name = nameList[Math.floor(Math.random() * nameList.length)];

    const seed = Math.random().toString(36).substring(7);

    products.push({
      id: `product-${i}`,
      image: `https://picsum.photos/seed/${seed}/300/300.jpg`,
      nxImage: `https://picsum.photos/seed/${seed}-nx/300/300.jpg`,
      name: `${name} ${i}`,
      price: Math.floor(Math.random() * 100) + 1,
      stocks: Math.floor(Math.random() * 500) + 10,
      calories: Math.floor(Math.random() * 300) + 20,
      fat: Math.floor(Math.random() * 30) + 1,
      carb: Math.floor(Math.random() * 50) + 1,
      protein: Math.floor(Math.random() * 30) + 1,
      section,
      category,
      subCategory,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  return products;
};

// ----------------------
// SLICE
// ----------------------

const initialState: ProductsState = {
  products: generateProducts(),
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return generateProducts();
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (
      state,
      action: PayloadAction<Omit<Product, "id" | "createdAt" | "updatedAt">>
    ) => {
      state.products.unshift({
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    },
    editProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = {
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    updateStock: (
      state,
      action: PayloadAction<{ id: string; stocks: number }>
    ) => {
      const product = state.products.find((p) => p.id === action.payload.id);
      if (product) {
        product.stocks = action.payload.stocks;
        product.updatedAt = new Date().toISOString();
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export const { addProduct, editProduct, deleteProduct, updateStock } =
  productsSlice.actions;

export default productsSlice.reducer;
