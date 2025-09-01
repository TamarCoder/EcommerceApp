// store/ecommerceStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  badge?: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface Filters {
  category: string;
  priceRange: [number, number];
  rating: number;
  sortBy: string;
}

interface EcommerceStore {
  // State
  cart: CartItem[];
  favorites: number[];
  filters: Filters;
  searchQuery: string;
  
  // Cart Actions
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  
  // Favorites Actions
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  clearFavorites: () => void;
  
  // Filter Actions
  setFilter: (filterType: keyof Filters, value: any) => void;
  resetFilters: () => void;
  
  // Search Actions
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
}

// Initial State
const initialFilters: Filters = {
  category: 'all',
  priceRange: [0, 1000],
  rating: 0,
  sortBy: 'featured'
};

// Create Store with Persist
const useEcommerceStore = create<EcommerceStore>()(
  persist(
    (set, get) => ({
      // Initial State
      cart: [],
      favorites: [],
      filters: initialFilters,
      searchQuery: '',
      
      // Cart Actions
      addToCart: (product) => set((state) => {
        const existingItem = state.cart.find(item => item.id === product.id);
        
        if (existingItem) {
          // If product exists, increase quantity
          return {
            cart: state.cart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          };
        }
        
        // Add new product to cart
        return { 
          cart: [...state.cart, { ...product, quantity: 1 }] 
        };
      }),
      
      removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter(item => item.id !== productId)
      })),
      
      updateQuantity: (productId, quantity) => set((state) => {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          return {
            cart: state.cart.filter(item => item.id !== productId)
          };
        }
        
        return {
          cart: state.cart.map(item =>
            item.id === productId 
              ? { ...item, quantity } 
              : item
          )
        };
      }),
      
      clearCart: () => set({ cart: [] }),
      
      getCartTotal: () => {
        const state = get();
        return state.cart.reduce((total, item) => {
          return total + (item.price * item.quantity);
        }, 0);
      },
      
      getCartItemsCount: () => {
        const state = get();
        return state.cart.reduce((count, item) => count + item.quantity, 0);
      },
      
      // Favorites Actions
      toggleFavorite: (productId) => set((state) => {
        const isFavorited = state.favorites.includes(productId);
        
        return {
          favorites: isFavorited
            ? state.favorites.filter(id => id !== productId)
            : [...state.favorites, productId]
        };
      }),
      
      isFavorite: (productId) => {
        const state = get();
        return state.favorites.includes(productId);
      },
      
      clearFavorites: () => set({ favorites: [] }),
      
      // Filter Actions
      setFilter: (filterType, value) => set((state) => ({
        filters: {
          ...state.filters,
          [filterType]: value
        }
      })),
      
      resetFilters: () => set({
        filters: initialFilters
      }),
      
      // Search Actions
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      clearSearch: () => set({ searchQuery: '' })
    }),
    {
      name: 'ecommerce-store', // localStorage key
      partialize: (state) => ({ 
        cart: state.cart,
        favorites: state.favorites 
      })  
    }
  )
);

export default useEcommerceStore;