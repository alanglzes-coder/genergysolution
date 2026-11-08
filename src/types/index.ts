export type Division = 'clima' | 'seguridad' | 'solar';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  sku: string;
  model: string;
  name: string;
  brand: string;
  division: Division;
  category: string;
  subCategory: string;
  priceMxn: number;
  regularPriceMxn?: number;
  isQuoteOnly?: boolean;
  featured?: boolean;
  bestseller?: boolean;
  inStock: boolean;
  stockUnits: number;
  image: string;
  gallery: string[];
  shortDescription: string;
  fullDescription: string;
  keyFeatures: string[];
  specifications: ProductSpec[];
  warrantyYears: number;
  datasheetUrl?: string;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  notes?: string;
}

export type ViewMode = 'home' | 'catalog' | 'product-detail' | 'solutions' | 'contact' | 'checkout-quote';

export interface FilterState {
  division: Division | 'all';
  category: string | 'all';
  brand: string | 'all';
  searchQuery: string;
  maxPrice: number;
  onlyInStock: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'name-asc';
}

export interface QuoteRequest {
  fullName: string;
  company?: string;
  email: string;
  phone: string;
  city: string;
  division: Division | 'multiple';
  projectType: 'residencial' | 'comercial' | 'industrial' | 'distribuidor';
  estimatedBudget?: string;
  notes: string;
  items?: CartItem[];
}
