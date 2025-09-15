import { create } from 'zustand';

// პროდუქტის ინტერფეისი
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

// კალათში არსებული პროდუქტი
interface CartItem extends Product {
  quantity: number;
}

// ფილტრების ინტერფეისი
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

// მთელი აპლიკაციის მდგომარეობა და ფუნქციები
interface EcommerceState {
  // მდგომარეობა (State)
  cart: CartItem[];
  favorites: number[];
  filters: Filters;

  // კალათის ფუნქციები
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;

  // რჩეული პროდუქტების ფუნქციები
  toggleFavorite: (productId: number) => void;

  // ფილტრების ფუნქციები
  setCategory: (category: string) => void;
  setSearchQuery: (searchQuery: string) => void;
  setSortBy: (sortBy: Filters['sortBy']) => void;
  setViewMode: (viewMode: Filters['viewMode']) => void; // ← ეს დამატებული იყო
  toggleFilters: () => void;
  setPriceRange: (priceRange: Filters['priceRange']) => void;
  setMinRating: (minRating: number) => void;
  clearFilters: () => void;

  // დამხმარე ფუნქციები
  getFilteredProducts: (products: Product[]) => Product[];
  getCartTotal: () => number; // ← ახალი: კალათის საერთო ღირებულება
  getCartItemsCount: () => number; // ← ახალი: კალათაში მთლიანი პროდუქტების რაოდენობა
  isInCart: (productId: number) => boolean; // ← ახალი: არის თუ არა პროდუქტი კალათაში
  isFavorite: (productId: number) => boolean; // ← ახალი: არის თუ არა პროდუქტი რჩეულებში
}

const useEcommerceStore = create<EcommerceState>((set, get) => ({
  // საწყისი მდგომარეობა
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

  // კალათის ფუნქციები
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

  updateQuantity: (productId: number, quantity: number) => set((state) => {
    // თუ რაოდენობა 0 ან ნაკლებია, პროდუქტი კალათიდან უნდა ამოიშალოს
    if (quantity <= 0) {
      return {
        cart: state.cart.filter((item) => item.id !== productId)
      };
    }
    
    return {
      cart: state.cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    };
  }),

  clearCart: () => set({ cart: [] }),

  // რჩეული პროდუქტების ფუნქციები
  toggleFavorite: (productId: number) => set((state) => ({
    favorites: state.favorites.includes(productId)
      ? state.favorites.filter((id) => id !== productId)
      : [...state.favorites, productId]
  })),

  // ფილტრების ფუნქციები
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

  // მთავარი ფუნქცია - პროდუქტების ფილტრაცია და დალაგება
  getFilteredProducts: (products: Product[]) => {
    const { filters } = get();
    
    let filtered = products.filter((product) => {
      // კატეგორიის შემოწმება
      if (filters.category !== 'all' && product.category !== filters.category) {
        return false;
      }
      
      // ძიების სიტყვის შემოწმება
      if (filters.searchQuery && 
          !product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
          !product.description.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return false;
      }
      
      // ფასის დიაპაზონის შემოწმება
      if (filters.priceRange.min && product.price < parseFloat(filters.priceRange.min)) {
        return false;
      }
      
      if (filters.priceRange.max && product.price > parseFloat(filters.priceRange.max)) {
        return false;
      }
      
      // რეიტინგის შემოწმება
      if (filters.minRating && product.rating < filters.minRating) {
        return false;
      }
      
      return true;
    });

    // დალაგება
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
        break;
    }

    return filtered;
  },

  // ახალი დამხმარე ფუნქციები
  getCartTotal: () => {
    const { cart } = get();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  getCartItemsCount: () => {
    const { cart } = get();
    return cart.reduce((total, item) => total + item.quantity, 0);
  },

  isInCart: (productId: number) => {
    const { cart } = get();
    return cart.some((item) => item.id === productId);
  },

  isFavorite: (productId: number) => {
    const { favorites } = get();
    return favorites.includes(productId);
  }
}));

export default useEcommerceStore;
export type { Product, CartItem, Filters, EcommerceState };