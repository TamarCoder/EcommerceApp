import { create } from 'zustand';

// პროდუქტის ინტერფეისი - როგორ გამოიყურება ერთი პროდუქტი
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

// კალათში არსებული პროდუქტი - ეს არის პროდუქტი + რაოდენობა
interface CartItem extends Product {
  quantity: number;               // რამდენი ცალი უნდა მომხმარებელს
}

// ფილტრების ინტერფეისი - როგორ ირჩევს მომხმარებელი პროდუქტებს
interface Filters {
  category: string;                                           // რომელი კატეგორია ("ყველა", "ელექტრონიკა", ასეს.)
  searchQuery: string;                                        // რას ძებნის მომხმარებელი
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating'; // როგორ დალაგება (ფასით, რეიტინგით)
  viewMode: 'grid' | 'list';                                  // როგორ ნახვა (ბადე ან ჩამონათვალი)
  showFilters: boolean;                                       // ჩანს თუ არა დამატებითი ფილტრები
  priceRange: {
    min: string;                                              // მინ. ფასი
    max: string;                                              // მაქს. ფასი
  };
  minRating: number;                                          // მინ. რეიტინგი
}

// მთელი აპლიკაციის მდგომარეობა და ფუნქციები
interface EcommerceState {
  // მდგომარეობა (State)
  cart: CartItem[];                               // კალათაში არსებული პროდუქტები
  favorites: number[];                            // რჩეული პროდუქტების ID-ები
  filters: Filters;                               // ძიებისა და ფილტრაციის პარამეტრები

  // კალათის ფუნქციები
  addToCart: (product: Product) => void;          
  removeFromCart: (productId: number) => void;   
  updateQuantity: (productId: number, quantity: number) => void; 
  clearCart: () => void;                        

  // რჩეული პროდუქტების ფუნქციები
  toggleFavorite: (productId: number) => void;   // რჩეულში დამატება/ამოშლა

  // ფილტრების ფუნქციები
  setCategory: (category: string) => void;        // კატეგორიის შეცვლა
  setSearchQuery: (searchQuery: string) => void; // ძიება
  setSortBy: (sortBy: Filters['sortBy']) => void; // დალაგება
  toggleFilters: () => void;                      // ფილტრების ჩვენება/დამალვა
  setPriceRange: (priceRange: Filters['priceRange']) => void; // ფასების დიაპაზონის შეცვლა
  setMinRating: (minRating: number) => void;      // მინ. რეიტინგის შეცვლა
  clearFilters: () => void;                       // ყველა ფილტრის გასუფთავება

  // დამხმარე ფუნქცია
  getFilteredProducts: (products: Product[]) => Product[]; // ფილტრაცია და დალაგება
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
    // ვინახავთ უკვე არის თუ არა ეს პროდუქტი კალათაში
    const existingItem = state.cart.find((item) => item.id === product.id);
    
    if (existingItem) {
      // თუ უკვე არის, რაოდენობას ვზრდით
      return {
        cart: state.cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }   
            : item
        )
      };
    } else {
      // თუ არ არის, ახალს ვამატებთ 1 რაოდენობით
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
    // ძიების სიტყვის შეცვლა
    filters: { ...state.filters, searchQuery }
  })),

  setSortBy: (sortBy: Filters['sortBy']) => set((state) => ({
    filters: { ...state.filters, sortBy }
  })),

  setViewMode: (viewMode: Filters['viewMode']) => set((state) => ({
    // ნახვის რეჟიმის შეცვლა (ბადე ან სია)
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
    // ყველა ფილტრის საწყის მდგომარეობაზე დაბრუნება
    filters: {
      ...state.filters,
      category: 'all',         // ყველა კატეგორია
      searchQuery: '',         // ცარიელი ძიება
      priceRange: { min: '', max: '' }, // ფასები არ არის შეზღუდული
      minRating: 0             // მინ. რეიტინგი 0
    }
  })),

  // მთავარი ფუნქცია - პროდუქტების ფილტრაცია და დალაგება
  getFilteredProducts: (products: Product[]) => {
    const { filters } = get(); // მიმდინარე ფილტრების მიღება
    
    // ვიწყებთ ფილტრაციას
    let filtered = products.filter((product) => {
      // კატეგორიის შემოწმება
      if (filters.category !== 'all' && product.category !== filters.category) {
        return false; // თუ სხვა კატეგორიისაა, არ ჩავრთოთ
      }
      
      // ძიების სიტყვის შემოწმება სახელსა და აღწერაში
      if (filters.searchQuery && 
          !product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
          !product.description.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return false; // თუ ძიების სიტყვა არ მოიძებნება, არ ჩავრთოთ
      }
      
      // მინ. ფასის შემოწმება
      if (filters.priceRange.min && product.price < parseFloat(filters.priceRange.min)) {
        return false; // თუ ფასი ნაკლებია მინ. ფასზე, არ ჩავრთოთ
      }
      
      // მაქს. ფასის შემოწმება
      if (filters.priceRange.max && product.price > parseFloat(filters.priceRange.max)) {
        return false; // თუ ფასი მეტია მაქს. ფასზე, არ ჩავრთოთ
      }
      
      // მინ. რეიტინგის შემოწმება
      if (filters.minRating && product.rating < filters.minRating) {
        return false; // თუ რეიტინგი დაბალია, არ ჩავრთოთ
      }
      
      return true; // ყველა ფილტრი გავიარა, ჩავრთოთ
    });

    // ახლა ვალაგებთ ფილტრაციის შემდეგ
    switch (filters.sortBy) {
      case 'price-low':
        // ფასით ზრდადობით (იაფიდან ძვირისკენ)
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        // ფასით კლებადობით (ძვირიდან იაფისკენ)
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        // რეიტინგით კლებადობით (საუკეთესოდან ყველაზე ცუდისკენ)
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        // რჩეული პროდუქტები - ძველი თანმიმდევრობა
        break;
    }

    return filtered; // ვბრუნებთ ფილტრაციისა და დალაგების შემდეგ
  }
}));

export default useEcommerceStore;
export type { Product, CartItem, Filters, EcommerceState };