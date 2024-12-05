import { createContext } from "react";

export interface Product {
  name: string;
  attribute: string;
  quantity: number;
  price: number;
  condition: string;
  brand: string;
  category: string;
  right_left_handed: string;
}

export type FilterValues = {
  category?: string;
  brand?: string[];
  condition?: string[];
  handedness?: string[];
};

export interface ProductContextType {
  HeaderCategory: string[];
  FliteCategory: string[];
  Category: string[];
  Brand: string[];
  Condition: string[];
  Handedness: string[];
  images: string[];
  fetchProduct: () => Promise<void>;
  handleFilterChange: (filters: FilterValues) => void;
  product: Product[];
  setProduct: (product: Product[]) => void;
  featured: Product[];
  newArrival: Product[];
  minPrice: string;
  setMinPrice: (price: string) => void;
  maxPrice: string;
  setMaxPrice: (price: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  handleSort: (sortOption: string) => void;
  searchTerm: string;
  searchResults: string[];
  handleSearchChange: (value: string) => void;
  handleOptionSelect: (option: string) => void;
}

// 创建 ProductContext
export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
);
