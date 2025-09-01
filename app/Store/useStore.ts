// Store/useStore.ts
import { create } from 'zustand';

// Product interface
interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number | null;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  badge: string | null;
  description: string;
}

// Cart item interface
interface CartItem extends Product {
  quantity: number;
}

// Filters interface
interface Filters {
  category: string;
  searchQuery: string;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating';
  viewMode: 'grid' | 'list';
  showFilters: boolean;
  priceRange: {
    min: string;
    max: string;
  };
  minRating: number;
}

// Store state interface
interface EcommerceState {
  // State
  cart: CartItem[];
  favorites: number[];
  filters: Filters;

  // Cart actions
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;

  // Favorites actions
  toggleFavorite: (productId: number) => void;

  // Filter actions
  setCategory: (category: string) => void;
  setSearchQuery: (searchQuery: string) => void;
  setSortBy: (sortBy: Filters['sortBy']) => void;
  setViewMode: (viewMode: Filters['viewMode']) => void;
  toggleFilters: () => void;
  setPriceRange: (priceRange: Filters['priceRange']) => void;
  setMinRating: (minRating: number) => void;
  clearFilters: () => void;

  // Helper function
  getFilteredProducts: (products: Product[]) => Product[];
}

const useEcommerceStore = create<EcommerceState>((set, get) => ({
  // Initial State
  cart: [],
  favorites: [],
  
  filters: {
    category: 'all',
    searchQuery: '',
    sortBy: 'featured',
    viewMode: 'grid',
    showFilters: false,
    priceRange: {
      min: '',
      max: ''
    },
    minRating: 0
  },

  // Cart Actions
  addToCart: (product: Product) => set((state) => {
    const existingItem = state.cart.find((item) => item.id === product.id);
    
    if (existingItem) {
      return {
        cart: state.cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };
    } else {
      return {
        cart: [...state.cart, { ...product, quantity: 1 }]
      };
    }
  }),

  removeFromCart: (productId: number) => set((state) => ({
    cart: state.cart.filter((item) => item.id !== productId)
  })),

  updateQuantity: (productId: number, quantity: number) => set((state) => ({
    cart: state.cart.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    )
  })),

  clearCart: () => set({ cart: [] }),

  // Favorites Actions
  toggleFavorite: (productId: number) => set((state) => ({
    favorites: state.favorites.includes(productId)
      ? state.favorites.filter((id) => id !== productId)
      : [...state.favorites, productId]
  })),

  // Filter Actions
  setCategory: (category: string) => set((state) => ({
    filters: { ...state.filters, category }
  })),

  setSearchQuery: (searchQuery: string) => set((state) => ({
    filters: { ...state.filters, searchQuery }
  })),

  setSortBy: (sortBy: Filters['sortBy']) => set((state) => ({
    filters: { ...state.filters, sortBy }
  })),

  setViewMode: (viewMode: Filters['viewMode']) => set((state) => ({
    filters: { ...state.filters, viewMode }
  })),

  toggleFilters: () => set((state) => ({
    filters: { ...state.filters, showFilters: !state.filters.showFilters }
  })),

  setPriceRange: (priceRange: Filters['priceRange']) => set((state) => ({
    filters: { ...state.filters, priceRange }
  })),

  setMinRating: (minRating: number) => set((state) => ({
    filters: { ...state.filters, minRating }
  })),

  clearFilters: () => set((state) => ({
    filters: {
      ...state.filters,
      category: 'all',
      searchQuery: '',
      priceRange: { min: '', max: '' },
      minRating: 0
    }
  })),

  // Helper function for filtering products
  getFilteredProducts: (products: Product[]) => {
    const { filters } = get();
    
    let filtered = products.filter((product) => {
      // Category filter
      if (filters.category !== 'all' && product.category !== filters.category) {
        return false;
      }
      
      // Search filter
      if (filters.searchQuery && 
          !product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
          !product.description.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return false;
      }
      
      // Price filter
      if (filters.priceRange.min && product.price < parseFloat(filters.priceRange.min)) {
        return false;
      }
      if (filters.priceRange.max && product.price > parseFloat(filters.priceRange.max)) {
        return false;
      }
      
      // Rating filter
      if (filters.minRating && product.rating < filters.minRating) {
        return false;
      }
      
      return true;
    });

    // Sort filtered products
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        // Keep original order for featured
        break;
    }

    return filtered;
  }
}));

export default useEcommerceStore;
export type { Product, CartItem, Filters, EcommerceState}