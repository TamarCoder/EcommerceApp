// Header/Header.tsx
"use client";
import { Search, ShoppingCart as ShoppingCartIcon, X } from "lucide-react";
import { useState, useRef, ChangeEvent } from "react";
import useEcommerceStore from "../../Store/useStore";

interface HeaderProps {
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const Header = ({ isCartOpen, setIsCartOpen }: HeaderProps) => {
  const { filters, setSearchQuery, cart } = useEcommerceStore();
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement>(null);

  // Calculate cart items count
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
    if (searchRef.current) {
      searchRef.current.focus();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 sm:py-0">
          
          {/* Logo */}
          <div className="flex justify-between items-center w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-indigo-600">ShopHub</h1>
              <span className="hidden sm:block text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                E-commerce
              </span>
            </div>

            {/* Cart icon for small screens */}
            <button
              className="sm:hidden relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCartIcon className="w-6 h-6 text-gray-700" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {cartItemsCount > 99 ? '99+' : cartItemsCount}
                </span>
              )}
            </button>
          </div>

          {/* Search Bar */}
          <div className="w-full sm:flex-1 sm:max-w-md lg:max-w-lg">
            <div 
              className={`relative transition-all duration-200 ${
                isSearchFocused ? 'ring-2 ring-indigo-500 rounded-lg' : ''
              }`}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              
              <input
                ref={searchRef}
                type="text"
                value={filters.searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search products, categories..."
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-colors"
              />
              
              {filters.searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>

            {/* Search Results Counter */}
            {filters.searchQuery && (
              <p className="text-xs text-gray-500 mt-1">
                Searching for "{filters.searchQuery}"
              </p>
            )}
          </div>

          {/* Cart button for medium+ screens */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="cursor-pointer relative p-2 hover:bg-gray-100 rounded-lg transition-colors hidden sm:flex items-center gap-2"
          >
            <ShoppingCartIcon className="w-6 h-6 text-gray-700" />
            
            {cartItemsCount > 0 && (
              <>
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {cartItemsCount > 99 ? '99+' : cartItemsCount}
                </span>
                <span className="hidden lg:block text-sm font-medium text-gray-700">
                  ({cartItemsCount})
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;