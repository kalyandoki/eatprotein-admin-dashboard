export interface Brand {
  id: number;
  name: string;
  category: string;
  subCategory: string;
  status: "Active" | "Inactive";
  logo?: string; // data URL or remote URL
}
