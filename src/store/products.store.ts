import { create } from 'zustand';

export interface Product {
  thumbnail: string;
  id: number;
  title: string;
  brand: string;
  price: number;
  rating: number;
  stock: number;
  sku: string;
}

interface ProductAPI {
  id: number;
  title: string;
  brand: string;
  price: number;
  rating: number;
  stock: number;
  [key: string]: unknown;
}

interface ProductsState {
  products: Product[];
  loading: boolean;
  search: string;
  page: number;
  sortBy: keyof Product | null;
  sortOrder: 'asc' | 'desc';
  fetchProducts: () => Promise<void>;
  setSearch: (value: string) => void;
  setPage: (p: number) => void;
  setSort: (column: keyof Product) => void;
  rowsPerPage: number;
  setRowsPerPage: (n: number) => void;
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  loading: false,
  search: '',
  page: 1,
  sortBy: null,
  sortOrder: 'asc',
  setSearch: (value) => set({ search: value, page: 1 }),
  setPage: (p) => set({ page: p }),
  setSort: (column) => {
    const { sortBy, sortOrder } = get();
    if (sortBy === column) {
      set({ sortOrder: sortOrder === 'asc' ? 'desc' : 'asc' });
    } else {
      set({ sortBy: column, sortOrder: 'asc' });
    }
  },
  rowsPerPage: 5,
  setRowsPerPage: (n) => set({ rowsPerPage: n }),
  fetchProducts: async () => {
    set({ loading: true });
    try {
      const res = await fetch('https://dummyjson.com/products?limit=100');
      const data = await res.json();

      const formatted: Product[] = data.products.map((p: ProductAPI) => ({
        id: p.id,
        title: p.title,
        brand: p.brand,
        price: p.price,
        rating: p.rating,
        stock: p.stock,
        sku: `SKU-${p.id}`,
        thumbnail: p.thumbnail
      }));

      set({ products: formatted });
    } catch (err) {
      console.error('Failed to fetch products', err);
    } finally {
      set({ loading: false });
    }
  },
}));
